import React from 'react';
import { useApp } from '../context/AppContext';
import { ActiveWindow } from '../types';
import { 
  LayoutDashboard, Package, Warehouse as WarehouseIcon, ShoppingCart, 
  Receipt, Calculator, BookOpen, FileSpreadsheet, ShieldAlert, 
  Settings, BarChart3, Database, ArrowLeftRight, Layers, 
  PlusCircle, FileCheck, CheckCircle2, RefreshCw, Cpu, Scale, 
  ShieldCheck, Coins, Brain, ClipboardList, Users, UserCheck, 
  Factory, Building2, Wrench, Truck, Play, Printer, Save, FileText 
} from 'lucide-react';

export const Ribbon: React.FC = () => {
  const { activeWindow, openWindow, translate, createBackup } = useApp();

  const tabs: { id: ActiveWindow; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'لوحة القيادة', icon: LayoutDashboard },
    { id: 'materials', label: 'المستودعات', icon: Package },
    { id: 'coa', label: 'الحسابات', icon: BookOpen },
    { id: 'costCenters', label: 'مراكز الكلفة', icon: Layers },
    { id: 'currencies', label: 'العملات', icon: Coins },
    { id: 'journals', label: 'السندات', icon: FileCheck },
    { id: 'cheques', label: 'الشيكات', icon: Calculator },
    { id: 'invoices', label: 'الفواتير', icon: Receipt },
    { id: 'pos', label: 'نقاط البيع', icon: ShoppingCart },
    { id: 'orders', label: 'الطلبيات', icon: ClipboardList },
    { id: 'crm', label: 'العملاء', icon: Users },
    { id: 'salesReps', label: 'المندوبين', icon: UserCheck },
    { id: 'manufacturing', label: 'التصنيع', icon: Factory },
    { id: 'banks', label: 'البنوك', icon: Building2 },
    { id: 'closingAccounts', label: 'الختامية', icon: Scale },
    { id: 'financialAnalysis', label: 'التحليل وAI', icon: Brain },
    { id: 'delivery', label: 'التوصيل', icon: Truck },
    { id: 'reports', label: 'التقارير', icon: BarChart3 },
    { id: 'securityCenter', label: 'الأمان العسكري', icon: ShieldCheck },
    { id: 'tools', label: 'الأدوات', icon: Wrench },
    { id: 'nativeEngine', label: 'C/C# Engine', icon: Cpu },
    { id: 'users', label: 'إدارة المستخدمين', icon: Users },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <div className="bg-[#2D2D2D] border-b border-[#3F3F46] select-none text-white shrink-0">
      {/* Ribbon Tabs bar */}
      <div className="flex items-center space-x-1 rtl:space-x-reverse px-2 pt-1 border-b border-[#383838] overflow-x-auto">
        {tabs.map(tab => {
          const isActive = activeWindow === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => openWindow(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-t transition-all shrink-0 ${
                isActive
                  ? 'bg-[#383838] text-white border-t-2 border-[#0078D4] font-semibold'
                  : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0078D4]' : 'text-gray-400'}`} />
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Ribbon Multi-Group Command Container (Like Phenix v9 & Office) */}
      <div className="h-20 px-3 py-1 flex items-center space-x-3 rtl:space-x-reverse overflow-x-auto bg-[#333333]/90 text-xs">
        {/* Dynamic Multi-Group commands per active module */}
        {activeWindow === 'materials' && (
          <>
            {/* Group 1: بطاقات أساسية */}
            <div className="flex flex-col items-center pe-3 border-e border-[#444444]">
              <div className="flex items-center gap-1.5">
                <button onClick={() => openWindow('materials')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
                  <Package className="w-5 h-5 text-amber-400" />
                  <span>بطاقة مادة</span>
                </button>
                <button onClick={() => openWindow('warehouses')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
                  <WarehouseIcon className="w-5 h-5 text-blue-400" />
                  <span>مستودع</span>
                </button>
              </div>
              <span className="text-[9px] text-gray-400 mt-1">بطاقات أساسية</span>
            </div>

            {/* Group 2: الباركود والأسعار */}
            <div className="flex flex-col items-center pe-3 border-e border-[#444444]">
              <div className="flex items-center gap-1.5">
                
                <button onClick={() => openWindow('materials')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
                  <Calculator className="w-5 h-5 text-purple-400" />
                  <span>قوائم الأسعار</span>
                </button>
              </div>
              <span className="text-[9px] text-gray-400 mt-1">الباركود والأسعار</span>
            </div>

            {/* Group 3: جرد وتسوية المستودعات */}
            <div className="flex flex-col items-center pe-3 border-e border-[#444444]">
              <div className="flex items-center gap-1.5">
                <button onClick={() => openWindow('warehouses')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
                  <ArrowLeftRight className="w-5 h-5 text-purple-400" />
                  <span>مناقلة مواد</span>
                </button>
                
              </div>
              <span className="text-[9px] text-gray-400 mt-1">الجرد والمناقلات</span>
            </div>
          </>
        )}

        {(activeWindow === 'coa' || activeWindow === 'costCenters' || activeWindow === 'currencies') && (
          <>
            {/* Group: دليل الحسابات والأستاذ */}
            <div className="flex flex-col items-center pe-3 border-e border-[#444444]">
              <div className="flex items-center gap-1.5">
                <button onClick={() => openWindow('coa')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  <span>شجرة الحسابات</span>
                </button>
                <button onClick={() => openWindow('costCenters')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
                  <Layers className="w-5 h-5 text-blue-400" />
                  <span>مراكز الكلفة</span>
                </button>
                <button onClick={() => openWindow('currencies')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
                  <Coins className="w-5 h-5 text-amber-400" />
                  <span>أسعار العملات</span>
                </button>
              </div>
              <span className="text-[9px] text-gray-400 mt-1">الأدلة المحاسبية</span>
            </div>

            {/* Group: القوائم الختامية */}
            <div className="flex flex-col items-center pe-3 border-e border-[#444444]">
              <div className="flex items-center gap-1.5">
                <button onClick={() => openWindow('closingAccounts')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
                  <Scale className="w-5 h-5 text-emerald-400" />
                  <span>الميزانية والأرباح</span>
                </button>
                <button onClick={() => openWindow('financialAnalysis')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span>التحليل المالي</span>
                </button>
              </div>
              <span className="text-[9px] text-gray-400 mt-1">القوائم والتحليل</span>
            </div>
          </>
        )}

        {(activeWindow === 'invoices' || activeWindow === 'orders' || activeWindow === 'pos') && (
          <>
            {/* Group: فواتير المبيعات والمشتريات */}
            <div className="flex flex-col items-center pe-3 border-e border-[#444444]">
              <div className="flex items-center gap-1.5">
                <button onClick={() => openWindow('invoices')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
                  <Receipt className="w-5 h-5 text-blue-400" />
                  <span>فاتورة بيع</span>
                </button>
                <button onClick={() => openWindow('invoices')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
                  <PlusCircle className="w-5 h-5 text-emerald-400" />
                  <span>فاتورة شراء</span>
                </button>
                <button onClick={() => openWindow('pos')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
                  <ShoppingCart className="w-5 h-5 text-teal-400" />
                  <span>نقطة بيع POS</span>
                </button>
              </div>
              <span className="text-[9px] text-gray-400 mt-1">المبيعات والمشتريات</span>
            </div>

            {/* Group: الطلبيات وعروض الأسعار */}
            <div className="flex flex-col items-center pe-3 border-e border-[#444444]">
              <div className="flex items-center gap-1.5">
                <button onClick={() => openWindow('orders')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
                  <ClipboardList className="w-5 h-5 text-orange-400" />
                  <span>طلبيات البيع</span>
                </button>
                <button onClick={() => openWindow('orders')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
                  <Truck className="w-5 h-5 text-amber-400" />
                  <span>طلبيات التوريد</span>
                </button>
              </div>
              <span className="text-[9px] text-gray-400 mt-1">الطلبيات والعقود</span>
            </div>
          </>
        )}

        {(activeWindow === 'journals' || activeWindow === 'cheques' || activeWindow === 'banks') && (
          <>
            {/* Group: السندات المالية */}
            <div className="flex flex-col items-center pe-3 border-e border-[#444444]">
              <div className="flex items-center gap-1.5">
                <button onClick={() => openWindow('journals')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
                  <FileCheck className="w-5 h-5 text-emerald-400" />
                  <span>سند قيد</span>
                </button>
                <button onClick={() => openWindow('journals')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                  <span>سند قبض</span>
                </button>
                <button onClick={() => openWindow('journals')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
                  <FileText className="w-5 h-5 text-rose-400" />
                  <span>سند دفع</span>
                </button>
              </div>
              <span className="text-[9px] text-gray-400 mt-1">السندات واليومية</span>
            </div>

            {/* Group: الأوراق المالية والبنوك */}
            <div className="flex flex-col items-center pe-3 border-e border-[#444444]">
              <div className="flex items-center gap-1.5">
                <button onClick={() => openWindow('cheques')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
                  <Calculator className="w-5 h-5 text-purple-400" />
                  <span>شيكات قبض/دفع</span>
                </button>
                <button onClick={() => openWindow('banks')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
                  <Building2 className="w-5 h-5 text-cyan-400" />
                  <span>التسوية البنكية</span>
                </button>
              </div>
              <span className="text-[9px] text-gray-400 mt-1">الشيكات والبنوك</span>
            </div>
          </>
        )}

        {/* Fallback default actions */}
        {activeWindow === 'dashboard' && (
          <div className="flex items-center gap-2">
            <button onClick={() => openWindow('pos')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
              <ShoppingCart className="w-5 h-5 text-emerald-400" />
              <span>نقطة بيع</span>
            </button>
            <button onClick={() => openWindow('invoices')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
              <Receipt className="w-5 h-5 text-blue-400" />
              <span>فاتورة</span>
            </button>
            <button onClick={() => openWindow('materials')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
              <Package className="w-5 h-5 text-amber-400" />
              <span>المواد</span>
            </button>
            <button onClick={() => openWindow('coa')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <span>الحسابات</span>
            </button>
            <button onClick={() => openWindow('securityCenter')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
              <ShieldCheck className="w-5 h-5 text-rose-400" />
              <span>الأمان 2026</span>
            </button>
          </div>
        )}

        {/* Print & Export global helpers on the right */}
        <div className="ms-auto flex items-center gap-2 ps-3 border-s border-[#444444]">
          <button onClick={() => window.print()} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
            <Printer className="w-4 h-4 text-gray-300" />
            <span>طباعة</span>
          </button>
          <button onClick={() => createBackup()} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-white/10 text-[11px] gap-1 min-w-[56px]">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>نسخ احتياطي</span>
          </button>
        </div>
      </div>
    </div>
  );
};
