import React from 'react';
import { useApp } from '../context/AppContext';
import { ActiveWindow } from '../types';
import { 
  X, LayoutDashboard, ShoppingCart, Receipt, Package, 
  Warehouse, BookOpen, Layers, Coins, FileCheck, Calculator, 
  Scale, Brain, ClipboardList, Users, UserCheck, Factory, 
  Building2, BarChart3, ShieldCheck, Wrench, Truck, Database, 
  Settings, Cpu, Maximize2, Columns, Rows, Grid, Split 
} from 'lucide-react';

const WINDOW_ICONS: Record<ActiveWindow, React.FC<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  pos: ShoppingCart,
  invoices: Receipt,
  materials: Package,
  warehouses: Warehouse,
  coa: BookOpen,
  costCenters: Layers,
  currencies: Coins,
  journals: FileCheck,
  cheques: Calculator,
  closingAccounts: Scale,
  financialAnalysis: Brain,
  orders: ClipboardList,
  crm: Users,
  salesReps: UserCheck,
  manufacturing: Factory,
  banks: Building2,
  reports: BarChart3,
  aiEnterprise: Brain,
  securityCenter: ShieldCheck,
  tools: Wrench,
  enterpriseOptions: Settings,
  delivery: Truck,
  backup: Database,
  dataExchange: Database,
  settings: Settings,
  users: Users,
  nativeEngine: Cpu,
  license: ShieldCheck,
  about: Settings
};

export const MdiTabBar: React.FC = () => {
  const { 
    openWindows, activeWindowId, focusWindow, closeWindow, 
    closeAllWindows, windowLayout, setWindowLayout, translate 
  } = useApp();

  return (
    <div className="bg-[#252526] border-b border-[#383838] flex items-center justify-between px-2 select-none text-white h-9 shrink-0">
      {/* Scrollable Tabs Bar */}
      <div className="flex items-center space-x-1 rtl:space-x-reverse overflow-x-auto h-full pt-1 pe-2">
        {openWindows.map(win => {
          const isActive = win.id === activeWindowId;
          const Icon = WINDOW_ICONS[win.windowType] || LayoutDashboard;

          return (
            <div
              key={win.id}
              onClick={() => focusWindow(win.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-t border-t-2 transition-all cursor-pointer h-8 shrink-0 group ${
                isActive
                  ? 'bg-[#1E1E1E] text-white border-[#0078D4] font-semibold shadow-xs'
                  : 'bg-[#2D2D2D] text-gray-400 border-transparent hover:text-gray-200 hover:bg-[#333333]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#0078D4]' : 'text-gray-400'}`} />
              <span className="truncate max-w-[150px]">{win.title}</span>
              
              {/* Close Tab Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeWindow(win.id);
                }}
                className="ms-1 p-0.5 rounded hover:bg-white/20 text-gray-400 hover:text-white transition-colors"
                title="إغلاق هذه النافذة (Close Tab)"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>

      {/* MDI Window Layout Controls */}
      <div className="flex items-center gap-1 ps-2 border-s border-[#383838] shrink-0 text-xs">
        <span className="text-[10px] text-gray-400 font-mono me-1 hidden sm:inline">
          {openWindows.length} نوافذ نشطة
        </span>

        {/* Layout Switchers */}
        <button
          onClick={() => setWindowLayout('tabbed')}
          className={`p-1.5 rounded transition-colors ${windowLayout === 'tabbed' ? 'bg-[#0078D4] text-white' : 'text-gray-400 hover:bg-white/10'}`}
          title="عرض النافذة المحددة ممتدة (Tabbed Maximized)"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setWindowLayout('tileH')}
          className={`p-1.5 rounded transition-colors ${windowLayout === 'tileH' ? 'bg-[#0078D4] text-white' : 'text-gray-400 hover:bg-white/10'}`}
          title="ترتيب النوافذ أفقياً (Tile Horizontally)"
        >
          <Columns className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setWindowLayout('tileV')}
          className={`p-1.5 rounded transition-colors ${windowLayout === 'tileV' ? 'bg-[#0078D4] text-white' : 'text-gray-400 hover:bg-white/10'}`}
          title="ترتيب النوافذ عمودياً (Tile Vertically)"
        >
          <Rows className="w-3.5 h-3.5" />
        </button>

        <div className="h-4 w-[1px] bg-[#383838] mx-1" />

        <button
          onClick={closeAllWindows}
          className="px-2 py-1 text-[11px] text-gray-400 hover:text-rose-400 hover:bg-white/5 rounded transition-colors"
          title="إغلاق جميع النوافذ المفتوحة"
        >
          إغلاق الكل
        </button>
      </div>
    </div>
  );
};
