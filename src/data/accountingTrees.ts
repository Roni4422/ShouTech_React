import { Account } from '../types';

export interface AccountingTreeTemplate {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  region: string;
  standard: string;
  description: string;
  currency: string;
  accounts: Account[];
}

export const ACCOUNTING_TREES: AccountingTreeTemplate[] = [
  {
    id: 'sa_zatca',
    code: 'TREE-SA-ZATCA',
    nameAr: 'دليل الحسابات السعودي المعتمد (ZATCA / SOCPA)',
    nameEn: 'Saudi SOCPA / ZATCA Standard Chart',
    region: 'Saudi Arabia & GCC',
    standard: 'SOCPA / ZATCA Phase 2 E-Invoicing',
    description: 'شجرة حسابات معتمدة متوافقة مع متطلبات هيئة الزكاة والضريبة والجمارك والفاتورة الإلكترونية والمراجعة المحاسبية.',
    currency: 'SAR',
    accounts: [
      { id: 101, code: '1', nameAr: 'الأصول', nameEn: 'Assets', type: 'Asset', parentId: null, balance: 1450000, isHeader: true, currency: 'SAR' },
      { id: 102, code: '11', nameAr: 'الأصول المتداولة', nameEn: 'Current Assets', type: 'Asset', parentId: 101, balance: 820000, isHeader: true, currency: 'SAR' },
      { id: 103, code: '111', nameAr: 'النقدية وما في حكمها', nameEn: 'Cash & Cash Equivalents', type: 'Asset', parentId: 102, balance: 350000, isHeader: true, currency: 'SAR' },
      { id: 104, code: '1111', nameAr: 'الصندوق الرئيسي (الخزينة)', nameEn: 'Main Cash Safe', type: 'Asset', parentId: 103, balance: 45000, isHeader: false, currency: 'SAR' },
      { id: 105, code: '1112', nameAr: 'حساب مصرف الراجحي', nameEn: 'Al Rajhi Bank Account', type: 'Asset', parentId: 103, balance: 185000, isHeader: false, currency: 'SAR' },
      { id: 106, code: '1113', nameAr: 'حساب البنك الأهلي التجاري', nameEn: 'SNB Bank Account', type: 'Asset', parentId: 103, balance: 120000, isHeader: false, currency: 'SAR' },
      { id: 107, code: '112', nameAr: 'العملاء والمدينون', nameEn: 'Accounts Receivable', type: 'Asset', parentId: 102, balance: 260000, isHeader: false, currency: 'SAR' },
      { id: 108, code: '113', nameAr: 'المخزون السلعي', nameEn: 'Merchandise Inventory', type: 'Asset', parentId: 102, balance: 210000, isHeader: false, currency: 'SAR' },
      { id: 109, code: '12', nameAr: 'الأصول غير المتداولة (الثابتة)', nameEn: 'Non-Current Assets', type: 'Asset', parentId: 101, balance: 630000, isHeader: true, currency: 'SAR' },
      { id: 110, code: '121', nameAr: 'الأثاث والمعدات المكتبية', nameEn: 'Office Furniture & Equipments', type: 'Asset', parentId: 109, balance: 180000, isHeader: false, currency: 'SAR' },
      { id: 111, code: '122', nameAr: 'السيارات ووسائل النقل', nameEn: 'Vehicles & Fleet', type: 'Asset', parentId: 109, balance: 450000, isHeader: false, currency: 'SAR' },
      { id: 201, code: '2', nameAr: 'الالتزامات', nameEn: 'Liabilities', type: 'Liability', parentId: null, balance: 430000, isHeader: true, currency: 'SAR' },
      { id: 202, code: '21', nameAr: 'الالتزامات المتداولة', nameEn: 'Current Liabilities', type: 'Liability', parentId: 201, balance: 430000, isHeader: true, currency: 'SAR' },
      { id: 203, code: '211', nameAr: 'الموردون والدائنون', nameEn: 'Accounts Payable', type: 'Liability', parentId: 202, balance: 290000, isHeader: false, currency: 'SAR' },
      { id: 204, code: '212', nameAr: 'أمانات ضريبة القيمة المضافة ZATCA (15%)', nameEn: 'VAT Output Liability (15%)', type: 'Liability', parentId: 202, balance: 42000, isHeader: false, currency: 'SAR' },
      { id: 205, code: '213', nameAr: 'مستحقات الزكاة الشرعية', nameEn: 'Zakat Payable', type: 'Liability', parentId: 202, balance: 98000, isHeader: false, currency: 'SAR' },
      { id: 301, code: '3', nameAr: 'حقوق الملكية', nameEn: 'Equity', type: 'Equity', parentId: null, balance: 650000, isHeader: true, currency: 'SAR' },
      { id: 302, code: '31', nameAr: 'رأس المال المدفوع', nameEn: 'Paid-in Capital', type: 'Equity', parentId: 301, balance: 500000, isHeader: false, currency: 'SAR' },
      { id: 303, code: '32', nameAr: 'الأرباح المبقاة (المرحلة)', nameEn: 'Retained Earnings', type: 'Equity', parentId: 301, balance: 150000, isHeader: false, currency: 'SAR' },
      { id: 401, code: '4', nameAr: 'الإيرادات', nameEn: 'Revenue', type: 'Revenue', parentId: null, balance: 580000, isHeader: true, currency: 'SAR' },
      { id: 402, code: '41', nameAr: 'إيرادات مبيعات البضائع', nameEn: 'Sales Revenue', type: 'Revenue', parentId: 401, balance: 520000, isHeader: false, currency: 'SAR' },
      { id: 403, code: '42', nameAr: 'إيرادات خدمات ودعم فني', nameEn: 'Services & Support Revenue', type: 'Revenue', parentId: 401, balance: 60000, isHeader: false, currency: 'SAR' },
      { id: 501, code: '5', nameAr: 'المصروفات', nameEn: 'Expenses', type: 'Expense', parentId: null, balance: 210000, isHeader: true, currency: 'SAR' },
      { id: 502, code: '51', nameAr: 'تكلفة البضاعة المباعة', nameEn: 'Cost of Goods Sold (COGS)', type: 'Expense', parentId: 501, balance: 135000, isHeader: false, currency: 'SAR' },
      { id: 503, code: '52', nameAr: 'الرواتب والأجور والمزايا', nameEn: 'Salaries & Wages', type: 'Expense', parentId: 501, balance: 48000, isHeader: false, currency: 'SAR' },
      { id: 504, code: '53', nameAr: 'الإيجارات والمرافق العامة', nameEn: 'Rent & Utilities', type: 'Expense', parentId: 501, balance: 27000, isHeader: false, currency: 'SAR' }
    ]
  },
  {
    id: 'uae_vat',
    code: 'TREE-AE-FTA',
    nameAr: 'دليل الحسابات الإماراتي والخليجي الموحد (UAE FTA / GCC VAT)',
    nameEn: 'UAE & GCC VAT Standard Chart (FTA Compliant)',
    region: 'United Arab Emirates & Gulf',
    standard: 'UAE Federal Tax Authority (FTA) 5% VAT',
    description: 'شجرة حسابات للشركات التجارية في دبي وأبوظبي ودول مجلس التعاون مطابقة لضريبة 5% وضريبة الشركات الاتحادية.',
    currency: 'AED',
    accounts: [
      { id: 2101, code: '1000', nameAr: 'الأصول (Assets)', nameEn: 'Assets', type: 'Asset', parentId: null, balance: 1800000, isHeader: true, currency: 'AED' },
      { id: 2102, code: '1100', nameAr: 'النقدية والبنوك الإماراتية (FAB, ENBD)', nameEn: 'Bank & Liquid Funds', type: 'Asset', parentId: 2101, balance: 750000, isHeader: false, currency: 'AED' },
      { id: 2103, code: '1200', nameAr: 'الذمم المدينة التجارية', nameEn: 'Trade Receivables', type: 'Asset', parentId: 2101, balance: 480000, isHeader: false, currency: 'AED' },
      { id: 2104, code: '1300', nameAr: 'مخزون المستودعات والمناطق الحرة', nameEn: 'Free Zone & Mainland Inventory', type: 'Asset', parentId: 2101, balance: 570000, isHeader: false, currency: 'AED' },
      { id: 2201, code: '2000', nameAr: 'الالتزامات (Liabilities)', nameEn: 'Liabilities', type: 'Liability', parentId: null, balance: 510000, isHeader: true, currency: 'AED' },
      { id: 2202, code: '2100', nameAr: 'الذمم الدائنة والموردين', nameEn: 'Trade Payables', type: 'Liability', parentId: 2201, balance: 340000, isHeader: false, currency: 'AED' },
      { id: 2203, code: '2200', nameAr: 'ضريبة القيمة المضافة FTA VAT (5%)', nameEn: 'FTA Output VAT (5%)', type: 'Liability', parentId: 2201, balance: 25000, isHeader: false, currency: 'AED' },
      { id: 2204, code: '2300', nameAr: 'ضريبة الشركات الاتحادية (Corporate Tax 9%)', nameEn: 'Corporate Tax Provision (9%)', type: 'Liability', parentId: 2201, balance: 145000, isHeader: false, currency: 'AED' },
      { id: 2301, code: '3000', nameAr: 'حقوق الشركاء ورأس المال', nameEn: "Owners' Equity & Share Capital", type: 'Equity', parentId: null, balance: 800000, isHeader: false, currency: 'AED' },
      { id: 2401, code: '4000', nameAr: 'إيرادات المبيعات والخدمات', nameEn: 'Sales & Professional Revenue', type: 'Revenue', parentId: null, balance: 940000, isHeader: false, currency: 'AED' },
      { id: 2501, code: '5000', nameAr: 'مصروفات التشغيل والإدارة', nameEn: 'Operating & Admin Expenses', type: 'Expense', parentId: null, balance: 450000, isHeader: false, currency: 'AED' }
    ]
  },
  {
    id: 'sy_unified',
    code: 'TREE-SY-UNIFIED',
    nameAr: 'النظام المحاسبي الموحد السوري (Syrian Unified System)',
    nameEn: 'Syrian Unified Accounting System',
    region: 'Syria & Levant',
    standard: 'النظام المحاسبي الموحد للشركات والمؤسسات السورية',
    description: 'شجرة حسابات الأمين الكلاسيكية المعتمدة في سوريا: 1 الأصول، 2 الخصوم، 3 الإيرادات، 4 المصروفات، وحسابات التشغيل والمتاجرة.',
    currency: 'SYP',
    accounts: [
      { id: 3101, code: '1', nameAr: 'الأصول (الموجودات)', nameEn: 'Assets', type: 'Asset', parentId: null, balance: 85000000, isHeader: true, currency: 'SYP' },
      { id: 3102, code: '11', nameAr: 'الأصول الثابتة', nameEn: 'Fixed Assets', type: 'Asset', parentId: 3101, balance: 35000000, isHeader: false, currency: 'SYP' },
      { id: 3103, code: '12', nameAr: 'المخازن والمستودعات', nameEn: 'Inventories', type: 'Asset', parentId: 3101, balance: 25000000, isHeader: false, currency: 'SYP' },
      { id: 3104, code: '14', nameAr: 'المدينون والزبائن', nameEn: 'Debtors & Customers', type: 'Asset', parentId: 3101, balance: 15000000, isHeader: false, currency: 'SYP' },
      { id: 3105, code: '18', nameAr: 'الأموال الجاهزة (صناديق ومصارف)', nameEn: 'Cash & Banks', type: 'Asset', parentId: 3101, balance: 10000000, isHeader: false, currency: 'SYP' },
      { id: 3201, code: '2', nameAr: 'الخصوم (المطاليب)', nameEn: 'Liabilities', type: 'Liability', parentId: null, balance: 32000000, isHeader: true, currency: 'SYP' },
      { id: 3202, code: '21', nameAr: 'أموال خاصة (رأس المال والاحتياطيات)', nameEn: 'Capital & Reserves', type: 'Equity', parentId: 3201, balance: 20000000, isHeader: false, currency: 'SYP' },
      { id: 3203, code: '26', nameAr: 'الدائنون والموردون', nameEn: 'Creditors & Suppliers', type: 'Liability', parentId: 3201, balance: 12000000, isHeader: false, currency: 'SYP' },
      { id: 3301, code: '3', nameAr: 'الاستخدامات (المصروفات والأعباء)', nameEn: 'Operational Expenses', type: 'Expense', parentId: null, balance: 18000000, isHeader: false, currency: 'SYP' },
      { id: 3401, code: '4', nameAr: 'الموارد (الإيرادات والنواتج)', nameEn: 'Operating Revenues', type: 'Revenue', parentId: null, balance: 41000000, isHeader: false, currency: 'SYP' }
    ]
  },
  {
    id: 'eg_eas',
    code: 'TREE-EG-EAS',
    nameAr: 'دليل الحسابات الموحد المصري (EAS / Egyptian Standards)',
    nameEn: 'Egyptian Accounting Standards (EAS Chart)',
    region: 'Egypt & North Africa',
    standard: 'معايير المحاسبة المصرية ومنظومة الفاتورة الإلكترونية ETA',
    description: 'دليل حسابات تجاري وصناعي متوافق مع الفاتورة الإلكترونية لمصلحة الضرائب المصرية ETA وضريبة القيمة المضافة 14%.',
    currency: 'EGP',
    accounts: [
      { id: 4101, code: '10', nameAr: 'الأصول الثابتة والمتداولة', nameEn: 'Total Assets', type: 'Asset', parentId: null, balance: 2400000, isHeader: true, currency: 'EGP' },
      { id: 4102, code: '11', nameAr: 'النقدية وما في حكمها بالبنوك المصرية', nameEn: 'Cash & Bank Balances', type: 'Asset', parentId: 4101, balance: 800000, isHeader: false, currency: 'EGP' },
      { id: 4103, code: '12', nameAr: 'العملاء وأوراق القبض التجارية', nameEn: 'Receivables & Commercial Paper', type: 'Asset', parentId: 4101, balance: 750000, isHeader: false, currency: 'EGP' },
      { id: 4104, code: '13', nameAr: 'المخزون السلعي والبضائع', nameEn: 'Goods & Raw Materials', type: 'Asset', parentId: 4101, balance: 850000, isHeader: false, currency: 'EGP' },
      { id: 4201, code: '20', nameAr: 'الالتزامات وحقوق الملكية', nameEn: 'Liabilities & Equity', type: 'Liability', parentId: null, balance: 950000, isHeader: true, currency: 'EGP' },
      { id: 4202, code: '21', nameAr: 'الموردون وأوراق الدفع', nameEn: 'Trade Payables & Drafts', type: 'Liability', parentId: 4201, balance: 650000, isHeader: false, currency: 'EGP' },
      { id: 4203, code: '22', nameAr: 'ضريبة القيمة المضافة المصرية ETA (14%)', nameEn: 'Egyptian VAT (14%)', type: 'Liability', parentId: 4201, balance: 120000, isHeader: false, currency: 'EGP' },
      { id: 4204, code: '23', nameAr: 'ضريبة الخصم والإضافة (1% / 3%)', nameEn: 'Withholding Tax', type: 'Liability', parentId: 4201, balance: 30000, isHeader: false, currency: 'EGP' },
      { id: 4301, code: '30', nameAr: 'رأس المال والاحتياطي القانوني', nameEn: 'Paid Capital & Legal Reserve', type: 'Equity', parentId: null, balance: 1100000, isHeader: false, currency: 'EGP' },
      { id: 4401, code: '40', nameAr: 'الإيرادات وصافي المبيعات', nameEn: 'Revenues & Gross Sales', type: 'Revenue', parentId: null, balance: 1350000, isHeader: false, currency: 'EGP' },
      { id: 4501, code: '50', nameAr: 'المصروفات العمومية والإدارية والبيعية', nameEn: 'Operating & SG&A Expenses', type: 'Expense', parentId: null, balance: 590000, isHeader: false, currency: 'EGP' }
    ]
  },
  {
    id: 'jo_levant',
    code: 'TREE-JO-COMMERCIAL',
    nameAr: 'النظام المحاسبي الأردني وبلاد الشام (Jordanian Commercial)',
    nameEn: 'Jordan & Levant Commercial Chart',
    region: 'Jordan & Levant',
    standard: 'قانون الشركات والضريبة الأردنية 16% ضريبة مبيعات',
    description: 'شجرة حسابات معتمدة في الأردن وفلسطين متوافقة مع دائرة ضريبة الدخل والمبيعات والفوترة الوطنية.',
    currency: 'JOD',
    accounts: [
      { id: 5101, code: '100', nameAr: 'الموجودات المتداولة والثابتة', nameEn: 'Total Assets', type: 'Asset', parentId: null, balance: 280000, isHeader: true, currency: 'JOD' },
      { id: 5102, code: '101', nameAr: 'الصندوق والبنوك الأردنية (الإسكان، العربي)', nameEn: 'Cash & Jordanian Banks', type: 'Asset', parentId: 5101, balance: 95000, isHeader: false, currency: 'JOD' },
      { id: 5103, code: '102', nameAr: 'الذمم المدينة وشيكات برسم التحصيل', nameEn: 'Trade Debtors & Cheques', type: 'Asset', parentId: 5101, balance: 85000, isHeader: false, currency: 'JOD' },
      { id: 5104, code: '103', nameAr: 'بضاعة آخر المدة بالمستودعات', nameEn: 'Merchandise Inventory', type: 'Asset', parentId: 5101, balance: 100000, isHeader: false, currency: 'JOD' },
      { id: 5201, code: '200', nameAr: 'المطلوبات والذمم الدائنة', nameEn: 'Liabilities', type: 'Liability', parentId: null, balance: 92000, isHeader: true, currency: 'JOD' },
      { id: 5202, code: '201', nameAr: 'الموردون وأمانات ضريبة المبيعات (16%)', nameEn: 'Suppliers & Sales Tax (16%)', type: 'Liability', parentId: 5201, balance: 92000, isHeader: false, currency: 'JOD' },
      { id: 5301, code: '300', nameAr: 'حقوق الملكية ورأس مال المؤسسة', nameEn: "Owners' Equity & Capital", type: 'Equity', parentId: null, balance: 120000, isHeader: false, currency: 'JOD' },
      { id: 5401, code: '400', nameAr: 'إيراد المبيعات والخدمات', nameEn: 'Revenue from Operations', type: 'Revenue', parentId: null, balance: 160000, isHeader: false, currency: 'JOD' },
      { id: 5501, code: '500', nameAr: 'نفقات ومصاريف التشغيل', nameEn: 'Operating Expenses', type: 'Expense', parentId: null, balance: 68000, isHeader: false, currency: 'JOD' }
    ]
  },
  {
    id: 'us_gaap',
    code: 'TREE-US-GAAP',
    nameAr: 'دليل الحسابات الأمريكي المعتمد (US GAAP)',
    nameEn: 'US GAAP Standard Commercial Chart',
    region: 'North America / Global',
    standard: 'US Generally Accepted Accounting Principles (FASB/GAAP)',
    description: 'شجرة حسابات قياسية معتمدة في الولايات المتحدة والشركات متعددة الجنسيات وفق معايير FASB.',
    currency: 'USD',
    accounts: [
      { id: 6101, code: '10000', nameAr: 'الأصول (Assets)', nameEn: 'Assets', type: 'Asset', parentId: null, balance: 950000, isHeader: true, currency: 'USD' },
      { id: 6102, code: '10100', nameAr: 'النقدية وما يعادلها (Cash & Equivalents)', nameEn: 'Cash and Cash Equivalents', type: 'Asset', parentId: 6101, balance: 340000, isHeader: false, currency: 'USD' },
      { id: 6103, code: '10200', nameAr: 'حسابات الذمم المدينة (Accounts Receivable)', nameEn: 'Accounts Receivable (A/R)', type: 'Asset', parentId: 6101, balance: 280000, isHeader: false, currency: 'USD' },
      { id: 6104, code: '10300', nameAr: 'المخزون (Inventory Finished Goods)', nameEn: 'Inventory - Merchandise', type: 'Asset', parentId: 6101, balance: 330000, isHeader: false, currency: 'USD' },
      { id: 6201, code: '20000', nameAr: 'الالتزامات (Liabilities)', nameEn: 'Liabilities', type: 'Liability', parentId: null, balance: 290000, isHeader: true, currency: 'USD' },
      { id: 6202, code: '20100', nameAr: 'الذمم الدائنة (Accounts Payable)', nameEn: 'Accounts Payable (A/P)', type: 'Liability', parentId: 6201, balance: 190000, isHeader: false, currency: 'USD' },
      { id: 6203, code: '20200', nameAr: 'المصروفات المستحقة (Accrued Liabilities)', nameEn: 'Accrued Expenses & Payroll', type: 'Liability', parentId: 6201, balance: 100000, isHeader: false, currency: 'USD' },
      { id: 6301, code: '30000', nameAr: 'حقوق المساهمين (Stockholders’ Equity)', nameEn: 'Stockholders’ Equity', type: 'Equity', parentId: null, balance: 450000, isHeader: false, currency: 'USD' },
      { id: 6401, code: '40000', nameAr: 'الإيرادات (Gross Revenues)', nameEn: 'Operating Revenues', type: 'Revenue', parentId: null, balance: 680000, isHeader: false, currency: 'USD' },
      { id: 6501, code: '50000', nameAr: 'تكلفة الإيرادات (Cost of Goods Sold)', nameEn: 'Cost of Goods Sold', type: 'Expense', parentId: null, balance: 310000, isHeader: false, currency: 'USD' },
      { id: 6502, code: '60000', nameAr: 'مصروفات البيع والإدارة (SG&A)', nameEn: 'Selling, General & Administrative', type: 'Expense', parentId: null, balance: 160000, isHeader: false, currency: 'USD' }
    ]
  },
  {
    id: 'ifrs_global',
    code: 'TREE-IFRS-GLOBAL',
    nameAr: 'معايير التقارير المالية الدولية (IFRS International Standard)',
    nameEn: 'IFRS International Commercial Chart',
    region: 'International / Europe / Asia',
    standard: 'International Financial Reporting Standards (IASB / IFRS)',
    description: 'شجرة حسابات عالمية متطابقة مع متطلبات المعايير الدولية لإعداد التقارير المالية IFRS المطبقة في أكثر من 140 دولة.',
    currency: 'EUR',
    accounts: [
      { id: 7101, code: '1000', nameAr: 'الموجودات غير المتداولة والمتداولة (Assets)', nameEn: 'Non-Current & Current Assets', type: 'Asset', parentId: null, balance: 890000, isHeader: true, currency: 'EUR' },
      { id: 7102, code: '1100', nameAr: 'الأصول المالية والنقدية (Financial Assets)', nameEn: 'Cash & Financial Assets', type: 'Asset', parentId: 7101, balance: 360000, isHeader: false, currency: 'EUR' },
      { id: 7103, code: '1200', nameAr: 'الذمم المدينة التجارية بموجب IFRS 9', nameEn: 'Trade Receivables (IFRS 9 ECL)', type: 'Asset', parentId: 7101, balance: 290000, isHeader: false, currency: 'EUR' },
      { id: 7104, code: '1300', nameAr: 'المخزون بموجب معيار IAS 2', nameEn: 'Inventories (IAS 2 Net Realizable)', type: 'Asset', parentId: 7101, balance: 240000, isHeader: false, currency: 'EUR' },
      { id: 7201, code: '2000', nameAr: 'الالتزامات بموجب IFRS', nameEn: 'Liabilities', type: 'Liability', parentId: null, balance: 270000, isHeader: false, currency: 'EUR' },
      { id: 7301, code: '3000', nameAr: 'حقوق الملكية ورأس المال المصرح', nameEn: 'Equity & Retained Reserves', type: 'Equity', parentId: null, balance: 420000, isHeader: false, currency: 'EUR' },
      { id: 7401, code: '4000', nameAr: 'إيرادات العقود مع العملاء (IFRS 15)', nameEn: 'Revenue from Customer Contracts (IFRS 15)', type: 'Revenue', parentId: null, balance: 590000, isHeader: false, currency: 'EUR' },
      { id: 7501, code: '5000', nameAr: 'مصاريف الأنشطة التشغيلية', nameEn: 'Operating Expenses', type: 'Expense', parentId: null, balance: 390000, isHeader: false, currency: 'EUR' }
    ]
  },
  {
    id: 'tr_thp',
    code: 'TREE-TR-THP',
    nameAr: 'دليل الحسابات التركي الموحد (Tekdüzen Hesap Planı - THP)',
    nameEn: 'Turkish Uniform Accounting System (THP)',
    region: 'Turkey',
    standard: 'T.C. Hazine ve Maliye Bakanlığı Tekdüzen Hesap Planı',
    description: 'شجرة الحسابات الرسمية التركية THP (Dönen Varlıklar, Duran Varlıklar, Kısa Vadeli Yabancı Kaynaklar, Özkaynaklar, Gelir Tablosu).',
    currency: 'TRY',
    accounts: [
      { id: 8101, code: '1', nameAr: 'الأصول المتداولة (1 Dönen Varlıklar)', nameEn: 'Current Assets (1 Dönen Varlıklar)', type: 'Asset', parentId: null, balance: 3400000, isHeader: true, currency: 'TRY' },
      { id: 8102, code: '100', nameAr: 'الصندوق (100 Kasa Hesabı)', nameEn: 'Cash on Hand (100 Kasa)', type: 'Asset', parentId: 8101, balance: 450000, isHeader: false, currency: 'TRY' },
      { id: 8103, code: '102', nameAr: 'البنوك التركية (102 Bankalar Hesabı)', nameEn: 'Banks (102 Bankalar)', type: 'Asset', parentId: 8101, balance: 1450000, isHeader: false, currency: 'TRY' },
      { id: 8104, code: '120', nameAr: 'العملاء (120 Alıcılar Hesabı)', nameEn: 'Trade Customers (120 Alıcılar)', type: 'Asset', parentId: 8101, balance: 750000, isHeader: false, currency: 'TRY' },
      { id: 8105, code: '153', nameAr: 'البضائع التجارية (153 Ticari Mallar)', nameEn: 'Merchandise Inventory (153 Ticari Mallar)', type: 'Asset', parentId: 8101, balance: 750000, isHeader: false, currency: 'TRY' },
      { id: 8201, code: '3', nameAr: 'الالتزامات قصيرة الأجل (3 Kısa Vadeli Yabancı Kaynaklar)', nameEn: 'Short Term Liabilities', type: 'Liability', parentId: null, balance: 1100000, isHeader: true, currency: 'TRY' },
      { id: 8202, code: '320', nameAr: 'الموردون (320 Satıcılar Hesabı)', nameEn: 'Trade Vendors (320 Satıcılar)', type: 'Liability', parentId: 8201, balance: 850000, isHeader: false, currency: 'TRY' },
      { id: 8203, code: '391', nameAr: 'ضريبة القيمة المضافة المحسوبة KDV (391 Hesaplanan KDV)', nameEn: 'VAT Output (391 Hesaplanan KDV)', type: 'Liability', parentId: 8201, balance: 250000, isHeader: false, currency: 'TRY' },
      { id: 8301, code: '5', nameAr: 'حقوق الملكية ورأس المال (5 Özkaynaklar)', nameEn: 'Shareholders Equity (5 Özkaynaklar)', type: 'Equity', parentId: null, balance: 1500000, isHeader: false, currency: 'TRY' },
      { id: 8401, code: '600', nameAr: 'المبيعات المحلية (600 Yurtiçi Satışlar)', nameEn: 'Domestic Sales (600 Yurtiçi Satışlar)', type: 'Revenue', parentId: null, balance: 2200000, isHeader: false, currency: 'TRY' },
      { id: 8501, code: '621', nameAr: 'تكلفة البضائع المباعة (621 Satılan Ticari Mallar Maliyeti)', nameEn: 'Cost of Merchandise Sold (621 STMM)', type: 'Expense', parentId: null, balance: 1400000, isHeader: false, currency: 'TRY' }
    ]
  },
  {
    id: 'fr_pcg',
    code: 'TREE-FR-PCG',
    nameAr: 'المخطط المحاسبي الفرنسي العام (Plan Comptable Général - PCG)',
    nameEn: 'French Plan Comptable Général (PCG)',
    region: 'France & Francophone Countries',
    standard: 'Plan Comptable Général Français (ANC / PCG)',
    description: 'المخطط المحاسبي الرسمي المعتمد في فرنسا والدول الفرنكوفونية المقسم إلى الفئات 1 إلى 7.',
    currency: 'EUR',
    accounts: [
      { id: 9101, code: 'Classe 1', nameAr: 'حسابات رأس المال والتمويل (Comptes de capitaux)', nameEn: 'Capital Accounts (Classe 1)', type: 'Equity', parentId: null, balance: 500000, isHeader: false, currency: 'EUR' },
      { id: 9102, code: 'Classe 2', nameAr: 'حسابات الأصول الثابتة (Comptes d’immobilisations)', nameEn: 'Fixed Assets (Classe 2)', type: 'Asset', parentId: null, balance: 350000, isHeader: false, currency: 'EUR' },
      { id: 9103, code: 'Classe 3', nameAr: 'حسابات المخزون والإنتاج (Comptes de stocks)', nameEn: 'Inventory (Classe 3)', type: 'Asset', parentId: null, balance: 280000, isHeader: false, currency: 'EUR' },
      { id: 9104, code: 'Classe 4', nameAr: 'حسابات الأطراف الثالثة: الزبائن والموردين (Comptes de tiers)', nameEn: 'Third Party Accounts (Classe 4)', type: 'Asset', parentId: null, balance: 190000, isHeader: false, currency: 'EUR' },
      { id: 9105, code: 'Classe 5', nameAr: 'حسابات الخزينة والنقدية (Comptes financiers)', nameEn: 'Cash & Financials (Classe 5)', type: 'Asset', parentId: null, balance: 220000, isHeader: false, currency: 'EUR' },
      { id: 9106, code: 'Classe 6', nameAr: 'حسابات الأعباء والمصروفات (Comptes de charges)', nameEn: 'Charges & Expenses (Classe 6)', type: 'Expense', parentId: null, balance: 410000, isHeader: false, currency: 'EUR' },
      { id: 9107, code: 'Classe 7', nameAr: 'حسابات النواتج والإيرادات (Comptes de produits)', nameEn: 'Revenues & Products (Classe 7)', type: 'Revenue', parentId: null, balance: 640000, isHeader: false, currency: 'EUR' }
    ]
  },
  {
    id: 'de_datev',
    code: 'TREE-DE-DATEV',
    nameAr: 'مخطط الحسابات الألماني المعتمد (DATEV SKR03 / SKR04)',
    nameEn: 'German Standardkontenrahmen (DATEV SKR03/04)',
    region: 'Germany, Austria, Switzerland (DACH)',
    standard: 'Deutscher Standardkontenrahmen (HGB / GoBD)',
    description: 'شجرة حسابات معتمدة في ألمانيا والاتحاد الأوروبي وفق معايير DATEV المحاسبية ونظام HGB و GoBD.',
    currency: 'EUR',
    accounts: [
      { id: 10101, code: '0', nameAr: 'الأصول الثابتة والملموسة (Anlagevermögen)', nameEn: 'Fixed Assets (Class 0)', type: 'Asset', parentId: null, balance: 480000, isHeader: false, currency: 'EUR' },
      { id: 10102, code: '1', nameAr: 'الأصول المتداولة والمالية (Umlaufvermögen & Bank)', nameEn: 'Current Assets & Banks (Class 1)', type: 'Asset', parentId: null, balance: 520000, isHeader: false, currency: 'EUR' },
      { id: 10103, code: '2', nameAr: 'حقوق الملكية ورأس المال المكتتب (Eigenkapital)', nameEn: 'Equity & Retained Capital (Class 2)', type: 'Equity', parentId: null, balance: 410000, isHeader: false, currency: 'EUR' },
      { id: 10104, code: '3', nameAr: 'الالتزامات والديون (Verbindlichkeiten)', nameEn: 'Liabilities (Class 3)', type: 'Liability', parentId: null, balance: 290000, isHeader: false, currency: 'EUR' },
      { id: 10105, code: '4', nameAr: 'عائدات المبيعات والخدمات (Betriebliche Erträge)', nameEn: 'Operating Revenues (Class 4)', type: 'Revenue', parentId: null, balance: 690000, isHeader: false, currency: 'EUR' },
      { id: 10106, code: '5', nameAr: 'المواد وتكلفة البضائع (Materialaufwand)', nameEn: 'Cost of Materials (Class 5)', type: 'Expense', parentId: null, balance: 320000, isHeader: false, currency: 'EUR' },
      { id: 10107, code: '6', nameAr: 'تكاليف الموظفين والرواتب (Personalaufwand)', nameEn: 'Personnel & Payroll (Class 6)', type: 'Expense', parentId: null, balance: 180000, isHeader: false, currency: 'EUR' },
      { id: 10108, code: '7', nameAr: 'المصروفات التشغيلية الأخرى (Sonstige betriebliche Aufwendungen)', nameEn: 'Other Operating Expenses (Class 7)', type: 'Expense', parentId: null, balance: 90000, isHeader: false, currency: 'EUR' }
    ]
  }
];
