import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BackupRecord } from '../../types';
import { 
  Database, ShieldCheck, Download, Upload, CheckCircle2, 
  RotateCcw, Plus, HardDrive, Key, FileCode, Cloud, 
  Wifi, Check, X, Eye, Lock, RefreshCw, AlertTriangle, 
  Sliders, Server, Sparkles, Folder
} from 'lucide-react';

export const BackupView: React.FC = () => {
  const { 
    backups, createBackup, restoreBackup, currentCompany, 
    translate, showToast, openPreview, closeWindow, activeWindowId 
  } = useApp();

  const [selectedId, setSelectedId] = useState<string>(backups[0]?.id || '');
  const [backupNote, setBackupNote] = useState('نسخة احتياطية مرآة كاملة للشركة وقواعد البيانات');
  const [targetLocation] = useState<'local'>('local');
  const [customPath, setCustomPath] = useState(currentCompany.backupLocation || 'D:\\ShouTech_Backups\\Vault\\');

  // Filter backups for current company
  const companyBackups = backups.filter(b => !b.companyCode || b.companyCode === currentCompany.code);
  const cloudBackups = companyBackups.filter(b => b.storageTarget === 'cloud_vault');

  const handleCreate = (trigger: 'manual' | 'session_end' | 'session_start' = 'manual') => {
    const record = createBackup(backupNote, targetLocation, trigger);
    setSelectedId(record.id);
  };

  const handleRestore = (id: string) => {
    if (window.confirm('تأكيد استعادة النسخة الاحتياطية المرآة الكاملة؟ سيتم استرجاع كافة بيانات الشركة، قيود اليومية، المواد، الحسابات، والمستخدمين وتفضيلاتهم كما كانت في تاريخ النسخة.')) {
      restoreBackup(id);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] text-white select-none overflow-hidden">
      {/* 1. Header Toolbar with OK, Close, and Word Preview buttons */}
      <div className="p-3 bg-[#252526] border-b border-[#383838] flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>{translate('backup.title')} وإدارة النسخ السحابية المرآة (Disaster Recovery)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono font-bold">
                JSON snapshot — not encrypted
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">
              الشركة الحالية: <strong className="text-white">{currentCompany.name} ({currentCompany.code})</strong> · مسار الحفظ: {currentCompany.backupLocation || '%LocalAppData%\\ShouTech\\Backups'}
            </p>
          </div>
        </div>

        {/* Action Buttons: Word Preview, موافق (OK), إغلاق (Close) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => openPreview(`شهادة وسجل النسخ الاحتياطي للشركة ${currentCompany.name}`, 'security', { backups })}
            className="px-3 py-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded text-xs font-bold flex items-center gap-1.5 shadow"
            title="معاينة وورد لشهادة النسخ الاحتياطي"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>معاينة وورد (Word Preview)</span>
          </button>

          <button
            onClick={() => handleCreate('manual')}
            className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded text-xs font-bold flex items-center gap-1.5 shadow"
          >
            <Check className="w-3.5 h-3.5" />
            <span>موافق (حفظ ونسخ الآن OK)</span>
          </button>

          <button
            onClick={() => closeWindow(activeWindowId)}
            className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>إغلاق (Close)</span>
          </button>
        </div>
      </div>

      {/* 2. Main Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* Cloud Vault 3-Rolling Copies Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 bg-[#252526] rounded-xl border border-cyan-500/40 flex items-start gap-3">
            <Cloud className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">النسخ السحابي (غير متصل)</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold">3 نسخ كحد أقصى</span>
              </div>
              <p className="text-[11px] text-gray-300">
                لا يوجد تكامل بخادم سحابي في هذا الإصدار؛ لن ندّعي رفع النسخ أو مزامنتها قبل تنفيذ اتصال خادم موثوق.
              </p>
              <div className="flex items-center gap-2 pt-1 font-mono text-[10px] text-emerald-400">
                <Wifi className="w-3 h-3" />
                <span>لا يوجد اتصال سحابي مهيأ</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-[#252526] rounded-xl border border-purple-500/40 flex items-start gap-3">
            <HardDrive className="w-6 h-6 text-purple-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-xs text-white block">موقع النسخ المحلي في %LocalAppData%</span>
              <p className="text-[11px] text-gray-300">
                مسار التخزين الافتراضي: <strong className="text-purple-300 font-mono">%LocalAppData%\ShouTech\Backups</strong> مع تفضيلات المستخدم وقواعد البيانات.
              </p>
              <div className="text-[10px] text-gray-400 font-mono pt-1">
                الملف الناتج غير مشفّر؛ احفظه في موقع آمن ولا تشاركه مع غير المخوّلين.
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-[#252526] rounded-xl border border-emerald-500/40 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-xs text-white block">لقطة بيانات للتصدير (JSON Snapshot)</span>
              <p className="text-[11px] text-gray-300">
                تُحتفظ اللقطة داخل جلسة التطبيق الحالية للاسترجاع المؤقت. استيراد ملف بعد إعادة تشغيل التطبيق يحتاج إلى مسار استعادة مستقل.
              </p>
              <div className="text-[10px] text-emerald-400 font-mono pt-1 font-bold">
                ليست نسخة قاعدة بيانات كاملة ولا تشمل الملفات الخارجية أو إعدادات الخادم.
              </div>
            </div>
          </div>
        </div>

        {/* Snapshot Creation Control Box */}
        <div className="p-4 bg-[#252526] rounded-xl border border-[#383838] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#383838]">
            <span className="font-bold text-xs text-white flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>تنزيل لقطة JSON للشركة النشطة</span>
            </span>
   
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-gray-400 mb-1">وصف أو بيان النسخة الاحتياطية</label>
              <input
                type="text"
                value={backupNote}
                onChange={e => setBackupNote(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#444] rounded px-3 py-1.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] text-gray-400 mb-1">وجهة ومكان التخزين</label>
              <select
                value={targetLocation}
                className="w-full bg-[#1A1A1A] border border-[#444] rounded px-3 py-1.5 text-xs text-white font-medium"
              >
                <option value="local">تنزيل ملف JSON عبر المتصفح (غير مشفّر)</option>
              </select>
            </div>

            <div className="flex items-end gap-2">
              <button
                onClick={() => handleCreate('manual')}
                className="w-full py-1.5 bg-gradient-to-r from-[#0078D4] to-[#005A9E] hover:from-[#1084D9] hover:to-[#0078D4] rounded text-xs font-bold text-white shadow flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>أخذ لقطة مرآة الآن (Snapshot)</span>
              </button>
            </div>
          </div>

        </div>

        {/* Backups Table (Local & Cloud Vault Snapshots) */}
        <div className="bg-[#252526] rounded-xl border border-[#383838] overflow-hidden">
          <div className="p-3 bg-[#1F1F1F] border-b border-[#383838] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white">سجل لقطات الجلسة الحالية ({companyBackups.length})</span>
            </div>
            <span className="text-[11px] text-gray-400 font-mono">
              لا يوجد خادم سحابي متصل
            </span>
          </div>

          <table className="w-full text-right text-xs">
            <thead className="bg-[#181818] text-gray-400 border-b border-[#383838] font-bold">
              <tr>
                <th className="p-2.5 text-center w-12">#</th>
                <th className="p-2.5">اسم ملف النسخة المرآة</th>
                <th className="p-2.5 w-36 text-center">التاريخ والتوقيت</th>
                <th className="p-2.5 w-24 text-center">مكان الحفظ</th>
                <th className="p-2.5 w-24 text-center font-mono">الحجم</th>
                <th className="p-2.5 w-28 text-center">حالة الفحص</th>
                <th className="p-2.5">البيان ومناسبة النسخ</th>
                <th className="p-2.5 w-32 text-center">استعادة / تفريغ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#333333]">
              {companyBackups.map((b, idx) => {
                const isSelected = selectedId === b.id;
                const isCloud = b.storageTarget === 'cloud_vault';
                return (
                  <tr 
                    key={b.id} 
                    onClick={() => setSelectedId(b.id)}
                    className={`transition-colors cursor-pointer ${
                      isSelected ? 'bg-[#0078D4]/20 border-s-4 border-[#0078D4]' : 'hover:bg-white/5'
                    }`}
                  >
                    <td className="p-2.5 text-center font-mono text-gray-500 font-bold">{idx + 1}</td>
                    <td className="p-2.5">
                      <div className="font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                        {isCloud ? <Cloud className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> : <HardDrive className="w-3.5 h-3.5 text-gray-400 shrink-0" />}
                        <span>{b.name}</span>
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                        صيغة JSON · غير مشفّر · لم يتم التحقق من سلامة الملف
                      </div>
                    </td>
                    <td className="p-2.5 text-center font-mono text-gray-300">{b.date}</td>
                    <td className="p-2.5 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isCloud ? 'bg-cyan-500/20 text-cyan-300' : 'bg-purple-500/20 text-purple-300'
                      }`}>
                        {isCloud ? 'سحابي (Cloud)' : 'محلي (%Local%)'}
                      </span>
                    </td>
                    <td className="p-2.5 text-center font-mono text-gray-300 font-bold">{b.size}</td>
                    <td className="p-2.5 text-center">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] flex items-center justify-center gap-1 mx-auto w-fit">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>لم تُفحص</span>
                      </span>
                    </td>
                    <td className="p-2.5 text-gray-300 text-xs">{b.note}</td>
                    <td className="p-2.5 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRestore(b.id);
                        }}
                        className="px-3 py-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded text-xs font-bold shadow flex items-center gap-1 mx-auto"
                        title="استعادة لقطة محفوظة في جلسة التطبيق الحالية فقط"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>استعادة لقطة الجلسة</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* 3. Footer with OK and Close buttons */}
      <div className="p-3 bg-[#252526] border-t border-[#383838] flex items-center justify-between text-xs shrink-0">
        <div className="text-gray-400 font-mono text-[11px] flex items-center gap-3">
          <span>الشركة: <strong className="text-white">{currentCompany.name}</strong></span>
          <span>·</span>
          <span>النسخ السحابية: <strong className="text-cyan-400">غير مفعّلة</strong></span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => closeWindow(activeWindowId)}
            className="px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>إغلاق (Close)</span>
          </button>
          <button
            onClick={() => handleCreate('manual')}
            className="px-6 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold flex items-center gap-1 shadow"
          >
            <Check className="w-3.5 h-3.5" />
            <span>تنزيل لقطة JSON</span>
          </button>
        </div>
      </div>
    </div>
  );
};
