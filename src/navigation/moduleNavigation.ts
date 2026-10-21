import { ActiveWindow } from '../types';

export type NavigationCommand = {
  id: string;
  label: string;
  target: ActiveWindow;
};

export type NavigationSection = {
  id: string;
  label: string;
  commands: NavigationCommand[];
};

// Navigation metadata points only to existing screen identifiers.
// A menu entry does not imply that its full business workflow is implemented.
export const NAVIGATION_SECTIONS: NavigationSection[] = [
  { id: 'file', label: 'File', commands: [
    { id: 'open', label: 'Open', target: 'invoices' },
    { id: 'new', label: 'New', target: 'invoices' },
    { id: 'import', label: 'Import Data', target: 'dataExchange' },
    { id: 'export', label: 'Export Data', target: 'dataExchange' },
    { id: 'backup', label: 'Backup', target: 'backup' },
  ]},
  { id: 'warehouses', label: 'Inventory', commands: [
    { id: 'material-card', label: 'Material Card', target: 'materials' },
    { id: 'item-card', label: 'Item Card', target: 'materials' },
    { id: 'warehouse-card', label: 'Warehouse Card', target: 'warehouses' },
    { id: 'material-groups', label: 'Material Groups', target: 'materials' },
    { id: 'barcode', label: 'Barcode Tools', target: 'materials' },
    { id: 'price-list', label: 'Price List', target: 'reports' },
    { id: 'ending-stock', label: 'Ending Inventory', target: 'reports' },
    { id: 'shortages', label: 'Low Stock', target: 'reports' },
    { id: 'stock-transfer', label: 'Stock Transfer', target: 'invoices' },
    { id: 'stock-count', label: 'Stock Count Adjustment', target: 'invoices' },
    { id: 'material-reports', label: 'Inventory Reports', target: 'reports' },
  ]},
  { id: 'accounts', label: 'Accounts', commands: [
    { id: 'coa', label: 'Chart of Accounts', target: 'coa' },
    { id: 'cost-centers', label: 'Cost Centers', target: 'costCenters' },
    { id: 'currencies', label: 'Currencies', target: 'currencies' },
    { id: 'general-ledger', label: 'General Ledger', target: 'reports' },
    { id: 'customer-statement', label: 'Customer Statement', target: 'crm' },
    { id: 'journal-report', label: 'General Journal', target: 'journals' },
    { id: 'trial-balance', label: 'Trial Balance', target: 'reports' },
    { id: 'closing', label: 'Closing Accounts', target: 'closingAccounts' },
    { id: 'financial-statements', label: 'Financial Statements', target: 'closingAccounts' },
    { id: 'analysis', label: 'Financial Analysis', target: 'financialAnalysis' },
  ]},
  { id: 'vouchers', label: 'Vouchers', commands: [
    { id: 'journal', label: 'Journal Entry', target: 'journals' },
    { id: 'receipt', label: 'Receipt Voucher', target: 'journals' },
    { id: 'payment', label: 'Payment Voucher', target: 'journals' },
    { id: 'cash-journal', label: 'Cash Journal', target: 'journals' },
    { id: 'cheques', label: 'Cheques and Securities', target: 'cheques' },
  ]},
  { id: 'invoices', label: 'Invoices', commands: [
    { id: 'invoice', label: 'Invoice', target: 'invoices' },
    { id: 'sales', label: 'Sales Invoices', target: 'invoices' },
    { id: 'purchases', label: 'Purchase Invoices', target: 'invoices' },
    { id: 'returns', label: 'Sales and Purchase Returns', target: 'invoices' },
    { id: 'quotation', label: 'Quotations', target: 'invoices' },
    { id: 'invoice-search', label: 'Invoice Search', target: 'invoices' },
    { id: 'invoice-profits', label: 'Invoice Profitability', target: 'reports' },
  ]},
  { id: 'pos', label: 'Point of Sale', commands: [
    { id: 'pos-terminal', label: 'POS Terminals', target: 'pos' },
    { id: 'pos-setup', label: 'POS Setup', target: 'pos' },
    { id: 'pos-cash-report', label: 'POS Cash Report', target: 'reports' },
    { id: 'pos-reports', label: 'POS Reports', target: 'reports' },
  ]},
  { id: 'orders', label: 'Orders', commands: [
    { id: 'purchase-orders', label: 'Purchase Orders', target: 'orders' },
    { id: 'sales-orders', label: 'Sales Orders', target: 'orders' },
    { id: 'order-receipt-delivery', label: 'Order Receipt and Delivery', target: 'orders' },
    { id: 'order-followup', label: 'Order Follow-up', target: 'orders' },
    { id: 'order-search', label: 'Order Search', target: 'orders' },
  ]},
  { id: 'customers', label: 'Customers', commands: [
    { id: 'customer-cards', label: 'Customer Cards', target: 'crm' },
    { id: 'customer-prices', label: 'Customer Pricing', target: 'crm' },
    { id: 'customer-discounts', label: 'Customer Discounts', target: 'crm' },
    { id: 'customer-search', label: 'Customer Search', target: 'crm' },
    { id: 'customer-balances', label: 'Customer Balances', target: 'crm' },
    { id: 'customer-groups', label: 'Customer Groups', target: 'crm' },
    { id: 'customer-reports', label: 'Customer Reports', target: 'reports' },
  ]},
  { id: 'representatives', label: 'Sales Representatives', commands: [
    { id: 'sales-reps', label: 'Representative Cards', target: 'salesReps' },
    { id: 'rep-goals', label: 'Representative Targets', target: 'salesReps' },
    { id: 'rep-collections', label: 'Representative Collections', target: 'reports' },
    { id: 'handheld-devices', label: 'Handheld Devices', target: 'salesReps' },
  ]},
  { id: 'manufacturing', label: 'Manufacturing', commands: [
    { id: 'manufacturing-models', label: 'Manufacturing Templates', target: 'manufacturing' },
    { id: 'manufacturing-operations', label: 'Manufacturing Operations', target: 'manufacturing' },
    { id: 'manufacturing-search', label: 'Manufacturing Search', target: 'manufacturing' },
    { id: 'manufacturing-costs', label: 'Manufacturing Cost Analysis', target: 'reports' },
  ]},
  { id: 'banks', label: 'Banks', commands: [
    { id: 'bank-cards', label: 'Bank Setup', target: 'banks' },
    { id: 'bank-reconciliation', label: 'Bank Reconciliation', target: 'banks' },
    { id: 'bank-balances', label: 'Bank Balances', target: 'reports' },
  ]},
  { id: 'reports', label: 'Reports', commands: [
    { id: 'statistics', label: 'Statistics', target: 'reports' },
    { id: 'material-overview', label: 'Material Overview', target: 'reports' },
    { id: 'customer-overview', label: 'Customer Overview', target: 'reports' },
    { id: 'custom-reports', label: 'Custom Reports', target: 'reports' },
  ]},
  { id: 'tools', label: 'Tools', commands: [
    { id: 'calculator-tools', label: 'Calculator and Utilities', target: 'tools' },
    { id: 'settings', label: 'Program Options', target: 'settings' },
    { id: 'backup-tools', label: 'Backup', target: 'backup' },
    { id: 'language', label: 'Language Settings', target: 'settings' },
    { id: 'audit-log', label: 'Activity Log', target: 'tools' },
    { id: 'ai', label: 'Artificial Intelligence', target: 'aiEnterprise' },
  ]},
  { id: 'other-tools', label: 'Additional Tools', commands: [
    { id: 'permissions', label: 'Permissions and Users', target: 'securityCenter' },
    { id: 'payment-settings', label: 'Payment Methods and Units', target: 'enterpriseOptions' },
    { id: 'delivery', label: 'Delivery Management', target: 'delivery' },
  ]},
  { id: 'view', label: 'View', commands: [
    { id: 'view-coa', label: 'Chart of Accounts', target: 'coa' },
    { id: 'view-materials', label: 'Material Catalog', target: 'materials' },
    { id: 'company-info', label: 'Company Information', target: 'settings' },
  ]},
  { id: 'exit', label: 'Exit', commands: [
    { id: 'lock', label: 'Lock Workstation', target: 'securityCenter' },
    { id: 'switch-company', label: 'Switch Company', target: 'settings' },
    { id: 'sign-out', label: 'Sign Out', target: 'settings' },
  ]},
  { id: 'help', label: 'Help', commands: [
    { id: 'updates', label: 'Check for Updates', target: 'about' },
    { id: 'instructions', label: 'Program Guide', target: 'about' },
    { id: 'support', label: 'Technical Support', target: 'about' },
    { id: 'license', label: 'License', target: 'license' },
    { id: 'about', label: 'About ShouTech ERP', target: 'about' },
  ]},
];
