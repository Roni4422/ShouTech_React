import {
  Company, User, Account, Warehouse, Material, CustomerParty,
  Invoice, JournalEntry, StockMovement, BackupRecord, CostCenter,
  ChequeRecord, AuditLogEntry
} from '../types';

// Production startup intentionally contains no demo companies, users, balances,
// invoices, inventory, audit events, or backup records. Business data must be
// created through an explicitly configured persistence service.
export const INITIAL_COMPANIES: Company[] = [];
export const INITIAL_USERS: User[] = [];
export const INITIAL_WAREHOUSES: Warehouse[] = [];
export const INITIAL_ACCOUNTS: Account[] = [];
export const INITIAL_MATERIALS: Material[] = [];
export const INITIAL_PARTIES: CustomerParty[] = [];
export const INITIAL_INVOICES: Invoice[] = [];
export const INITIAL_JOURNALS: JournalEntry[] = [];
export const INITIAL_COST_CENTERS: CostCenter[] = [];
export const INITIAL_CHEQUES: ChequeRecord[] = [];
export const INITIAL_MOVEMENTS: StockMovement[] = [];
export const INITIAL_BACKUPS: BackupRecord[] = [];
export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [];
