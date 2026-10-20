import React, { useState } from 'react';
import {
  Building2, ChevronDown, FileText, LayoutGrid, LogOut, Moon, Printer,
  Settings, Sun, UserCircle, Globe, Database, X, Maximize2, Columns, Rows
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LanguageCode } from '../types';

type MenuName = 'file' | 'view' | 'company' | 'settings' | 'help' | null;

const LANGUAGE_LABELS: Record<LanguageCode, string> = {
  ar: 'العربية', en: 'English', fr: 'Français', tr: 'Türkçe',
  de: 'Deutsch', es: 'Español', ru: 'Русский', zh: '中文', fa: 'فارسی', ur: 'اردو'
};

export const MenuBar: React.FC = () => {
  const {
    language, setLanguage, theme, setTheme, currentCompany, currentUser,
    setShowCompanySelect, logout, openWindow, activeWindow, openPreview,
    openWindows, activeWindowId, focusWindow, closeWindow, closeAllWindows,
    windowLayout, setWindowLayout, translate
  } = useApp();
  const [activeMenu, setActiveMenu] = useState<MenuName>(null);
  const rtl = language === 'ar' || language === 'fa' || language === 'ur';

  const toggleMenu = (menu: Exclude<MenuName, null>) =>
    setActiveMenu(current => current === menu ? null : menu);

  const menuButton = (id: Exclude<MenuName, null>, label: string) => (
    <button type="button" onClick={() => toggleMenu(id)} aria-expanded={activeMenu === id}
      className={'h-full px-3 text-xs transition-colors hover:bg-white/10 ' + (activeMenu === id ? 'bg-white/10 text-white' : 'text-gray-200')}>
      {label}
    </button>
  );

  const action = (label: string, onClick: () => void, icon?: React.ReactNode) => (
    <button type="button" onClick={() => { onClick(); setActiveMenu(null); }}
      className="w-full flex items-center gap-2 px-3 py-2 text-start text-xs text-[var(--text-primary)] hover:bg-[var(--surface-light)]">
      {icon}<span>{label}</span>
    </button>
  );

  return (
    <header className="st-menu-bar relative z-40 flex h-10 shrink-0 items-center justify-between border-b border-[var(--border-color)] bg-[var(--surface)] text-[var(--text-primary)]" dir={rtl ? 'rtl' : 'ltr'}>
      <div className="flex h-full min-w-0 items-center">
        <div className="flex h-full items-center gap-2 border-e border-[var(--border-color)] px-3">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-[var(--primary)] text-[10px] font-bold text-white">ST</span>
          <span className="whitespace-nowrap text-xs font-bold">ShouTech ERP</span>
          <span className="hidden text-[10px] text-[var(--text-secondary)] sm:inline">10.6.0</span>
        </div>
        <nav className="flex h-full items-center">
          <div className="relative h-full">{menuButton('file', rtl ? 'ملف' : 'File')}
            {activeMenu === 'file' && <div className="absolute top-full start-0 z-50 min-w-48 overflow-hidden rounded-b border border-[var(--border-color)] bg-[var(--surface)] shadow-xl">
              {action(rtl ? 'معاينة وطباعة المستند' : 'Preview / print document', () => openPreview(activeWindow, activeWindow), <Printer className="h-3.5 w-3.5" />)}
              {action(rtl ? 'النسخ الاحتياطي' : 'Backup', () => openWindow('backup'), <Database className="h-3.5 w-3.5" />)}
              {action(rtl ? 'تبادل البيانات' : 'Data exchange', () => openWindow('dataExchange'), <FileText className="h-3.5 w-3.5" />)}
              <div className="border-t border-[var(--border-color)]">{action(rtl ? 'تسجيل الخروج' : 'Sign out', logout, <LogOut className="h-3.5 w-3.5" />)}</div>
            </div>}
          </div>
          <div className="relative h-full">{menuButton('view', rtl ? 'عرض' : 'View')}
            {activeMenu === 'view' && <div className="absolute top-full start-0 z-50 min-w-64 overflow-hidden rounded-b border border-[var(--border-color)] bg-[var(--surface)] shadow-xl">
              <div className="px-3 py-2 text-[10px] font-semibold text-[var(--text-secondary)]">{rtl ? 'النوافذ المفتوحة' : 'Open windows'} ({openWindows.length})</div>
              <div className="max-h-64 overflow-y-auto">
                {openWindows.length === 0 && <div className="px-3 py-2 text-xs text-[var(--text-secondary)]">{rtl ? 'لا توجد نوافذ مفتوحة' : 'No open windows'}</div>}
                {openWindows.map(win => <div key={win.id} className={'flex items-center border-t border-[var(--border-color)] ' + (win.id === activeWindowId ? 'bg-[var(--surface-light)]' : '')}>
                  <button type="button" onClick={() => { focusWindow(win.id); setActiveMenu(null); }} className="min-w-0 flex-1 truncate px-3 py-2 text-start text-xs hover:bg-[var(--surface-light)]">{win.title}</button>
                  <button type="button" title={rtl ? 'إغلاق النافذة' : 'Close window'} onClick={() => closeWindow(win.id)} className="p-2 text-[var(--text-secondary)] hover:text-red-400"><X className="h-3.5 w-3.5" /></button>
                </div>)}
              </div>
              <div className="grid grid-cols-3 border-t border-[var(--border-color)]">
                <button type="button" onClick={() => { setWindowLayout('tabbed'); setActiveMenu(null); }} className="flex items-center justify-center gap-1 p-2 text-[10px] hover:bg-[var(--surface-light)]" title="Tabbed"><Maximize2 className="h-3.5 w-3.5" /></button>
                <button type="button" onClick={() => { setWindowLayout('tileH'); setActiveMenu(null); }} className="flex items-center justify-center gap-1 p-2 text-[10px] hover:bg-[var(--surface-light)]" title="Tile horizontally"><Columns className="h-3.5 w-3.5" /></button>
                <button type="button" onClick={() => { setWindowLayout('tileV'); setActiveMenu(null); }} className="flex items-center justify-center gap-1 p-2 text-[10px] hover:bg-[var(--surface-light)]" title="Tile vertically"><Rows className="h-3.5 w-3.5" /></button>
              </div>
              {action(rtl ? 'إغلاق جميع النوافذ' : 'Close all windows', () => closeAllWindows(), <LayoutGrid className="h-3.5 w-3.5" />)}
            </div>}
          </div>
          <div className="relative h-full">{menuButton('company', rtl ? 'الشركة' : 'Company')}
            {activeMenu === 'company' && <div className="absolute top-full start-0 z-50 min-w-52 overflow-hidden rounded-b border border-[var(--border-color)] bg-[var(--surface)] shadow-xl">
              <div className="px-3 py-2 text-xs font-semibold">{currentCompany.name || (rtl ? 'لا توجد شركة محددة' : 'No company selected')}</div>
              {action(rtl ? 'اختيار / تبديل الشركة' : 'Select / switch company', () => setShowCompanySelect(true), <Building2 className="h-3.5 w-3.5" />)}
            </div>}
          </div>
          <div className="relative h-full">{menuButton('settings', rtl ? 'إعدادات' : 'Settings')}
            {activeMenu === 'settings' && <div className="absolute top-full start-0 z-50 min-w-52 overflow-hidden rounded-b border border-[var(--border-color)] bg-[var(--surface)] shadow-xl">
              {action(rtl ? 'تفضيلات النظام' : 'System preferences', () => openWindow('settings'), <Settings className="h-3.5 w-3.5" />)}
              <div className="flex items-center justify-between gap-3 px-3 py-2 text-xs"><span className="flex items-center gap-2"><Globe className="h-3.5 w-3.5" />{rtl ? 'اللغة' : 'Language'}</span>
                <select value={language} onChange={e => setLanguage(e.target.value as LanguageCode)} className="max-w-28 rounded border border-[var(--border-color)] bg-[var(--surface)] p-1 text-xs">
                  {(Object.keys(LANGUAGE_LABELS) as LanguageCode[]).map(code => <option key={code} value={code}>{LANGUAGE_LABELS[code]}</option>)}
                </select>
              </div>
              {action(theme === 'dark' ? (rtl ? 'الوضع الفاتح' : 'Light theme') : (rtl ? 'الوضع الداكن' : 'Dark theme'), () => setTheme(theme === 'dark' ? 'light' : 'dark'), theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />)}
            </div>}
          </div>
          <div className="relative h-full">{menuButton('help', rtl ? 'مساعدة' : 'Help')}
            {activeMenu === 'help' && <div className="absolute top-full start-0 z-50 min-w-40 overflow-hidden rounded-b border border-[var(--border-color)] bg-[var(--surface)] shadow-xl">
              {action(rtl ? 'حول ShouTech ERP' : 'About ShouTech ERP', () => openWindow('about'), <FileText className="h-3.5 w-3.5" />)}
            </div>}
          </div>
        </nav>
      </div>
      <div className="flex min-w-0 items-center gap-2 px-2 text-[11px]">
        <button type="button" onClick={() => setShowCompanySelect(true)} className="flex max-w-44 items-center gap-1.5 truncate rounded px-2 py-1 hover:bg-[var(--surface-light)]" title={rtl ? 'تبديل الشركة' : 'Switch company'}>
          <Building2 className="h-3.5 w-3.5 shrink-0 text-[var(--primary)]" /><span className="truncate">{currentCompany.name || (rtl ? 'الشركة' : 'Company')}</span>
        </button>
        <span className="hidden max-w-36 items-center gap-1.5 truncate text-[var(--text-secondary)] md:flex"><UserCircle className="h-3.5 w-3.5 shrink-0" /><span className="truncate">{currentUser?.fullName || (rtl ? 'غير مسجل' : 'Signed out')}</span></span>
      </div>
    </header>
  );
};
