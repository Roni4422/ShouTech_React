/**
 * Imported schema reference from the uploaded ShouTech ERP archive.
 * This is documentation metadata only; it is NOT queried from SQLite/PostgreSQL
 * and must not be treated as the deployed schema contract.
 */
export interface ImportedSchemaTable {
  schema: 'fin' | 'inv' | 'pos' | 'crm' | 'hr' | 'aud' | 'ai';
  tableName: string;
  titleAr: string;
  windowId: string;
  columns: string[];
}

export const IMPORTED_SCHEMA_CATALOG: ImportedSchemaTable[] = [
  { schema: 'fin', tableName: 'fin.Accounts', titleAr: 'دليل الحسابات', windowId: 'coa', columns: ['AccountID', 'AccountCode', 'AccountNameAr', 'AccountNameEn', 'AccountType', 'ParentAccountID', 'CurrentBalance', 'IsFinalAccount'] },
  { schema: 'fin', tableName: 'fin.JournalHeaders', titleAr: 'رؤوس القيود اليومية', windowId: 'journals', columns: ['JournalID', 'DocNumber', 'VoucherDate', 'TotalDebit', 'TotalCredit', 'IsPosted', 'IsReversed', 'ReversalReason'] },
  { schema: 'fin', tableName: 'fin.JournalLines', titleAr: 'تفاصيل القيود اليومية', windowId: 'journals', columns: ['LineID', 'JournalID', 'AccountID', 'Debit', 'Credit', 'Memo', 'CostCenterID'] },
  { schema: 'fin', tableName: 'fin.Invoices', titleAr: 'الفواتير التجارية', windowId: 'invoices', columns: ['InvoiceID', 'InvoiceNo', 'InvoiceType', 'InvoiceDate', 'PartyID', 'WarehouseID', 'SubTotal', 'DiscountTotal', 'TaxTotal', 'GrandTotal', 'IsPosted'] },
  { schema: 'inv', tableName: 'inv.Materials', titleAr: 'بطاقات المواد', windowId: 'materials', columns: ['MaterialID', 'MaterialCode', 'PrimaryBarcode', 'MaterialNameAr', 'MaterialNameEn', 'CategoryID', 'CostingMethod', 'CostPrice', 'PriceRetail', 'PriceWholesale', 'ReorderPoint', 'CurrentStock'] },
  { schema: 'inv', tableName: 'inv.Warehouses', titleAr: 'المستودعات', windowId: 'warehouses', columns: ['WarehouseID', 'WarehouseCode', 'WarehouseNameAr', 'KeeperName', 'IsDefault'] },
  { schema: 'inv', tableName: 'inv.StockMovements', titleAr: 'حركات المخزون', windowId: 'warehouses', columns: ['MovementID', 'MovementDate', 'MaterialID', 'WarehouseID', 'MovementType', 'Quantity', 'UnitCost', 'ReferenceType', 'ReferenceNo'] },
  { schema: 'pos', tableName: 'pos.Shifts', titleAr: 'ورديات نقاط البيع', windowId: 'pos', columns: ['ShiftID', 'ShiftNo', 'CashierName', 'StartTime', 'OpeningCash', 'TotalCashSales', 'TotalCardSales'] },
  { schema: 'pos', tableName: 'pos.Transactions', titleAr: 'معاملات نقاط البيع', windowId: 'pos', columns: ['ReceiptID', 'ReceiptNo', 'GrandTotal', 'PaymentMethod', 'CashPaid', 'Change', 'QRCodeValue'] },
  { schema: 'crm', tableName: 'crm.Customers', titleAr: 'العملاء والموردون', windowId: 'crm', columns: ['CustomerID', 'CustomerCode', 'NameAr', 'Type', 'TaxNumber', 'CreditLimit', 'CurrentBalance', 'AccountCode'] },
  { schema: 'hr', tableName: 'hr.Employees', titleAr: 'الموظفون', windowId: 'users', columns: ['EmployeeID', 'EmployeeCode', 'FullNameAr', 'Department', 'JobTitle', 'BasicSalary', 'BankIban'] },
  { schema: 'aud', tableName: 'aud.AuditLogs', titleAr: 'سجل التدقيق', windowId: 'securityCenter', columns: ['AuditID', 'Timestamp', 'OperatorName', 'ActionType', 'TargetTable', 'RecordID', 'Details'] },
  { schema: 'ai', tableName: 'ai.AnomalyEvents', titleAr: 'أحداث اكتشاف الشذوذ', windowId: 'aiEnterprise', columns: ['EventID', 'EventType', 'ConfidenceScore', 'FindingSummary'] }
];
