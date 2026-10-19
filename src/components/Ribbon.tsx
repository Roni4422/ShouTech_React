import React from 'react';
import {
  Activity, ArrowLeftRight, BarChart3, BookOpen, Building2, Calculator,
  Coins, Cpu, Database, FileCheck, FileText, Factory, Layers, LayoutDashboard,
  Package, Printer, Receipt, Scale, Settings, ShieldAlert, ShieldCheck, ShoppingCart,
  Truck, Users, UserCheck, Warehouse, Wrench, ClipboardList, Brain
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActiveWindow } from '../types';

type RibbonItem = {
  id: ActiveWindow;
  icon: React.ComponentType<{ className?: string }>;
};

const items: RibbonItem[] = [
  { id: 'dashboard', icon: LayoutDashboard },
  { id: 'pos', icon: ShoppingCart },
  { id: 'invoices', icon: Receipt },
  { id: 'materials', icon: Package },
  { id: 'warehouses', icon: Warehouse },
  { id: 'coa', icon: BookOpen },
  { id: 'costCenters', icon: Layers },
  { id: 'currencies', icon: Coins },
  { id: 'journals', icon: FileCheck },
  { id: 'cheques', icon: Calculator },
  { id: 'closingAccounts', icon: Scale },
  { id: 'financialAnalysis', icon: Activity },
  { id: 'orders', icon: ClipboardList },
  { id: 'crm', icon: Users },
  { id: 'salesReps', icon: UserCheck },
  { id: 'manufacturing', icon: Factory },
  { id: 'banks', icon: Building2 },
  { id: 'reports', icon: BarChart3 },
  { id: 'aiEnterprise', icon: Brain },
  { id: 'securityCenter', icon: ShieldCheck },
  { id: 'tools', icon: Wrench },
  { id: 'enterpriseOptions', icon: Building2 },
  { id: 'delivery', icon: Truck },
  { id: 'backup', icon: Database },
  { id: 'dataExchange', icon: ArrowLeftRight },
  { id: 'settings', icon: Settings },
  { id: 'users', icon: UserCheck },
  { id: 'nativeEngine', icon: Cpu },
  { id: 'license', icon: ShieldAlert },
  { id: 'about', icon: FileText }
];

const groups: { label: string; windows: ActiveWindow[] }[] = [
  { label: 'window.dashboard', windows: ['dashboard', 'reports', 'aiEnterprise'] },
  { label: 'window.materials', windows: ['materials', 'warehouses', 'delivery', 'manufacturing'] },
  { label: 'window.invoices', windows: ['invoices', 'pos', 'orders', 'crm', 'salesReps'] },
  { label: 'window.coa', windows: ['coa', 'costCenters', 'currencies', 'journals', 'cheques', 'banks', 'closingAccounts', 'financialAnalysis'] },
  { label: 'window.settings', windows: ['users', 'securityCenter', 'settings', 'enterpriseOptions', 'tools', 'nativeEngine', 'license', 'about'] },
  { label: 'window.backup', windows: ['backup', 'dataExchange'] }
];

export const Ribbon: React.FC = () => {
  const { activeWindow, openWindow, translate } = useApp();

  const activeGroup = groups.find(group => group.windows.includes(activeWindow)) ?? groups[0];
  const commandWindows = activeGroup.windows
    .filter(id => id !== activeWindow)
    .slice(0, 5)
    .map(id => items.find(item => item.id === id))
    .filter((item): item is RibbonItem => Boolean(item));

  return (
    <div className="st-ribbon border-b select-none shrink-0">
      <div className="flex items-center gap-1 px-2 pt-1 border-b border-[var(--border-color)] overflow-x-auto">
        {items.map(item => {
          const Icon = item.icon;
          const isActive = activeWindow === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => openWindow(item.id)}
              aria-current={isActive ? 'page' : undefined}
              title={translate('window.' + item.id)}
              className={'flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-t transition-colors shrink-0 ' +
                (isActive
                  ? 'bg-[var(--surface-light)] text-[var(--text-primary)] border-t-2 border-[var(--primary)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5')}
            >
              <Icon className={'w-3.5 h-3.5 ' + (isActive ? 'text-[var(--primary)]' : 'text-[var(--text-secondary)]')} />
              <span className="whitespace-nowrap">{translate('window.' + item.id)}</span>
            </button>
          );
        })}
      </div>

      <div className="st-ribbon-command-area min-h-20 px-3 py-1 flex items-center gap-3 overflow-x-auto text-xs">
        <div className="flex items-center gap-2 pe-3 border-e border-[var(--border-color)]">
          {commandWindows.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => openWindow(item.id)}
                title={translate('window.' + item.id)}
                className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[66px]"
              >
                <Icon className="w-5 h-5 text-[var(--primary)]" />
                <span className="max-w-20 truncate">{translate('window.' + item.id)}</span>
              </button>
            );
          })}
          <span className="sr-only">{translate(activeGroup.label)}</span>
        </div>

        <div className="ms-auto flex items-center gap-2 ps-3 border-s border-[var(--border-color)]">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[60px]"
          >
            <Printer className="w-4 h-4 text-gray-300" />
            <span>{translate('ribbon.print')}</span>
          </button>
          <button
            type="button"
            onClick={() => openWindow('backup')}
            className="flex flex-col items-center justify-center p-1.5 rounded hover:bg-[var(--surface-light)] text-[11px] gap-1 min-w-[60px]"
          >
            <Database className="w-4 h-4 text-[var(--primary)]" />
            <span>{translate('ribbon.createBackup')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
