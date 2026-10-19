import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Coins, Plus, RefreshCw, ArrowUpDown, TrendingUp, 
  FileSpreadsheet, ShieldAlert, CheckCircle2, DollarSign 
} from 'lucide-react';

interface CurrencyRate {
  code: string;
  nameAr: string;
  nameEn: string;
  symbol: string;
  subUnit: string;
  buyRate: number;
  sellRate: number;
  avgRate: number;
  lastUpdated: string;
  isBase: boolean;
}

export const CurrenciesView: React.FC = () => {
  const { currentCompany, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'bulletin' | 'define' | 'average' | 'diff'>('bulletin');
  
  const [rates, setRates] = useState<CurrencyRate[]>([
    { code: 'SAR', nameAr: 'ريال سعودي', nameEn: 'Saudi Riyal', symbol: 'ر.س', subUnit: 'هللة', buyRate: 1.0000, sellRate: 1.0000, avgRate: 1.0000, lastUpdated: '2026-10-19 09:00', isBase: true },
    { code: 'USD', nameAr: 'دولار أمريكي', nameEn: 'US Dollar', symbol: '$', subUnit: 'Cent', buyRate: 3.7500, sellRate: 3.7550, avgRate: 3.7525, lastUpdated: '2026-10-19 09:00', isBase: false },
    { code: 'EUR', nameAr: 'يورو أوروبي', nameEn: 'Euro', symbol: '€', subUnit: 'Cent', buyRate: 4.0820, sellRate: 4.0910, avgRate: 4.0865, lastUpdated: '2026-10-19 09:00', isBase: false },
    { code: 'AED', nameAr: 'درهم إماراتي', nameEn: 'UAE Dirham', symbol: 'د.إ', subUnit: 'فلس', buyRate: 1.0210, sellRate: 1.0225, avgRate: 1.0218, lastUpdated: '2026-10-19 09:00', isBase: false },
    { code: 'SYP', nameAr: 'ليرة سورية', nameEn: 'Syrian Pound', symbol: 'ل.س', subUnit: 'قرش', buyRate: 0.00025, sellRate: 0.00026, avgRate: 0.000255, lastUpdated: '2026-10-19 09:00', isBase: false },
    { code: 'TRY', nameAr: 'ليرة تركية', nameEn: 'Turkish Lira', symbol: '₺', subUnit: 'Kuruş', buyRate: 0.1085, sellRate: 0.1092, avgRate: 0.1088, lastUpdated: '2026-10-19 09:00', isBase: false },
    { code: 'GBP', nameAr: 'جنيه إسترليني', nameEn: 'British Pound', symbol: '£', subUnit: 'Penny', buyRate: 4.7850, sellRate: 4.7980, avgRate: 4.7915, lastUpdated: '2026-10-19 09:00', isBase: false },
    { code: 'CNY', nameAr: 'يوان صيني', nameEn: 'Chinese Yuan', symbol: '¥', subUnit: 'Fen', buyRate: 0.5210, sellRate: 0.5230, avgRate: 0.5220, lastUpdated: '2026-10-19 09:00', isBase: false },
    { code: 'KWD', nameAr: 'دينار كويتي', nameEn: 'Kuwaiti Dinar', symbol: 'د.ك', subUnit: 'فلس', buyRate: 12.2200, sellRate: 12.2450, avgRate: 12.2325, lastUpdated: '2026-10-19 09:00', isBase: false },
    { code: 'JOD', nameAr: 'دينار أردني', nameEn: 'Jordanian Dinar', symbol: 'د.أ', subUnit: 'فلس', buyRate: 5.2890, sellRate: 5.2950, avgRate: 5.2920, lastUpdated: '2026-10-19 09:00', isBase: false },
  ]);

  const handleRecalculateDiff = () => {
    showToast('تمت إعادة تقييم أرصدة العملات الأجنبية وتوليد سند فروق أسعار الصرف بنجاح');
  };

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] text-white select-none">
      {/* Top Header */}
      <div className="p-3 bg-[#252526] border-b border-[#333333] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Coins className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>إدارة العملات ونشرة أسعار الصرف</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono">
                Multi-Currency Engine
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">تعريف العملات، نشرة الأسعار اليومية، احتساب المتوسطات، وتوليد قيود فروق أسعار الصرف</p>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="flex items-center gap-1 bg-[#181818] p-1 rounded-lg border border-[#383838]">
          {[
            { id: 'bulletin', label: 'نشرة أسعار العملات' },
            { id: 'define', label: 'تعريف عملة جديدة' },
            { id: 'average', label: 'متوسط أسعار العملات' },
            { id: 'diff', label: 'فروق أسعار الصرف' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 text-xs rounded transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white font-semibold shadow'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'bulletin' && (
          <div className="bg-[#252526] rounded-xl border border-[#383838] p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xs font-bold text-gray-300">نشرة أسعار الصرف الرسمية المعتمدة</h3>
                <span className="text-[11px] text-gray-500">العملة الأساسية للشركة: {currentCompany.currency}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    showToast('تم تحديث نشرة العملات بنجاح من البنك المركزي');
                  }}
                  className="px-3 py-1.5 bg-[#333] hover:bg-[#444] text-white text-xs rounded flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>تحديث النشرة</span>
                </button>
                <button 
                  onClick={() => showToast('تم تصدير نشرة العملات')}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs rounded flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>تصدير</span>
                </button>
              </div>
            </div>

            <div className="border border-[#383838] rounded-lg overflow-hidden">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-[#1E1E1E] text-gray-300 border-b border-[#383838]">
                    <th className="p-2.5">الرمز</th>
                    <th className="p-2.5">اسم العملة</th>
                    <th className="p-2.5">الرمز اللاتيني</th>
                    <th className="p-2.5 text-left font-mono">سعر الشراء</th>
                    <th className="p-2.5 text-left font-mono">سعر المبيع</th>
                    <th className="p-2.5 text-left font-mono">السعر الوسطي</th>
                    <th className="p-2.5 text-center">آخر تعديل</th>
                    <th className="p-2.5 text-center">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#333333]">
                  {rates.map(r => (
                    <tr key={r.code} className="hover:bg-[#2D2D2D] transition-colors">
                      <td className="p-2.5 font-mono font-bold text-amber-400">{r.code}</td>
                      <td className="p-2.5 text-white font-medium">{r.nameAr} ({r.symbol})</td>
                      <td className="p-2.5 text-gray-400">{r.nameEn}</td>
                      <td className="p-2.5 text-left font-mono text-emerald-400">{r.buyRate.toFixed(4)}</td>
                      <td className="p-2.5 text-left font-mono text-blue-400">{r.sellRate.toFixed(4)}</td>
                      <td className="p-2.5 text-left font-mono text-white font-bold">{r.avgRate.toFixed(4)}</td>
                      <td className="p-2.5 text-center font-mono text-gray-400 text-[11px]">{r.lastUpdated}</td>
                      <td className="p-2.5 text-center">
                        {r.isBase ? (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-400 font-bold">
                            عملة أساسية
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400">
                            نشطة
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'diff' && (
          <div className="bg-[#252526] rounded-xl border border-[#383838] p-5 max-w-2xl mx-auto">
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>معالج توليد قيود فروق أسعار الصرف (Currency Revaluation)</span>
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              يقوم هذا المعالج بإعادة تقييم كافة أرصدة الحسابات والعملاء والموردين المقومة بالعملات الأجنبية وفق أحدث نشرة أسعار رسمية وتوليد سند قيد تلقائي بفروق الصرف (أرباح أو خسائر غير محققة) مع الترحيل لدفتر الأستاذ العام.
            </p>

            <div className="space-y-3 bg-[#1A1A1A] p-4 rounded-lg border border-[#383838] mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">حساب أرباح فروق الصرف الدائن:</span>
                <span className="font-mono text-emerald-400">42301 - أرباح فروق تقييم العملات الأجنبية</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">حساب خسائر فروق الصرف المدين:</span>
                <span className="font-mono text-rose-400">52301 - خسائر فروق تقييم العملات الأجنبية</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">تاريخ التقييم المحاسبي:</span>
                <span className="font-mono text-white">2026-10-19</span>
              </div>
            </div>

            <button
              onClick={handleRecalculateDiff}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg shadow flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>بدء تدقيق الحسابات وتوليد سند فروق الصرف</span>
            </button>
          </div>
        )}

        {(activeTab === 'define' || activeTab === 'average') && (
          <div className="bg-[#252526] rounded-xl border border-[#383838] p-5 max-w-xl mx-auto">
            <h3 className="text-sm font-bold text-white mb-4">تعريف عملة جديدة في قاعدة البيانات</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">رمز العملة الدولي (ISO 4217)</label>
                <input type="text" placeholder="مثال: CAD, QAR, BHD" className="w-full bg-[#1A1A1A] border border-[#444] rounded px-3 py-1.5 text-xs text-white uppercase font-mono" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">اسم العملة بالعربية</label>
                <input type="text" placeholder="مثال: دينار بحريني" className="w-full bg-[#1A1A1A] border border-[#444] rounded px-3 py-1.5 text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">اسم الوحدة الفرعية (الفكة / الكسور)</label>
                <input type="text" placeholder="مثال: فلس، قرش، سنت" className="w-full bg-[#1A1A1A] border border-[#444] rounded px-3 py-1.5 text-xs text-white" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">سعر الصرف الافتتاحي مقابل {currentCompany.currency}</label>
                <input type="number" step="0.0001" defaultValue={1.0000} className="w-full bg-[#1A1A1A] border border-[#444] rounded px-3 py-1.5 text-xs text-white font-mono" />
              </div>
              <button 
                onClick={() => showToast('تمت إضافة العملة الجديدة بنجاح')}
                className="w-full mt-2 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded"
              >
                حفظ العملة في النظام
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
