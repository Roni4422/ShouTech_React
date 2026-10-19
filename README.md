# ShouTech ERP (React Application)

**ShouTech Enterprise Management System — Commercial ERP Web Platform (v10.6.0)**

Rewritten from the desktop .NET WPF application into a modern, responsive React + TypeScript Single-Page Application (SPA) with Vite and Tailwind CSS, preserving the complete business logic, chart of accounts, multi-warehouse inventory, invoicing, point of sale, and multilingual interface.

---

## 🌟 Key Features

1. **Executive Dashboard (`DashVw`)**
   - KPI metrics: Total Sales, Purchases, Inventory Value, and Cash/Bank Liquidity.
   - Low-stock reorder warnings and recent invoice activity streams.

2. **Point of Sale (POS Terminal)**
   - Real-time barcode scanning with auto-focus (`F2`).
   - Quick-pick items catalog with retail and wholesale pricing.
   - Hotkeys: `F2` focus barcode, `F12` checkout & print receipt, `Esc` clear cart.
   - Multiple payment methods: Cash, Credit, K-Net, Visa.
   - Instant 15% VAT calculation and printable electronic simplified thermal tax receipt.

3. **Multi-Warehouse Inventory & Material Cards**
   - **Material Cards (`MatCard`)**: Item codes, primary & secondary barcodes, Arabic & English names, categories, default warehouse, multi-unit conversions (piece, box, pallet), pricing tiers (Retail, Wholesale, Special, Minimum), costing methods (Weighted Average, FIFO, LIFO, Standard), and stock threshold limits.
   - **Warehouse Management (`WhsWin`)**: Warehouse cards with aisle/rack/shelf locations, default flags, and an inter-warehouse stock transfer workflow with stock validation.

4. **Accounting & General Ledger (`CoaWin` & `JrnWin`)**
   - **Chart of Accounts**: Multi-level hierarchical tree covering Assets, Liabilities, Equity, Revenue, and Expenses with parent-child rollups and real-time balances.
   - **General Journal**: Balanced double-entry journal vouchers with real-time balance validation (Debit = Credit check before posting).

5. **Invoices Management (`InvoiceWin`)**
   - Sales Invoices, Purchase Invoices, Sales Returns, Purchase Returns, Stock In, Stock Out, and Quotations.
   - Multi-line item grid, unit pricing, discounts, tax rates, draft saving, posting to ledger, and invoice reversal workflow with mandatory reason audit logging.

6. **Financial & Inventory Reports**
   - Trial Balance
   - Stock Balances with inventory asset valuations
   - Material Movement transaction audit trail
   - Customer Aging of Receivables (0-30, 31-60, 61-90, 90+ days)
   - Item Profitability analysis & gross margin calculations
   - Print preview and CSV export capabilities.

7. **Backup & Security Engine**
   - **Backup**: Downloads a browser-generated JSON snapshot. Encryption, cloud synchronization, cryptographic integrity checks, and restoring from an exported file are not available yet.
   - **Multi-Role RBAC**: Administrator, User (Operations), and Viewer (Read-only) levels with user management.
   - **Multi-Company & Multi-Language**: Company selection, Arabic (RTL), English (LTR), French, and Turkish translations.

---

## 🚀 Getting Started

### Development
```bash
npm install
npm run dev
```

### Build
```bash
npm run build
```
The application runs on port 3000 at `0.0.0.0`.
