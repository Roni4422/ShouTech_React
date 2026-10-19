using System.Data;
using System.Security.Cryptography;
using System.Text;
using Dapper;
using ShouTech.ERP.Api.Data;
using ShouTech.ERP.Api.Security;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<IDbConnectionFactory, DbConnectionFactory>();
builder.Services.AddSingleton<IPasswordHasher, Argon2idPasswordHasher>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        var origins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];
        if (origins.Length > 0) policy.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors();

app.MapGet("/health/live", () => Results.Ok(new { status = "live" }));

app.MapGet("/api/companies", async (IDbConnectionFactory db) =>
{
    try
    {
        await using var connection = await db.OpenConnectionAsync();
        var companies = await connection.QueryAsync<PublicCompany>(
            """
            SELECT CAST(company_id AS TEXT) AS CompanyId, company_code AS Code, company_name_en AS Name
            FROM companies
            WHERE is_active = @Active AND is_deleted = @Deleted
            ORDER BY company_name_en, company_code
            """, new { Active = db.BooleanParameter(true), Deleted = db.BooleanParameter(false) });
        return Results.Ok(companies);
    }
    catch
    {
        return Results.Json(new { error = "company_lookup_unavailable" }, statusCode: StatusCodes.Status503ServiceUnavailable);
    }
});

app.MapPost("/api/setup/initial-company", async (InitialCompanyRequest request, IDbConnectionFactory db, IPasswordHasher hasher) =>
{
    var code = request.CompanyCode?.Trim();
    var username = request.AdminUsername?.Trim();
    var currency = (request.CurrencyCode ?? "USD").Trim().ToUpperInvariant();
    var language = (request.LanguageCode ?? "en").Trim().ToLowerInvariant();
    if (string.IsNullOrWhiteSpace(code) || code.Length > 50 ||
        !System.Text.RegularExpressions.Regex.IsMatch(code, "^[A-Za-z0-9][A-Za-z0-9._-]{1,49}$") ||
        string.IsNullOrWhiteSpace(request.CompanyNameAr) || request.CompanyNameAr.Length > 250 ||
        string.IsNullOrWhiteSpace(request.CompanyNameEn) || request.CompanyNameEn.Length > 250 ||
        string.IsNullOrWhiteSpace(username) || username.Length > 100 ||
        string.IsNullOrWhiteSpace(request.AdminFullName) || request.AdminFullName.Length > 200 ||
        string.IsNullOrEmpty(request.AdminPassword) || request.AdminPassword.Length < 12 || request.AdminPassword.Length > 1024 ||
        !System.Text.RegularExpressions.Regex.IsMatch(currency, "^[A-Z]{3}$") ||
        !new[] { "ar", "en", "fr", "tr", "de", "es", "ru", "zh", "fa", "ur" }.Contains(language))
        return Results.BadRequest(new { error = "invalid_setup_request" });

    try
    {
        await using var connection = await db.OpenConnectionAsync();
        if (!await db.HasAuthenticationSchemaAsync(connection))
            return Results.Json(new { error = "setup_schema_unavailable" }, statusCode: StatusCodes.Status503ServiceUnavailable);

        await using var transaction = await connection.BeginTransactionAsync(IsolationLevel.Serializable);
        var existingCompanies = await connection.ExecuteScalarAsync<long>("SELECT COUNT(*) FROM companies", transaction: transaction);
        if (existingCompanies != 0)
        {
            await transaction.RollbackAsync();
            return Results.Conflict(new { error = "initial_setup_already_completed" });
        }

        var companyId = Guid.NewGuid().ToString("D");
        var userId = Guid.NewGuid().ToString("D");
        var encodedHash = hasher.Hash(request.AdminPassword);
        var salt = encodedHash.Split('
    try
    {
        await using var connection = await db.OpenConnectionAsync();
        await connection.QuerySingleAsync<int>("SELECT 1");
        var schemaReady = await db.HasAuthenticationSchemaAsync(connection);
        if (!schemaReady)
            return Results.Json(new { status = "not_ready", reason = "Authentication schema is missing. Apply the documented database migrations." }, statusCode: StatusCodes.Status503ServiceUnavailable);
        return Results.Ok(new { status = "ready", database = db.ProviderName, schema = "available" });
    }
    catch
    {
        return Results.Json(new { status = "not_ready", reason = "The configured database is unavailable." }, statusCode: StatusCodes.Status503ServiceUnavailable);
    }
});

app.MapPost("/api/auth/login", async (LoginRequest request, HttpContext http, IDbConnectionFactory db, IPasswordHasher hasher, IConfiguration configuration) =>
{
    if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrEmpty(request.Password) ||
        string.IsNullOrWhiteSpace(request.CompanyId) || request.Username.Length > 100 ||
        request.Password.Length > 1024 || request.CompanyId.Length > 64)
        return Results.BadRequest(new { error = "invalid_request" });

    try
    {
        await using var connection = await db.OpenConnectionAsync();
        if (!await db.HasAuthenticationSchemaAsync(connection))
            return Results.Json(new { error = "authentication_unavailable" }, statusCode: StatusCodes.Status503ServiceUnavailable);

        var user = await connection.QuerySingleOrDefaultAsync<AuthUser>(
            """
            SELECT CAST(u.user_id AS TEXT) AS UserId, CAST(u.company_id AS TEXT) AS CompanyId, u.username AS Username,
                   c.is_active AS CompanyActive, c.is_deleted AS CompanyDeleted,
                   u.is_active AS UserActive, u.is_deleted AS UserDeleted,
                   uc.password_hash AS PasswordHash, uc.failed_attempt_count AS FailedAttempts,
                   uc.locked_until AS LockedUntil
            FROM users u
            INNER JOIN companies c ON c.company_id = u.company_id
            INNER JOIN user_credentials uc ON uc.user_id = u.user_id
            WHERE u.company_id = @CompanyId AND lower(u.username) = lower(@Username)
            """,
            new { CompanyId = db.ToIdentifier(request.CompanyId), Username = request.Username.Trim() });

        if (user is null || !db.IsTrue(user.UserActive) || !db.IsFalse(user.UserDeleted) ||
            !db.IsTrue(user.CompanyActive) || !db.IsFalse(user.CompanyDeleted))
        {
            await RecordAuthEventAsync(connection, db, null, null, request.Username.Trim(), "login_failed", http);
            return Results.Unauthorized();
        }

        if (DateTimeOffset.TryParse(Convert.ToString(user.LockedUntil), out var lockedUntil) && lockedUntil > DateTimeOffset.UtcNow)
        {
            await RecordAuthEventAsync(connection, db, request.CompanyId, user.UserId, user.Username, "account_locked", http);
            return Results.Json(new { error = "account_locked" }, statusCode: StatusCodes.Status423Locked);
        }

        if (!hasher.Verify(user.PasswordHash, request.Password))
        {
            var attempts = user.FailedAttempts + 1;
            var limit = Math.Clamp(configuration.GetValue("Authentication:MaxFailedAttempts", 5), 3, 20);
            var lockMinutes = Math.Clamp(configuration.GetValue("Authentication:LockoutMinutes", 15), 1, 1440);
            object? lockUntil = attempts >= limit ? db.FormatTimestamp(DateTimeOffset.UtcNow.AddMinutes(lockMinutes)) : null;
            await connection.ExecuteAsync(
                "UPDATE user_credentials SET failed_attempt_count = @Attempts, locked_until = @LockedUntil, updated_at = CURRENT_TIMESTAMP WHERE user_id = @UserId",
                new { Attempts = attempts, LockedUntil = lockUntil, UserId = db.ToIdentifier(user.UserId) });
            await RecordAuthEventAsync(connection, db, request.CompanyId, user.UserId, user.Username,
                attempts >= limit ? "account_locked" : "login_failed", http);
            return Results.Unauthorized();
        }

        var tokenBytes = RandomNumberGenerator.GetBytes(32);
        var token = Convert.ToBase64String(tokenBytes).TrimEnd('=').Replace('+', '-').Replace('/', '_');
        var tokenHash = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(token))).ToLowerInvariant();
        var sessionId = Guid.NewGuid().ToString("D");
        var expiresAt = DateTimeOffset.UtcNow.AddMinutes(Math.Clamp(configuration.GetValue("Authentication:SessionLifetimeMinutes", 480), 5, 1440));
        var agent = http.Request.Headers.UserAgent.ToString();
        if (agent.Length > 1000) agent = agent[..1000];

        await using var transaction = await connection.BeginTransactionAsync();
        await connection.ExecuteAsync(
            "UPDATE user_credentials SET failed_attempt_count = 0, locked_until = NULL, updated_at = CURRENT_TIMESTAMP WHERE user_id = @UserId",
            new { UserId = db.ToIdentifier(user.UserId) }, transaction);
        await connection.ExecuteAsync(
            """
            INSERT INTO user_sessions (session_id, user_id, company_id, token_hash, expires_at, ip_address, user_agent)
            VALUES (@SessionId, @UserId, @CompanyId, @TokenHash, @ExpiresAt, @IpAddress, @UserAgent)
            """,
            new
            {
                SessionId = db.ToIdentifier(sessionId), UserId = db.ToIdentifier(user.UserId),
                CompanyId = db.ToIdentifier(user.CompanyId), TokenHash = tokenHash,
                ExpiresAt = db.FormatTimestamp(expiresAt),
                IpAddress = db.FormatIpAddress(http.Connection.RemoteIpAddress?.ToString()), UserAgent = agent
            }, transaction);
        await RecordAuthEventAsync(connection, db, user.CompanyId, user.UserId, user.Username, "login_succeeded", http, transaction);
        await transaction.CommitAsync();
        return Results.Ok(new AuthSessionResponse(token, expiresAt, user.UserId, user.CompanyId, user.Username));
    }
    catch
    {
        return Results.Json(new { error = "authentication_unavailable" }, statusCode: StatusCodes.Status503ServiceUnavailable);
    }
});

app.MapGet("/api/auth/session", async (HttpContext http, IDbConnectionFactory db) =>
{
    var token = GetBearerToken(http);
    if (token is null) return Results.Unauthorized();
    var tokenHash = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(token))).ToLowerInvariant();

    try
    {
        await using var connection = await db.OpenConnectionAsync();
        var session = await connection.QuerySingleOrDefaultAsync<SessionView>(
            """
            SELECT CAST(s.session_id AS TEXT) AS SessionId, CAST(s.user_id AS TEXT) AS UserId, CAST(s.company_id AS TEXT) AS CompanyId,
                   s.expires_at AS ExpiresAt, u.username AS Username
            FROM user_sessions s
            INNER JOIN users u ON u.user_id = s.user_id
            INNER JOIN companies c ON c.company_id = s.company_id AND c.company_id = u.company_id
            WHERE s.token_hash = @TokenHash AND s.revoked_at IS NULL
              AND s.expires_at > @Now
              AND u.is_active = @Active AND u.is_deleted = @Deleted
              AND c.is_active = @Active AND c.is_deleted = @Deleted
            """,
            new { TokenHash = tokenHash, Now = db.FormatTimestamp(DateTimeOffset.UtcNow),
                Active = db.BooleanParameter(true), Deleted = db.BooleanParameter(false) });
        if (session is null) return Results.Unauthorized();
        return Results.Ok(session);
    }
    catch
    {
        return Results.Json(new { error = "session_validation_unavailable" }, statusCode: StatusCodes.Status503ServiceUnavailable);
    }
});

app.MapPost("/api/auth/logout", async (HttpContext http, IDbConnectionFactory db) =>
{
    var token = GetBearerToken(http);
    if (token is null) return Results.Unauthorized();
    var tokenHash = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(token))).ToLowerInvariant();
    try
    {
        await using var connection = await db.OpenConnectionAsync();
        var changed = await connection.ExecuteAsync(
            "UPDATE user_sessions SET revoked_at = @Now, revoke_reason = 'user_logout' WHERE token_hash = @TokenHash AND revoked_at IS NULL",
            new { Now = db.FormatTimestamp(DateTimeOffset.UtcNow), TokenHash = tokenHash });
        return changed == 1 ? Results.NoContent() : Results.Unauthorized();
    }
    catch
    {
        return Results.Json(new { error = "logout_unavailable" }, statusCode: StatusCodes.Status503ServiceUnavailable);
    }
});

app.Run();

static string? GetBearerToken(HttpContext context)
{
    var header = context.Request.Headers.Authorization.ToString();
    const string prefix = "Bearer ";
    return header.StartsWith(prefix, StringComparison.OrdinalIgnoreCase) && header.Length > prefix.Length
        ? header[prefix.Length..].Trim() : null;
}

static async Task RecordAuthEventAsync(System.Data.Common.DbConnection connection, IDbConnectionFactory db,
    string? companyId, string? userId, string username, string eventType, HttpContext http,
    System.Data.Common.DbTransaction? transaction = null)
{
    var agent = http.Request.Headers.UserAgent.ToString();
    if (agent.Length > 1000) agent = agent[..1000];
    await connection.ExecuteAsync(
        """
        INSERT INTO auth_events (company_id, user_id, username_attempt, event_type, correlation_id, ip_address, user_agent)
        VALUES (@CompanyId, @UserId, @Username, @EventType, @CorrelationId, @IpAddress, @UserAgent)
        """,
        new { CompanyId = companyId is null ? null : db.ToIdentifier(companyId), UserId = userId is null ? null : db.ToIdentifier(userId),
            Username = username, EventType = eventType, CorrelationId = db.ToIdentifier(Guid.NewGuid().ToString("D")),
            IpAddress = db.FormatIpAddress(http.Connection.RemoteIpAddress?.ToString()), UserAgent = agent }, transaction);
}

public sealed record LoginRequest(string Username, string Password, string CompanyId);
public sealed record InitialCompanyRequest(string CompanyCode, string CompanyNameAr, string CompanyNameEn,
    string AdminUsername, string AdminPassword, string AdminFullName, string? Email, string? Phone,
    string? Address, string? CommercialRegistration, string? CurrencyCode, string? LanguageCode);
public sealed record PublicCompany(string CompanyId, string Code, string Name);
public sealed record AuthSessionResponse(string AccessToken, DateTimeOffset ExpiresAt, string UserId, string CompanyId, string Username);
public sealed record AuthUser(string UserId, string CompanyId, string Username, object CompanyActive, object CompanyDeleted,
    object UserActive, object UserDeleted, string PasswordHash, int FailedAttempts, object? LockedUntil);
public sealed record SessionView(string SessionId, string UserId, string CompanyId, string ExpiresAt, string Username);
)[3];
        await connection.ExecuteAsync(
            """
            INSERT INTO companies (company_id, company_code, company_name_ar, company_name_en, email, phone,
                address_line1, commercial_registration, currency_code, language_code)
            VALUES (@CompanyId, @CompanyCode, @NameAr, @NameEn, @Email, @Phone, @Address, @Registration, @Currency, @Language)
            """,
            new { CompanyId = db.ToIdentifier(companyId), CompanyCode = code, NameAr = request.CompanyNameAr.Trim(),
                NameEn = request.CompanyNameEn.Trim(), request.Email, request.Phone,
                Address = request.Address?.Trim(), Registration = request.CommercialRegistration?.Trim(),
                Currency = currency, Language = language }, transaction);

        await connection.ExecuteAsync(
            """
            INSERT INTO users (user_id, company_id, username, password_hash, password_salt, full_name,
                full_name_ar, full_name_en, email, must_change_password, is_active, is_deleted)
            VALUES (@UserId, @CompanyId, @Username, @PasswordHash, @PasswordSalt, @FullName,
                @FullNameAr, @FullNameEn, @Email, @MustChangePassword, @Active, @Deleted)
            """,
            new { UserId = db.ToIdentifier(userId), CompanyId = db.ToIdentifier(companyId), Username = username,
                PasswordHash = encodedHash, PasswordSalt = salt, FullName = request.AdminFullName.Trim(),
                FullNameAr = request.AdminFullName.Trim(), FullNameEn = request.AdminFullName.Trim(),
                request.Email, MustChangePassword = db.BooleanParameter(false), Active = db.BooleanParameter(true),
                Deleted = db.BooleanParameter(false) }, transaction);

        await connection.ExecuteAsync(
            "INSERT INTO user_credentials (user_id, password_hash) VALUES (@UserId, @PasswordHash)",
            new { UserId = db.ToIdentifier(userId), PasswordHash = encodedHash }, transaction);

        var roleId = await connection.ExecuteScalarAsync<long>(
            """
            INSERT INTO roles (company_id, role_code, role_name, is_active, is_deleted)
            VALUES (@CompanyId, 'ROLE_ADMINISTRATOR', 'Administrator', @Active, @Deleted)
            RETURNING role_id
            """,
            new { CompanyId = db.ToIdentifier(companyId), Active = db.BooleanParameter(true), Deleted = db.BooleanParameter(false) },
            transaction);
        await connection.ExecuteAsync("INSERT INTO user_roles (user_id, role_id) VALUES (@UserId, @RoleId)",
            new { UserId = db.ToIdentifier(userId), RoleId = roleId }, transaction);
        await connection.ExecuteAsync(
            """
            INSERT INTO role_permissions (role_id, permission_id)
            SELECT @RoleId, permission_id FROM permissions WHERE is_active = @Active
            """,
            new { RoleId = roleId, Active = db.BooleanParameter(true) }, transaction);

        await transaction.CommitAsync();
        return Results.Created("/api/companies", new { companyId, companyCode = code, userId, username });
    }
    catch
    {
        return Results.Json(new { error = "initial_setup_failed" }, statusCode: StatusCodes.Status503ServiceUnavailable);
    }
});

app.MapGet("/health/ready", async (IDbConnectionFactory db) =>
{
    try
    {
        await using var connection = await db.OpenConnectionAsync();
        await connection.QuerySingleAsync<int>("SELECT 1");
        var schemaReady = await db.HasAuthenticationSchemaAsync(connection);
        if (!schemaReady)
            return Results.Json(new { status = "not_ready", reason = "Authentication schema is missing. Apply the documented database migrations." }, statusCode: StatusCodes.Status503ServiceUnavailable);
        return Results.Ok(new { status = "ready", database = db.ProviderName, schema = "available" });
    }
    catch
    {
        return Results.Json(new { status = "not_ready", reason = "The configured database is unavailable." }, statusCode: StatusCodes.Status503ServiceUnavailable);
    }
});

app.MapPost("/api/auth/login", async (LoginRequest request, HttpContext http, IDbConnectionFactory db, IPasswordHasher hasher, IConfiguration configuration) =>
{
    if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrEmpty(request.Password) ||
        string.IsNullOrWhiteSpace(request.CompanyId) || request.Username.Length > 100 ||
        request.Password.Length > 1024 || request.CompanyId.Length > 64)
        return Results.BadRequest(new { error = "invalid_request" });

    try
    {
        await using var connection = await db.OpenConnectionAsync();
        if (!await db.HasAuthenticationSchemaAsync(connection))
            return Results.Json(new { error = "authentication_unavailable" }, statusCode: StatusCodes.Status503ServiceUnavailable);

        var user = await connection.QuerySingleOrDefaultAsync<AuthUser>(
            """
            SELECT u.user_id AS UserId, u.company_id AS CompanyId, u.username AS Username,
                   c.is_active AS CompanyActive, c.is_deleted AS CompanyDeleted,
                   u.is_active AS UserActive, u.is_deleted AS UserDeleted,
                   uc.password_hash AS PasswordHash, uc.failed_attempt_count AS FailedAttempts,
                   uc.locked_until AS LockedUntil
            FROM users u
            INNER JOIN companies c ON c.company_id = u.company_id
            INNER JOIN user_credentials uc ON uc.user_id = u.user_id
            WHERE u.company_id = @CompanyId AND lower(u.username) = lower(@Username)
            """,
            new { CompanyId = db.ToIdentifier(request.CompanyId), Username = request.Username.Trim() });

        if (user is null || !db.IsTrue(user.UserActive) || !db.IsFalse(user.UserDeleted) ||
            !db.IsTrue(user.CompanyActive) || !db.IsFalse(user.CompanyDeleted))
        {
            await RecordAuthEventAsync(connection, db, null, null, request.Username.Trim(), "login_failed", http);
            return Results.Unauthorized();
        }

        if (DateTimeOffset.TryParse(Convert.ToString(user.LockedUntil), out var lockedUntil) && lockedUntil > DateTimeOffset.UtcNow)
        {
            await RecordAuthEventAsync(connection, db, request.CompanyId, user.UserId, user.Username, "account_locked", http);
            return Results.Json(new { error = "account_locked" }, statusCode: StatusCodes.Status423Locked);
        }

        if (!hasher.Verify(user.PasswordHash, request.Password))
        {
            var attempts = user.FailedAttempts + 1;
            var limit = Math.Clamp(configuration.GetValue("Authentication:MaxFailedAttempts", 5), 3, 20);
            var lockMinutes = Math.Clamp(configuration.GetValue("Authentication:LockoutMinutes", 15), 1, 1440);
            object? lockUntil = attempts >= limit ? db.FormatTimestamp(DateTimeOffset.UtcNow.AddMinutes(lockMinutes)) : null;
            await connection.ExecuteAsync(
                "UPDATE user_credentials SET failed_attempt_count = @Attempts, locked_until = @LockedUntil, updated_at = CURRENT_TIMESTAMP WHERE user_id = @UserId",
                new { Attempts = attempts, LockedUntil = lockUntil, UserId = db.ToIdentifier(user.UserId) });
            await RecordAuthEventAsync(connection, db, request.CompanyId, user.UserId, user.Username,
                attempts >= limit ? "account_locked" : "login_failed", http);
            return Results.Unauthorized();
        }

        var tokenBytes = RandomNumberGenerator.GetBytes(32);
        var token = Convert.ToBase64String(tokenBytes).TrimEnd('=').Replace('+', '-').Replace('/', '_');
        var tokenHash = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(token))).ToLowerInvariant();
        var sessionId = Guid.NewGuid().ToString("D");
        var expiresAt = DateTimeOffset.UtcNow.AddMinutes(Math.Clamp(configuration.GetValue("Authentication:SessionLifetimeMinutes", 480), 5, 1440));
        var agent = http.Request.Headers.UserAgent.ToString();
        if (agent.Length > 1000) agent = agent[..1000];

        await using var transaction = await connection.BeginTransactionAsync();
        await connection.ExecuteAsync(
            "UPDATE user_credentials SET failed_attempt_count = 0, locked_until = NULL, updated_at = CURRENT_TIMESTAMP WHERE user_id = @UserId",
            new { UserId = db.ToIdentifier(user.UserId) }, transaction);
        await connection.ExecuteAsync(
            """
            INSERT INTO user_sessions (session_id, user_id, company_id, token_hash, expires_at, ip_address, user_agent)
            VALUES (@SessionId, @UserId, @CompanyId, @TokenHash, @ExpiresAt, @IpAddress, @UserAgent)
            """,
            new
            {
                SessionId = db.ToIdentifier(sessionId), UserId = db.ToIdentifier(user.UserId),
                CompanyId = db.ToIdentifier(user.CompanyId), TokenHash = tokenHash,
                ExpiresAt = db.FormatTimestamp(expiresAt),
                IpAddress = db.FormatIpAddress(http.Connection.RemoteIpAddress?.ToString()), UserAgent = agent
            }, transaction);
        await RecordAuthEventAsync(connection, db, user.CompanyId, user.UserId, user.Username, "login_succeeded", http, transaction);
        await transaction.CommitAsync();
        return Results.Ok(new AuthSessionResponse(token, expiresAt, user.UserId, user.CompanyId, user.Username));
    }
    catch
    {
        return Results.Json(new { error = "authentication_unavailable" }, statusCode: StatusCodes.Status503ServiceUnavailable);
    }
});

app.MapGet("/api/auth/session", async (HttpContext http, IDbConnectionFactory db) =>
{
    var token = GetBearerToken(http);
    if (token is null) return Results.Unauthorized();
    var tokenHash = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(token))).ToLowerInvariant();

    try
    {
        await using var connection = await db.OpenConnectionAsync();
        var session = await connection.QuerySingleOrDefaultAsync<SessionView>(
            """
            SELECT s.session_id AS SessionId, s.user_id AS UserId, s.company_id AS CompanyId,
                   s.expires_at AS ExpiresAt, u.username AS Username
            FROM user_sessions s
            INNER JOIN users u ON u.user_id = s.user_id
            INNER JOIN companies c ON c.company_id = s.company_id AND c.company_id = u.company_id
            WHERE s.token_hash = @TokenHash AND s.revoked_at IS NULL
              AND s.expires_at > @Now
              AND u.is_active = @Active AND u.is_deleted = @Deleted
              AND c.is_active = @Active AND c.is_deleted = @Deleted
            """,
            new { TokenHash = tokenHash, Now = db.FormatTimestamp(DateTimeOffset.UtcNow),
                Active = db.BooleanParameter(true), Deleted = db.BooleanParameter(false) });
        if (session is null) return Results.Unauthorized();
        return Results.Ok(session);
    }
    catch
    {
        return Results.Json(new { error = "session_validation_unavailable" }, statusCode: StatusCodes.Status503ServiceUnavailable);
    }
});

app.MapPost("/api/auth/logout", async (HttpContext http, IDbConnectionFactory db) =>
{
    var token = GetBearerToken(http);
    if (token is null) return Results.Unauthorized();
    var tokenHash = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(token))).ToLowerInvariant();
    try
    {
        await using var connection = await db.OpenConnectionAsync();
        var changed = await connection.ExecuteAsync(
            "UPDATE user_sessions SET revoked_at = @Now, revoke_reason = 'user_logout' WHERE token_hash = @TokenHash AND revoked_at IS NULL",
            new { Now = db.FormatTimestamp(DateTimeOffset.UtcNow), TokenHash = tokenHash });
        return changed == 1 ? Results.NoContent() : Results.Unauthorized();
    }
    catch
    {
        return Results.Json(new { error = "logout_unavailable" }, statusCode: StatusCodes.Status503ServiceUnavailable);
    }
});

app.Run();

static string? GetBearerToken(HttpContext context)
{
    var header = context.Request.Headers.Authorization.ToString();
    const string prefix = "Bearer ";
    return header.StartsWith(prefix, StringComparison.OrdinalIgnoreCase) && header.Length > prefix.Length
        ? header[prefix.Length..].Trim() : null;
}

static async Task RecordAuthEventAsync(System.Data.Common.DbConnection connection, IDbConnectionFactory db,
    string? companyId, string? userId, string username, string eventType, HttpContext http,
    System.Data.Common.DbTransaction? transaction = null)
{
    var agent = http.Request.Headers.UserAgent.ToString();
    if (agent.Length > 1000) agent = agent[..1000];
    await connection.ExecuteAsync(
        """
        INSERT INTO auth_events (company_id, user_id, username_attempt, event_type, correlation_id, ip_address, user_agent)
        VALUES (@CompanyId, @UserId, @Username, @EventType, @CorrelationId, @IpAddress, @UserAgent)
        """,
        new { CompanyId = companyId is null ? null : db.ToIdentifier(companyId), UserId = userId is null ? null : db.ToIdentifier(userId),
            Username = username, EventType = eventType, CorrelationId = db.ToIdentifier(Guid.NewGuid().ToString("D")),
            IpAddress = db.FormatIpAddress(http.Connection.RemoteIpAddress?.ToString()), UserAgent = agent }, transaction);
}

public sealed record LoginRequest(string Username, string Password, string CompanyId);
public sealed record AuthSessionResponse(string AccessToken, DateTimeOffset ExpiresAt, string UserId, string CompanyId, string Username);
public sealed record AuthUser(string UserId, string CompanyId, string Username, object CompanyActive, object CompanyDeleted,
    object UserActive, object UserDeleted, string PasswordHash, int FailedAttempts, object? LockedUntil);
public sealed record SessionView(string SessionId, string UserId, string CompanyId, string ExpiresAt, string Username);
