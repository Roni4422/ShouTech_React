# ShouTech ERP — Main Window Navigation Specification

**Branch:** `work/enterprise-window-completion`  
**Specification owner:** Product/engineering  
**Source:** Main-window menu and ribbon requirements supplied by the project owner  
**Status:** Requirements baseline; not a claim that every command is implemented

## 1. Navigation contract

The main window must present a conventional ERP menu/ribbon organized by business task, not expose every internal component as a peer tab. Top-level areas are: File, Warehouses, Accounting, Vouchers, Invoices, POS, Orders, Customers, Sales Representatives, Manufacturing, Banks, Reports, Tools, Other Tools, View, Exit, and Help.

A command is considered implemented only when its click path reaches the correct screen/workflow and the workflow has validation, authorization, persistence, error handling, and audit behavior appropriate to its business impact. Opening a nearby module is not a valid substitute for a missing command. A toast message alone is not execution.

## 2. Existing destinations identified by static source inspection

The current `ActiveWindow` type and `renderWindowView` switch provide these destinations:

| Business area | Existing destination | Initial mapping |
|---|---|---|
| Dashboard | `dashboard` | Direct |
| Material cards / material master | `materials` | Direct, scope must be verified |
| Warehouses | `warehouses` | Direct |
| Chart of accounts | `coa` | Direct |
| Cost centers | `costCenters` | Direct |
| Currencies | `currencies` | Direct |
| Journal entries | `journals` | Direct; voucher types are not necessarily separate workflows |
| Cheques / securities | `cheques` | Direct, lifecycle coverage must be verified |
| Invoices | `invoices` | Direct; invoice subtypes must be verified |
| POS | `pos` | Direct |
| Orders | `orders` | Direct |
| Customers / CRM | `crm` | Direct, customer master vs CRM workflow must be distinguished |
| Sales representatives | `salesReps` | Direct |
| Manufacturing | `manufacturing` | Direct, individual cost variance/report commands need verification |
| Banks | `banks` | Direct |
| Financial statements | `closingAccounts` | Direct destination, statement correctness not implied |
| Financial analysis | `financialAnalysis` | Direct destination, AI must not be presented as authoritative accounting |
| Reports | `reports` | Direct destination, individual report coverage must be verified |
| Delivery | `delivery` | Direct |
| Backup | `backup` | Existing destination; backup/restore guarantees must be verified |
| Data exchange | `dataExchange` | Existing destination; import/export must be validated and persisted |
| User administration | `users` | Existing destination; client-side profiles are not production identity |
| Security | `securityCenter` | Existing destination; displayed status must reflect real providers |
| Tools/options | `tools`, `enterpriseOptions`, `settings` | Existing destinations; map commands only after checking their actual behavior |
| License/about | `license`, `about` | Existing destinations; license validity must be provider-backed |

These mappings identify available destinations only. They do not establish that each requested menu command already has its own implementation.

## 3. Required top-level menu structure

### File
- Open company/workspace
- New company or business record, according to context
- Import data
- Export data
- Import POS data
- Export POS data
- Import card/master record
- Exit application

### Warehouses
- Material card, item card, warehouse card, material groups
- Barcode generation, layout/design and printing
- Price lists, ending inventory, shortage list, stock transfer, stock adjustment
- Material tree/search, warehouse inventory, movement and movement chart
- Expiry, invoice aging where applicable, material profit, price history, service-material reports, statistics, dormant/fast-moving items, material comparison/list, movement by material/group, negative stock
- Customer/material cross-reference
- Serial-number report and controlled serial correction
- Branch materials, sales report, specification changes and material discounts

### Accounting
- Chart of accounts, cost-center card/account links/reports/material movement/trial balance
- Currency definition, exchange-rate bulletin, average rates and realized/unrealized exchange differences
- General ledger, customer statement, general journal, daily report, account movement chart/balance, branch account movement, trial balance
- Closing accounts: operating, trading and profit/loss
- Financial statements: balance sheet, income statement and cash flow
- Dormant accounts, receivables aging, collection ratios, account comparison and local/AI financial analysis

### Vouchers
- Journal, receipt, payment and daily cash journal
- Voucher-type definitions
- Installments and installment search
- Receivable/payable cheques, security definitions/search
- Payment-type definitions
- Voucher review/amendment with permission and audit restrictions

### Invoices
- General invoice, stock transfer, opening stock, stock receipt and stock issue
- Purchase and purchase-return invoices
- Sales and sales-return invoices, stock-count document and barcode printing
- Invoice definitions/search, cash sales, cash-register close, quotations/search, invoice profitability, packing list
- Compression/maintenance and reposting tools, gated by backup, reconciliation and audit controls

### POS
- POS terminals and definitions, terminal cash report, discounts, synchronization and POS reports
- Price/quantity/item removal actions only within a validated, permission-controlled active sale; changes must be auditable

### Orders
- Purchase/sales orders, order definitions, receipt/delivery from orders, order tracking, installments and search

### Customers
- Customer card, customer-specific prices/discounts, regions, customer targets/reports, search
- Due dates, customer payment allocation, due search, balances, account settlement, controlled edits, groups and reports

### Sales representatives
- Representative card/groups/targets and target reports
- Customer search, representative movement and collections
- Handheld devices and routes

### Manufacturing
- BOM/production templates, production process, finished-material/raw-material/overhead cost variances
- Finished material costs, feasibility, production search and controlled reposting

### Banks
- Bank definitions, estimated bank statement, bank reconciliation and balances

### Reports
- Statistics, material overview, customer overview and custom-report designer

### Tools
- Calculator, on-screen keyboard, options, maintenance assistant, backup, language (Arabic/English/French), password change, activity log, add-ons and AI assistant

### Other Tools
- Rounding policy, permissions and permission templates, custom fields, units of measure, payment methods, material specifications and delivery workflows (driver cards, rates, pickup requests/search and driver cash close)

### View
- Account/material/manufacturing/cost-center trees, information pane, payment-method definitions, company information and data export

### Exit
- Lock screen, switch company, exit application, and operating-system shutdown only where explicitly supported by the host and authorized

### Help
- Check for updates, update from file, help/manual, technical support, feedback, license renewal and about

## 4. Non-negotiable implementation rules

1. Do not wire unsupported commands to an unrelated screen merely to make them clickable.
2. Do not use success toasts for work that has not actually completed. Show success only after the underlying operation resolves successfully.
3. Disable or clearly mark commands that are not implemented; do not imply production readiness.
4. Posted accounting/inventory documents must not be hard-deleted or silently rewritten. Corrections use linked reversal/adjustment documents and preserve the audit trail.
5. Import, export, backup, restore, synchronization and reposting must report partial failures and must not claim atomicity unless implemented.
6. Any posting action must validate company, fiscal period, account/item/warehouse references, balanced journal totals, stock availability/costing rules, permissions and idempotency as applicable.
7. All user-facing text must use the existing translation mechanism and support Arabic RTL plus English/French LTR.
8. Keep the menu hierarchy separate from business services: navigation describes commands; services execute them; repositories/database migrations persist them.
9. The current browser `localStorage` state and client-side permission checks are not a trusted production persistence or authorization boundary.
10. Every command should eventually have traceability fields: menu ID, destination/view, use case/service, repository, schema/migration, permission, audit event, translation keys, validation and verification evidence.

## 5. Delivery sequence for this menu

1. Inventory every requested leaf command and classify it as **Verified**, **Partial**, **Missing** or **Not assessed** based on source and runtime evidence.
2. Build a typed navigation registry with stable command IDs, translation keys, destination IDs, permission keys and implementation status. Keep it separate from component rendering.
3. Refactor the main window into top-level menu tabs and context-sensitive ribbon groups using only validated mappings.
4. Implement leaf workflows in dependency order: master data → accounting and stock invariants → documents/posting → reports → import/export/backup/administration.
5. Add authorization, audit and bilingual/RTL behavior for each workflow end-to-end.
6. Verify the build and workflow tests when implementation scope is ready. Until then, do not mark a command Verified.

## 6. Current status

This file records the requested navigation scope and source-inspected destinations. It does not implement the listed leaf commands, does not certify accounting correctness, and has not been validated by a runtime build or UI test. The next engineering task is to create the command-by-command traceability inventory and replace misleading ribbon handlers before expanding the menu surface.
