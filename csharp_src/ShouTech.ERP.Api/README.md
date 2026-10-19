# ShouTech ERP API

This ASP.NET Core API is the trusted server boundary for authentication and company setup. It is separate from the legacy console demonstration in `ShouTech.ERP.Core`.

## Configure and run

Set an explicit database connection string before starting the API. The default configuration intentionally contains no database path and does not silently create an empty database.

SQLite:
- `Database__Provider=sqlite`
- `ConnectionStrings__Default=Data Source=/absolute/path/to/shoutech.db;Mode=ReadWrite;Cache=Shared`

PostgreSQL:
- `Database__Provider=postgresql`
- `ConnectionStrings__Default=Host=localhost;Database=shoutech;Username=...;Password=...`

Set `ASPNETCORE_URLS=http://localhost:5080` for local development and `VITE_API_BASE_URL=http://localhost:5080` for the React frontend. Configure `Cors__AllowedOrigins` to the exact frontend origin(s). Production deployments must use HTTPS and a secret manager or protected environment configuration for credentials.

The database must already be provisioned with repository migrations. The API does not silently create a partial ERP schema or apply migrations automatically. Readiness remains unavailable until the core and authentication tables exist.

Apply the matching authentication-hardening migration after the core migrations:
- SQLite: `dba/mig/sqlite/012_authentication_hardening.sql`
- PostgreSQL: `dba/mig/postgresql/014_authentication_hardening.sql`

## Endpoints

- `GET /health/live`: process liveness.
- `GET /health/ready`: confirms database connectivity and required authentication tables.
- `GET /api/companies`: returns non-deleted active company selection metadata.
- `POST /api/setup/initial-company`: one-time setup only when the database has no companies. It creates the first company, initial administrator, Argon2id credential record, administrator role and permissions in one transaction. The initial administrator password must contain at least 12 characters.
- `POST /api/auth/login`: verifies a company-scoped username and password, applies failed-attempt lockout, creates a random opaque session token, and stores only its SHA-256 hash.
- `GET /api/auth/session`: validates a bearer token against an unexpired, unrevoked database session and active company/user.
- `POST /api/auth/logout`: revokes the current session.

Login JSON: `{"username":"...","password":"...","companyId":"..."}`.

The `users` table stores the identity record; `user_credentials` stores an Argon2id encoded password hash. The one-time setup endpoint is not a general company/user administration endpoint and returns conflict once any company exists. Additional company/user management must be added as authenticated, permission-checked API operations.

## Scope boundary

The React company selection, initial setup, login, and logout now call the API. Tax identifiers, VAT settings, chart-of-accounts template selection, fiscal-year configuration, backup preferences, and general ERP write operations are not yet persisted through API endpoints. Their UI must not be treated as evidence that those settings or business records have been saved to the database. Migrate each ERP module to authenticated, tenant-scoped API endpoints before claiming durable persistence.
