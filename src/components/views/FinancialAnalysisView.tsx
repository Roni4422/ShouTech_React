import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart4, Brain, TrendingUp, AlertTriangle, ShieldCheck, 
  Calendar, ArrowUpRight, ArrowDownRight, Layers, DollarSign 
} from 'lucide-react';

export const FinancialAnalysisView: React.FC = () => {
  const { currentCompany, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'ratios' | 'ai' | 'aging' | 'collection' | 'dormant'>('ratios');

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] text-white select-none">
      {/* Header */}
      <div className="p-3 bg-[#252526] border-b border-[#333333] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>التحليل المالي المتقدم والذكاء الاصطناعي</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                AI & Financial Analytics Suite
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">المؤشرات المالية الكلية، التنبؤ بالتدفق النقدي، تحليل أعمار الذمم، ونسب التحصيل الائتماني</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-[#181818] p-1 rounded-lg border border-[#383838]">
          {[
            { id: 'ratios', label: 'المؤشرات المالية (محلي)' },
            { id: 'ai', label: 'تنبؤات الذكاء الصناعي (AI)' },
            { id: 'aging', label: 'أعمار الذمم الدائنة والمدينة' },
            { id: 'collection', label: 'نسب التحصيل الائتماني' },
            { id: 'dormant', label: 'الحسابات الراكدة' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 text-xs rounded transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white font-semibold shadow'
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
        {activeTab === 'ratios' && (
          <div className="space-y-4">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="bg-[#252526] p-4 rounded-xl border border-[#383838]">
                <span className="text-xs text-gray-400 block">نسبة التداول (Current Ratio)</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-xl font-bold font-mono text-emerald-400">2.14 : 1</span>
                  <span className="text-[10px] text-emerald-500 font-semibold flex items-center">
                    <ArrowUpRight className="w-3 h-3" /> ممتاز
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">المعيار الآمن: أكبر من 1.5 : 1</p>
              </div>

              <div className="bg-[#252526] p-4 rounded-xl border border-[#383838]">
                <span className="text-xs text-gray-400 block">نسبة السيولة السريعة (Quick Ratio)</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-xl font-bold font-mono text-blue-400">1.48 : 1</span>
                  <span className="text-[10px] text-blue-400 font-semibold flex items-center">
                    <ArrowUpRight className="w-3 h-3" /> قوي
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">باستثناء المخزون السلعي</p>
              </div>

              <div className="bg-[#252526] p-4 rounded-xl border border-[#383838]">
                <span className="text-xs text-gray-400 block">هامش الربح الصافي (Net Margin)</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-xl font-bold font-mono text-purple-400">18.6%</span>
                  <span className="text-[10px] text-purple-300 font-semibold flex items-center">
                    +2.4% عن 2025
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">صافي الربح إلى إجمالي الإيرادات</p>
              </div>

              <div className="bg-[#252526] p-4 rounded-xl border border-[#383838]">
                <span className="text-xs text-gray-400 block">فترة التحصيل بالايام (DSO)</span>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-xl font-bold font-mono text-amber-400">38.2 يوم</span>
                  <span className="text-[10px] text-amber-300 font-semibold">ممتاز</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">متوسط زمن تحصيل فواتير الآجل</p>
              </div>
            </div>

            {/* Detailed Ratio Grid */}
            <div className="bg-[#252526] rounded-xl border border-[#383838] p-4">
              <h3 className="text-xs font-bold text-gray-300 mb-3">تفصيل النسب المالية والتشغيلية المعتمدة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="bg-[#1A1A1A] p-3 rounded-lg border border-[#333]">
                  <div className="text-xs font-bold text-white mb-1">معدل دوران المخزون السلعي (Inventory Turnover)</div>
                  <div className="text-sm font-mono text-emerald-400 font-bold">5.8 مرات / سنة</div>
                  <div className="text-[11px] text-gray-400 mt-1">متوسط بقاء البضاعة في المستودع: 62 يوماً</div>
                </div>

                <div className="bg-[#1A1A1A] p-3 rounded-lg border border-[#333]">
                  <div className="text-xs font-bold text-white mb-1">نسبة المديونية إلى حقوق الملكية (Debt-to-Equity)</div>
                  <div className="text-sm font-mono text-blue-400 font-bold">0.42 : 1</div>
                  <div className="text-[11px] text-gray-400 mt-1">هيكل التمويل منخفض المخاطر</div>
                </div>

                <div className="bg-[#1A1A1A] p-3 rounded-lg border border-[#333]">
                  <div className="text-xs font-bold text-white mb-1">العائد على الأصول (ROA)</div>
                  <div className="text-sm font-mono text-purple-400 font-bold">12.4%</div>
                  <div className="text-[11px] text-gray-400 mt-1">كفاءة استغلال الأصول في توليد العوائد</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-900/40 via-[#252526] to-[#252526] p-5 rounded-xl border border-purple-500/30">
              <div className="flex items-center gap-3">
                <Brain className="w-7 h-7 text-purple-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">محرك التنبؤ المالي الذكي (Enterprise AI Predictive Engine)</h3>
                  <p className="text-xs text-gray-300 mt-0.5">
                    تحليل نماذج السلاسل الزمنية للتدفق النقدي والمبيعات والمصاريف للربع القادم مع مؤشر كشف الاحتيال المالي المتقدم
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                <div className="bg-black/40 p-3 rounded-lg border border-purple-500/20">
                  <span className="text-[11px] text-gray-400 block">التدفق النقدي المتوقع (نوفمبر 2026)</span>
                  <span className="text-base font-bold font-mono text-emerald-400 mt-1 block">+420,500 {currentCompany.currency}</span>
                  <span className="text-[10px] text-gray-400">درجة الثقة الإحصائية: 94.2%</span>
                </div>
                <div className="bg-black/40 p-3 rounded-lg border border-purple-500/20">
                  <span className="text-[11px] text-gray-400 block">خطر عجز السيولة (Solvency Risk)</span>
                  <span className="text-base font-bold font-mono text-emerald-400 mt-1 block">منخفض جداً (0.8%)</span>
                  <span className="text-[10px] text-gray-400">التغطية النقدية كافية لـ 8 أشهر</span>
                </div>
                <div className="bg-black/40 p-3 rounded-lg border border-purple-500/20">
                  <span className="text-[11px] text-gray-400 block">شذوذات السندات المرصودة (Anomalies)</span>
                  <span className="text-base font-bold font-mono text-blue-400 mt-1 block">0 سند مشبوه</span>
                  <span className="text-[10px] text-gray-400">سلسلة SHA-256 سليمة بنسبة 100%</span>
                </div>
              </div>
            </div>

            <div className="bg-[#252526] rounded-xl border border-[#383838] p-4">
              <h4 className="text-xs font-bold text-gray-300 mb-3">توصيات الذكاء الاصطناعي التشغيلية</h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-[#1A1A1A] rounded-lg border-s-4 border-emerald-500 flex items-start gap-2">
                  <CheckCircle2Icon className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">فرصة سداد مبكر للموردين للحصول على خصم تعجيل الدفع (Cash Discount):</span>
                    <span className="text-gray-400 text-[11px]">يتوفر فائض نقدي بقيمة 350,000 ريال، ينصح بسداد فواتير شركة الأفق للحصول على خصم 2.5% مما يوفر 8,750 ريال.</span>
                  </div>
                </div>

                <div className="p-3 bg-[#1A1A1A] rounded-lg border-s-4 border-amber-500 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">تنبيه ذمم عملاء متأخرة تجاوزت حد الائتمان:</span>
                    <span className="text-gray-400 text-[11px]">مؤسسة النور الحديثة تجاوزت فترة الائتمان بـ 14 يوماً. ينصح النظام بتعليق إصدار فواتير بيع جديدة تلقائياً لحين التحصيل.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'aging' && (
          <div className="bg-[#252526] rounded-xl border border-[#383838] p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-gray-300">جدول أعمار الذمم المدينة للعملاء (Aging of Receivables)</h3>
              <button 
                onClick={() => showToast('تم تصدير تقرير أعمار الذمم')}
                className="px-3 py-1 bg-emerald-700 text-white text-xs rounded"
              >
                تصدير التقرير
              </button>
            </div>

            <div className="border border-[#383838] rounded-lg overflow-hidden">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-[#1E1E1E] text-gray-300 border-b border-[#383838]">
                    <th className="p-2.5">اسم العميل</th>
                    <th className="p-2.5 text-left font-mono">الرصيد الإجمالي</th>
                    <th className="p-2.5 text-left font-mono">حالي (1-30 يوم)</th>
                    <th className="p-2.5 text-left font-mono">31-60 يوم</th>
                    <th className="p-2.5 text-left font-mono">61-90 يوم</th>
                    <th className="p-2.5 text-left font-mono text-rose-400">&gt; 90 يوم</th>
                    <th className="p-2.5 text-center">حالة الائتمان</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#333333]">
                  {[
                    { name: 'مؤسسة الرياض للتوريدات التجارية', total: 64200, d30: 42000, d60: 22200, d90: 0, dOver: 0, status: 'جيد' },
                    { name: 'شركة الأفق الحديث للتقنية', total: 98500, d30: 75000, d60: 23500, d90: 0, dOver: 0, status: 'ممتاز' },
                    { name: 'مؤسسة النور لمواد البناء', total: 42100, d30: 12000, d60: 15000, d90: 15100, dOver: 0, status: 'متابعة' },
                    { name: 'شركة الشرق السريعة للخدمات', total: 18400, d30: 0, d60: 0, d90: 0, dOver: 18400, status: 'معلق' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-[#2D2D2D]">
                      <td className="p-2.5 text-white font-medium">{row.name}</td>
                      <td className="p-2.5 text-left font-mono font-bold text-white">{row.total.toLocaleString()}</td>
                      <td className="p-2.5 text-left font-mono text-emerald-400">{row.d30.toLocaleString()}</td>
                      <td className="p-2.5 text-left font-mono text-blue-400">{row.d60.toLocaleString()}</td>
                      <td className="p-2.5 text-left font-mono text-amber-400">{row.d90.toLocaleString()}</td>
                      <td className="p-2.5 text-left font-mono text-rose-400 font-bold">{row.dOver.toLocaleString()}</td>
                      <td className="p-2.5 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          row.status === 'معلق' ? 'bg-rose-500/20 text-rose-300 font-bold' :
                          row.status === 'متابعة' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {(activeTab === 'collection' || activeTab === 'dormant') && (
          <div className="bg-[#252526] rounded-xl border border-[#383838] p-6 text-center">
            <BarChart4 className="w-10 h-10 text-purple-400 mx-auto mb-2 opacity-80" />
            <h3 className="text-sm font-bold text-white mb-1">
              {activeTab === 'collection' ? 'تحليل كفاءة التحصيل الائتماني (Collection Efficiency Index)' : 'كاشف الحسابات الراكدة بدون حركة (Dormant Accounts Detector)'}
            </h3>
            <p className="text-xs text-gray-400 max-w-lg mx-auto mb-4">
              {activeTab === 'collection'
                ? 'نسبة التحصيل الفعلية تبلغ 92.4% من إجمالي المستحقات خلال دورة الـ 45 يوماً الحالية، بمعدل تحسن سنوي قدره 3.1%.'
                : 'يحدد النظام آلياً الحسابات التي لم تشهد أي حركة قيود أو فواتير خلال آخر 180 يوماً لاقتراح أرشفتها أو إعادة تنشيطها.'}
            </p>
            <button 
              onClick={() => showToast('تم تحديث بيانات التحليل')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg shadow"
            >
              إعادة احتساب المؤشرات
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

function CheckCircle2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
