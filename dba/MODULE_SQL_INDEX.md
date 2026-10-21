# ShouTech ERP module SQL index

## Purpose

This index points to the domain-organized SQL schema files prepared for review before migration-runner integration. SQLite and PostgreSQL each have one SQL file per domain.

| Domain | SQLite | PostgreSQL | Tables |
|---|---|---|---:|
| CRM | [crm.sql](sqlite/modules/crm.sql) | [crm.sql](postgresql/modules/crm.sql) | 15 |
| Sales | [sales.sql](sqlite/modules/sales.sql) | [sales.sql](postgresql/modules/sales.sql) | 18 |
| Purchasing | [purchasing.sql](sqlite/modules/purchasing.sql) | [purchasing.sql](postgresql/modules/purchasing.sql) | 16 |
| Inventory | [inventory.sql](sqlite/modules/inventory.sql) | [inventory.sql](postgresql/modules/inventory.sql) | 18 |
| Manufacturing | [manufacturing.sql](sqlite/modules/manufacturing.sql) | [manufacturing.sql](postgresql/modules/manufacturing.sql) | 16 |
| Finance | [finance.sql](sqlite/modules/finance.sql) | [finance.sql](postgresql/modules/finance.sql) | 30 |
| Human resources | [hr.sql](sqlite/modules/hr.sql) | [hr.sql](postgresql/modules/hr.sql) | 28 |
| Projects | [projects.sql](sqlite/modules/projects.sql) | [projects.sql](postgresql/modules/projects.sql) | 15 |
| Service management | [service.sql](sqlite/modules/service.sql) | [service.sql](postgresql/modules/service.sql) | 13 |
| Document management | [documents.sql](sqlite/modules/documents.sql) | [documents.sql](postgresql/modules/documents.sql) | 18 |
| Administration | [administration.sql](sqlite/modules/administration.sql) | [administration.sql](postgresql/modules/administration.sql) | 30 |
| **Total** | | | **217** |

## Scope and caveats

- This is the module expansion only; it does not replace core SQL for companies, users, roles, fiscal periods, chart of accounts, journal entries, payments, or existing commercial documents.
- Every module table is company-scoped and has a reference to `companies(company_id)`.
- The current definitions are an initial canonical schema draft. Some domain-specific relationships and lifecycle constraints require a detailed pass against the actual Ribbon commands and service contracts before production use.
- The SQL files have not yet been executed against real SQLite or PostgreSQL instances. No migration or runtime integration success is implied.
- Before migrations are finalized, perform table-by-table review of foreign keys, unique keys, check constraints, deletion rules, numeric precision, audit requirements, and cross-company isolation.
- Design references: [ERPNext](https://github.com/frappe/erpnext), [ERPNext accounting introduction](https://docs.frappe.io/erpnext/accounting-introduction), [Dolibarr](https://github.com/Dolibarr/dolibarr).
