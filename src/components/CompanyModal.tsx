import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Company } from '../types';
import { ACCOUNTING_TREES, AccountingTreeTemplate } from '../data/accountingTrees';
import { 
  Building2, Database, Calendar, Check, Plus, ArrowRight, 
  ShieldCheck, MapPin, Phone, Hash, BookOpen, HardDrive, 
  Cloud, Lock, X, CheckCircle2 
} from 'lucide-react';

export const CompanyModal: React.FC = () => {
  const { 
    appStage, companies, currentCompany, selectCompanyAndProceed, 
    addCompany, translate, showToast, lockWorkstation 
  } = useApp();

  const [selectedCompany, setSelectedCompany] = useState<Company>(currentCompany || companies[0]);
  const [showAddCompany, setShowAddCompany] = useState(false);

  // New company state
  const [newCode, setNewCode] = useState(`00${companies.length + 1}`);
  const [newNameAr, setNewNameAr] = useState('');
  const [newNameEn, setNewNameEn] = useState('');
  const [selectedTreeId, setSelectedTreeId] = useState<string>('sa_zatca');
  const [newTaxId, setNewTaxId] = useState('');
  const [newVat, setNewVat] = useState('');
  const [newCity, setNewCity] = useState('');

  // Backup location preferences for the new company
  const [backupLocationType, setBackupLocationType] = useState<'local_appdata' | 'custom'>('local_appdata');
  const [customBackupPath, setCustomBackupPath] = useState('');
  const [autoCloudBackup, setAutoCloudBackup] = useState(true);

  const selectedTree = ACCOUNTING_TREES.find(t => t.id === selectedTreeId) || ACCOUNTING_TREES[0];

  if (appStage !== 'company_select') return null;

  const handleProceed = () => {
    if (!selectedCompany) {
      showToast('يرجى اختيار شركة للمتابعة');
      return;
    }
    selectCompanyAndProceed(selectedCompany);
  };

  const handleRegisterCompany = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedCode = newCode.trim().toLocaleUpperCase();
    if (!normalizedCode || !newNameAr.trim()) {
      showToast('رمز الشركة واسمها بالعربية حقول إلزامية');
      return;
    }
    if (companies.some(company => company.code.trim().toLocaleUpperCase() === normalizedCode)) {
      showToast('رمز الشركة مستخدم بالفعل؛ اختر رمزاً فريداً');
      return;
    }
    if (backupLocationType === 'custom' && !customBackupPath.trim()) {
      showToast('أدخل مسار النسخ المفضل أو اختر المسار الافتراضي');
      return;
    }

    const chosenBackupLoc = backupLocationType === 'local_appdata' 
      ? '%LocalAppData%\\ShouTech\\Backups\\' 
      : customBackupPath;

    const created: Omit<Company, 'id'> = {
      code: normalizedCode,
      name: newNameAr.trim(),
      nameEn: newNameEn.trim() || newNameAr.trim(),
      commercialName: newNameAr.trim(),
      taxId: newTaxId.trim(),
      commercialRegister: '',
      vatNumber: newVat.trim(),
      address: newCity.trim(),
      phone: '',
      currency: selectedTree.currency,
      database: `SQLite (${newCode}_${selectedTree.code}.db)`,
      isDefault: false,
      accountingTreeTemplateId: selectedTreeId,
      databaseType: 'sqlite',
      backupLocation: chosenBackupLoc,
      autoCloudBackup: autoCloudBackup,
      maxCloudBackups: 3
    };

    addCompany(created);
    setShowAddCompany(false);
    showToast(`تم حفظ سجل الشركة محلياً: ${newNameAr.trim()}. لم تُنشأ قاعدة بيانات فعلية ولم يُفعّل النسخ السحابي.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#141414] select-none p-4">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-radial from-[#0078D4]/10 via-transparent to-black pointer-events-none" />

      <div className="w-[740px] bg-[#222222] border border-[#3F3F46] rounded-2xl shadow-2xl overflow-hidden text-white relative z-10 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#1A1A1A] border-b border-[#383838] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#0078D4] flex items-center justify-center text-white shadow">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>{translate('company.selectTitle')}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                  المرحلة 2 من 3
                </span>
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {translate('company.selectPrompt')}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddCompany(!showAddCompany)}
            className="px-3 py-1.5 bg-[#2A2A2A] hover:bg-[#353535] border border-white/20 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>شركة وقاعدة بيانات جديدة</span>
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Add Company Inline Form */}
          {showAddCompany && (
            <form onSubmit={handleRegisterCompany} className="p-5 bg-[#181818] rounded-xl border border-cyan-500/40 space-y-3 animate-fade-in text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  <span>تأسيس شركة جديدة واختيار شجرة الحسابات والنسخ الاحتياطي</span>
                </h3>
                <button 
                  type="button" 
                  onClick={() => setShowAddCompany(false)}
                  className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 mb-1">رمز الشركة</label>
                  <input
                    type="text"
                    value={newCode}
                    onChange={e => setNewCode(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#121212] border border-white/20 rounded font-mono text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 mb-1">المدينة والمنطقة</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={e => setNewCity(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#121212] border border-white/20 rounded text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 mb-1">اسم الشركة بالعربية *</label>
                  <input
                    type="text"
                    value={newNameAr}
                    placeholder="مثال: شركة النجم العربي للتجارة"
                    onChange={e => setNewNameAr(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#121212] border border-white/20 rounded text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-400 mb-1">اسم الشركة بالإنجليزية</label>
                  <input
                    type="text"
                    value={newNameEn}
                    placeholder="e.g. Arab Star Trading Co."
                    onChange={e => setNewNameEn(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#121212] border border-white/20 rounded text-white"
                  />
                </div>
              </div>

              {/* 10 Accounting Trees Dropdown Selector */}
              <div className="p-3 bg-[#131313] rounded-lg border border-purple-500/30 space-y-2">
                <label className="block text-[11px] font-bold text-purple-300 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>دليل شجرة الحسابات المعتمد (10 International Trees):</span>
                </label>
                <select
                  value={selectedTreeId}
                  onChange={e => setSelectedTreeId(e.target.value)}
                  className="w-full px-2.5 py-2 bg-[#1A1A1A] border border-purple-500/40 rounded text-xs text-white font-medium"
                >
                  {ACCOUNTING_TREES.map(tree => (
                    <option key={tree.id} value={tree.id}>
                      {tree.nameAr} ({tree.standard}) - {tree.currency}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-gray-400 italic">
                  {selectedTree.description}
                </p>
                <div className="flex items-center justify-between text-[10px] text-gray-500 pt-1 border-t border-white/5">
                  <span>المعيار: <strong className="text-gray-300">{selectedTree.standard}</strong></span>
                  <span>العملة: <strong className="text-emerald-400 font-mono">{selectedTree.currency}</strong></span>
                  <span>عدد الحسابات: <strong className="text-cyan-400 font-mono">{selectedTree.accounts.length} حساب</strong></span>
                </div>
              </div>

              {/* Multi-Location Backup Configuration Section */}
              <div className="p-3 bg-[#131313] rounded-lg border border-blue-500/30 space-y-2.5">
                <label className="block text-[11px] font-bold text-blue-300 flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-blue-400" />
                  <span>تفضيلات مسار النسخ الاحتياطي (لا تنشئ نسخة فعلية):</span>
                </label>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="backupLocation"
                      checked={backupLocationType === 'local_appdata'}
                      onChange={() => setBackupLocationType('local_appdata')}
                      className="text-blue-600 focus:ring-0"
                    />
                    <span className="text-gray-200">
                      مكان النسخ الاحتياطي في <strong className="text-cyan-400 font-mono">%LocalAppData%\ShouTech\Backups</strong> (لم يتم التحقق من وجوده أو الكتابة إليه)
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="backupLocation"
                      checked={backupLocationType === 'custom'}
                      onChange={() => setBackupLocationType('custom')}
                      className="text-blue-600 focus:ring-0"
                    />
                    <span className="text-gray-200">
                      تحديد مسار مفضل فقط (لا يتم إنشاء مجلد أو التحقق من الصلاحيات حالياً)
                    </span>
                  </label>

                  {backupLocationType === 'custom' && (
                    <div className="pt-1 ps-6">
                      <input
                        type="text"
                        value={customBackupPath}
                        onChange={e => setCustomBackupPath(e.target.value)}
                        placeholder="e.g. D:\ERP_Backups\ or \\NAS_SERVER\Enterprise_Backups\"
                        className="w-full px-2.5 py-1.5 bg-[#1A1A1A] border border-blue-400/50 rounded text-xs font-mono text-white"
                      />
                    </div>
                  )}

                  {/* Cloud Vault 3-Copies Setting */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoCloudBackup}
                        onChange={e => setAutoCloudBackup(e.target.checked)}
                        className="rounded text-blue-600 focus:ring-0"
                      />
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Cloud className="w-3.5 h-3.5" />
                        <span>تفضيل النسخ السحابي مستقبلاً (الخدمة غير متصلة حالياً)</span>
                      </span>
                    </label>
                    <span className="text-gray-400 text-[10px] font-mono">لم يتم تفعيل التشفير أو خدمة سحابية</span>
                  </div>
                </div>
              </div>

              {/* Form Buttons: موافق وإغلاق */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddCompany(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>إغلاق</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 rounded-lg text-xs font-bold text-white shadow flex items-center gap-1.5 transition-all"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>موافق (تأسيس وحفظ)</span>
                </button>
              </div>
            </form>
          )}

          {/* Companies List */}
          <div className="space-y-3">
            {companies.map(comp => {
              const isSelected = selectedCompany?.id === comp.id;
              return (
                <div
                  key={comp.id}
                  onClick={() => setSelectedCompany(comp)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                    isSelected
                      ? 'bg-[#0078D4]/15 border-[#0078D4] ring-2 ring-[#0078D4]/60 shadow-lg'
                      : 'bg-[#1C1C1C] border-white/10 hover:border-white/25 hover:bg-[#202020]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-sm text-white">{comp.name}</span>
                      <span className="text-xs text-gray-400">({comp.nameEn})</span>
                      <span className="text-[10px] bg-white/10 text-cyan-300 px-2 py-0.5 rounded font-mono font-bold">
                        {comp.code}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-300">
                        <Database className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{comp.database}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-300">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>السنة المالية 2026</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-mono">
                        <Hash className="w-3.5 h-3.5" />
                        <span>العملة: {comp.currency}</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-gray-400 flex items-center justify-between pt-1 border-t border-white/5 font-mono">
                      <span>مسار النسخ: {comp.backupLocation || '%LocalAppData%\\ShouTech\\Backups'}</span>
                      <span className="text-emerald-400 font-bold">خدمة النسخ: غير متصلة</span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#0078D4] flex items-center justify-center shrink-0 shadow-md">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Window Footer: موافق وإغلاق */}
        <div className="px-6 py-4 bg-[#1A1A1A] border-t border-[#383838] flex items-center justify-between">
          <div className="text-xs text-gray-400">
            الشركة المحددة: <strong className="text-white">{selectedCompany?.name}</strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast('يرجى اختيار شركة ومتابعة تسجيل الدخول للمتابعة')}
              className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <X className="w-4 h-4" />
              <span>إغلاق (Close)</span>
            </button>
            <button
              onClick={handleProceed}
              className="flex items-center gap-2 px-7 py-2.5 bg-gradient-to-r from-[#0078D4] to-[#005A9E] hover:from-[#1084D9] hover:to-[#0078D4] text-white rounded-xl font-bold text-xs shadow-lg transition-all hover:scale-102"
            >
              <Check className="w-4 h-4" />
              <span>موافق (OK)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
