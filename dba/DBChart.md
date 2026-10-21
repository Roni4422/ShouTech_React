# ShouTech ERP — Database Map

The current database is described by versioned migrations and domain-organized SQL schema files. The canonical module SQL review set is indexed in [MODULE_SQL_INDEX.md](MODULE_SQL_INDEX.md); these module files have not yet been reconciled into a single authoritative migration source. See [SCHEMA_CATALOG.md](SCHEMA_CATALOG.md) for window-to-table mapping, integrity requirements, reference projects and implementation status.

## Supported engines

- **SQLite migrations**: `dba/mig/sqlite/`
- **PostgreSQL migrations**: `dba/mig/postgresql/`
- **SQLite domain SQL**: `dba/sqlite/modules/`
- **PostgreSQL domain SQL**: `dba/postgresql/modules/`

The domain SQL contains 217 additional module table definitions per engine, split into CRM, sales, purchasing, inventory, manufacturing, finance, HR, projects, service, document management and administration. These files depend on the existing core `companies` table and are not standalone fresh-install scripts. Review and reconcile them before treating either set as authoritative.

Keep schema definitions in `dba`. Runtime SQL, transaction orchestration, validation and persistence adapters belong in service/repository code, not in UI components.

## PostgreSQL migration sequence

| File | Responsibility |
|---|---|
| `001_core.sql` | Company, unit, product, journal and initial inventory tables |
| `002_security.sql` | Users, roles, permissions and company access |
| `003_modules.sql` | CRM, HR, POS, manufacturing, AI and audit schemas |
| `004_modules.sql` | Legacy duplicate module migration; reconcile migration identity before relying on sequence numbers |
| `005_roles.sql` | Role seed/structure |
| `006_permissions.sql` | Permission seed/structure |
| `007_inventory_indexes.sql` | Inventory indexes |
| `008_outbound_messages.sql` | Durable outbound message queue |
| `009_accounting_indexes.sql` | Accounting indexes |
| `010_journal_reversals.sql` | Journal reversal support |
| `011_accounting_periods_and_accounts.sql` | Chart of accounts and fiscal-period controls |
| `012_commercial_operations.sql` | Parties, warehouses, currencies, tax codes, commercial documents, payments/allocations, stock ledger, banks, cheques, POS, orders, settings and audit |
| `013_tenant_integrity.sql` | Database-level same-company guards for commercial, inventory, POS, allocation and bank-account references |

## SQLite migration sequence

| File | Responsibility |
|---|---|
| `001_sqlite_core.sql` | Company, users, units, products, journals and initial inventory tables |
| `002_rbac.sql` | Permission baseline |
| `003_roles.sql` | Roles |
| `004_permissions.sql` | Permissions |
| `005_inventory_indexes.sql` | Inventory indexes |
| `006_outbound_messages.sql` | Durable outbound message queue |
| `007_accounting_indexes.sql` | Accounting indexes |
| `008_journal_reversals.sql` | Journal reversal support |
| `009_accounting_periods_and_accounts.sql` | Chart of accounts and fiscal-period controls |
| `010_commercial_operations.sql` | Commercial operations tables and currency baseline |
| `011_tenant_integrity.sql` | Database-level same-company guards and payment-allocation caps |

## Domain overview

- `companies`, `company_currencies`, `application_settings`, `fiscal_years`, `fiscal_periods`: company setup and accounting periods.
- `products`, `product_categories`, `units_of_measure`, `warehouses`, `stock_balances`, `stock_ledger_entries`: product master and inventory.
- `business_parties`: common customer/supplier identity; existing `crm.business_partners` is a legacy module model and must be reconciled through a deliberate data migration before both are edited independently.
- `commercial_documents`, `commercial_document_lines`: invoices, returns, quotations and credit/debit notes.
- `commercial_orders`, `commercial_order_lines`: sales and purchase orders.
- `payments`, `payment_allocations`, `bank_accounts`, `cheques`: receipts, disbursements, settlement and cheque tracking.
- `journal_entries`, `journal_entry_lines`, `chart_of_accounts`, `journal_audit_events`: double-entry accounting.
- `pos_sessions`, `pos_transactions`, `pos_transaction_payments`: POS sessions and tender details.
- `cost_centers`, `tax_codes`, `currencies`, `company_currencies`: accounting dimensions and statutory configuration.
- `audit_events`, `outbound_messages`: audit trail and reliable outbound delivery.
- `crm`, `hr`, `mfg`, `ai`, `mst`, `audit`: existing PostgreSQL module schemas; verify parity before exposing a module as supported in SQLite.

## Critical implementation rules

1. Never change a posted journal/invoice/payment or stock ledger fact in place. Reverse with a linked compensating record and reason.
2. Posting must happen inside a single database transaction: validate document, validate company and open period, create balanced journal entries, write stock-ledger facts if needed, update cached balances and mark the source document posted.
3. A source document must be idempotently postable. Repeated requests must not duplicate journal or stock-ledger entries.
4. Tenant isolation must be enforced in service queries and authorization; a company ID from the browser is not authorization.
5. Secret settings and bank account identifiers require encryption at the service boundary; never store plaintext credentials or encryption keys in the database.
6. Do not treat browser `localStorage` as a production persistence layer.
7. Migration IDs must be unique and stored with checksums. The duplicate PostgreSQL module migrations need migration-history reconciliation; do not edit historical migrations already applied to customer databases.
8. Migrations `011_tenant_integrity.sql` (SQLite) and `013_tenant_integrity.sql` (PostgreSQL) add defense-in-depth tenant checks for commercial documents/lines, payments/allocations, stock entries, POS transactions, orders and bank GL links. These guards do not replace service authorization, and they do not yet cover every legacy module table.\n9. The new migrations are schema work, not proof that React screens or C# services are connected. These tenant-integrity migrations have not yet been executed against real SQLite/PostgreSQL instances; verify fresh install, upgrade path, cross-company rejection, and allocation edge cases before production rollout.
