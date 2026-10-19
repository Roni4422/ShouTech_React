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
    { id: 'materials', label: 'بطاقات المواد', icon: Package },
    { id: 'warehouses', label: 'المستودعات', icon: WarehouseIcon },
    { id: 'coa', label: 'دليل الحسابات', icon: BookOpen },
    { id: 'costCenters', label: 'مراكز الكلفة', icon: Layers },
    { id: 'currencies', label: 'العملات', icon: Coins },
    { id: 'journals', label: 'قيود اليومية', icon: FileCheck },
    { id: 'cheques', label: 'الشيكات', icon: Calculator },
    { id: 'invoices', label: 'الفواتير', icon: Receipt },
    { id: 'pos', label: 'نقطة البيع', icon: ShoppingCart },
    { id: 'orders', label: 'الطلبيات', icon: ClipboardList },
    { id: 'crm', label: 'إدارة العملاء', icon: Users },
    { id: 'salesReps', label: 'مندوبو المبيعات', icon: UserCheck },
    { id: 'manufacturing', label: 'التصنيع', icon: Factory },
    { id: 'banks', label: 'البنوك', icon: Building2 },
    { id: 'closingAccounts', label: 'الحسابات الختامية', icon: Scale },
    { id: 'financialAnalysis', label: 'التحليل المالي', icon: Brain },
    { id: 'aiEnterprise', label: 'ذكاء الأعمال', icon: Brain },
    { id: 'delivery', label: 'التوصيل', icon: Truck },
    { id: 'reports', label: 'التقارير', icon: BarChart3 },
    { id: 'securityCenter', label: 'مركز الأمان', icon: ShieldCheck },
    { id: 'users', label: 'المستخدمون والصلاحيات', icon: Users },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
    { id: 'tools', label: 'أدوات النظام', icon: Wrench },
    { id: 'enterpriseOptions', label: 'خيارات المؤسسة', icon: Building2 },
    { id: 'backup', label: 'النسخ الاحتياطي', icon: Database },
    { id: 'dataExchange', label: 'استيراد وتصدير', icon: ArrowLeftRight },
    { id: 'nativeEngine', label: 'المحرك الأصلي', icon: Cpu },
    { id: 'license', label: 'الترخيص', icon: ShieldAlert },
    { id: 'about', label: 'حول النظام', icon: FileText },
  ];

  return (
    <div className="st-ribbon border-b select-none shrink-0">
      {/* Ribbon Tabs bar */}
      <div className="flex items-center space-x-1 rtl:space-x-reverse px-2 pt-1 border-b border-[var(--border-color)] overflow-x-auto">
        {tabs.map(tab => {
          const isActive = activeWindow === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => openWindow(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-t transition-all shrink-0 ${
                isActive
                  ? 'bg-[var(--surface-light)] text-[var(--text-primary)] border-t-2 border-[var(--primary)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]'}`} />
              <span className="whitespace-nowrap">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Ribbon Multi-Group Command Container (Like Phenix v9 & Office) */}
      <div className="st-ribbon-command-area h-20 px-3 py-1 flex items-center space-x-3 rtl:space-x-reverse overflow-x-auto text-xs">
        {/* Dynamic Multi-Group commands per active module */}
        {activeWindow === 'materials' && (
          <>
            {/* Group 1: بطاقات أساسية */}
            <div className="flex flex-col items-center pe-3 border-e border-[var(--border-color)]">
              <div className="flex items-center gap-1.5">
                <button onClick={() => openWindow('materials')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
                  <Package className="w-5 h-5 text-[var(--primary)]" />
                  <span>بطاقة مادة</span>
                </button>
                <button onClick={() => openWindow('warehouses')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
                  <WarehouseIcon className="w-5 h-5 text-[var(--primary)]" />
                  <span>مستودع</span>
                </button>
              </div>
              <span className="text-[9px] text-gray-400 mt-1">بطاقات أساسية</span>
            </div>

            {/* Group 2: الباركود والأسعار */}
            <div className="flex flex-col items-center pe-3 border-e border-[var(--border-color)]">
              <div className="flex items-center gap-1.5">
                
                <button onClick={() => openWindow('materials')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
                  <Calculator className="w-5 h-5 text-[var(--primary)]" />
                  <span>قوائم الأسعار</span>
                </button>
              </div>
              <span className="text-[9px] text-gray-400 mt-1">الباركود والأسعار</span>
            </div>

            {/* Group 3: جرد وتسوية المستودعات */}
            <div className="flex flex-col items-center pe-3 border-e border-[var(--border-color)]">
              <div className="flex items-center gap-1.5">
                <button onClick={() => openWindow('warehouses')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
                  <ArrowLeftRight className="w-5 h-5 text-[var(--primary)]" />
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
            <div className="flex flex-col items-center pe-3 border-e border-[var(--border-color)]">
              <div className="flex items-center gap-1.5">
                <button onClick={() => openWindow('coa')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
                  <BookOpen className="w-5 h-5 text-[var(--primary)]" />
                  <span>شجرة الحسابات</span>
                </button>
                <button onClick={() => openWindow('costCenters')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
                  <Layers className="w-5 h-5 text-[var(--primary)]" />
                  <span>مراكز الكلفة</span>
                </button>
                <button onClick={() => openWindow('currencies')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
                  <Coins className="w-5 h-5 text-[var(--primary)]" />
                  <span>أسعار العملات</span>
                </button>
              </div>
              <span className="text-[9px] text-gray-400 mt-1">الأدلة المحاسبية</span>
            </div>

            {/* Group: القوائم الختامية */}
            <div className="flex flex-col items-center pe-3 border-e border-[var(--border-color)]">
              <div className="flex items-center gap-1.5">
                <button onClick={() => openWindow('closingAccounts')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
                  <Scale className="w-5 h-5 text-[var(--primary)]" />
                  <span>الميزانية والأرباح</span>
                </button>
                <button onClick={() => openWindow('financialAnalysis')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
                  <Brain className="w-5 h-5 text-[var(--primary)]" />
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
            <div className="flex flex-col items-center pe-3 border-e border-[var(--border-color)]">
              <div className="flex items-center gap-1.5">
                <button onClick={() => openWindow('invoices')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
                  <Receipt className="w-5 h-5 text-[var(--primary)]" />
                  <span>فاتورة بيع</span>
                </button>
                <button onClick={() => openWindow('invoices')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
                  <PlusCircle className="w-5 h-5 text-[var(--primary)]" />
                  <span>فاتورة شراء</span>
                </button>
                <button onClick={() => openWindow('pos')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
                  <ShoppingCart className="w-5 h-5 text-[var(--primary)]" />
                  <span>نقطة بيع POS</span>
                </button>
              </div>
              <span className="text-[9px] text-gray-400 mt-1">المبيعات والمشتريات</span>
            </div>

            {/* Group: الطلبيات وعروض الأسعار */}
            <div className="flex flex-col items-center pe-3 border-e border-[var(--border-color)]">
              <div className="flex items-center gap-1.5">
                <button onClick={() => openWindow('orders')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
                  <ClipboardList className="w-5 h-5 text-[var(--primary)]" />
                  <span>طلبيات البيع</span>
                </button>
                <button onClick={() => openWindow('orders')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
                  <Truck className="w-5 h-5 text-[var(--primary)]" />
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
            <div className="flex flex-col items-center pe-3 border-e border-[var(--border-color)]">
              <div className="flex items-center gap-1.5">
                <button onClick={() => openWindow('journals')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
                  <FileCheck className="w-5 h-5 text-[var(--primary)]" />
                  <span>سند قيد</span>
                </button>
                <button onClick={() => openWindow('journals')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
                  <CheckCircle2 className="w-5 h-5 text-[var(--primary)]" />
                  <span>سند قبض</span>
                </button>
                <button onClick={() => openWindow('journals')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
                  <FileText className="w-5 h-5 text-[var(--primary)]" />
                  <span>سند دفع</span>
                </button>
              </div>
              <span className="text-[9px] text-gray-400 mt-1">السندات واليومية</span>
            </div>

            {/* Group: الأوراق المالية والبنوك */}
            <div className="flex flex-col items-center pe-3 border-e border-[var(--border-color)]">
              <div className="flex items-center gap-1.5">
                <button onClick={() => openWindow('cheques')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
                  <Calculator className="w-5 h-5 text-[var(--primary)]" />
                  <span>شيكات قبض/دفع</span>
                </button>
                <button onClick={() => openWindow('banks')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
                  <Building2 className="w-5 h-5 text-[var(--primary)]" />
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
            <button onClick={() => openWindow('pos')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
              <ShoppingCart className="w-5 h-5 text-[var(--primary)]" />
              <span>نقطة بيع</span>
            </button>
            <button onClick={() => openWindow('invoices')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
              <Receipt className="w-5 h-5 text-[var(--primary)]" />
              <span>فاتورة</span>
            </button>
            <button onClick={() => openWindow('materials')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
              <Package className="w-5 h-5 text-[var(--primary)]" />
              <span>المواد</span>
            </button>
            <button onClick={() => openWindow('coa')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
              <BookOpen className="w-5 h-5 text-[var(--primary)]" />
              <span>الحسابات</span>
            </button>
            <button onClick={() => openWindow('securityCenter')} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
              <ShieldCheck className="w-5 h-5 text-[var(--primary)]" />
              <span>الأمان 2026</span>
            </button>
          </div>
        )}

        {/* Print & Export global helpers on the right */}
        <div className="ms-auto flex items-center gap-2 ps-3 border-s border-[var(--border-color)]">
          <button onClick={() => window.print()} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
            <Printer className="w-4 h-4 text-gray-300" />
            <span>طباعة</span>
          </button>
          <button onClick={() => createBackup()} className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[56px]">
            <Database className="w-4 h-4 text-[var(--primary)]" />
            <span>نسخ احتياطي</span>
          </button>
        </div>
      </div>
    </div>
  );
};
