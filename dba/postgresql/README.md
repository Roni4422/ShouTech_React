# PostgreSQL SQL schema files

These files contain the additive module-level table definitions for ShouTech ERP. They are organized by business domain under `modules/` to allow schema review independently from migration-runner implementation.

## Module files

- `modules/crm.sql`
- `modules/sales.sql`
- `modules/purchasing.sql`
- `modules/inventory.sql`
- `modules/manufacturing.sql`
- `modules/finance.sql`
- `modules/hr.sql`
- `modules/projects.sql`
- `modules/service.sql`
- `modules/documents.sql`
- `modules/administration.sql`

The module set defines 217 module tables in total. These files assume the core `companies` table exists and are not standalone fresh-install scripts. Core company, authentication, accounting and existing commercial structures remain defined by the current base SQL in `../mig/postgresql/`.

These files are schema source artifacts, not a claim that a migration runner has applied them. Before migration work, reconcile canonical module SQL with the versioned migration sequence, check foreign-key coverage and uniqueness, and test against a disposable PostgreSQL database.

Runtime queries, validation, transaction orchestration and persistence belong in service/repository code. Do not place DDL in UI components or runtime service source files.
