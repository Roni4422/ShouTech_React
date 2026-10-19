# ShouTech ERP database schema catalog

## Design references

This schema borrows concepts, not source code, from ERPNext and Dolibarr:
- ERPNext separates source documents from General Ledger entries and uses a Payment Ledger for allocations. Stock transactions create Stock Ledger entries. See https://docs.frappe.io/erpnext/accounting-introduction and https://github.com/frappe/erpnext/tree/develop/erpnext/accounts.
- Dolibarr documents table definitions separately from keys and indexes and covers third parties, sales/purchases, stock, POS, manufacturing, accounting and reporting. See https://github.com/Dolibarr/dolibarr and https://wiki.dolibarr.org/index.php/Language_and_development_rules.

The migration files in this repository are authoritative for the current database schema. This catalog describes intended responsibilities; a table existing does not mean a UI or service is already integrated with it.

## Migration files

| Database | Migration | Responsibility |
|---|---|---|
| PostgreSQL | `001_core.sql` | Companies, units, products, journal headers/lines, initial stock ledger structures |
| PostgreSQL | `002_security.sql` | Security-related structures |
| PostgreSQL | `003_modules.sql` and legacy `004_modules.sql` | CRM, HR, POS, manufacturing, AI and audit module tables |
| PostgreSQL | `005_roles.sql`, `006_permissions.sql` | Role/permission model |
| PostgreSQL | `007_inventory_indexes.sql`, `009_accounting_indexes.sql` | Query indexes |
| PostgreSQL | `008_outbound_messages.sql` | Outbound message queue |
| PostgreSQL | `010_journal_reversals.sql` | Reversal metadata and controls |
| PostgreSQL | `011_accounting_periods_and_accounts.sql` | Chart of accounts, fiscal years/periods and posting-period guards |
| PostgreSQL | `012_commercial_operations.sql` | Commercial documents, parties, warehouses, currencies/taxes, payments, stock ledger, bank/cheques, POS, orders, settings and audit |
| SQLite | `001_sqlite_core.sql` | Companies, users, products, journals and initial stock tables |
| SQLite | `002_rbac.sql` through `008_journal_reversals.sql` | RBAC, indexes, outbound messages and journal reversal controls |
| SQLite | `009_accounting_periods_and_accounts.sql` | Chart of accounts and fiscal years/periods |
| SQLite | `010_commercial_operations.sql` | Commercial operations equivalent to PostgreSQL migration 012 |

**Migration-history caution:** the repository contains both PostgreSQL `003_modules.sql` and `004_modules.sql` with the same content/numbering pattern. They use `IF NOT EXISTS`, but migration runners must still use stable unique migration IDs and must not infer identity from the numeric prefix alone. Do not edit already-applied migrations to repair history; add a new migration and reconcile history deliberately.

## Window-to-data map

| ERP window / capability | Main tables | Required service behavior |
|---|---|---|
| Company and company settings | `companies`, `company_currencies`, `application_settings`, `fiscal_years`, `fiscal_periods` | Tenant-scoped configuration; only one base currency; validate period ranges and lock closed periods |
| Users and security | `users`, `roles`, `permissions`, `user_roles`, `role_permissions` | Server-side authentication/authorization; never trust browser-only role flags |
| Materials / product cards | `products`, `product_categories`, `units_of_measure` | Unique company-scoped code; validate unit, category, pricing and soft deletion |
| Warehouses | `warehouses`, `stock_balances`, `stock_ledger_entries` | One default warehouse per company; derive balances from ledger or reconcile cached balances |
| Customers and suppliers / CRM | `business_parties`, existing `crm.business_partners` | Normalize customer/supplier roles, tax identity and credit terms; avoid creating duplicate identities between modules |
| Sales and purchase invoices / returns | `commercial_documents`, `commercial_document_lines` | Draft/edit before posting; posting must create accounting and stock effects atomically; posted documents are reversed, not erased |
| Sales and purchase orders | `commercial_orders`, `commercial_order_lines` | Enforce quantity fulfillment and document state transitions |
| POS | `pos_sessions`, `pos_transactions`, `pos_transaction_payments`, `commercial_documents` | Require an open session; reconcile tender totals; sale posting and inventory/accounting effects share a transaction |
| Receipts, disbursements and allocation | `payments`, `payment_allocations` | Validate allocations do not exceed payment/document balances; link posted payments to journal entries |
| General ledger / journal entry | `journal_entries`, `journal_entry_lines`, `journal_audit_events`, `chart_of_accounts` | Debits equal credits; only active postable accounts; open fiscal period; preserve original posted entries |
| Stock transfers and movements | `stock_ledger_entries`, legacy `stock_movements`, `stock_balances` | Append-only signed quantity changes, source-document idempotency, negative-stock policy and valuation rules |
| Currencies and taxes | `currencies`, `company_currencies`, `tax_codes` | Explicit currency precision and exchange rate; tax rates and rounding are company-configured, not hard-coded |
| Banks and cheques | `bank_accounts`, `cheques`, `payments` | Track due/cleared/bounced state and protect sensitive account details |
| Cost centers | `cost_centers` and journal line dimensions | Validate company ownership and reporting dimensions |
| Reports | Posted documents, journal lines, payment allocations and stock ledger | Reports read persisted posted facts; never use seed data or UI-only state as financial truth |
| Audit / recycle and compliance | `audit_events`, journal audit events and reversal metadata | Append actor, timestamp, reason and entity reference; audit events are not a substitute for authorization |
| Manufacturing | Existing `mfg.boms`, `mfg.bom_lines`, `mfg.work_orders`, `mfg.quality_results` | Consume components and produce finished goods through stock-ledger entries; costing must be explicit |
| AI / analytics | Existing `ai.models`, `ai.predictions` | Treat predictions as advisory records; never silently post transactions from model output |

## Integrity rules

1. Every business row belongs to a company where applicable; all service queries must include the active company scope.
2. Use parameterized SQL and a single transaction for each posting workflow.
3. A posted financial document must reference its journal entry. The journal must contain at least two lines and balanced, non-zero debit and credit totals.
4. A posted stock-affecting document must write stock-ledger entries in the same database transaction. Corrections use compensating entries.
5. Posted invoices, payments and journals must not be physically deleted. Use reversal/cancellation state and preserve the original record and reason.
6. Never store plaintext passwords, API keys, bank credentials or encryption keys in these tables. Secret setting values require encryption at the service boundary and keys outside the database.
7. Do not treat browser `localStorage` as a production database, authorization boundary, durable audit log, or encrypted backup.
8. Numeric quantities use up to six decimal places; monetary amounts use explicit precision and company/currency-aware rounding.
9. Use foreign keys, unique constraints, check constraints and indexes in the database, then repeat user-friendly validation in services.
10. Apply migrations through the migration runner and record unique migration IDs/checksums. Do not report a migration as production-verified until it has been applied to both supported engines.

## Implementation status

The migrations define a more complete schema, but the React context and C# console services are not yet a production API/database adapter. UI wiring, service endpoints, transaction orchestration, permissions and migration execution must be implemented and verified before the affected windows can be described as database-backed.
