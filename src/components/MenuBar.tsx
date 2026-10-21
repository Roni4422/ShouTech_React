import React, { useState } from 'react';
import { Building2, Globe, LogOut, Moon, Sun, UserCircle, X, Maximize2, Columns, Rows, Settings, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LanguageCode } from '../types';
import { NAVIGATION_SECTIONS } from '../navigation/moduleNavigation';

const LANGUAGE_LABELS: Record<LanguageCode, string> = {
  ar: 'Arabic', en: 'English', fr: 'French', tr: 'Turkish',
  de: 'German', es: 'Spanish', ru: 'Russian', zh: 'Chinese',
  fa: 'Persian', ur: 'Urdu'
};

export const MenuBar: React.FC = () => {
  const {
    language, setLanguage, theme, setTheme, currentCompany, currentUser,
    setShowCompanySelect, logout, openWindow, openWindows, activeWindowId,
    focusWindow, closeWindow, closeAllWindows, setWindowLayout
  } = useApp();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const closeMenu = () => setActiveMenu(null);

  const runCommand = (id: string, target: import('../types').ActiveWindow) => {
    closeMenu();
    if (id === 'sign-out') { logout(); return; }
    if (id === 'switch-company') { setShowCompanySelect(true); return; }
    if (id === 'lock') { openWindow('securityCenter'); return; }
    openWindow(target);
  };

  const menuButton = (id: string, text: string) => (
    <button type="button" onClick={() => setActiveMenu(current => current === id ? null : id)}
      aria-expanded={activeMenu === id}
      className={'h-full shrink-0 px-2.5 text-xs transition-colors hover:bg-[var(--surface-light)] ' +
        (activeMenu === id ? 'bg-[var(--surface-light)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)]')}>
      {text}
    </button>
  );

  const action = (text: string, onClick: () => void, icon?: React.ReactNode) => (
    <button type="button" onClick={() => { onClick(); closeMenu(); }}
      className="flex w-full items-center gap-2 px-3 py-2 text-start text-xs text-[var(--text-primary)] hover:bg-[var(--surface-light)]">
      {icon}<span>{text}</span>
    </button>
  );

  return (
    <header className="st-menu-bar relative z-40 flex h-10 shrink-0 items-center justify-between border-b border-[var(--border-color)] bg-[var(--surface)] text-[var(--text-primary)]" dir="ltr">
      <div className="flex h-full min-w-0 items-center">
        <div className="flex h-full shrink-0 items-center gap-2 border-e border-[var(--border-color)] px-3">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-[var(--primary)] text-[10px] font-bold text-white">ST</span>
          <span className="whitespace-nowrap text-xs font-bold">ShouTech ERP</span>
        </div>
        <nav className="flex h-full min-w-0 items-center overflow-x-auto" aria-label="Menu bar">
          {NAVIGATION_SECTIONS.map(section => (
            <div key={section.id} className="relative h-full">
              {menuButton(section.id, section.label)}
              {activeMenu === section.id && (
                <div className="absolute top-full start-0 z-50 min-w-52 max-w-72 overflow-hidden rounded-b border border-[var(--border-color)] bg-[var(--surface)] shadow-xl">
                  {section.commands.map(command => (
                    <button key={command.id} type="button" onClick={() => runCommand(command.id, command.target)}
                      className="flex w-full items-center gap-2 border-b border-[var(--border-color)]/60 px-3 py-2 text-start text-xs text-[var(--text-primary)] last:border-0 hover:bg-[var(--surface-light)]">
                      <FileText className="h-3.5 w-3.5 shrink-0 text-[var(--primary)]" />
                      <span>{command.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="relative h-full">
            {menuButton('window', 'Window')}
            {activeMenu === 'window' && <div className="absolute top-full start-0 z-50 min-w-64 overflow-hidden rounded-b border border-[var(--border-color)] bg-[var(--surface)] shadow-xl">
              <div className="px-3 py-2 text-[10px] font-semibold text-[var(--text-secondary)]">Open windows ({openWindows.length})</div>
              <div className="max-h-56 overflow-y-auto">
                {openWindows.length === 0 && <div className="px-3 py-2 text-xs text-[var(--text-secondary)]">No open windows</div>}
                {openWindows.map(win => <div key={win.id} className={'flex items-center border-t border-[var(--border-color)] ' + (win.id === activeWindowId ? 'bg-[var(--surface-light)]' : '')}>
                  <button type="button" onClick={() => { focusWindow(win.id); closeMenu(); }} className="min-w-0 flex-1 truncate px-3 py-2 text-start text-xs hover:bg-[var(--surface-light)]">{win.title}</button>
                  <button type="button" aria-label="Close window" onClick={() => closeWindow(win.id)} className="p-2 text-[var(--text-secondary)] hover:text-red-400"><X className="h-3.5 w-3.5" /></button>
                </div>)}
              </div>
              <div className="grid grid-cols-3 border-t border-[var(--border-color)]">
                <button type="button" onClick={() => { setWindowLayout('tabbed'); closeMenu(); }} className="flex items-center justify-center p-2 hover:bg-[var(--surface-light)]" title="Tabbed"><Maximize2 className="h-3.5 w-3.5" /></button>
                <button type="button" onClick={() => { setWindowLayout('tileH'); closeMenu(); }} className="flex items-center justify-center p-2 hover:bg-[var(--surface-light)]" title="Tile horizontally"><Columns className="h-3.5 w-3.5" /></button>
                <button type="button" onClick={() => { setWindowLayout('tileV'); closeMenu(); }} className="flex items-center justify-center p-2 hover:bg-[var(--surface-light)]" title="Tile vertically"><Rows className="h-3.5 w-3.5" /></button>
              </div>
              {action('Close all windows', closeAllWindows)}
            </div>}
          </div>
          <div className="relative h-full">
            {menuButton('settings', 'Settings')}
            {activeMenu === 'settings' && <div className="absolute top-full start-0 z-50 min-w-52 overflow-hidden rounded-b border border-[var(--border-color)] bg-[var(--surface)] shadow-xl">
              {action('System preferences', () => openWindow('settings'), <Settings className="h-3.5 w-3.5" />)}
              <div className="flex items-center justify-between gap-2 px-3 py-2 text-xs">
                <span className="flex items-center gap-2"><Globe className="h-3.5 w-3.5" />Language</span>
                <select aria-label="Language" value={language} onChange={event => setLanguage(event.target.value as LanguageCode)} className="max-w-28 rounded border border-[var(--border-color)] bg-[var(--surface)] p-1 text-xs">
                  {(Object.keys(LANGUAGE_LABELS) as LanguageCode[]).map(code => <option key={code} value={code}>{LANGUAGE_LABELS[code]}</option>)}
                </select>
              </div>
              {action(theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme', () => setTheme(theme === 'dark' ? 'light' : 'dark'), theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />)}
            </div>}
          </div>
        </nav>
      </div>
      <div className="flex shrink-0 items-center gap-1 px-2 text-[11px]">
        <button type="button" onClick={() => setShowCompanySelect(true)} title="Switch company" className="flex max-w-36 items-center gap-1.5 truncate rounded px-2 py-1 hover:bg-[var(--surface-light)]">
          <Building2 className="h-3.5 w-3.5 shrink-0 text-[var(--primary)]" /><span className="truncate">{currentCompany.name || 'Company'}</span>
        </button>
        <span className="hidden max-w-28 items-center gap-1 truncate text-[var(--text-secondary)] lg:flex"><UserCircle className="h-3.5 w-3.5 shrink-0" /><span className="truncate">{currentUser?.fullName || 'Signed out'}</span></span>
        <button type="button" onClick={logout} title="Sign out" className="rounded p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-light)] hover:text-red-400"><LogOut className="h-3.5 w-3.5" /></button>
      </div>
    </header>
  );
};
