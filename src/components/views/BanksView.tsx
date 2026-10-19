import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExcelSchedule } from '../common/ExcelSchedule';
import { 
  Building2, Plus, Search, FileText, CheckCircle2, 
  ArrowLeftRight, RefreshCw, AlertCircle, DollarSign 
} from 'lucide-react';

interface BankAccount {
  id: string;
  code: string;
  bankName: string;
  accountNumber: string;
  iban: string;
  currency: string;
  glAccountCode: string;
  ledgerBalance: number;
  statementBalance: number;
  unreconciledDiff: number;
  lastReconciledDate: string;
  facilityLimit: number;
  status: 'Reconciled' | 'Discrepancy' | 'Pending';
}

export const BanksView: React.FC = () => {
  const { currentCompany, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'accounts' | 'reconciliation' | 'projected' | 'balances'>('accounts');

  const [banks, setBanks] = useState<BankAccount[]>([
    { id: '1', code: 'BNK-01', bankName: 'مصرف الراجحي - الحساب الجاري الرئيسي', accountNumber: 'SA8080000123456789012345', iban: 'SA8080000123456789012345', currency: 'SAR', glAccountCode: '1112', ledgerBalance: 185000, statementBalance: 185000, unreconciledDiff: 0, lastReconciledDate: '2026-10-18', facilityLimit: 500000, status: 'Reconciled' },
    { id: '2', code: 'BNK-02', bankName: 'البنك الأهلي التجاري (SNB) - فرع العمليات', accountNumber: 'SA2010000987654321098765', iban: 'SA2010000987654321098765', currency: 'SAR', glAccountCode: '1113', ledgerBalance: 120000, statementBalance: 124500, unreconciledDiff: -4500, lastReconciledDate: '2026-10-17', facilityLimit: 300000, status: 'Discrepancy' },
    { id: '3', code: 'BNK-03', bankName: 'بنك الرياض - حساب الاعتمادات المستندية', accountNumber: 'SA3020000555666777888999', iban: 'SA3020000555666777888999', currency: 'USD', glAccountCode: '1114', ledgerBalance: 45000, statementBalance: 45000, unreconciledDiff: 0, lastReconciledDate: '2026-10-19', facilityLimit: 1000000, status: 'Reconciled' },
    { id: '4', code: 'BNK-04', bankName: 'بنك دبي الإسلامي - فرع المعاملات الدولية', accountNumber: 'AE1203300009988776655443', iban: 'AE1203300009988776655443', currency: 'AED', glAccountCode: '1115', ledgerBalance: 98000, statementBalance: 98000, unreconciledDiff: 0, lastReconciledDate: '2026-10-16', facilityLimit: 250000, status: 'Reconciled' },
  ]);

  const columns = [
    {
      key: 'code',
      header: 'رمز الحساب',
      width: '95px',
      render: (row: BankAccount) => (
        <span className="font-mono font-bold text-cyan-900">{row.code}</span>
      )
    },
    {
      key: 'bankName',
      header: 'اسم البنك والحساب',
      render: (row: BankAccount) => (
        <div>
          <span className="font-semibold text-gray-900 block">{row.bankName}</span>
          <span className="text-[10px] text-gray-500 font-mono">IBAN: {row.iban}</span>
        </div>
      )
    },
    {
      key: 'glAccountCode',
      header: 'حساب الأستاذ',
      width: '90px',
      align: 'center' as const,
      render: (row: BankAccount) => (
        <span className="font-mono text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded text-[11px]">
          {row.glAccountCode}
        </span>
      )
    },
    {
      key: 'currency',
      header: 'العملة',
      width: '75px',
      align: 'center' as const,
      render: (row: BankAccount) => (
        <span className="font-mono font-bold text-gray-800">{row.currency}</span>
      )
    },
    {
      key: 'ledgerBalance',
      header: 'رصيد الدفتر (ERP)',
      width: '120px',
      align: 'left' as const,
      render: (row: BankAccount) => (
        <span className="font-mono font-bold text-gray-900">{row.ledgerBalance.toLocaleString()}</span>
      )
    },
    {
      key: 'statementBalance',
      header: 'رصيد كشف البنك',
      width: '120px',
      align: 'left' as const,
      render: (row: BankAccount) => (
        <span className="font-mono text-blue-900">{row.statementBalance.toLocaleString()}</span>
      )
    },
    {
      key: 'unreconciledDiff',
      header: 'فروقات التسوية',
      width: '105px',
      align: 'left' as const,
      render: (row: BankAccount) => (
        <span className={`font-mono font-bold ${
          row.unreconciledDiff !== 0 ? 'text-rose-700' : 'text-emerald-700'
        }`}>
          {row.unreconciledDiff === 0 ? 'مطابق (0)' : row.unreconciledDiff.toLocaleString()}
        </span>
      )
    },
    {
      key: 'lastReconciledDate',
      header: 'آخر تسوية',
      width: '95px',
      align: 'center' as const
    },
    {
      key: 'status',
      header: 'حالة المطابقة',
      width: '105px',
      align: 'center' as const,
      render: (row: BankAccount) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
          row.status === 'Reconciled' ? 'bg-emerald-100 text-emerald-800' :
          row.status === 'Discrepancy' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
        }`}>
          {row.status === 'Reconciled' ? 'تسوية تامة' : 'فارق معلق'}
        </span>
      )
    },
    {
      key: 'reconcileAction',
      header: 'تسوية فورية',
      width: '100px',
      align: 'center' as const,
      sortable: false,
      render: (row: BankAccount) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            showToast(`بدء معالج المطابقة والتسوية البنكية لحساب: ${row.bankName}`);
          }}
          className="px-2 py-0.5 bg-cyan-700 hover:bg-cyan-600 text-white rounded text-[10px] font-bold shadow-xs flex items-center gap-1 mx-auto"
        >
          <ArrowLeftRight className="w-2.5 h-2.5" />
          <span>مطابقة الكشف</span>
        </button>
      )
    }
  ];

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] text-white select-none">
      {/* View Header */}
      <div className="p-3 bg-[#252526] border-b border-[#333333] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>إدارة البنوك والخزينة والتسوية البنكية</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                Bank Treasury & Auto Reconciliation
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">حسابات البنوك والتسهيلات الائتمانية، مطابقة كشوف الحسابات البنكية، والتدفق النقدي التقديري</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-[#181818] p-1 rounded-lg border border-[#383838]">
          {[
            { id: 'accounts', label: 'حسابات البنوك والتسهيلات' },
            { id: 'reconciliation', label: 'التسوية البنكية الإلكترونية' },
            { id: 'projected', label: 'كشف البنك التقديري' },
            { id: 'balances', label: 'الأرصدة اللحظية الموحدة' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 text-xs rounded transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-700 text-white font-semibold shadow'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-4 flex flex-col">
        {/* Authentic Excel Schedule: 2-Color Alternating: White + Cyan (#CFFAFE) */}
        <div className="flex-1 min-h-[380px]">
          <ExcelSchedule<BankAccount>
            title="جدول حسابات البنوك والأرصدة الدفترية (Excel Bank Treasury Ledger)"
            sheetName="Bank_Accounts"
            themeColor="cyan"
            columns={columns}
            data={banks}
            keyExtractor={row => row.id}
            onRowClick={row => {
              showToast(`تم فتح حساب: ${row.bankName}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};
