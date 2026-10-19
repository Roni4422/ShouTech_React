import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  TrendingUp, ShoppingCart, Package, Users, AlertTriangle, 
  ArrowUpRight, ArrowDownRight, Layers, FileText, CheckCircle2 
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    translate, materials, invoices, accounts, parties, setActiveWindow 
  } = useApp();

  // Metrics
  const postedInvoices = invoices.filter(i => i.status === 'Posted');
  const totalSales = postedInvoices
    .filter(i => i.kind === 'sales' || i.kind === 'pos')
    .reduce((sum, i) => sum + i.grandTotal, 0);

  const totalPurchases = postedInvoices
    .filter(i => i.kind === 'purchase')
    .reduce((sum, i) => sum + i.grandTotal, 0);

  const totalInventoryValue = materials.reduce((sum, m) => sum + (m.qtyOnHand * m.cost), 0);
  const cashAccount = accounts.find(a => a.code === '111')?.balance || 84500;
  const bankAccount = accounts.find(a => a.code === '112')?.balance || 142000;
  const totalLiquidity = cashAccount + bankAccount;

  const lowStockItems = materials.filter(m => m.qtyOnHand <= m.reorderQty);

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 bg-[#1E1E1E] text-white">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#333333]">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span>{translate('dashboard.title')}</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            {translate('dashboard.welcome')} <strong className="text-[#60A5FA]">ShouTech ERP 10.6.0</strong> — Financial & Inventory Control Center
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveWindow('pos')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0078D4] hover:bg-[#1084D9] text-white rounded text-xs font-semibold shadow transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{translate('pos.title')}</span>
          </button>
          <button
            onClick={() => setActiveWindow('invoices')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2D2D2D] hover:bg-[#3D3D3D] border border-white/20 text-white rounded text-xs font-semibold transition-colors"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>{translate('inv.salesTitle')}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sales */}
        <div className="p-4 rounded-lg bg-[#27272A] border border-[#3F3F46] flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{translate('dashboard.totalSales')}</span>
            <div className="p-1.5 rounded bg-emerald-500/20 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-white">
              {totalSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-normal text-gray-400">SAR</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+14.8% vs last month</span>
            </div>
          </div>
        </div>

        {/* Total Purchases */}
        <div className="p-4 rounded-lg bg-[#27272A] border border-[#3F3F46] flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{translate('dashboard.totalPurchases')}</span>
            <div className="p-1.5 rounded bg-blue-500/20 text-blue-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-white">
              {totalPurchases.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-normal text-gray-400">SAR</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-blue-400 mt-1">
              <span>Imported inventory orders</span>
            </div>
          </div>
        </div>

        {/* Inventory Value */}
        <div className="p-4 rounded-lg bg-[#27272A] border border-[#3F3F46] flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{translate('dashboard.inventoryValue')}</span>
            <div className="p-1.5 rounded bg-amber-500/20 text-amber-400">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-white">
              {totalInventoryValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-normal text-gray-400">SAR</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
              <span>{materials.length} {translate('dashboard.productsCount')}</span>
            </div>
          </div>
        </div>

        {/* Cash Liquidity */}
        <div className="p-4 rounded-lg bg-[#27272A] border border-[#3F3F46] flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{translate('dashboard.cashBalance')}</span>
            <div className="p-1.5 rounded bg-purple-500/20 text-purple-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-white">
              {totalLiquidity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-normal text-gray-400">SAR</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
              <span>Safe Cash + Bank Accounts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Low Stock alerts & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <div className="bg-[#27272A] border border-[#3F3F46] rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white">{translate('dashboard.lowStockAlert')}</h2>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
              {lowStockItems.length} items
            </span>
          </div>

          <div className="space-y-2">
            {lowStockItems.length === 0 ? (
              <p className="text-xs text-gray-400 py-4 text-center">All materials are currently above reorder levels.</p>
            ) : (
              lowStockItems.map(item => (
                <div 
                  key={item.id}
                  onClick={() => setActiveWindow('materials')}
                  className="p-3 bg-[#1E1E1E] hover:bg-[#2F2F35] border border-white/10 rounded flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div>
                    <div className="text-xs font-bold text-white">{item.nameAr}</div>
                    <div className="text-[11px] text-gray-400 font-mono">{item.code} · {item.category}</div>
                  </div>
                  <div className="text-end">
                    <div className="text-xs font-bold text-amber-400">{item.qtyOnHand} {item.defaultUnit}</div>
                    <div className="text-[10px] text-gray-400">Reorder at: {item.reorderQty}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Invoices & Transactions */}
        <div className="bg-[#27272A] border border-[#3F3F46] rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-white">{translate('dashboard.recentActivities')}</h2>
            <button 
              onClick={() => setActiveWindow('invoices')}
              className="text-xs text-[#60A5FA] hover:underline"
            >
              View all
            </button>
          </div>

          <div className="space-y-2.5">
            {invoices.slice(0, 5).map(inv => (
              <div 
                key={inv.id}
                onClick={() => setActiveWindow('invoices')}
                className="p-3 bg-[#1E1E1E] hover:bg-[#2F2F35] border border-white/10 rounded flex items-center justify-between cursor-pointer transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white">{inv.docNo}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      inv.status === 'Posted' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {inv.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{inv.partyName} · {inv.date}</div>
                </div>
                <div className="text-end font-bold text-xs text-white">
                  {inv.grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} {inv.currency}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
