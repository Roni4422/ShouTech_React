import React, { useState } from 'react';
import { ArrowLeftRight, BookOpen, Building2, Calculator, BarChart3, ClipboardList, Database, FileText, Factory, HelpCircle, LayoutDashboard, Package, Receipt, ShieldCheck, ShoppingCart, Truck, Users, Wrench, FileCheck, type LucideIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NAVIGATION_SECTIONS } from '../navigation/moduleNavigation';

const ICONS: Record<string, LucideIcon> = {
  file: FileText, warehouses: Package, accounts: BookOpen, vouchers: FileCheck,
  invoices: Receipt, pos: ShoppingCart, orders: ClipboardList, customers: Users,
  representatives: Users, manufacturing: Factory, banks: Building2, reports: BarChart3,
  tools: Wrench, 'other-tools': Calculator, view: LayoutDashboard, exit: ShieldCheck, help: HelpCircle,
};

export const Ribbon: React.FC = () => {
  const { activeWindow, openWindow } = useApp();
  const [activeSectionId, setActiveSectionId] = useState('warehouses');
  const activeSection = NAVIGATION_SECTIONS.find(section => section.id === activeSectionId) ?? NAVIGATION_SECTIONS[1];

  return (
    <section className="st-ribbon shrink-0 border-b border-[var(--border-color)] bg-[var(--surface)]" dir="ltr" aria-label={isArabic ? 'شريط الأوامر' : 'Ribbon'}>
      <nav className="flex items-stretch gap-0.5 overflow-x-auto border-b border-[var(--border-color)] px-1 pt-1" aria-label={isArabic ? 'أقسام البرنامج' : 'Application sections'}>
        {NAVIGATION_SECTIONS.map(section => {
          const Icon = ICONS[section.id] ?? FileText;
          const selected = section.id === activeSection.id;
          return (
            <button key={section.id} type="button" onClick={() => setActiveSectionId(section.id)}
              aria-pressed={selected}
              className={'flex shrink-0 items-center gap-1.5 rounded-t px-2.5 py-2 text-xs transition-colors ' +
                (selected ? 'border-t-2 border-[var(--primary)] bg-[var(--surface-light)] font-semibold text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--surface-light)] hover:text-[var(--text-primary)]')}>
              <Icon className="h-3.5 w-3.5" />
              <span>{section.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="st-ribbon-command-area flex min-h-[82px] items-stretch gap-2 overflow-x-auto px-3 py-2">
        <div className="flex min-w-0 items-stretch gap-1">
          {activeSection.commands.map(command => {
            const Icon = ICONS[activeSection.id] ?? FileText;
            const label = command.label;
            return (
              <button key={command.id} type="button" onClick={() => openWindow(command.target)}
                title={label}
                className={'flex min-w-[82px] max-w-[124px] flex-col items-center justify-center gap-1 rounded px-2 py-1.5 text-center text-[11px] text-[var(--text-primary)] hover:bg-[var(--surface-light)] ' +
                  (activeWindow === command.target ? 'bg-[var(--surface-light)]' : '')}>
                <Icon className="h-5 w-5 text-[var(--primary)]" />
                <span className="line-clamp-2 leading-4">{label}</span>
              </button>
            );
          })}
        </div>
        <div className="ms-auto flex shrink-0 items-center border-s border-[var(--border-color)] ps-2">
          <button type="button" onClick={() => openWindow('backup')} className="flex min-w-[72px] flex-col items-center justify-center gap-1 rounded px-2 py-1.5 text-[11px] hover:bg-[var(--surface-light)]">
            <Database className="h-5 w-5 text-[var(--primary)]" />
            <span>Backup</span>
          </button>
          <button type="button" onClick={() => openWindow('dataExchange')} className="flex min-w-[72px] flex-col items-center justify-center gap-1 rounded px-2 py-1.5 text-[11px] hover:bg-[var(--surface-light)]">
            <ArrowLeftRight className="h-5 w-5 text-[var(--primary)]" />
            <span>Data Exchange</span>
          </button>
        </div>
      </div>
    </section>
  );
};
