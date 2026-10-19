export type LanguageCode = 'ar' | 'en' | 'fr' | 'tr' | 'de' | 'es' | 'ru' | 'zh' | 'fa' | 'ur';
export type ThemeMode = 'dark' | 'light';

export type UserRole = 'admin' | 'user' | 'viewer';

export interface User {
  id: string;
  username: string;
  fullName: string;
  fullNameEn: string;
  role: UserRole;
  email: string;
  active: boolean;
  lastLogin?: string;
  permissions: string[];
}

export interface Company {
  id: string;
  code: string;
  name: string;
  nameEn: string;
  commercialName: string;
  taxId: string;
  commercialRegister: string;
  vatNumber: string;
  address: string;
  phone: string;
  currency: string;
  database: string;
  isDefault: boolean;
  accountingTreeTemplateId?: string;
  databaseType?: 'sqlite' | 'postgres' | 'sqlserver' | 'encrypted_local';
  backupLocation?: string; // e.g. '%LocalAppData%\\ShouTech\\Backups' or custom path
  autoCloudBackup?: boolean;
  maxCloudBackups?: number; // max 3
  lastBackupAt?: string;
  lastCloudBackupAt?: string;
}

export type CostMethod = 'weighted_avg' | 'fifo' | 'lifo' | 'standard';

export interface MaterialUnit {
  name: string;
  factor: number;
  barcode: string;
  retailPrice: number;
  wholesalePrice: number;
}

export interface Material {
  id: number;
  code: string;
  barcode: string;
  barcode2?: string;
  barcode3?: string;
  nameAr: string;
  nameEn: string;
  category: string;
  group: string;
  defaultWarehouseId: number;
  defaultUnit: string;
  unit2?: string;
  unit2Factor?: number;
  unit3?: string;
  unit3Factor?: number;
  priceRetail: number;
  priceWholesale: number;
  priceSpecial: number;
  priceMin: number;
  cost: number;
  standardCost: number;
  lastPurchaseCost: number;
  costMethod: CostMethod;
  qtyOnHand: number;
  minQty: number;
  maxQty: number;
  reorderQty: number;
  taxRate: number;
  taxable: boolean;
  active: boolean;
  image?: string;
  notes?: string;
}

export interface Warehouse {
  id: number;
  code: string;
  cardNo: number;
  nameAr: string;
  nameEn: string;
  parentId: number | null;
  address: string;
  city: string;
  aisle?: string;
  rack?: string;
  shelf?: string;
  isDefault: boolean;
  isActive: boolean;
  notes?: string;
}

export type AccountType = 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';

export interface Account {
  id?: string | number;
  code: string;
  nameAr: string;
  nameEn: string;
  type: AccountType;
  parentCode?: string | null;
  parentId?: string | number | null;
  level?: number;
  balance?: number;
  currency?: string;
  isActive?: boolean;
  isHeader?: boolean;
}

export interface JournalLine {
  id: string;
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
  note: string;
  costCenter?: string;
}

export interface JournalEntry {
  id: number;
  docNo: string;
  date: string;
  notes: string;
  status: 'Draft' | 'Posted';
  postedBy?: string;
  postedAt?: string;
  lines: JournalLine[];
  totalDebit: number;
  totalCredit: number;
}

export type InvoiceKind = 
  | 'sales' 
  | 'purchase' 
  | 'sales_return' 
  | 'purchase_return' 
  | 'pos' 
  | 'stock_in' 
  | 'stock_out'
  | 'stock_transfer'
  | 'quotation';

export interface InvoiceLine {
  id: string;
  materialId?: number;
  materialCode: string;
  description: string;
  unit: string;
  qty: number;
  unitPrice: number;
  discountPct: number;
  taxRate: number;
  lineTotal: number;
}

export interface Invoice {
  id: number;
  kind: InvoiceKind;
  docNo: string;
  date: string;
  partyCode: string;
  partyName: string;
  currency: string;
  warehouseId: number;
  targetWarehouseId?: number;
  taxRate: number;
  notes: string;
  status: 'Draft' | 'Posted' | 'Reversed';
  reversedDocNo?: string;
  reversalReason?: string;
  postedBy?: string;
  lines: InvoiceLine[];
  subtotal: number;
  taxAmount: number;
  grandTotal: number;
  paymentMethod?: 'Cash' | 'Credit' | 'KNet' | 'Visa';
}

export interface StockMovement {
  id: number;
  docNo: string;
  date: string;
  moveType: string;
  materialCode: string;
  materialName: string;
  warehouseCode: string;
  unit: string;
  qtyIn: number;
  qtyOut: number;
  unitCost: number;
  totalValue: number;
  note: string;
}

export interface CustomerParty {
  id: number;
  code: string;
  nameAr: string;
  nameEn: string;
  phone: string;
  email: string;
  balance: number;
  creditLimit: number;
  city: string;
  type: 'Customer' | 'Supplier' | 'Both';
}

export interface BackupRecord {
  id: string;
  name: string;
  date: string;
  size: string;
  status: 'Valid' | 'Rejected' | 'Not checked';
  note: string;
  type: 'STBK2' | 'MIRROR_FULL';
  storageTarget?: 'local' | 'cloud_vault' | 'custom_path';
  storagePath?: string;
  companyCode?: string;
  triggerEvent?: 'session_end' | 'session_start' | 'manual' | 'daily_scheduled';
  encryptionAlgorithm?: string;
  sha256Checksum?: string;
  snapshotData?: any; // Complete mirror of company, db, users, preferences
}

export interface POSCartItem {
  id: string;
  material: Material;
  selectedUnit: string;
  unitFactor: number;
  qty: number;
  unitPrice: number;
  discountPct: number;
  taxRate: number;
}

export type AppStage = 'splash' | 'company_select' | 'login' | 'main';

export interface CostCenter {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  budget: number;
  spent: number;
  isHeader?: boolean;
  parentId?: string | null;
}

export interface ChequeRecord {
  id: string;
  chequeNo: string;
  date: string;
  dueDate: string;
  bankName: string;
  partyName: string;
  amount: number;
  type: 'receivable' | 'payable'; // ورقة قبض / ورقة دفع
  status: 'under_collection' | 'collected' | 'returned'; // برسم التحصيل / محصل / مرتجع
  notes?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  module: string;
  recordId: string;
  prevHash: string;
  hash: string;
}

export interface SecurityStatus {
  dongleConnected: boolean;
  dongleId: string;
  dongleFirmware: string;
  donglePrimedForReception: boolean;
  dongleListeningPort: string;
  licenseServerUrl: string;
  licenseServerStatus: 'primed_listening' | 'connected' | 'offline_grace_mode';
  serverLeaseDaysRemaining: number;
  antiTamperActive: boolean;
  sha256ChainIntact: boolean;
  failedLoginAttempts: number;
  maxAttempts: number;
  lockoutActive: boolean;
  encryptionMode: string;
  sessionTimeoutMin: number;
  remoteCloudBackupActive: boolean;
  cloudBackupsRetainedCount: number;
  lastCloudBackupTimestamp?: string;
}

export type ActiveWindow = 
  | 'dashboard'
  | 'pos'
  | 'invoices'
  | 'materials'
  | 'warehouses'
  | 'coa'
  | 'costCenters'
  | 'currencies'
  | 'journals'
  | 'cheques'
  | 'closingAccounts'
  | 'financialAnalysis'
  | 'orders'
  | 'crm'
  | 'salesReps'
  | 'manufacturing'
  | 'banks'
  | 'reports'
  | 'aiEnterprise'
  | 'securityCenter'
  | 'tools'
  | 'enterpriseOptions'
  | 'delivery'
  | 'backup'
  | 'dataExchange'
  | 'settings'
  | 'users'
  | 'nativeEngine'
  | 'license'
  | 'about';

// Multi-Window MDI Taskbar Item
export interface DockedWindow {
  id: string;
  windowType: ActiveWindow;
  title: string;
  subTab?: string;
  isMinimized: boolean;
  isMaximized?: boolean;
  openedAt: string;
}

// CRM Models
export interface CRMLead {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Won' | 'Lost';
  estimatedValue: number;
  source: string;
  assignedTo: string;
  createdAt: string;
}

export interface CRMDeal {
  id: string;
  title: string;
  customerName: string;
  amount: number;
  stage: 'Discovery' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  probability: number;
  expectedClose: string;
}

export interface CRMTicket {
  id: string;
  ticketNo: string;
  customerName: string;
  subject: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  assignedAgent: string;
  updatedAt: string;
}

// Manufacturing & BOM (Bill of Materials)
export interface BOMComponent {
  materialCode: string;
  materialName: string;
  qtyRequired: number;
  unit: string;
  unitCost: number;
}

export interface BillOfMaterial {
  id: string;
  bomCode: string;
  outputProductCode: string;
  outputProductName: string;
  batchQty: number;
  unit: string;
  components: BOMComponent[];
  laborCost: number;
  overheadCost: number;
  totalCostPerBatch: number;
  costPerUnit: number;
}

export interface ProductionWorkOrder {
  id: string;
  orderNo: string;
  bomCode: string;
  productName: string;
  plannedQty: number;
  completedQty: number;
  startDate: string;
  dueDate: string;
  status: 'Scheduled' | 'In Production' | 'Quality Check' | 'Completed' | 'Cancelled';
  targetWarehouse: string;
}

// AI Intelligence Models
export interface AIFraudAnomaly {
  id: string;
  type: 'journal' | 'invoice' | 'inventory' | 'auth';
  recordRef: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  confidenceScore: number;
  description: string;
  suggestedAction: string;
  detectedAt: string;
}

export interface AIPredictionMetric {
  period: string;
  predictedRevenue: number;
  predictedExpenses: number;
  projectedCashflow: number;
  confidenceRangeMin: number;
  confidenceRangeMax: number;
}


