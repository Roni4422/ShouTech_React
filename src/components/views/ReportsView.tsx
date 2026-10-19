import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, Calendar, Download, Printer, Filter, 
  Layers, BookOpen, Users, Package, FileSpreadsheet 
} from 'lucide-react';

type ReportType = 'trial_balance' | 'stock_balances' | 'material_moves' | 'customer_aging' | 'item_profitability';

export const ReportsView: React.FC = () => {
  const { 
    accounts, materials, movements, parties, invoices, translate, showToast 
  } = useApp();

  const [activeReport, setActiveReport] = useState<ReportType>('trial_balance');
  const [fromDate, setFromDate] = useState('2026-01-01');
  const [toDate, setToDate] = useState('2026-12-31');

  const accountBalanceRows = accounts.map(account => {
    const balance = Number.isFinite(account.balance) ? Number(account.balance) : 0;
    const normalDebit = account.type === 'Asset' || account.type === 'Expense';
    const signedDebit = normalDebit ? balance : -balance;
    return {
      account,
      debit: Math.max(0, signedDebit),
      credit: Math.max(0, -signedDebit)
    };
  });
  const displayedDebitTotal = accountBalanceRows.reduce((total, row) => total + row.debit, 0);
  const displayedCreditTotal = accountBalanceRows.reduce((total, row) => total + row.credit, 0);
  const displayedDifference = displayedDebitTotal - displayedCreditTotal;

  const exportCSV = (data: Array<Record<string, string | number | boolean | null | undefined>>, filename: string) => {
    if (data.length === 0) {
      showToast('Export unavailable: this report contains no rows.');
      return;
    }

    const columns = Object.keys(data[0]);
    const escapeCell = (value: string | number | boolean | null | undefined): string => {
      const raw = value == null ? '' : String(value);
      const formulaSafe = typeof value === 'string' && /^[\s]*[=+@-]/.test(raw) ? "'" + raw : raw;
      return '"' + formulaSafe.replace(/"/g, '""') + '"';
    };
    const csv = [columns, ...data.map(row => columns.map(column => row[column]))]
      .map(row => row.map(escapeCell).join(','))
      .join('\r\n');
    const blob = new Blob(['\uFEFF', csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename + '.csv';
    link.style.display = 'none';
    document.body.appendChild(link);
    try {
      link.click();
      showToast('CSV download requested: ' + filename + '.csv');
    } catch {
      showToast('Export failed: the browser could not start the CSV download.');
    } finally {
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-[#1E1E1E] text-white overflow-hidden">
      {/* Left Report Menu Sidebar */}
      <div className="w-full md:w-72 border-e border-[#383838] flex flex-col bg-[#242424] shrink-0">
        <div className="p-3 border-b border-[#383838]">
          <h2 className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>{translate('reports.title')}</span>
          </h2>
        </div>

        <div className="p-2 space-y-1">
          {[
            { id: 'trial_balance', label: translate('reports.trialBalance'), icon: BookOpen },
            { id: 'stock_balances', label: translate('reports.stockBalances'), icon: Layers },
            { id: 'material_moves', label: translate('reports.materialMoves'), icon: Package },
            { id: 'customer_aging', label: translate('reports.customerAging'), icon: Users },
            { id: 'item_profitability', label: translate('reports.itemProfitability'), icon: BarChart3 },
          ].map(r => {
            const isSelected = activeReport === r.id;
            const Icon = r.icon;
            return (
              <button
                key={r.id}
                onClick={() => setActiveReport(r.id as ReportType)}
                className={`w-full text-start px-3 py-2.5 rounded text-xs flex items-center gap-2 transition-colors ${
                  isSelected 
                    ? 'bg-[#0078D4] text-white font-semibold shadow' 
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right / Report View Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#1E1E1E] flex flex-col">
        {/* Filter & Export Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-[#242424] border border-[#383838] mb-6">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-gray-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{translate('reports.fromDate')}:</span>
            </div>
            <input
              type="date"
              value={fromDate}
              onChange={e => setFromDate(e.target.value)}
              className="px-2.5 py-1 bg-[#181818] border border-white/20 rounded text-xs text-white"
            />

            <div className="flex items-center gap-1.5 text-gray-400 ms-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{translate('reports.toDate')}:</span>
            </div>
            <input
              type="date"
              value={toDate}
              onChange={e => setToDate(e.target.value)}
              className="px-2.5 py-1 bg-[#181818] border border-white/20 rounded text-xs text-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-[#2A2A2A] hover:bg-[#333333] border border-white/20 rounded text-xs text-gray-200 flex items-center gap-1.5 shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{translate('common.print')}</span>
            </button>
            <button
              onClick={() => {
                if (activeReport === 'material_moves' && (!fromDate || !toDate || fromDate > toDate)) {
                  showToast('Export rejected: enter a valid date range.');
                  return;
                }
                if (activeReport === 'trial_balance') {
                  exportCSV([
                    ...accountBalanceRows.map(({ account, debit, credit }) => ({
                      RecordType: 'ACCOUNT', Code: account.code, Name: account.nameAr,
                      NameEn: account.nameEn, Type: account.type, Debit: debit, Credit: credit
                    })),
                    {
                      RecordType: 'DISPLAYED_TOTALS', Code: '', Name: '', NameEn: '', Type: '',
                      Debit: displayedDebitTotal, Credit: displayedCreditTotal
                    },
                    {
                      RecordType: 'DISPLAYED_DIFFERENCE', Code: '', Name: '', NameEn: '', Type: '',
                      Debit: displayedDifference, Credit: 0
                    }
                  ], 'Account_Balance_Summary');
                } else if (activeReport === 'stock_balances') {
                  exportCSV(materials.map(m => ({ Code: m.code, Name: m.nameAr, Category: m.category, Unit: m.defaultUnit, Quantity: m.qtyOnHand, Cost: m.cost, RetailPrice: m.priceRetail, TotalValuation: m.qtyOnHand * m.cost })), 'Stock_Balances');
                } else if (activeReport === 'material_moves') {
                  exportCSV(movements.filter(m => m.date >= fromDate && m.date <= toDate).map(m => ({
                    Date: m.date, DocumentNo: m.docNo, Type: m.moveType, MaterialCode: m.materialCode,
                    MaterialName: m.materialName, QuantityIn: m.qtyIn, QuantityOut: m.qtyOut,
                    UnitCost: m.unitCost, TotalValue: m.totalValue, Notes: m.note
                  })), 'Material_Movements');
                } else if (activeReport === 'customer_aging') {
                  exportCSV(parties.filter(p => p.type === 'Customer').map(c => ({
                    CustomerCode: c.code, CustomerName: c.nameAr, TotalDue: c.balance
                  })), 'Customer_Balances');
                } else {
                  exportCSV(materials.map(m => ({
                    Code: m.code, Material: m.nameAr, SellingPrice: m.priceRetail, AverageCost: m.cost,
                    ProfitPerUnit: m.priceRetail - m.cost,
                    MarginPercent: m.priceRetail > 0 ? ((m.priceRetail - m.cost) / m.priceRetail) * 100 : 0
                  })), 'Item_Profitability');
                }
              }}
              className="px-3 py-1.5 bg-[#0078D4] hover:bg-[#1084D9] rounded text-xs text-white flex items-center gap-1.5 shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{translate('common.exportExcel')}</span>
            </button>
          </div>
        </div>

        {/* Report Content Table */}
        <div className="flex-1 bg-[#242424] rounded-lg border border-[#383838] overflow-hidden flex flex-col">
          {/* 1. Trial Balance Report */}
          {activeReport === 'trial_balance' && (
            <div className="overflow-y-auto flex-1">
              <div className="p-4 bg-[#1A1A1A] border-b border-[#383838] flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-white">{translate('reports.trialBalance')}</h3>
                  <p className="text-xs text-amber-300">{translate('reports.trialBalancePeriodUnavailable')}</p>
                </div>
                <div className="text-xs text-amber-300 font-mono font-bold">
                  {translate('reports.trialBalanceUnverified')}
                </div>
              </div>

              <table className="w-full text-start text-xs">
                <thead className="bg-[#1F1F1F] text-gray-400 border-b border-[#383838]">
                  <tr>
                    <th className="py-2.5 px-3 text-start">Account Code</th>
                    <th className="py-2.5 px-3 text-start">Account Name (AR / EN)</th>
                    <th className="py-2.5 px-3 text-start">Classification</th>
                    <th className="py-2.5 px-3 text-end">Debit Balance</th>
                    <th className="py-2.5 px-3 text-end">Credit Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#303030]">
                  {accountBalanceRows.map(({ account: acc, debit, credit }) => (
                      <tr key={acc.code} className="hover:bg-white/5">
                        <td className="py-2.5 px-3 font-mono text-cyan-400 font-bold">{acc.code}</td>
                        <td className="py-2.5 px-3">
                          <span className="font-semibold text-white">{acc.nameAr}</span>
                          <span className="text-[10px] text-gray-400 ms-2">({acc.nameEn})</span>
                        </td>
                        <td className="py-2.5 px-3 text-gray-300">{acc.type}</td>
                        <td className="py-2.5 px-3 text-end font-mono text-white">
                          {debit > 0 ? debit.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '-'}
                        </td>
                        <td className="py-2.5 px-3 text-end font-mono text-white">
                          {credit > 0 ? credit.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '-'}
                        </td>
                      </tr>
                  ))}
                  <tr className="border-t-2 border-white/20 bg-[#1A1A1A] font-bold">
                    <td colSpan={3} className="py-3 px-3 text-white">{translate('reports.displayedTotals')}</td>
                    <td className="py-3 px-3 text-end font-mono text-white">{displayedDebitTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="py-3 px-3 text-end font-mono text-white">{displayedCreditTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                  <tr className="bg-[#1A1A1A]">
                    <td colSpan={3} className="py-2 px-3 text-gray-300">{translate('reports.displayedDifference')}</td>
                    <td colSpan={2} className={`py-2 px-3 text-end font-mono font-bold ${Math.abs(displayedDifference) < 0.005 ? 'text-amber-300' : 'text-red-300'}`}>
                      {displayedDifference.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* 2. Stock Balances Report */}
          {activeReport === 'stock_balances' && (
            <div className="overflow-y-auto flex-1">
              <div className="p-4 bg-[#1A1A1A] border-b border-[#383838]">
                <h3 className="text-sm font-bold text-white">{translate('reports.stockBalances')}</h3>
                <p className="text-xs text-gray-400">Current Warehouse Stock Valuations</p>
              </div>

              <table className="w-full text-start text-xs">
                <thead className="bg-[#1F1F1F] text-gray-400 border-b border-[#383838]">
                  <tr>
                    <th className="py-2.5 px-3 text-start">Code</th>
                    <th className="py-2.5 px-3 text-start">Description</th>
                    <th className="py-2.5 px-3 text-start">Category</th>
                    <th className="py-2.5 px-3 text-center">Unit</th>
                    <th className="py-2.5 px-3 text-center">On Hand</th>
                    <th className="py-2.5 px-3 text-end">Cost (SAR)</th>
                    <th className="py-2.5 px-3 text-end">Retail Price (SAR)</th>
                    <th className="py-2.5 px-3 text-end">Total Valuation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#303030]">
                  {materials.map(m => (
                    <tr key={m.id} className="hover:bg-white/5">
                      <td className="py-2.5 px-3 font-mono text-cyan-400">{m.code}</td>
                      <td className="py-2.5 px-3 font-semibold text-white">{m.nameAr}</td>
                      <td className="py-2.5 px-3 text-gray-300">{m.category}</td>
                      <td className="py-2.5 px-3 text-center text-gray-400">{m.defaultUnit}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-emerald-400 font-mono">{m.qtyOnHand}</td>
                      <td className="py-2.5 px-3 text-end font-mono">{m.cost.toFixed(2)}</td>
                      <td className="py-2.5 px-3 text-end font-mono">{m.priceRetail.toFixed(2)}</td>
                      <td className="py-2.5 px-3 text-end font-mono font-bold text-white">
                        {(m.qtyOnHand * m.cost).toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 3. Material Movements Report */}
          {activeReport === 'material_moves' && (
            <div className="overflow-y-auto flex-1">
              <div className="p-4 bg-[#1A1A1A] border-b border-[#383838]">
                <h3 className="text-sm font-bold text-white">{translate('reports.materialMoves')}</h3>
                <p className="text-xs text-gray-400">Inventory Transaction Audit Trail</p>
              </div>

              <table className="w-full text-start text-xs">
                <thead className="bg-[#1F1F1F] text-gray-400 border-b border-[#383838]">
                  <tr>
                    <th className="py-2.5 px-3 text-start">Date</th>
                    <th className="py-2.5 px-3 text-start">Doc No</th>
                    <th className="py-2.5 px-3 text-start">Type</th>
                    <th className="py-2.5 px-3 text-start">Material</th>
                    <th className="py-2.5 px-3 text-center">In</th>
                    <th className="py-2.5 px-3 text-center">Out</th>
                    <th className="py-2.5 px-3 text-end">Unit Cost</th>
                    <th className="py-2.5 px-3 text-start">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#303030]">
                  {movements.map(m => (
                    <tr key={m.id} className="hover:bg-white/5">
                      <td className="py-2.5 px-3 font-mono text-gray-400">{m.date}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">{m.docNo}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-white/10 text-gray-200">
                          {m.moveType}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-white">{m.materialName}</td>
                      <td className="py-2.5 px-3 text-center font-mono text-emerald-400 font-bold">
                        {m.qtyIn > 0 ? `+${m.qtyIn}` : '-'}
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono text-red-400 font-bold">
                        {m.qtyOut > 0 ? `-${m.qtyOut}` : '-'}
                      </td>
                      <td className="py-2.5 px-3 text-end font-mono">{m.unitCost.toFixed(2)} SAR</td>
                      <td className="py-2.5 px-3 text-gray-400 truncate max-w-xs">{m.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 4. Customer Aging Report */}
          {activeReport === 'customer_aging' && (
            <div className="overflow-y-auto flex-1">
              <div className="p-4 bg-[#1A1A1A] border-b border-[#383838]">
                <h3 className="text-sm font-bold text-white">{translate('reports.customerAging')}</h3>
                <p className="text-xs text-amber-300">{translate('reports.customerAgingUnavailable')}</p>
              </div>

              <table className="w-full text-start text-xs">
                <thead className="bg-[#1F1F1F] text-gray-400 border-b border-[#383838]">
                  <tr>
                    <th className="py-2.5 px-3 text-start">{translate('common.code')}</th>
                    <th className="py-2.5 px-3 text-start">{translate('common.name')}</th>
                    <th className="py-2.5 px-3 text-end">{translate('reports.outstandingBalance')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#303030]">
                  {parties.filter(p => p.type === 'Customer').map(cust => (
                    <tr key={cust.id} className="hover:bg-white/5">
                      <td className="py-2.5 px-3 font-mono text-cyan-400">{cust.code}</td>
                      <td className="py-2.5 px-3 font-semibold text-white">{cust.nameAr}</td>
                      <td className="py-2.5 px-3 text-end font-mono font-bold text-emerald-400">
                        {cust.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 5. Item Profitability Report */}
          {activeReport === 'item_profitability' && (
            <div className="overflow-y-auto flex-1">
              <div className="p-4 bg-[#1A1A1A] border-b border-[#383838]">
                <h3 className="text-sm font-bold text-white">{translate('reports.itemProfitability')}</h3>
                <p className="text-xs text-gray-400">Gross Margin & Profit Analysis per Product</p>
              </div>

              <table className="w-full text-start text-xs">
                <thead className="bg-[#1F1F1F] text-gray-400 border-b border-[#383838]">
                  <tr>
                    <th className="py-2.5 px-3 text-start">Code</th>
                    <th className="py-2.5 px-3 text-start">Material</th>
                    <th className="py-2.5 px-3 text-end">Selling Price</th>
                    <th className="py-2.5 px-3 text-end">Average Cost</th>
                    <th className="py-2.5 px-3 text-end">Profit Per Unit</th>
                    <th className="py-2.5 px-3 text-end">Margin %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#303030]">
                  {materials.map(m => {
                    const profit = m.priceRetail - m.cost;
                    const marginPct = m.priceRetail > 0 ? (profit / m.priceRetail) * 100 : 0;
                    return (
                      <tr key={m.id} className="hover:bg-white/5">
                        <td className="py-2.5 px-3 font-mono text-cyan-400">{m.code}</td>
                        <td className="py-2.5 px-3 font-semibold text-white">{m.nameAr}</td>
                        <td className="py-2.5 px-3 text-end font-mono">{m.priceRetail.toFixed(2)} SAR</td>
                        <td className="py-2.5 px-3 text-end font-mono">{m.cost.toFixed(2)} SAR</td>
                        <td className="py-2.5 px-3 text-end font-mono font-bold text-emerald-400">
                          {profit.toFixed(2)} SAR
                        </td>
                        <td className="py-2.5 px-3 text-end font-mono font-bold text-cyan-300">
                          {marginPct.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
