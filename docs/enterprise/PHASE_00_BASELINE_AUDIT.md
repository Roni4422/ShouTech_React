# ShouTech ERP — Phase 0 Baseline Audit

**Repository:** `Roni4422/ShouTech_React`  
**Branch inspected:** `work/enterprise-window-completion`  
**Inspected HEAD:** `4f197d60cac012606ca1dbab318d18d6eff46124`  
**Audit type:** static source inspection of selected files and migration inventory  
**Runtime/build status:** not run as part of this audit  
**Purpose:** identify implementation blockers before making broader business-logic changes. This document is not a claim that the whole repository has been exhaustively audited.

## 1. High-priority findings

### P0 — Login UI does not verify the submitted password

In `src/components/LoginModal.tsx`, the form maintains a password field and marks it required, but `handleSubmit` calls `login(username)`. The password value is not passed to the login action. The corresponding context API in `src/context/AppContext.tsx` declares `login: (username: string) => boolean`.

**Impact:** the visible password field does not provide password authentication. The warning in the UI is appropriate, but the current login flow must not be described as production authentication.

**Required resolution:** introduce a real authentication boundary with password verification using an appropriate adaptive password hash, server-side session lifecycle, rate limiting/lockout enforced by the trusted service, and authorization checks outside client-controlled state. Do not add a client-side hard-coded password as a substitute. Until a trusted authentication service is implemented and wired end-to-end, retain an explicit non-production limitation.

### P0 — Security and licensing status are client-defined state

The initial `securityStatus` object in `src/context/AppContext.tsx` contains descriptive values for encryption mode, anti-tamper status, audit-chain integrity, license server status, hardware dongle, cloud backup and lease time. Those values are initialized in the browser and are not, by themselves, evidence that the named protections or integrations exist.

**Impact:** UI status can be mistaken for verified security controls.

**Required resolution:** each status must be derived from a real provider or explicitly labeled unavailable/not configured. Remove cryptographic, anti-tamper, hardware, license-server and cloud-backup claims unless they are backed by working implementations and verifiable outcomes. A client-side hash function must not be represented as SHA-256 or a tamper-proof audit chain.

### P0 — Browser storage is used as application persistence

The inspected `AppContext.tsx` initializes and persists companies, users, materials, warehouses, accounts, invoices, journals, stock movements, backups and cheques through `localStorage` (with differing levels of validation). Parties and cost centers are initialized from bundled data in the inspected code.

**Impact:** browser storage is user-editable, local to the browser profile, and not a shared transactional store. It cannot guarantee multi-user consistency, database transactions, tenant isolation, durable backup/restore or trusted audit history.

**Required resolution:** define the application persistence boundary and connect business actions to database-backed services. Preserve existing UI behavior where possible while replacing one bounded workflow at a time. Do not represent browser-local snapshots as database backups or cloud synchronization.

### P1 — Duplicate PostgreSQL module migrations

At the inspected HEAD, `dba/mig/postgresql/003_modules.sql` and `dba/mig/postgresql/004_modules.sql` have the same Git blob SHA (`708184c4c70c1ae08047e259b3149338e0795c80`) and identical file size. The duplicate numbering and content should be reconciled with the migration runner before any migration is renamed or removed.

**Impact:** duplicate migration execution may be harmless for some `IF NOT EXISTS` statements but obscures migration history and is unsafe to treat as a clean versioned migration plan.

**Required resolution:** inspect the migration runner and applied-migration ledger; determine whether either file has been applied in any deployed database. Never rewrite historical migrations blindly. If correction is needed, add a forward migration or update only an explicitly unreleased migration set.

### P1 — SQLite and PostgreSQL migration parity is not established

The inspected SQLite and PostgreSQL core/accounting migrations implement similarly named concepts with different types, constraints and identifiers. SQLite migration `009_accounting_periods_and_accounts.sql` contains `ALTER TABLE ... ADD COLUMN` statements without an existence guard. The PostgreSQL accounting migration uses `ADD COLUMN IF NOT EXISTS` for the journal period column. SQLite's migration also adds columns to fiscal years without an existence guard.

**Impact:** rerunning SQLite migrations can fail on duplicate columns; schema parity cannot be inferred from matching feature names.

**Required resolution:** inspect the migration executor, transaction behavior and migration ledger. Validate a clean install and upgrade path against both engines. For already-deployed schemas, prefer forward, versioned migrations over modifying applied migrations. SQLite and PostgreSQL must share equivalent business invariants even where SQL syntax differs.

### P1 — Company creation UI contains generated-looking business identifiers

The inspected `src/components/CompanyModal.tsx` initializes tax/VAT-like values using random numbers and pre-fills a city field with a string of example cities. These values are unsuitable as verified legal/company data.

**Impact:** a user may mistake generated values for real registration details.

**Required resolution:** use blank inputs for legal identifiers unless a jurisdiction-specific, validated source supplies them. Validate required fields and uniqueness, make country/jurisdiction explicit, and persist the selected fiscal period, currency, language, chart template and database configuration through the real company setup service. Do not silently imply that selecting a database type creates or connects a database.

## 2. Other architecture risks requiring traceability

- `src/types.ts` defines a broad `Company` shape, while SQL company schemas use their own fields. An explicit mapping and validation layer is needed; direct shape similarity is not enough.
- Seeded profiles in `src/data/initialData.ts` are bundled demonstration/bootstrap records, not a production identity directory. Their presence must not imply that these accounts have real credentials.
- The inspected SQL contains useful accounting structures and constraints, but the existence of journal tables and period triggers alone does not prove that all UI posting paths use them or that posting, stock effects and audit records are atomic.
- The migration tree contains many modules and permission records. A repository-wide inventory of every UI route, data action, migration and translation is still required before declaring Phase 0 complete.
- Existing posted financial documents must not be deleted to correct errors. Corrections should use linked reversals or adjustment documents with an audit trail.

## 3. Delivery order

1. Map every UI route to its component, action/service, persistence implementation, schema/migration, permission, audit event and verification evidence.
2. Identify the migration executor and database connection/repository implementations before changing SQL history.
3. Define the trusted persistence and authentication boundaries; distinguish implemented integrations from configuration labels.
4. Complete one bounded end-to-end workflow, including validation, transaction handling, error reporting, bilingual UI and permissions.
5. Reconcile SQLite/PostgreSQL schema invariants and provide a repeatable migration path.
6. Run build and focused verification when the implementation scope is ready; report actual commands and results without inferring success from source inspection.

## 4. Evidence labels

Use only these statuses in the ongoing backlog:

- **Verified:** supported by an executed, reproducible check or inspected working integration.
- **Partial:** some implementation exists, but an end-to-end acceptance criterion remains unmet.
- **Missing:** the required implementation is absent.
- **Not assessed:** insufficient inspection or evidence.

This audit's findings are based on static inspection of the files named above. No build, automated tests, live database migration, authentication integration or production deployment was executed for this document.
