import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Save, Printer, Search, Moon, Sun, Globe, Building2, UserCircle, LogOut 
} from 'lucide-react';
import { LanguageCode } from '../types';

export const QuickToolbar: React.FC = () => {
  const { 
    theme, setTheme, language, setLanguage, currentCompany, currentUser, 
    setShowCompanySelect, setShowLoginModal, logout, translate, showToast,
    openPreview, activeWindow 
  } = useApp();

  const toggleLanguage = () => {
    const nextLang: Record<LanguageCode, LanguageCode> = {
      ar: 'en',
      en: 'fr',
      fr: 'tr',
      tr: 'de',
      de: 'es',
      es: 'ru',
      ru: 'zh',
      zh: 'fa',
      fa: 'ur',
      ur: 'ar'
    };
    setLanguage(nextLang[language] || 'ar');
  };

  const langLabels: Record<LanguageCode, string> = {
    ar: 'العربية (AR)',
    en: 'English (EN)',
    fr: 'Français (FR)',
    tr: 'Türkçe (TR)',
    de: 'Deutsch (DE)',
    es: 'Español (ES)',
    ru: 'Русский (RU)',
    zh: '中文 (ZH)',
    fa: 'فارسی (FA)',
    ur: 'اردو (UR)'
  };

  return (
    <div className="bg-[#1E1E1E] border-b border-[#333333] px-3 py-1.5 flex items-center justify-between text-xs text-gray-300">
      {/* Quick Action Icons */}
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <div className="flex items-center gap-1.5 pe-3 border-e border-[#383838]">
          <div className="w-6 h-6 rounded bg-[#0078D4] flex items-center justify-center font-bold text-white text-[10px]">
            ST
          </div>
          <span className="font-bold text-white tracking-wide">ShouTech ERP</span>
          <span className="text-[10px] px-1 bg-white/10 rounded text-gray-400 font-mono">10.6.0</span>
        </div>

        <button 
          onClick={() => showToast(translate('common.save'))}
          className="p-1.5 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors"
          title={translate('common.save')}
        >
          <Save className="w-3.5 h-3.5 text-blue-400" />
        </button>

        <button 
          onClick={() => openPreview(`معاينة مستند: ${activeWindow}`, activeWindow)}
          className="p-1.5 hover:bg-white/10 rounded text-sky-400 hover:text-white transition-colors flex items-center gap-1"
          title="معاينة وورد للمستند الحالي (Word Preview)"
        >
          <Printer className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold hidden sm:inline">معاينة وورد</span>
        </button>

        <button 
          onClick={() => showToast(translate('common.search'))}
          className="p-1.5 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors"
          title={translate('common.search')}
        >
          <Search className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right controls: Company, User, Lang, Theme */}
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        {/* Company Switcher */}
        <button
          onClick={() => setShowCompanySelect(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-[#282828] hover:bg-[#323232] border border-white/10 rounded text-gray-200 hover:text-white transition-colors"
          title={translate('company.selectTitle')}
        >
          <Building2 className="w-3.5 h-3.5 text-[#0078D4]" />
          <span className="max-w-[150px] truncate font-medium">{currentCompany.name}</span>
          <span className="text-[10px] text-gray-400 font-mono">[{currentCompany.code}]</span>
        </button>

        {/* User Account */}
        <button
          onClick={() => setShowLoginModal(true)}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-[#282828] hover:bg-[#323232] border border-white/10 rounded text-gray-200 hover:text-white transition-colors"
        >
          <UserCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>{currentUser?.fullName || 'User'}</span>
          <span className="text-[10px] text-gray-400 font-mono capitalize">({currentUser?.role})</span>
        </button>

        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-2 py-1 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors"
          title="Switch Language (AR / EN / FR / TR)"
        >
          <Globe className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-semibold text-[11px]">{langLabels[language]}</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-1.5 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors"
          title="Toggle Light/Dark Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-3.5 h-3.5 text-yellow-400" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-indigo-400" />
          )}
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="p-1.5 hover:bg-red-900/40 rounded text-gray-400 hover:text-red-400 transition-colors"
          title="Logout"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
