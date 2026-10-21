import { ActiveWindow } from '../types';

export type NavigationCommand = {
  id: string;
  labelAr: string;
  labelEn: string;
  target: ActiveWindow;
};

export type NavigationSection = {
  id: string;
  labelAr: string;
  labelEn: string;
  commands: NavigationCommand[];
};

// This catalog deliberately links only to screens that exist in ActiveWindow.
// It is navigation metadata, not a claim that every listed business workflow is implemented.
export const NAVIGATION_SECTIONS: NavigationSection[] = [
  { id: 'file', labelAr: 'ملف', labelEn: 'File', commands: [
    { id: 'new', labelAr: 'جديد', labelEn: 'New', target: 'invoices' },
    { id: 'import', labelAr: 'استيراد بيانات', labelEn: 'Import data', target: 'dataExchange' },
    { id: 'export', labelAr: 'تصدير بيانات', labelEn: 'Export data', target: 'dataExchange' },
    { id: 'backup', labelAr: 'النسخ الاحتياطي', labelEn: 'Backup', target: 'backup' },
  ]},
  { id: 'warehouses', labelAr: 'المستودعات', labelEn: 'Inventory', commands: [
    { id: 'material-card', labelAr: 'بطاقة مادة', labelEn: 'Material card', target: 'materials' },
    { id: 'warehouse-card', labelAr: 'بطاقة مستودع', labelEn: 'Warehouse card', target: 'warehouses' },
    { id: 'material-reports', labelAr: 'تقارير المواد', labelEn: 'Inventory reports', target: 'reports' },
    { id: 'stock-transfer', labelAr: 'نقل حركة مادة', labelEn: 'Stock transfer', target: 'invoices' },
  ]},
  { id: 'accounts', labelAr: 'الحسابات', labelEn: 'Accounts', commands: [
    { id: 'coa', labelAr: 'شجرة الحسابات', labelEn: 'Chart of accounts', target: 'coa' },
    { id: 'cost-centers', labelAr: 'مراكز الكلفة', labelEn: 'Cost centers', target: 'costCenters' },
    { id: 'currencies', labelAr: 'العملات', labelEn: 'Currencies', target: 'currencies' },
    { id: 'ledger-reports', labelAr: 'دفتر الأستاذ والتقارير', labelEn: 'Ledger and reports', target: 'reports' },
    { id: 'closing', labelAr: 'الحسابات الختامية', labelEn: 'Closing accounts', target: 'closingAccounts' },
    { id: 'analysis', labelAr: 'تحليل مالي', labelEn: 'Financial analysis', target: 'financialAnalysis' },
  ]},
  { id: 'vouchers', labelAr: 'السندات', labelEn: 'Vouchers', commands: [
    { id: 'journal', labelAr: 'سند قيد / دفتر اليومية', labelEn: 'Journal entry', target: 'journals' },
    { id: 'cheques', labelAr: 'الأوراق المالية', labelEn: 'Cheques and securities', target: 'cheques' },
  ]},
  { id: 'invoices', labelAr: 'فواتير', labelEn: 'Invoices', commands: [
    { id: 'invoice', labelAr: 'فاتورة', labelEn: 'Invoice', target: 'invoices' },
    { id: 'sales', labelAr: 'المبيعات', labelEn: 'Sales', target: 'invoices' },
    { id: 'purchases', labelAr: 'المشتريات', labelEn: 'Purchases', target: 'invoices' },
    { id: 'quotation', labelAr: 'عروض السعر', labelEn: 'Quotations', target: 'invoices' },
  ]},
  { id: 'pos', labelAr: 'نقاط البيع', labelEn: 'Point of sale', commands: [
    { id: 'pos-terminal', labelAr: 'النقاط', labelEn: 'POS terminals', target: 'pos' },
    { id: 'pos-reports', labelAr: 'تقارير نقطة بيع', labelEn: 'POS reports', target: 'reports' },
  ]},
  { id: 'orders', labelAr: 'طلبيات', labelEn: 'Orders', commands: [
    { id: 'purchase-orders', labelAr: 'طلبيات الشراء والبيع', labelEn: 'Purchase and sales orders', target: 'orders' },
    { id: 'order-followup', labelAr: 'متابعة الطلبيات', labelEn: 'Order follow-up', target: 'orders' },
  ]},
  { id: 'customers', labelAr: 'عملاء', labelEn: 'Customers', commands: [
    { id: 'customer-cards', labelAr: 'بطاقات العملاء', labelEn: 'Customer cards', target: 'crm' },
    { id: 'customer-search', labelAr: 'بحث العملاء', labelEn: 'Customer search', target: 'crm' },
    { id: 'customer-reports', labelAr: 'تقارير العملاء', labelEn: 'Customer reports', target: 'reports' },
  ]},
  { id: 'representatives', labelAr: 'مندوب', labelEn: 'Sales reps', commands: [
    { id: 'sales-reps', labelAr: 'بطاقة مندوب', labelEn: 'Sales representative card', target: 'salesReps' },
    { id: 'rep-reports', labelAr: 'تحصيلات المندوب', labelEn: 'Representative collections', target: 'reports' },
  ]},
  { id: 'manufacturing', labelAr: 'التصنيع', labelEn: 'Manufacturing', commands: [
    { id: 'manufacturing-operations', labelAr: 'عمليات التصنيع', labelEn: 'Manufacturing operations', target: 'manufacturing' },
    { id: 'manufacturing-search', labelAr: 'بحث التصنيع', labelEn: 'Manufacturing search', target: 'manufacturing' },
    { id: 'manufacturing-costs', labelAr: 'تكاليف المواد المصنعة', labelEn: 'Manufacturing costs', target: 'reports' },
  ]},
  { id: 'banks', labelAr: 'البنوك', labelEn: 'Banks', commands: [
    { id: 'bank-cards', labelAr: 'تعريف البنوك', labelEn: 'Bank setup', target: 'banks' },
    { id: 'bank-reconciliation', labelAr: 'تسوية بنكية', labelEn: 'Bank reconciliation', target: 'banks' },
    { id: 'bank-balances', labelAr: 'أرصدة البنوك', labelEn: 'Bank balances', target: 'reports' },
  ]},
  { id: 'reports', labelAr: 'تقارير', labelEn: 'Reports', commands: [
    { id: 'statistics', labelAr: 'إحصائيات', labelEn: 'Statistics', target: 'reports' },
    { id: 'custom-reports', labelAr: 'تقارير مخصصة', labelEn: 'Custom reports', target: 'reports' },
    { id: 'dashboard', labelAr: 'لمحة عامة', labelEn: 'Overview', target: 'dashboard' },
  ]},
  { id: 'tools', labelAr: 'أدوات', labelEn: 'Tools', commands: [
    { id: 'calculator-tools', labelAr: 'الآلة الحاسبة والأدوات', labelEn: 'Calculator and tools', target: 'tools' },
    { id: 'settings', labelAr: 'خيارات البرنامج', labelEn: 'Program options', target: 'settings' },
    { id: 'backup-tools', labelAr: 'النسخ الاحتياطي', labelEn: 'Backup', target: 'backup' },
    { id: 'ai', labelAr: 'الذكاء الصناعي', labelEn: 'AI', target: 'aiEnterprise' },
  ]},
  { id: 'other-tools', labelAr: 'أدوات أخرى', labelEn: 'More tools', commands: [
    { id: 'permissions', labelAr: 'الصلاحيات والمستخدمون', labelEn: 'Permissions and users', target: 'securityCenter' },
    { id: 'payment-settings', labelAr: 'طرق الدفع والإعدادات', labelEn: 'Payment methods and settings', target: 'enterpriseOptions' },
    { id: 'delivery', labelAr: 'التوصيل', labelEn: 'Delivery', target: 'delivery' },
  ]},
  { id: 'view', labelAr: 'عرض', labelEn: 'View', commands: [
    { id: 'view-coa', labelAr: 'شجرة الحسابات', labelEn: 'Chart of accounts', target: 'coa' },
    { id: 'view-materials', labelAr: 'شجرة المواد', labelEn: 'Material tree', target: 'materials' },
    { id: 'company-info', labelAr: 'معلومات الشركة', labelEn: 'Company information', target: 'settings' },
  ]},
  { id: 'exit', labelAr: 'خروج', labelEn: 'Exit', commands: [
    { id: 'switch-company', labelAr: 'تبديل الشركة', labelEn: 'Switch company', target: 'settings' },
    { id: 'sign-out', labelAr: 'تسجيل الخروج', labelEn: 'Sign out', target: 'settings' },
  ]},
  { id: 'help', labelAr: 'مساعدة', labelEn: 'Help', commands: [
    { id: 'about', labelAr: 'حول البرنامج', labelEn: 'About', target: 'about' },
    { id: 'support', labelAr: 'الدعم الفني', labelEn: 'Technical support', target: 'about' },
    { id: 'license', labelAr: 'تجديد الترخيص', labelEn: 'Renew license', target: 'license' },
  ]},
];
