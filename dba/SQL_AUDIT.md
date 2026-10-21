# SQL audit and expansion plan

## Status

The current 217-table module set is a first-pass draft, not an enterprise-ready relational model. Do not apply it to production or treat its table count as a completion metric.

## Findings from file review

- Several unrelated entities share the same generic columns (for example, CRM leads and opportunities have nearly identical shapes).
- Detail tables use `parent_id` without a foreign key to their actual header table. This permits orphaned lines and does not enforce same-company parent ownership.
- Some detail rows carry generic item and amount columns even where the domain needs different attributes. This weakens validation and makes UI/API contracts ambiguous.
- Many business tables lack explicit lifecycle checks, document-number uniqueness, posting/approval metadata, and domain-specific foreign keys.
- A company foreign key alone does not ensure that a referenced customer, warehouse, account, product, employee, or parent document belongs to the same company.
- Generic `attributes_json` must not replace typed columns for fields used in validation, reporting, joins, posting, or stock calculations.
- SQLite and PostgreSQL definitions need to be compared for equivalent constraints, indexes, deletion rules, precision, and semantics before they become a supported schema contract.

## Reference projects reviewed

- ERPNext: https://github.com/frappe/erpnext
- Dolibarr: https://github.com/Dolibarr/dolibarr
- Tryton: https://github.com/tryton/tryton
- Atlas ERP architecture reference: https://github.com/Taha-Mahmoodi/atlas-erp

Use these as design references only. Do not copy code or assume their database engines and licenses are interchangeable with this project.

## Required schema quality gates

1. Every document aggregate has a typed header and detail tables with explicit foreign keys, line numbering, tenant-safe relationships, and appropriate delete rules.
2. Every company-owned unique key includes `company_id`; document numbers are unique within their company and document type.
3. Quantities, prices, tax, discounts, exchange rates, and totals have deliberate precision and non-negative or range checks where valid.
4. Posted accounting and stock ledgers are append-only; corrections use reversal/adjustment records, not destructive edits.
5. Inventory movements identify item, warehouse, location/bin where applicable, quantity, unit, source document, and posting timestamp. Serial and lot tracking are separate linked records.
6. Financial posting supports balanced debit/credit lines, fiscal-period locks, currencies, exchange rates, cost centers, dimensions, and idempotent posting.
7. Approval steps, audit events, attachments, document numbering, integration outbox/inbox, and idempotency are modeled explicitly.
8. Each SQL file uses a short, stable lowercase name, such as `crm.sql`, `sales.sql`, `inv.sql`, `buy.sql`, `fin.sql`, `hr.sql`, `mfg.sql`, `qa.sql`, `ast.sql`, `tax.sql`, and `int.sql`. Avoid long or ambiguous filenames.
9. The SQLite and PostgreSQL schemas must pass fresh-database execution, repeat execution where supported, foreign-key checks, constraint tests, and parity checks before migration integration.

## Additional domains to assess against Ribbon workflows

- Quality inspection and nonconformance (`qa.sql`)
- Fixed assets, depreciation, transfers, and disposal (`ast.sql`)
- Tax reporting and electronic invoicing (`tax.sql`)
- Shipping, carrier labels, packages, and delivery tracking (`ship.sql`)
- Warehouse locations, picking, packing, replenishment, and cycle counts (`wh.sql`)
- Landed costs and supplier price agreements (`cost.sql`)
- Treasury, bank statement imports, reconciliation rules, and cash forecasts (`cash.sql`)
- Intercompany trading and eliminations (`ic.sql`)
- Maintenance plans, equipment, spare parts, and work orders (`maint.sql`)
- Retail POS and cash sessions (`pos.sql`)
- Data import/export jobs, integration endpoints, webhooks, retries, and dead-letter handling (`int.sql`)
- Document versions, retention policies, e-signature metadata, and legal holds (`doc.sql')
- Analytics definitions and saved report layouts; derived totals should be calculated from source ledgers rather than maintained as competing truth (`bi.sql`)

## Sequencing

Complete and review the domain SQL source files first, as requested. Do not expand or finalize migrations until the relational model is reviewed and the SQL files execute successfully on both supported engines. Then reconcile the canonical domain SQL with the migration chain; never blindly run both overlapping definitions.

## Completed review slice: sales SQL

Updated `dba/sqlite/modules/sales.sql` and `dba/postgresql/modules/sales.sql` in the working branch:

- Added company-scoped composite candidate keys to the seven parent entities used by sales detail tables.
- Added composite foreign keys from quotation, order, shipment, return, price-list, target, and route-stop lines to their parent records, including company identity to prevent cross-company parent links.
- Added positive line-number checks, non-negative quantity/unit-price/discount checks, and positive exchange-rate checks where those fields exist.
- Added company-scoped unique indexes for non-null document numbers on quotation, order, shipment, return, promotion, and target documents.
- Verified by source inspection that both SQL files define the same 18 table names, contain seven parent foreign keys and no Arabic-script characters.

These are static source checks only. The SQL has not yet been executed against SQLite or PostgreSQL; existing databases created from an earlier draft would also need a deliberate migration plan because `CREATE TABLE IF NOT EXISTS` does not retrofit changed constraints.
