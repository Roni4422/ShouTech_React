import { 
  Company, User, Account, Warehouse, Material, CustomerParty, 
  Invoice, JournalEntry, StockMovement, BackupRecord, CostCenter, 
  ChequeRecord, AuditLogEntry 
} from '../types';

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'ST-COMP-001',
    code: '001',
    name: 'مجموعة شو تيك الدولية القابضة للحلول والبرمجيات',
    nameEn: 'ShouTech International Enterprise Holding Co.',
    commercialName: 'شو تيك إنتربرايز',
    taxId: '300123456700003',
    commercialRegister: 'CR-1010-987654',
    vatNumber: '300123456700003',
    address: 'المملكة العربية السعودية - الرياض - طريق الملك فهد / سوريا - دمشق - شارع بغداد',
    phone: '+966 11 4567890 / +963 11 2345678',
    currency: 'SAR',
    database: 'SQLite (SHOUTECH_ENTERPRISE_2026.db)',
    isDefault: true,
    accountingTreeTemplateId: 'sa_zatca',
    databaseType: 'sqlite',
    backupLocation: '%LocalAppData%\\ShouTech\\Backups',
    autoCloudBackup: true,
    maxCloudBackups: 3,
    lastBackupAt: '2026-10-19 08:00:00',
    lastCloudBackupAt: '2026-10-19 08:00:00'
  },
  {
    id: 'ST-COMP-002',
    code: '002',
    name: 'شركة الآفاق والتقنية المتقدمة للتجارة والتوريدات',
    nameEn: 'Advanced Horizons & Technology Trading Co.',
    commercialName: 'الآفاق المتقدمة',
    taxId: '300987654300003',
    commercialRegister: 'CR-1010-123456',
    vatNumber: '300987654300003',
    address: 'جدة - طريق الأمير سلطان / دبي - الخليج التجاري',
    phone: '+966 12 6543210 / +971 4 3219876',
    currency: 'SAR',
    database: 'SQLite (HORIZONS_ENTERPRISE_2026.db)',
    isDefault: false,
    accountingTreeTemplateId: 'uae_vat',
    databaseType: 'sqlite',
    backupLocation: 'D:\\ShouTech_Backups\\Horizons\\',
    autoCloudBackup: true,
    maxCloudBackups: 3,
    lastBackupAt: '2026-10-18 18:00:00',
    lastCloudBackupAt: '2026-10-18 18:00:00'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-admin',
    username: 'admin',
    fullName: 'المهندس رامي الحلبي (مدير النظام والمخاطر)',
    fullNameEn: 'Eng. Rami Al-Halabi (System Admin)',
    role: 'admin',
    email: 'admin@shoutech.com',
    active: true,
    lastLogin: '2026-10-19 08:15:00',
    permissions: ['all', 'manage_users', 'post_invoices', 'reverse_invoices', 'backup', 'settings', 'reports_unrestricted']
  },
  {
    id: 'usr-accountant',
    username: 'accountant',
    fullName: 'أحمد السعيد (كبير المحاسبين والمدقق المالي)',
    fullNameEn: 'Ahmad Al-Saeed (Senior Accountant)',
    role: 'user',
    email: 'accounting@shoutech.com',
    active: true,
    lastLogin: '2026-10-19 08:22:00',
    permissions: ['create_invoice', 'post_invoices', 'journals_manage', 'cheques_manage', 'view_reports']
  },
  {
    id: 'usr-cashier',
    username: 'cashier',
    fullName: 'عمر القاسم (كاشير صالة ونقاط البيع POS)',
    fullNameEn: 'Omar Al-Qasim (POS Cashier)',
    role: 'user',
    email: 'pos.cashier@shoutech.com',
    active: true,
    lastLogin: '2026-10-19 08:30:00',
    permissions: ['pos_sale', 'print_receipt', 'shift_close']
  },
  {
    id: 'usr-viewer',
    username: 'auditor',
    fullName: 'د. فيصل المعماري (مراقب الحسابات الخارجي)',
    fullNameEn: 'Dr. Faisal Al-Memari (External Auditor)',
    role: 'viewer',
    email: 'auditor@shoutech.com',
    active: true,
    lastLogin: '2026-10-17 14:00:00',
    permissions: ['view_only', 'audit_logs_read']
  }
];

export const INITIAL_WAREHOUSES: Warehouse[] = [
  {
    id: 1,
    code: 'WH01',
    cardNo: 1,
    nameAr: 'المستودع اللوجستي المركزي الرئيسي (الرياض)',
    nameEn: 'Central Logistics Hub (Riyadh)',
    parentId: null,
    address: 'المنطقة الصناعية الثانية - قطاع التخزين 12',
    city: 'Riyadh',
    aisle: 'A',
    rack: '01',
    shelf: '01',
    isDefault: true,
    isActive: true,
    notes: 'المستودع الرئيسي لاستقبال شحنات الاستيراد وتغذية الفروع'
  },
  {
    id: 2,
    code: 'WH02',
    cardNo: 2,
    nameAr: 'مستودع صالة العرض والمبيعات المباشرة (العليا)',
    nameEn: 'Showroom Store & POS Depot (Olaya)',
    parentId: 1,
    address: 'شارع العليا العام - مقابل برج المملكة',
    city: 'Riyadh',
    aisle: 'B',
    rack: '02',
    shelf: '01',
    isDefault: false,
    isActive: true,
    notes: 'مخصص لمبيعات نقاط البيع المباشرة والتسليم الفوري'
  },
  {
    id: 3,
    code: 'WH03',
    cardNo: 3,
    nameAr: 'مستودع المنطقة الغربية والتوزيع الإقليمي (جدة)',
    nameEn: 'Western Regional Distribution Depot (Jeddah)',
    parentId: 1,
    address: 'منطقة الخمرة اللوجستية - مستودع 45',
    city: 'Jeddah',
    aisle: 'C',
    rack: '04',
    shelf: '02',
    isDefault: false,
    isActive: true,
    notes: 'تغذية عملاء المنطقة الغربية وموانئ البحر الأحمر'
  },
  {
    id: 4,
    code: 'WH04',
    cardNo: 4,
    nameAr: 'مستودع المواد الخام وخطوط التجميع والتصنيع',
    nameEn: 'Raw Materials & Assembly Line Depot',
    parentId: 1,
    address: 'مجمع الصناعات المتقدمة - هنجر 8',
    city: 'Riyadh',
    aisle: 'D',
    rack: '01',
    shelf: '03',
    isDefault: false,
    isActive: true,
    notes: 'مستودع مخصص لأوامر الإنتاج والتصنيع MRP'
  },
  {
    id: 5,
    code: 'WH05',
    cardNo: 5,
    nameAr: 'مستودع بضاعة الأمانة والمعارض الخارجية',
    nameEn: 'Consignment & External Exhibition Depot',
    parentId: 1,
    address: 'مركز المعارض الدولي - جناح 14',
    city: 'Riyadh',
    aisle: 'E',
    rack: '01',
    shelf: '01',
    isDefault: false,
    isActive: true,
    notes: 'بضائع مسلمة برسم البيع ومعارض سنوية'
  }
];

export const INITIAL_ACCOUNTS: Account[] = [
  // 1. الأصول (Assets)
  { code: '1', nameAr: 'الأصول', nameEn: 'Assets', type: 'Asset', parentCode: null, level: 1, balance: 1485600.00, currency: 'SAR', isActive: true, isHeader: true },
  { code: '11', nameAr: 'الأصول المتداولة', nameEn: 'Current Assets', type: 'Asset', parentCode: '1', level: 2, balance: 945600.00, currency: 'SAR', isActive: true, isHeader: true },
  { code: '1101', nameAr: 'الصندوق الرئيسي - النقدية بالريال', nameEn: 'Main Cash Box (SAR)', type: 'Asset', parentCode: '11', level: 3, balance: 84500.00, currency: 'SAR', isActive: true, isHeader: false },
  { code: '1102', nameAr: 'صندوق الكاشير ونقاط البيع POS', nameEn: 'POS Cashier Till', type: 'Asset', parentCode: '11', level: 3, balance: 12400.00, currency: 'SAR', isActive: true, isHeader: false },
  { code: '1103', nameAr: 'مصرف الراجحي التجاري - حساب جاري', nameEn: 'Al Rajhi Bank Current Account', type: 'Asset', parentCode: '11', level: 3, balance: 345000.00, currency: 'SAR', isActive: true, isHeader: false },
  { code: '1104', nameAr: 'البنك الأهلي السعودي SNB - حساب التسهيلات', nameEn: 'SNB National Bank Account', type: 'Asset', parentCode: '11', level: 3, balance: 218500.00, currency: 'SAR', isActive: true, isHeader: false },
  { code: '1105', nameAr: 'أوراق القبض (شيكات برسم التحصيل)', nameEn: 'Notes Receivable (Cheques)', type: 'Asset', parentCode: '11', level: 3, balance: 78000.00, currency: 'SAR', isActive: true, isHeader: false },
  { code: '1106', nameAr: 'العملاء والمدينون التجاريون', nameEn: 'Trade Accounts Receivable', type: 'Asset', parentCode: '11', level: 3, balance: 142200.00, currency: 'SAR', isActive: true, isHeader: false },
  { code: '1107', nameAr: 'مخزون بضاعة المستودعات', nameEn: 'Merchandise Inventory', type: 'Asset', parentCode: '11', level: 3, balance: 65000.00, currency: 'SAR', isActive: true, isHeader: false },
  
  // الأصول الثابتة
  { code: '12', nameAr: 'الأصول غير المتداولة (الثابتة)', nameEn: 'Non-Current Assets', type: 'Asset', parentCode: '1', level: 2, balance: 540000.00, currency: 'SAR', isActive: true, isHeader: true },
  { code: '1201', nameAr: 'أجهزة الخوادم والشبكات ومحطات العمل ERP', nameEn: 'IT Hardware & Enterprise Servers', type: 'Asset', parentCode: '12', level: 3, balance: 280000.00, currency: 'SAR', isActive: true, isHeader: false },
  { code: '1202', nameAr: 'شاحنات وأسطول النقل والتوزيع اللوجستي', nameEn: 'Fleet Vehicles & Trucks', type: 'Asset', parentCode: '12', level: 3, balance: 260000.00, currency: 'SAR', isActive: true, isHeader: false },

  // 2. الالتزامات (Liabilities)
  { code: '2', nameAr: 'الخصوم والالتزامات', nameEn: 'Liabilities', type: 'Liability', parentCode: null, level: 1, balance: 395400.00, currency: 'SAR', isActive: true, isHeader: true },
  { code: '21', nameAr: 'الالتزامات المتداولة القصيرة الأجل', nameEn: 'Current Liabilities', type: 'Liability', parentCode: '2', level: 2, balance: 395400.00, currency: 'SAR', isActive: true, isHeader: true },
  { code: '2101', nameAr: 'الموردون والدائنون التجاريون', nameEn: 'Trade Accounts Payable', type: 'Liability', parentCode: '21', level: 3, balance: 198000.00, currency: 'SAR', isActive: true, isHeader: false },
  { code: '2102', nameAr: 'أوراق الدفع (شيكات صادرة مستحقة)', nameEn: 'Notes Payable (Cheques Issued)', type: 'Liability', parentCode: '21', level: 3, balance: 85000.00, currency: 'SAR', isActive: true, isHeader: false },
  { code: '2103', nameAr: 'أمانات ضريبة القيمة المضافة ZATCA (15%)', nameEn: 'VAT Payable (ZATCA 15%)', type: 'Liability', parentCode: '21', level: 3, balance: 52400.00, currency: 'SAR', isActive: true, isHeader: false },
  { code: '2104', nameAr: 'مستحقات ورواتب الموظفين والبدلات', nameEn: 'Accrued Salaries & Benefits', type: 'Liability', parentCode: '21', level: 3, balance: 60000.00, currency: 'SAR', isActive: true, isHeader: false },

  // 3. حقوق الملكية (Equity)
  { code: '3', nameAr: 'حقوق الملكية ورأس المال', nameEn: 'Equity', type: 'Equity', parentCode: null, level: 1, balance: 1090200.00, currency: 'SAR', isActive: true, isHeader: true },
  { code: '3101', nameAr: 'رأس المال المدفوع المعتمد', nameEn: 'Paid-in Capital', type: 'Equity', parentCode: '3', level: 2, balance: 800000.00, currency: 'SAR', isActive: true, isHeader: false },
  { code: '3102', nameAr: 'الأرباح المبقاة والمدورة من سنوات سابقة', nameEn: 'Retained Earnings', type: 'Equity', parentCode: '3', level: 2, balance: 290200.00, currency: 'SAR', isActive: true, isHeader: false },

  // 4. الإيرادات (Revenues)
  { code: '4', nameAr: 'الإيرادات والمبيعات التشغيلية', nameEn: 'Revenues', type: 'Revenue', parentCode: null, level: 1, balance: 685000.00, currency: 'SAR', isActive: true, isHeader: true },
  { code: '4101', nameAr: 'إيرادات مبيعات نقدية POS ونقاط البيع', nameEn: 'POS Retail Sales Revenue', type: 'Revenue', parentCode: '4', level: 2, balance: 285000.00, currency: 'SAR', isActive: true, isHeader: false },
  { code: '4102', nameAr: 'إيرادات مبيعات آجلة وعقود الشركات', nameEn: 'Corporate Enterprise Sales', type: 'Revenue', parentCode: '4', level: 2, balance: 400000.00, currency: 'SAR', isActive: true, isHeader: false },

  // 5. المصاريف (Expenses & COGS)
  { code: '5', nameAr: 'المصروفات وتكلفة المبيعات', nameEn: 'Expenses & COGS', type: 'Expense', parentCode: null, level: 1, balance: 420000.00, currency: 'SAR', isActive: true, isHeader: true },
  { code: '5101', nameAr: 'تكلفة البضاعة المباعة (COGS)', nameEn: 'Cost of Goods Sold', type: 'Expense', parentCode: '5', level: 2, balance: 280000.00, currency: 'SAR', isActive: true, isHeader: false },
  { code: '5201', nameAr: 'مصروفات الرواتب والأجور والبدلات', nameEn: 'Salaries & Wages Expense', type: 'Expense', parentCode: '5', level: 2, balance: 95000.00, currency: 'SAR', isActive: true, isHeader: false },
  { code: '5202', nameAr: 'إيجارات مقرات الشركة والمستودعات', nameEn: 'Rents Expense (HQ & Warehouses)', type: 'Expense', parentCode: '5', level: 2, balance: 35000.00, currency: 'SAR', isActive: true, isHeader: false },
  { code: '5203', nameAr: 'مصروفات الصيانة وتشغيل أسطول التوصيل', nameEn: 'Fleet Logistics & Maintenance', type: 'Expense', parentCode: '5', level: 2, balance: 10000.00, currency: 'SAR', isActive: true, isHeader: false }
];

export const INITIAL_MATERIALS: Material[] = [
  {
    id: 101,
    code: 'MAT-101',
    barcode: '6281001001011',
    barcode2: '6281001001012',
    nameAr: 'خادم شو تيك إنتربرايز ShouTech Rack Server 2U Xeon',
    nameEn: 'ShouTech Rack Server 2U Intel Xeon 64GB',
    category: 'Servers',
    group: 'Enterprise Hardware',
    defaultWarehouseId: 1,
    defaultUnit: 'Unit',
    unit2: 'Box (2)',
    unit2Factor: 2,
    priceRetail: 12500.00,
    priceWholesale: 10800.00,
    priceSpecial: 9900.00,
    priceMin: 9200.00,
    cost: 8400.00,
    standardCost: 8400.00,
    lastPurchaseCost: 8200.00,
    costMethod: 'weighted_avg',
    qtyOnHand: 18,
    minQty: 4,
    maxQty: 50,
    reorderQty: 8,
    taxRate: 15,
    taxable: true,
    active: true,
    notes: 'معتمد لتركيب قواعد بيانات ERP الموزعة'
  },
  {
    id: 102,
    code: 'MAT-102',
    barcode: '6281002002022',
    nameAr: 'محطة نقطة بيع ذكية مزدوجة الشاشة Dual POS Terminal 15.6"',
    nameEn: 'Dual-Screen Smart POS Terminal 15.6 Inch',
    category: 'POS Systems',
    group: 'Retail Hardware',
    defaultWarehouseId: 2,
    defaultUnit: 'Set',
    priceRetail: 3450.00,
    priceWholesale: 2900.00,
    priceSpecial: 2750.00,
    priceMin: 2500.00,
    cost: 2150.00,
    standardCost: 2150.00,
    lastPurchaseCost: 2100.00,
    costMethod: 'fifo',
    qtyOnHand: 34,
    minQty: 6,
    maxQty: 80,
    reorderQty: 12,
    taxRate: 15,
    taxable: true,
    active: true,
    notes: 'شاشة كاشير تعمل باللمس + شاشة ترويجية للعميل'
  },
  {
    id: 103,
    code: 'MAT-103',
    barcode: '6281003003033',
    nameAr: 'طابعة فواتير وإيصالات حرارية سريعة 80mm USB/LAN/WiFi',
    nameEn: 'Thermal Receipt Printer 80mm ESC/POS Auto-Cutter',
    category: 'Printers',
    group: 'POS Accessories',
    defaultWarehouseId: 2,
    defaultUnit: 'Piece',
    priceRetail: 650.00,
    priceWholesale: 520.00,
    priceSpecial: 480.00,
    priceMin: 450.00,
    cost: 360.00,
    standardCost: 360.00,
    lastPurchaseCost: 350.00,
    costMethod: 'weighted_avg',
    qtyOnHand: 65,
    minQty: 15,
    maxQty: 150,
    reorderQty: 25,
    taxRate: 15,
    taxable: true,
    active: true,
    notes: 'متوافقة مع أوامر ESC/POS وقاطع آلي ومخرج درج نقدية'
  },
  {
    id: 104,
    code: 'MAT-104',
    barcode: '6281004004044',
    nameAr: 'ماسح باركود لاسلكي صناعي ثنائي الأبعاد 2D QR Bluetooth',
    nameEn: 'Industrial 2D Wireless Barcode & QR Scanner',
    category: 'Scanners',
    group: 'Warehouse Tools',
    defaultWarehouseId: 1,
    defaultUnit: 'Piece',
    priceRetail: 580.00,
    priceWholesale: 460.00,
    priceSpecial: 420.00,
    priceMin: 390.00,
    cost: 310.00,
    standardCost: 310.00,
    lastPurchaseCost: 300.00,
    costMethod: 'weighted_avg',
    qtyOnHand: 48,
    minQty: 10,
    maxQty: 100,
    reorderQty: 20,
    taxRate: 15,
    taxable: true,
    active: true,
    notes: 'قراءة فائقة السرعة للأكواد التالفة وشاشات الجوال وZATCA'
  },
  {
    id: 105,
    code: 'MAT-105',
    barcode: '2001048501188',
    nameAr: 'بن قهوة مختصة كولومبي فاخر (وزني ميزان إلكتروني)',
    nameEn: 'Premium Colombian Coffee Beans (Weight Scale Item)',
    category: 'Perishables',
    group: 'Weight Items',
    defaultWarehouseId: 2,
    defaultUnit: 'Kg',
    priceRetail: 95.00,
    priceWholesale: 78.00,
    priceSpecial: 72.00,
    priceMin: 68.00,
    cost: 54.00,
    standardCost: 54.00,
    lastPurchaseCost: 52.00,
    costMethod: 'weighted_avg',
    qtyOnHand: 140,
    minQty: 20,
    maxQty: 300,
    reorderQty: 50,
    taxRate: 15,
    taxable: true,
    active: true,
    notes: 'مادة وزنية متوافقة مع ميزان الباركود الإلكتروني بادئة 20'
  },
  {
    id: 106,
    code: 'MAT-106',
    barcode: '6281006006066',
    nameAr: 'طابعة لصاقات باركود احترافية حرارية Zebra ZD420 203 DPI',
    nameEn: 'Zebra ZD420 Barcode Label Printer 203 DPI',
    category: 'Printers',
    group: 'Label Printers',
    defaultWarehouseId: 1,
    defaultUnit: 'Piece',
    priceRetail: 1450.00,
    priceWholesale: 1220.00,
    priceSpecial: 1150.00,
    priceMin: 1050.00,
    cost: 890.00,
    standardCost: 890.00,
    lastPurchaseCost: 870.00,
    costMethod: 'fifo',
    qtyOnHand: 22,
    minQty: 5,
    maxQty: 40,
    reorderQty: 8,
    taxRate: 15,
    taxable: true,
    active: true,
    notes: 'تدعم طباعة لصاقات المستودعات ومقاسات الأدوية والأغذية'
  },
  {
    id: 107,
    code: 'MAT-107',
    barcode: '6281007007077',
    nameAr: 'درج نقدية إلكتروني شديد التحمل فولاذي 5 خانات للمال',
    nameEn: 'Heavy Duty Metal Cash Drawer RJ11 5-Bill',
    category: 'POS Accessories',
    group: 'Cash Drawers',
    defaultWarehouseId: 2,
    defaultUnit: 'Piece',
    priceRetail: 380.00,
    priceWholesale: 290.00,
    priceSpecial: 260.00,
    priceMin: 240.00,
    cost: 190.00,
    standardCost: 190.00,
    lastPurchaseCost: 185.00,
    costMethod: 'weighted_avg',
    qtyOnHand: 50,
    minQty: 10,
    maxQty: 100,
    reorderQty: 15,
    taxRate: 15,
    taxable: true,
    active: true,
    notes: 'فتح آلي عبر نبضة الطابعة ESC/POS ومفتاح أمان ثلاثي الأوضاع'
  },
  {
    id: 108,
    code: 'MAT-108',
    barcode: '6281008008088',
    nameAr: 'رول ورق حراري عالي الجودة 80mm × 70m (كرتون 50 رول)',
    nameEn: 'Thermal Paper Rolls 80mm x 70m (Box of 50)',
    category: 'Consumables',
    group: 'Paper Rolls',
    defaultWarehouseId: 1,
    defaultUnit: 'Box',
    priceRetail: 165.00,
    priceWholesale: 135.00,
    priceSpecial: 125.00,
    priceMin: 115.00,
    cost: 92.00,
    standardCost: 92.00,
    lastPurchaseCost: 90.00,
    costMethod: 'weighted_avg',
    qtyOnHand: 180,
    minQty: 30,
    maxQty: 500,
    reorderQty: 60,
    taxRate: 15,
    taxable: true,
    active: true,
    notes: 'ورق حراري ياباني خالٍ من مادة BPA مقاوم للحرارة والرطوبة'
  }
];

export const INITIAL_PARTIES: CustomerParty[] = [
  {
    id: 1,
    code: 'CUST-001',
    nameAr: 'شركة سلاسل الإمداد العالمية للتجارة والمقاولات',
    nameEn: 'Global Supply Chains Co. Ltd.',
    phone: '+966 11 4889900',
    email: 'procurement@globalsupply.sa',
    balance: 45200.00,
    creditLimit: 150000.00,
    city: 'الرياض',
    type: 'Customer'
  },
  {
    id: 2,
    code: 'CUST-002',
    nameAr: 'مجموعة المتاجر الذكية للتجزئة والأسواق الكبرى',
    nameEn: 'Smart Stores Retail Supermarkets Group',
    phone: '+966 12 6901122',
    email: 'accounts@smartstores.sa',
    balance: 68400.00,
    creditLimit: 250000.00,
    city: 'جدة',
    type: 'Customer'
  },
  {
    id: 3,
    code: 'CUST-003',
    nameAr: 'مؤسسة ركائز المستقبل للتطوير التقني والحلول',
    nameEn: 'Future Pillars Tech Solutions',
    phone: '+966 13 8334455',
    email: 'info@futurepillars.sa',
    balance: 28600.00,
    creditLimit: 100000.00,
    city: 'الدمام',
    type: 'Customer'
  },
  {
    id: 4,
    code: 'VEND-001',
    nameAr: 'شركة المورد المباشر للمعدات والخوادم العالمية',
    nameEn: 'Global Direct Hardware & Servers Supplier',
    phone: '+966 11 2110033',
    email: 'orders@directsupplier.com',
    balance: 115000.00,
    creditLimit: 500000.00,
    city: 'الرياض',
    type: 'Supplier'
  },
  {
    id: 5,
    code: 'VEND-002',
    nameAr: 'مؤسسة التقنية الآسيوية للقطع والمكونات الصناعية',
    nameEn: 'Asian Tech Components Industrial Supplier',
    phone: '+971 4 2998877',
    email: 'sales@asiantech.ae',
    balance: 83000.00,
    creditLimit: 300000.00,
    city: 'دبي / الدمام',
    type: 'Supplier'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 1,
    docNo: 'INV-2026-00101',
    date: '2026-10-18',
    partyName: 'شركة سلاسل الإمداد العالمية للتجارة والمقاولات',
    partyPhone: '+966 11 4889900',
    warehouseId: 1,
    status: 'Posted',
    kind: 'sales',
    lines: [
      { id: 'l1', materialCode: 'MAT-101', materialName: 'خادم شو تيك إنتربرايز ShouTech Rack Server 2U Xeon', qty: 2, unitPrice: 12500, discountPct: 5, taxRate: 15, lineTotal: 27312.50 },
      { id: 'l2', materialCode: 'MAT-103', materialName: 'طابعة فواتير وإيصالات حرارية سريعة 80mm USB/LAN/WiFi', qty: 4, unitPrice: 650, discountPct: 0, taxRate: 15, lineTotal: 2990.00 },
      { id: 'l3', materialCode: 'MAT-104', materialName: 'ماسح باركود لاسلكي صناعي ثنائي الأبعاد 2D QR Bluetooth', qty: 6, unitPrice: 580, discountPct: 0, taxRate: 15, lineTotal: 4002.00 }
    ],
    notes: 'فاتورة مبيعات معتمدة - مشروع التوريد المؤسسي للمقر',
    totalBeforeTax: 29830.00,
    taxTotal: 4474.50,
    grandTotal: 34304.50,
    paymentMethod: 'Credit'
  },
  {
    id: 2,
    docNo: 'POS-2026-00582',
    date: '2026-10-19',
    partyName: 'عميل نقدي صالة العرض (POS Client)',
    partyPhone: '+966 50 1234567',
    warehouseId: 2,
    status: 'Posted',
    kind: 'pos',
    lines: [
      { id: 'l4', materialCode: 'MAT-102', materialName: 'محطة نقطة بيع ذكية مزدوجة الشاشة Dual POS Terminal 15.6"', qty: 1, unitPrice: 3450, discountPct: 0, taxRate: 15, lineTotal: 3967.50 },
      { id: 'l5', materialCode: 'MAT-107', materialName: 'درج نقدية إلكتروني شديد التحمل فولاذي 5 خانات للمال', qty: 1, unitPrice: 380, discountPct: 0, taxRate: 15, lineTotal: 437.00 },
      { id: 'l6', materialCode: 'MAT-108', materialName: 'رول ورق حراري عالي الجودة 80mm × 70m (كرتون 50 رول)', qty: 2, unitPrice: 165, discountPct: 0, taxRate: 15, lineTotal: 379.50 }
    ],
    notes: 'مبيعات كاشير فورية - سداد إلكتروني مدى POS',
    totalBeforeTax: 4160.00,
    taxTotal: 624.00,
    grandTotal: 4784.00,
    paymentMethod: 'Visa'
  },
  {
    id: 3,
    docNo: 'PUR-2026-00045',
    date: '2026-10-16',
    partyName: 'شركة المورد المباشر للمعدات والخوادم العالمية',
    partyPhone: '+966 11 2110033',
    warehouseId: 1,
    status: 'Posted',
    kind: 'purchase',
    lines: [
      { id: 'l7', materialCode: 'MAT-101', materialName: 'خادم شو تيك إنتربرايز ShouTech Rack Server 2U Xeon', qty: 10, unitPrice: 8400, discountPct: 0, taxRate: 15, lineTotal: 96600.00 },
      { id: 'l8', materialCode: 'MAT-106', materialName: 'طابعة لصاقات باركود احترافية حرارية Zebra ZD420 203 DPI', qty: 15, unitPrice: 890, discountPct: 0, taxRate: 15, lineTotal: 15352.50 }
    ],
    notes: 'فاتورة توريد وشراء بضاعة جديدة للمستودع الرئيسي',
    totalBeforeTax: 97350.00,
    taxTotal: 14602.50,
    grandTotal: 111952.50,
    paymentMethod: 'Credit'
  }
];

export const INITIAL_JOURNALS: JournalEntry[] = [
  {
    id: 1,
    docNo: 'JV-2026-0001',
    date: '2026-10-01',
    notes: 'قيد افتتاح الأرصدة والافتتاحية للسنة المالية 2026',
    status: 'Posted',
    postedBy: 'admin',
    postedAt: '2026-10-01 09:00:00',
    totalDebit: 1485600.00,
    totalCredit: 1485600.00,
    lines: [
      { id: 'j1', accountCode: '1103', accountName: 'مصرف الراجحي التجاري - حساب جاري', debit: 345000.00, credit: 0, note: 'رصيد بنك افتتاحي معتمد', costCenter: 'CC-01' },
      { id: 'j2', accountCode: '1104', accountName: 'البنك الأهلي السعودي SNB - حساب التسهيلات', debit: 218500.00, credit: 0, note: 'رصيد بنك أهلي افتتاحي', costCenter: 'CC-01' },
      { id: 'j3', accountCode: '1101', accountName: 'الصندوق الرئيسي - النقدية بالريال', debit: 84500.00, credit: 0, note: 'نقدية الصندوق الرئيسي', costCenter: 'CC-01' },
      { id: 'j4', accountCode: '1107', accountName: 'مخزون بضاعة المستودعات', debit: 297600.00, credit: 0, note: 'بضاعة جرد أول المدة للمستودعات', costCenter: 'CC-03' },
      { id: 'j5', accountCode: '1201', accountName: 'أجهزة الخوادم والشبكات ومحطات العمل ERP', debit: 280000.00, credit: 0, note: 'أصول أجهزة وشبكات ثابتة', costCenter: 'CC-05' },
      { id: 'j6', accountCode: '1202', accountName: 'شاحنات وأسطول النقل والتوزيع اللوجستي', debit: 260000.00, credit: 0, note: 'أصول أسطول التوصيل وسيارات', costCenter: 'CC-04' },
      { id: 'j7', accountCode: '2101', accountName: 'الموردون والدائنون التجاريون', debit: 0, credit: 198000.00, note: 'رصيد دائنون تجاريون افتتاحي', costCenter: 'CC-01' },
      { id: 'j8', accountCode: '2102', accountName: 'أوراق الدفع (شيكات صادرة مستحقة)', debit: 0, credit: 85000.00, note: 'شيكات التزامات آجلة', costCenter: 'CC-01' },
      { id: 'j9', accountCode: '2104', accountName: 'مستحقات ورواتب الموظفين والبدلات', debit: 0, credit: 112400.00, note: 'مستحقات رواتب دورة سابقة', costCenter: 'CC-01' },
      { id: 'j10', accountCode: '3101', accountName: 'رأس المال المدفوع المعتمد', debit: 0, credit: 800000.00, note: 'رأس المال النظامي المعتمد', costCenter: 'CC-01' },
      { id: 'j11', accountCode: '3102', accountName: 'الأرباح المبقاة والمدورة من سنوات سابقة', debit: 0, credit: 290200.00, note: 'أرباح مدورة مرحلة', costCenter: 'CC-01' }
    ]
  },
  {
    id: 2,
    docNo: 'JV-2026-0042',
    date: '2026-10-18',
    notes: 'قيد ترحيل مبيعات الفاتورة رقم INV-2026-00101 وإثبات ضريبة ZATCA',
    status: 'Posted',
    postedBy: 'accountant',
    postedAt: '2026-10-18 16:30:00',
    totalDebit: 34304.50,
    totalCredit: 34304.50,
    lines: [
      { id: 'j12', accountCode: '1106', accountName: 'العملاء والمدينون التجاريون', debit: 34304.50, credit: 0, note: 'إثبات مديونية شركة سلاسل الإمداد', costCenter: 'CC-02' },
      { id: 'j13', accountCode: '4102', accountName: 'إيرادات مبيعات آجلة وعقود الشركات', debit: 0, credit: 29830.00, note: 'صافي إيراد مبيعات أجهزة وخوادم', costCenter: 'CC-02' },
      { id: 'j14', accountCode: '2103', accountName: 'أمانات ضريبة القيمة المضافة ZATCA (15%)', debit: 0, credit: 4474.50, note: 'ضريبة القيمة المضافة 15% ZATCA', costCenter: 'CC-02' }
    ]
  }
];

export const INITIAL_COST_CENTERS: CostCenter[] = [
  { id: 'cc-1', code: 'CC-01', nameAr: 'الإدارة العامة والمقر الرئيسي', nameEn: 'HQ & General Administration', budget: 180000.00, spent: 48200.00, isHeader: true },
  { id: 'cc-2', code: 'CC-02', nameAr: 'قطاع المبيعات وعقود الشركات', nameEn: 'Enterprise Sales & Contracts', budget: 220000.00, spent: 78500.00, isHeader: false },
  { id: 'cc-3', code: 'CC-03', nameAr: 'إدارة المستودعات واللوجستيات', nameEn: 'Warehousing & Supply Chain', budget: 140000.00, spent: 39100.00, isHeader: false },
  { id: 'cc-4', code: 'CC-04', nameAr: 'أسطول النقل وخدمات التوصيل', nameEn: 'Fleet Transport & Delivery', budget: 90000.00, spent: 28400.00, isHeader: false },
  { id: 'cc-5', code: 'CC-05', nameAr: 'قسم تكنولوجيا المعلومات وخوادم ERP', nameEn: 'IT & Cloud Infrastructure', budget: 160000.00, spent: 62000.00, isHeader: false }
];

export const INITIAL_CHEQUES: ChequeRecord[] = [
  {
    id: 'chq-101',
    chequeNo: 'CHK-890214',
    date: '2026-10-10',
    dueDate: '2026-10-28',
    bankName: 'مصرف الراجحي',
    partyName: 'شركة سلاسل الإمداد العالمية',
    amount: 34304.50,
    type: 'receivable',
    status: 'under_collection',
    notes: 'شيك سداد فاتورة INV-2026-00101 برسم التحصيل'
  },
  {
    id: 'chq-102',
    chequeNo: 'CHK-554109',
    date: '2026-10-05',
    dueDate: '2026-10-15',
    bankName: 'البنك الأهلي السعودي SNB',
    partyName: 'مجموعة المتاجر الذكية',
    amount: 45000.00,
    type: 'receivable',
    status: 'collected',
    notes: 'شيك محصل ومودع في حساب مصرف الراجحي الجاري'
  },
  {
    id: 'chq-103',
    chequeNo: 'CHK-112093',
    date: '2026-10-12',
    dueDate: '2026-11-05',
    bankName: 'مصرف الراجحي',
    partyName: 'شركة المورد المباشر للمعدات',
    amount: 50000.00,
    type: 'payable',
    status: 'under_collection',
    notes: 'دفعة حساب شراء بضاعة مستحقة للمورد'
  }
];

export const INITIAL_MOVEMENTS: StockMovement[] = [
  {
    id: 1,
    docNo: 'REC-2026-001',
    date: '2026-10-16',
    moveType: 'Receipt',
    materialCode: 'MAT-101',
    materialName: 'خادم شو تيك إنتربرايز ShouTech Rack Server 2U Xeon',
    warehouseCode: 'WH01',
    unit: 'Unit',
    qtyIn: 10,
    qtyOut: 0,
    unitCost: 8400.00,
    totalValue: 84000.00,
    note: 'إدخال بضاعة استيراد مستودع الرياض الرئيسي'
  },
  {
    id: 2,
    docNo: 'ISS-2026-008',
    date: '2026-10-18',
    moveType: 'Issue',
    materialCode: 'MAT-101',
    materialName: 'خادم شو تيك إنتربرايز ShouTech Rack Server 2U Xeon',
    warehouseCode: 'WH01',
    unit: 'Unit',
    qtyIn: 0,
    qtyOut: 2,
    unitCost: 8400.00,
    totalValue: 16800.00,
    note: 'إخراج بضاعة تسليم فاتورة بيع INV-2026-00101'
  }
];

export const INITIAL_BACKUPS: BackupRecord[] = [
  {
    id: 'bkp-20261019-0800',
    name: 'STBK2_CLOUD_MIRROR_20261019_080000.stbk2',
    date: '2026-10-19 08:00:00',
    size: '15.4 MB',
    status: 'Valid',
    note: 'نسخة سحابية مرآة عند بداية العمل باليوم الجديد (1/3)',
    type: 'MIRROR_FULL',
    storageTarget: 'cloud_vault',
    companyCode: '001',
    triggerEvent: 'session_start',
    encryptionAlgorithm: 'AES-256-GCM / Argon2id (Military FIPS 140-3)',
    sha256Checksum: 'a7c9381f802f012bceaa087612c6a85e8d35661b1e9cfa4d920516ccfa307e2d'
  },
  {
    id: 'bkp-20261018-1800',
    name: 'STBK2_CLOUD_MIRROR_20261018_180000.stbk2',
    date: '2026-10-18 18:00:00',
    size: '15.2 MB',
    status: 'Valid',
    note: 'نسخة سحابية مرآة تلقائية عند نهاية العمل والإغلاق (2/3)',
    type: 'MIRROR_FULL',
    storageTarget: 'cloud_vault',
    companyCode: '001',
    triggerEvent: 'session_end',
    encryptionAlgorithm: 'AES-256-GCM / Argon2id (Military FIPS 140-3)',
    sha256Checksum: '3b09f48501188d302a819fc770281b379e4f1a25c602de7187449c25f1903e1a'
  },
  {
    id: 'bkp-20261017-1800',
    name: 'STBK2_CLOUD_MIRROR_20261017_180000.stbk2',
    date: '2026-10-17 18:00:00',
    size: '14.9 MB',
    status: 'Valid',
    note: 'نسخة سحابية مرآة سابقة بالأرشيف السحابي (3/3)',
    type: 'MIRROR_FULL',
    storageTarget: 'cloud_vault',
    companyCode: '001',
    triggerEvent: 'session_end',
    encryptionAlgorithm: 'AES-256-GCM / Argon2id (Military FIPS 140-3)',
    sha256Checksum: '9e8a7c2b4f1e0d3a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-001',
    timestamp: '2026-10-19 08:00:00',
    user: 'system',
    action: 'STARTUP_ANTI_TAMPER_PASSED',
    module: 'SecurityGuard',
    recordId: 'FIPS-140-3',
    prevHash: '0000000000000000000000000000000000000000000000000000000000000000',
    hash: 'a7c9381f802f012bceaa087612c6a85e8d35661b1e9cfa4d920516ccfa307e2d'
  },
  {
    id: 'aud-002',
    timestamp: '2026-10-19 08:00:05',
    user: 'system',
    action: 'CLOUD_BACKUP_SYNCHRONIZED',
    module: 'CloudVault',
    recordId: 'COMP_001_SLOT_1',
    prevHash: 'a7c9381f802f012bceaa087612c6a85e8d35661b1e9cfa4d920516ccfa307e2d',
    hash: '3b09f48501188d302a819fc770281b379e4f1a25c602de7187449c25f1903e1a'
  },
  {
    id: 'aud-003',
    timestamp: '2026-10-19 08:15:00',
    user: 'admin',
    action: 'AUTH_ZERO_TRUST_SUCCESS',
    module: 'SecurityGuard',
    recordId: 'usr-admin',
    prevHash: '3b09f48501188d302a819fc770281b379e4f1a25c602de7187449c25f1903e1a',
    hash: '9e8a7c2b4f1e0d3a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a'
  }
];
