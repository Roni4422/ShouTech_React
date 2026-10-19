# ShouTech ERP — Master Delivery Roadmap

**Repository:** `Roni4422/ShouTech_React`  
**Delivery branch:** `work/enterprise-window-completion`  
**Purpose:** turn the existing React/TypeScript application, SQL migrations, and C# prototypes into a coherent, secure, accounting-correct commercial ERP. This roadmap is a controlled backlog, not a claim that listed capabilities already work.

## 1. Product standard and competitor benchmark

Use Al-Ameen 10 and Phoenix 9 as functional comparison references, not as marketing claims. Build a documented feature-by-feature comparison from verified public product information, lawful hands-on evaluation where available, and our own acceptance tests. Do not copy proprietary implementation or claim superiority without evidence.

The target is to meet or exceed the following measurable qualities:
- Correct end-to-end business workflows, including exceptions and reversals.
- Trustworthy accounting, stock valuation, period controls, and reconciled reports.
- Consistent, responsive, keyboard-friendly Arabic/English UI with RTL/LTR support.
- Multi-company and multi-user operation with server-enforced permissions.
- Reliable SQLite/PostgreSQL support where each provider is explicitly supported.
- Traceable audit history, safe upgrades, backup/restore, and clear operational diagnostics.
- Predictable performance, accessibility, recovery, and maintainable modular code.

## 2. Current-state findings to validate

Static repository review identified risks; each must be verified against current code before implementation:
- The React UI, shared context, SQL migrations, and C# services do not yet demonstrate one integrated persistence/business layer.
- User profiles are currently cached in browser storage; this is not a trusted identity store. The login UI has no verified password authentication path.
- Some peripheral/security labels may imply capabilities that have no executable integration.
- The C# accounting/inventory/POS services contain in-memory seed data and do not establish a durable transactional accounting workflow.
- SQLite and PostgreSQL migration histories have overlapping names and potentially different constraints/triggers. In particular, period/posting rules need a parity review.
- Several module routes or views may be aliases, incomplete workflows, or local-only state.
- Audit helpers, backup encryption, dongle support, and other security claims must be checked against real implementations.
- Build and runtime health have not been established by this roadmap. Do not report them as passing until run.

## 3. Delivery phases and dependencies

### Phase 0 — Repository baseline and engineering controls
- Inventory every window key, ribbon action, view, type, context operation, service, SQL table, migration, permission, translation key, and C# project.
- Produce traceability matrices: UI → use case/service → persistence → schema → audit event → permission → tests.
- Reconcile migration order, duplicate/overlapping scripts, provider differences, and migration tracking.
- Establish error handling conventions, logging policy, environment/configuration rules, code ownership boundaries, and secure secret handling.
- Identify build blockers and baseline them; do not mix unrelated fixes.
**Exit:** every advertised module is classified as implemented, partial, simulated, or missing; database migrations have a documented execution order.

### Phase 1 — Architecture and durable data access
- Define typed domain models and service/repository boundaries; separate UI state from persisted business records.
- Implement provider adapters and transaction boundaries for SQLite and PostgreSQL, including migrations/version tracking.
- Establish company scoping, tenant isolation, parameterized queries, concurrency behavior, and consistent validation.
- Remove hardcoded financial/business values from production paths; isolate demo fixtures.
- Define ID generation, decimal precision, date/time policy, soft-delete rules, and UTC/local-date conversion.
**Exit:** core CRUD survives reload and is company-scoped; provider behavior and unsupported features are explicit.

### Phase 2 — Identity, access, and audit
- Implement trusted authentication with salted adaptive password hashing, password change/reset policy, lockout/rate limits, session expiry/revocation, and safe account recovery.
- Enforce authorization in backend/service boundaries; UI hiding is only a usability feature.
- Implement users, roles, permissions, role assignment, least privilege, company membership, and separation of duties.
- Protect the last active administrator and sensitive self-service changes.
- Add structured audit events for login, security, master-data changes, approvals, posting, reversal, backup/restore, and configuration; prevent routine users from altering audit history.
- Remove false hardware dongle, cryptographic, or zero-trust claims unless real integrations exist.
**Exit:** no unauthenticated default session; every protected operation has a server/service permission check and attributable audit record.

### Phase 3 — Company setup and accounting foundation
- Complete company profile, fiscal calendar, fiscal years/periods, base/foreign currencies, exchange rates, rounding policy, localization, and numbering sequences.
- Implement hierarchical chart of accounts, account types, control accounts, posting eligibility, dimensions/cost centers, and template import with validation.
- Build journal draft/edit/validate/post/reverse flows with balanced debits/credits, valid accounts, open periods, idempotency, and atomic persistence.
- Preserve posted history; correct posted entries using linked reversals/adjustments, never destructive edits.
- Add opening balances, period close/reopen authorization, year-end close, retained earnings, and controlled carry-forward.
**Exit:** journals cannot post unless balanced and valid; closed periods reject posting; ledger and trial balance reconcile.

### Phase 4 — Shared master data
- Customers, suppliers, contacts, addresses, payment terms, credit limits, tax IDs, and account mappings.
- Items/materials, categories, units and conversions, barcodes, price lists, tax categories, costing method, reorder levels, and inactive-item policy.
- Warehouses, locations, bins, stock ownership, and transfer routes.
- Banks, cash accounts, currencies, exchange rates, cost centers, sales representatives, and document numbering.
- Search, filters, duplicate prevention, import validation, audit trail, and deactivation rules.
**Exit:** shared master records are persisted once and reused consistently by all dependent modules.

### Phase 5 — Sales, purchasing, POS, and inventory
- Sales quotations → orders → delivery → invoice → receipt/collection; purchasing request/order → receipt → supplier invoice → payment.
- Credit/debit notes, sales/purchase returns, cancellations, partial fulfilment, backorders, discounts, taxes, multiple payment methods, and customer/supplier balances.
- POS shifts, cash opening/closing, cash movements, suspended sales, receipt reprint, refunds through reversal documents, and offline behavior only if designed safely.
- Stock receipts/issues/transfers/counts/adjustments, reservation/availability, serial/batch/expiry tracking where required, negative-stock policy, and movement ledger.
- FIFO/weighted-average costing must be implemented consistently, including returns and backdated movements; do not advertise unsupported costing methods.
- Commit document, stock movement, receivable/payable, tax, and ledger effects atomically or through a durable outbox/reconciliation design.
**Exit:** every posted document has traceable inventory and accounting effects; retries cannot duplicate postings; stock valuation reconciles with the general ledger.

### Phase 6 — Receivables, payables, banking, and treasury
- Customer receipts, supplier payments, allocations, prepayments, advances, aging, credit control, and settlement differences.
- Bank/cash receipts and payments, transfers, cheque lifecycle, deposits, collection/return, reconciliation, and bank statement import.
- Realized/unrealized FX differences with documented rules and posting.
- Cash flow, liquidity, due-date reminders, and approval thresholds.
**Exit:** subledgers reconcile to control accounts; allocations and bank reconciliation are auditable and repeatable.

### Phase 7 — Reporting and close controls
- General ledger, journal listing, trial balance, balance sheet, profit/loss, cash flow, account statements, AR/AP aging, tax summaries, sales/purchase analysis, stock movement and valuation.
- Date/company/branch/warehouse/currency filters, drill-down to source documents, print layouts, export, and bilingual labels.
- Period-end checklist, reconciliation exceptions, closing controls, and locked-period reporting.
- Define each report’s calculation, sign convention, date basis, currency basis, and source tables.
**Exit:** reports reconcile to posted source transactions and include reproducible filters and traceable drill-down.

### Phase 8 — CRM, orders, delivery, manufacturing, and operations
- Leads, opportunities, contacts, activities, follow-ups, customer history, and conversion to sales.
- Sales representatives, commission rules, order fulfilment, delivery planning, proof of delivery, and returns.
- BOMs, routings, work orders, material consumption, output, scrap, work-in-progress, and production costing.
- Quality checks, lot traceability, and recall workflows where applicable.
**Exit:** each enabled workflow has real state transitions, stock/cost consequences, permissions, and audit events—not just a screen.

### Phase 9 — HR, payroll, fixed assets, tax, approvals, and licensing
- HR: departments, employee records, attendance, leave, contracts, payroll calculations, payslips, and payroll posting.
- Fixed assets: acquisition, capitalization, depreciation schedules, disposal, impairment/adjustment, and asset-to-ledger reconciliation.
- Tax: configurable tax codes/rates/effective dates, recoverable/payable tax accounts, reporting, and jurisdiction-specific compliance only after requirements are confirmed.
- Workflow: approval rules, thresholds, delegation, segregation of duties, escalation, rejection reasons, and immutable decisions.
- Dedicated license/status administration with real validation; do not claim hardware binding or online activation without a working provider.
**Exit:** each module is schema-backed, permission-controlled, auditable, and integrated with accounting where applicable. Confirm jurisdictional/legal requirements before production payroll/tax claims.

### Phase 10 — Import/export, backup, recovery, and administration
- CSV/XLSX import with mapping, preview, field validation, duplicate policy, rejected-row report, transaction safety, and audit history.
- Export with permission checks, encoding/locale support, and sensitive-data controls.
- Consistent backup/restore of database plus required attachments/configuration; encryption and key management only when genuinely implemented.
- Validate backup integrity, version compatibility, restore into an isolated target, and recovery-point/recovery-time objectives.
- Distinguish local files from remote/cloud storage; never label browser state as a server backup.
- System settings, notification outbox, diagnostics, retention policies, and maintenance tasks.
**Exit:** a documented restore drill succeeds on supported environments; exports/imports are reproducible and errors are reported per row.

### Phase 11 — UX, localization, accessibility, and performance
- Establish shared design tokens and reusable ERP controls: data grid, forms, dialogs, date/currency/number inputs, validation, status badges, filters, pagination, and command toolbar.
- Provide consistent keyboard shortcuts, focus management, loading/empty/error states, confirmations, and undo/reversal paths where safe.
- Verify Arabic/English translations, RTL/LTR mirroring, mixed text, date/number/currency formatting, and print layouts.
- Meet accessibility basics: labels, keyboard operation, contrast, semantic structure, and screen-reader feedback.
- Profile large grids, reports, search, and startup; add pagination/indexes/caching only where measured.
**Exit:** workflows are consistent, responsive, accessible, and usable without misleading controls.

### Phase 12 — Verification, deployment, and release readiness
- TypeScript/build/lint; unit tests for domain rules; integration tests for each supported database; migration upgrade tests on representative existing data.
- End-to-end tests for login, permissions, company isolation, sales/purchase posting, reversals, stock costing, period close, import/export, backup/restore, and failure/retry paths.
- Accounting invariants: balanced journals, subledger-to-GL reconciliation, stock movement-to-valuation reconciliation, tax reconciliation, and no duplicate posting.
- Security checks for authorization bypass, injection, secrets, unsafe exports, session handling, and audit tampering.
- Performance and recovery tests against stated targets; do not invent targets or results.
- Reproducible packaging, environment setup, migration/rollback guidance, release notes, and backup-before-upgrade procedure.
**Exit:** release gates pass with recorded logs and environment details; known limitations are documented and accepted.

## 4. Required module delivery checklist

Every module must include:
1. Scope and user stories, including invalid and exceptional cases.
2. Data model, constraints, migrations, indexes, and SQLite/PostgreSQL mapping.
3. Service/use-case layer with transaction and idempotency strategy.
4. UI list/detail/create/edit/status workflow, search, filtering, validation, and localized messages.
5. Permission matrix and audit events.
6. Related document/accounting/inventory integrations.
7. Error/loading/empty states and operational diagnostics.
8. Tests or a clear statement of what could not be tested.
9. Documentation and accurate implementation-status reporting.

## 5. Priority and sequencing rules

- Work in the phase order above unless a blocking defect requires earlier action.
- Fix critical accounting/security/data-loss defects before adding breadth.
- Complete one scoped workflow end-to-end; do not scatter superficial changes across many modules.
- Never add duplicate tables before reconciling existing migrations and legacy schemas.
- Never delete posted accounting documents or silently migrate/drop business data.
- Avoid parallel edits to the same file and verify the current branch HEAD before every write batch.
- Keep commits small, review diffs, and commit only to the working branch unless explicitly authorized otherwise.

## 6. Competitive scorecard

Maintain a separate evidence-backed matrix for ShouTech, Al-Ameen 10, and Phoenix 9 covering: accounting/period close; sales/purchase; inventory/costing; POS; cash/banks/cheques; CRM; manufacturing; HR/payroll; fixed assets; taxes; approvals; reporting; multi-company; permissions/audit; Arabic/English; import/export; backup/restore; integrations; usability; performance; deployment/support.

For each capability record: verified evidence/source, workflow coverage, exception handling, accounting impact, usability, and test result. Use **Verified / Partial / Missing / Not assessed**; never infer competitor capabilities from product names or make unsupported superiority claims.

## 7. Status reporting

At the end of each phase report:
- Implemented files and actual behavior.
- Database changes and migration compatibility.
- Confirmed commit SHA and branch.
- Checks actually executed and their results.
- Checks not run, infrastructure unavailable, known risks, and next scoped phase.

**Definition of done:** working end-to-end behavior, durable persistence, correct accounting, enforced security, bilingual usable UI, audited failures and changes, safe migrations, reviewed diff, and honest verification. A design document or screen alone is not completion.
