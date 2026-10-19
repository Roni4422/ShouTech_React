using System.Data.Common;\nusing System.Net;
using Microsoft.Data.Sqlite;
using Npgsql;

namespace ShouTech.ERP.Api.Data;

public sealed class DbConnectionFactory(IConfiguration configuration) : IDbConnectionFactory
{
    private readonly string _provider = configuration["Database:Provider"]?.Trim().ToLowerInvariant() ?? "sqlite";
    private readonly string _connectionString = configuration.GetConnectionString("Default") ?? string.Empty;

    public string ProviderName => _provider;

    public async ValueTask<DbConnection> OpenConnectionAsync(CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(_connectionString))
            throw new InvalidOperationException("A database connection string is required.");
        DbConnection connection = _provider switch
        {
            "sqlite" => new SqliteConnection(_connectionString),
            "postgresql" or "postgres" => new NpgsqlConnection(_connectionString),
            _ => throw new InvalidOperationException("Unsupported database provider.")
        };
        await connection.OpenAsync(cancellationToken);
        if (_provider == "sqlite")
        {
            await using var command = connection.CreateCommand();
            command.CommandText = "PRAGMA foreign_keys = ON;";
            await command.ExecuteNonQueryAsync(cancellationToken);
        }
        return connection;
    }

    public async Task<bool> HasAuthenticationSchemaAsync(DbConnection connection)
    {
        var sql = _provider == "sqlite"
            ? "SELECT COUNT(*) FROM sqlite_master WHERE type = 'table' AND name IN ('companies','users','user_credentials','user_sessions','auth_events')"
            : "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = current_schema() AND table_name IN ('companies','users','user_credentials','user_sessions','auth_events')";
        return await Dapper.SqlMapper.QuerySingleAsync<int>(connection, sql) == 5;
    }

    public object ToIdentifier(string value) =>
        (_provider is "postgresql" or "postgres") && Guid.TryParse(value, out var guid) ? guid : value;

    public object BooleanParameter(bool value) => _provider == "sqlite" ? (value ? 1 : 0) : value;
    public bool IsTrue(object value) => value is bool b ? b :
        value is long l ? l != 0 : value is int i ? i != 0 :
        bool.TryParse(Convert.ToString(value), out var parsed) && parsed;
    public bool IsFalse(object value) => !IsTrue(value);
    public object FormatTimestamp(DateTimeOffset value) => _provider == "sqlite" ? value.UtcDateTime.ToString("O") : value;
    public object? FormatIpAddress(string? value) => string.IsNullOrWhiteSpace(value) ? null :
        ((_provider is "postgresql" or "postgres") && IPAddress.TryParse(value, out var address) ? address : value);
}
