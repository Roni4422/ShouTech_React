# ShouTech ERP API

This server-side API is the first trusted service boundary for authentication and database connectivity. It is separate from the legacy console demonstration in `ShouTech.ERP.Core`.

## Configuration

Use environment variables or deployment configuration for production settings. Never commit production credentials.

SQLite:
- `Database__Provider=sqlite`
- `ConnectionStrings__Default=Data Source=/absolute/path/to/shoutech.db`

PostgreSQL:
- `Database__Provider=postgresql`
- `ConnectionStrings__Default=Host=localhost;Database=shoutech;Username=...;Password=...`

The database must already be provisioned with repository migrations. Readiness does not pass until the required core and authentication tables exist. The API does not seed demonstration users or apply migrations automatically.

Apply the matching authentication-hardening migration after the core migrations:
- SQLite: `dba/mig/sqlite/012_authentication_hardening.sql`
- PostgreSQL: `dba/mig/postgresql/014_authentication_hardening.sql`

The `users` table holds identity records; `user_credentials` holds an Argon2id encoded password hash. Credential creation requires a trusted administrative provisioning workflow. Never store plaintext passwords or client-generated hashes.

## Endpoints

- `GET /health/live`: process liveness.
- `GET /health/ready`: confirms database connectivity and required authentication tables.
- `POST /api/auth/login`: company-scoped password verification, failed-attempt lockout, session creation, and security event recording.
- `GET /api/auth/session`: validates a bearer token against an unexpired, unrevoked database session and active company/user.
- `POST /api/auth/logout`: revokes the current session.

Login JSON: `{"username":"...","password":"...","companyId":"..."}`.

Configure explicit CORS origins for the deployed frontend. Use HTTPS through a trusted hosting platform or reverse proxy in production.

## Scope boundary

This API slice implements authentication and connection/readiness. ERP write operations are not yet exposed through the API and the React context still contains local-state operations. Those operations must be migrated module by module before they can be represented as persistent.
