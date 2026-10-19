# ShouTech ERP — Enterprise Window and Data-Consistency Gap Audit

**Baseline:** `main` at `ce7e4368545eb0914d28d5d1b11a9380c1668465`  
**Working branch:** `work/enterprise-window-completion`  
**Purpose:** establish a source-grounded implementation queue before changing business behavior.

## 1. Current UI routing inventory

The current `ActiveWindow` union in `src/types.ts` contains 30 window keys. `src/App.tsx` routes most keys to a view, but several keys intentionally alias to another view:

- `dataExchange` → `BackupView`
- `users` → `SettingsView`
- `license` → `AboutView`

These aliases are not equivalent to dedicated, complete workflows. User administration, licensing, and data exchange must be assessed for whether their own lifecycle, validation, permissions, and persistence are actually implemented.

Existing view files include dashboard, POS, invoices, materials, warehouses, chart of accounts, cost centers, currencies, journals, cheques, closing accounts, financial analysis, orders, CRM, sales representatives, manufacturing, banks, reports, security, tools, enterprise options, delivery, backup, settings, and about.

## 2. High-priority completion candidates

The repository's database catalog and business scope describe modules that do not currently have dedicated first-class views/routes in the UI:

1. **Human Resources** — employees, departments, attendance, leave, payroll and payroll posting.
2. **Fixed Assets** — asset register, acquisition, depreciation schedules/posting, disposal and audit trail.
3. **Tax management** — tax codes/rates, effective dates, tax accounts, tax return summaries and reconciliation.
4. **Approvals/workflow** — approval rules, pending approvals, segregation of duties and immutable decision history.
5. **Dedicated user administration** — distinct from general application settings.
6. **Dedicated license administration/status** — distinct from the About screen.
7. **Data exchange/import-export** — validation preview, mapping, duplicate policy, rejected-row report and audit history.

These are candidate gaps, not permission to invent database tables: implementation must first reconcile them against existing migrations and types to avoid duplicating schema.

## 3. Cross-cutting integrity risks requiring code-level review

- Several screens keep business records in component-local state rather than using the shared application context; changes may not survive navigation or be visible in related modules.
- `EnterpriseToolsOptionsView` contains simulated peripheral operations and a save handler that displays a success toast claiming database persistence. A UI toast is not evidence of a real device connection or durable save.
- The application context's audit hash helper is explicitly named `pseudoSha256`; it must not be represented as cryptographic SHA-256 or tamper-proof evidence.
- The README advertises AES-256 encrypted backups, Argon2id, hardware-dongle checks and other capabilities. Each claim needs verification against executable implementation; descriptive UI text alone is not proof.
- Database migration sets have numbered overlaps/duplicate-looking migration names (for example PostgreSQL `003_modules.sql` and `004_modules.sql` share the same reported content hash). Migration order and idempotency need reconciliation before schema expansion.
- UI models, shared TypeScript interfaces, SQLite schema, PostgreSQL schema, and C# service contracts need a field-by-field mapping; matching labels alone are insufficient.

## 4. Delivery order

1. Complete an inventory of every navigation entry, view, context action, TypeScript entity, C# service, and database table.
2. Implement missing first-class modules in dependency order, beginning with HR/employee master data only after checking the existing schema; follow with approvals, fixed assets, tax, dedicated user/license workflows and data exchange.
3. For every module, wire list/detail/create/edit/deactivate flows to shared state/service boundaries; include search, filtering, validation, permissions, localization/RTL, audit events and meaningful empty/error/loading states.
4. Reconcile SQLite and PostgreSQL migrations and map UI/service fields to schema fields; remove claims of successful persistence/device operations where no real operation occurs.
5. Run the requested consolidated build, static checks, migration checks and end-to-end validation after implementation stages are complete. Do not report checks as passed until actually run.

## 5. Scope and limitations of this audit

This document is an initial static inventory from repository source and metadata. It is not a claim that the full application has been executed, that every schema object has been inspected, or that any build/runtime/database tests passed. Each candidate gap must be confirmed against navigation, services and migrations before implementation.
