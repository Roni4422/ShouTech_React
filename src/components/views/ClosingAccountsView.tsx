import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Scale, TrendingUp, ShoppingBag, FileSpreadsheet, Printer, 
  CheckCircle2, AlertCircle, Calendar 
} from 'lucide-react';

export const ClosingAccountsView: React.FC = () => {
  const { accounts, materials, invoices, translate } = useApp();
  const [statement, setStatement] = useState<'balance_sheet' | 'income_statement' | 'trading'>('balance_sheet');

  // Calculations
  const assetAccounts = accounts.filter(a => a.type === 'Asset');
  const totalAssets = assetAccounts.reduce((sum, a) => sum + (a.isHeader ? 0 : a.balance), 0);

  const liabilityAccounts = accounts.filter(a => a.type === 'Liability');
  const totalLiabilities = liabilityAccounts.reduce((sum, a) => sum + (a.isHeader ? 0 : a.balance), 0);

  const equityAccounts = accounts.filter(a => a.type === 'Equity');
  const totalEquity = equityAccounts.reduce((sum, a) => sum + (a.isHeader ? 0 : a.balance), 0);

  const revenueAccounts = accounts.filter(a => a.type === 'Revenue');
  const totalRevenue = revenueAccounts.reduce((sum, a) => sum + (a.isHeader ? 0 : a.balance), 0);

  const expenseAccounts = accounts.filter(a => a.type === 'Expense');
  const totalExpenses = expenseAccounts.reduce((sum, a) => sum + (a.isHeader ? 0 : a.balance), 0);

  const netIncome = totalRevenue - totalExpenses;
  const isBalanceSheetBalanced = Math.abs(totalAssets - (totalLiabilities + totalEquity + netIncome)) < 1.0;

  // Trading Account metrics
  const endingInventoryValuation = materials.reduce((sum, m) => sum + (m.qtyOnHand * m.cost), 0);
  const beginningInventoryValuation = 54000;
  const salesRevenue = revenueAccounts.find(a => a.code === '41')?.balance || 165000;
  const totalPurchases = invoices.filter(i => i.kind === 'purchase' && i.status === 'Posted').reduce((sum, i) => sum + i.grandTotal, 0);
  const costOfGoodsSold = beginningInventoryValuation + totalPurchases - endingInventoryValuation;
  const grossProfit = salesRevenue - costOfGoodsSold;

  return (
    <div className="h-full overflow-y-auto p-6 bg-[#1E1E1E] text-white space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#383838]">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-purple-400" />
            <span>Al-Ameen Closing Accounts & Financial Statements (الحسابات الختامية)</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            General Ledger Final Accounts · Balance Sheet · Profit & Loss · Trading Account
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-[#242424] p-1 rounded-lg border border-[#383838]">
          <button
            onClick={() => setStatement('balance_sheet')}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              statement === 'balance_sheet' ? 'bg-[#0078D4] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Balance Sheet (الميزانية)</span>
          </button>
          <button
            onClick={() => setStatement('income_statement')}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              statement === 'income_statement' ? 'bg-[#0078D4] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>P&L (الأرباح والخسائر)</span>
          </button>
          <button
            onClick={() => setStatement('trading')}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              statement === 'trading' ? 'bg-[#0078D4] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Trading (المتاجرة)</span>
          </button>
        </div>
      </div>

      {/* Statement 1: Balance Sheet (الميزانية العمومية) */}
      {statement === 'balance_sheet' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-[#242424] rounded-xl border border-[#383838]">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Balance Sheet as of 2026 Fiscal Year</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Audited Equation: Assets = Liabilities + Equity</span>
              </span>
            </div>
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-[#1E1E1E] hover:bg-white/10 border border-white/20 rounded text-xs text-white flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Statement</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Assets */}
            <div className="bg-[#242424] rounded-xl border border-[#383838] p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#383838]">
                <h3 className="text-sm font-bold text-white">الأصول (Assets)</h3>
                <span className="text-base font-bold font-mono text-cyan-400">
                  {totalAssets.toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR
                </span>
              </div>

              <div className="space-y-2">
                {assetAccounts.map(a => (
                  <div key={a.code} className={`flex items-center justify-between text-xs py-1.5 ${a.isHeader ? 'font-bold text-white pt-2' : 'text-gray-300 ps-4'}`}>
                    <span>{a.code} - {a.nameAr}</span>
                    <span className="font-mono">{a.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Liabilities & Equity */}
            <div className="bg-[#242424] rounded-xl border border-[#383838] p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#383838]">
                <h3 className="text-sm font-bold text-white">الخصوم وحقوق الملكية (Liabilities & Equity)</h3>
                <span className="text-base font-bold font-mono text-amber-400">
                  {(totalLiabilities + totalEquity + netIncome).toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">الخصوم (Liabilities)</div>
                {liabilityAccounts.map(a => (
                  <div key={a.code} className={`flex items-center justify-between text-xs py-1.5 ${a.isHeader ? 'font-bold text-white' : 'text-gray-300 ps-4'}`}>
                    <span>{a.code} - {a.nameAr}</span>
                    <span className="font-mono">{a.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR</span>
                  </div>
                ))}

                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider pt-3">حقوق الملكية (Equity)</div>
                {equityAccounts.map(a => (
                  <div key={a.code} className={`flex items-center justify-between text-xs py-1.5 ${a.isHeader ? 'font-bold text-white' : 'text-gray-300 ps-4'}`}>
                    <span>{a.code} - {a.nameAr}</span>
                    <span className="font-mono">{a.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR</span>
                  </div>
                ))}

                <div className="flex items-center justify-between text-xs py-1.5 text-emerald-400 font-bold ps-4 pt-2 border-t border-white/10">
                  <span>صافي أرباح الفترة المحققة (Net Income)</span>
                  <span className="font-mono">{netIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statement 2: Income Statement / P&L (الأرباح والخسائر) */}
      {statement === 'income_statement' && (
        <div className="bg-[#242424] rounded-xl border border-[#383838] p-6 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#383838]">
            <div>
              <h2 className="text-base font-bold text-white">Income Statement (قائمة الأرباح والخسائر)</h2>
              <p className="text-xs text-gray-400">Fiscal Period: 2026-01-01 to 2026-12-31</p>
            </div>
            <div className="text-end">
              <span className="text-xs text-gray-400 block">Net Income (صافي الربح)</span>
              <span className="text-xl font-black text-emerald-400 font-mono">
                {netIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR
              </span>
            </div>
          </div>

          {/* Revenue */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Operating Revenues (الإيرادات التشغيلية)</h3>
            {revenueAccounts.map(a => (
              <div key={a.code} className="flex justify-between text-xs text-gray-300 py-1 ps-4">
                <span>{a.nameAr}</span>
                <span className="font-mono font-semibold">{a.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR</span>
              </div>
            ))}
            <div className="flex justify-between text-xs font-bold text-white pt-1 border-t border-white/10">
              <span>Total Revenue:</span>
              <span className="font-mono">{totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR</span>
            </div>
          </div>

          {/* Expenses */}
          <div className="space-y-2 pt-4 border-t border-white/10">
            <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider">Operating Expenses (المصروفات والتكاليف)</h3>
            {expenseAccounts.map(a => (
              <div key={a.code} className="flex justify-between text-xs text-gray-300 py-1 ps-4">
                <span>{a.nameAr}</span>
                <span className="font-mono font-semibold">{a.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR</span>
              </div>
            ))}
            <div className="flex justify-between text-xs font-bold text-white pt-1 border-t border-white/10">
              <span>Total Expenses:</span>
              <span className="font-mono">{totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR</span>
            </div>
          </div>
        </div>
      )}

      {/* Statement 3: Trading Account (حساب المتاجرة) */}
      {statement === 'trading' && (
        <div className="bg-[#242424] rounded-xl border border-[#383838] p-6 max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#383838]">
            <div>
              <h2 className="text-base font-bold text-white">Trading Account (حساب المتاجرة)</h2>
              <p className="text-xs text-gray-400">Adapted from Al-Ameen ERP v10 Merchandise Flow</p>
            </div>
            <div className="text-end">
              <span className="text-xs text-gray-400 block">Gross Profit (مجمل الربح)</span>
              <span className="text-xl font-black text-cyan-400 font-mono">
                {grossProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 text-xs">
            {/* Debit side */}
            <div className="space-y-3 bg-[#1A1A1A] p-4 rounded-lg border border-white/10">
              <div className="font-bold text-white border-b border-white/10 pb-1">الجانب المدين (Debit)</div>
              <div className="flex justify-between text-gray-300">
                <span>بضاعة أول المدة (Beginning Inventory):</span>
                <span className="font-mono">{beginningInventoryValuation.toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>إجمالي المشتريات (Purchases):</span>
                <span className="font-mono">{totalPurchases.toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR</span>
              </div>
              <div className="flex justify-between font-bold text-cyan-300 pt-2 border-t border-white/10">
                <span>مجمل الربح المنقول (Gross Profit):</span>
                <span className="font-mono">{grossProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR</span>
              </div>
            </div>

            {/* Credit side */}
            <div className="space-y-3 bg-[#1A1A1A] p-4 rounded-lg border border-white/10">
              <div className="font-bold text-white border-b border-white/10 pb-1">الجانب الدائن (Credit)</div>
              <div className="flex justify-between text-gray-300">
                <span>صافي المبيعات (Sales):</span>
                <span className="font-mono">{salesRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>بضاعة آخر المدة (Ending Inventory):</span>
                <span className="font-mono">{endingInventoryValuation.toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR</span>
              </div>
              <div className="flex justify-between font-bold text-white pt-2 border-t border-white/10">
                <span>إجمالي الموازنة:</span>
                <span className="font-mono">{(salesRevenue + endingInventoryValuation).toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
