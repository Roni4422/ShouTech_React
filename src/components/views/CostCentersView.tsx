import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CostCenter } from '../../types';
import { 
  Layers, Plus, Search, Filter, FileSpreadsheet, 
  Printer, ArrowUpRight, TrendingUp, DollarSign, CheckCircle2 
} from 'lucide-react';

export const CostCentersView: React.FC = () => {
  const { costCenters, accounts, translate, currentCompany, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'card' | 'link' | 'report' | 'materials' | 'balance'>('card');
  const [selectedCenter, setSelectedCenter] = useState<CostCenter>(costCenters[0] || null);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample cost center movement & trial balance
  const mockCostCenterBalances = [
    { code: 'CC-ADM', name: 'الإدارة العامة والموارد البشرية', debit: 145000, credit: 0, balance: 145000, budget: 180000, utilization: 80.5 },
    { code: 'CC-SALES', name: 'إدارة التسويق ومبيعات الجملة', debit: 210000, credit: 15000, balance: 195000, budget: 250000, utilization: 78.0 },
    { code: 'CC-FACTORY', name: 'خط إنتاج المعمل والتصنيع', debit: 540000, credit: 80000, balance: 460000, budget: 600000, utilization: 76.6 },
    { code: 'CC-FLEET', name: 'أسطول النقل والخدمات اللوجستية', debit: 98000, credit: 5000, balance: 93000, budget: 110000, utilization: 84.5 },
    { code: 'CC-BRANCH1', name: 'فرع الرياض التجاري', debit: 165000, credit: 32000, balance: 133000, budget: 175000, utilization: 76.0 },
  ];

  const filteredBalances = mockCostCenterBalances.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] text-white select-none">
      {/* Top Header / View Bar */}
      <div className="p-3 bg-[#252526] border-b border-[#333333] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#0078D4]/20 border border-[#0078D4]/40 flex items-center justify-center text-[#0078D4]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>مراكز الكلفة والتحليل التشغيلي</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono">
                Cost Centers Multi-Level
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">إدارة بطاقات مراكز الكلفة، الربط المحاسبي، وحركات المواد والموازنات التقديرية</p>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="flex items-center gap-1 bg-[#181818] p-1 rounded-lg border border-[#383838]">
          {[
            { id: 'card', label: 'بطاقة مركز كلفة' },
            { id: 'link', label: 'ربط مع الحسابات' },
            { id: 'report', label: 'تقرير مركز كلفة' },
            { id: 'materials', label: 'حركة المواد' },
            { id: 'balance', label: 'ميزان مركز الكلفة' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 text-xs rounded transition-all ${
                activeTab === tab.id
                  ? 'bg-[#0078D4] text-white font-semibold shadow'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'card' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left/Right Tree List */}
            <div className="bg-[#252526] rounded-xl border border-[#383838] p-4 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-300">قائمة مراكز الكلفة المسجلة</span>
                <button 
                  onClick={() => showToast('فتح بطاقة مركز كلفة جديد')}
                  className="px-2 py-1 bg-[#0078D4] hover:bg-[#006cbd] text-white text-[11px] rounded flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>جديد</span>
                </button>
              </div>

              <div className="space-y-2 flex-1 overflow-y-auto">
                {costCenters.map(cc => (
                  <div
                    key={cc.id}
                    onClick={() => setSelectedCenter(cc)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedCenter?.id === cc.id
                        ? 'bg-[#0078D4]/20 border-[#0078D4] text-white'
                        : 'bg-[#1F1F1F] border-[#383838] text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">{cc.nameAr}</span>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-blue-400">{cc.code}</span>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-1">{cc.nameEn}</div>
                    <div className="mt-2 text-[10px] flex items-center justify-between text-gray-500">
                      <span>النوع: {cc.isHeader ? 'مركز رئيسي تجميعي' : 'مركز فرعي مباشر'}</span>
                      <span className="font-mono text-emerald-400">مفعل</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Form Card */}
            <div className="lg:col-span-2 bg-[#252526] rounded-xl border border-[#383838] p-5">
              <div className="flex items-center justify-between border-b border-[#383838] pb-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white">تفاصيل بطاقة مركز الكلفة: {selectedCenter?.nameAr || 'مركز جديد'}</h3>
                  <span className="text-xs text-gray-400">رمز المركز: {selectedCenter?.code}</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      showToast('تم حفظ تعديلات مركز الكلفة بنجاح في قاعدة البيانات');
                    }}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded font-bold"
                  >
                    حفظ البطاقة
                  </button>
                  <button 
                    onClick={() => window.print()}
                    className="p-1.5 bg-[#333] hover:bg-[#444] text-gray-300 rounded"
                    title="طباعة"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">رمز مركز الكلفة</label>
                  <input
                    type="text"
                    defaultValue={selectedCenter?.code || 'CC-001'}
                    className="w-full bg-[#1A1A1A] border border-[#444] rounded px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">المركز الأب (التصنيف الرئيسي)</label>
                  <select className="w-full bg-[#1A1A1A] border border-[#444] rounded px-3 py-1.5 text-xs text-white">
                    <option value="">لا يوجد (مركز رئيسي جذر)</option>
                    {costCenters.filter(c => c.isHeader).map(c => (
                      <option key={c.id} value={c.id}>{c.nameAr} ({c.code})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">الاسم بالعربية</label>
                  <input
                    type="text"
                    defaultValue={selectedCenter?.nameAr || ''}
                    className="w-full bg-[#1A1A1A] border border-[#444] rounded px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">الاسم بالإنجليزية</label>
                  <input
                    type="text"
                    defaultValue={selectedCenter?.nameEn || ''}
                    className="w-full bg-[#1A1A1A] border border-[#444] rounded px-3 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">الموازنة التقديرية السنوية (Budget)</label>
                  <input
                    type="number"
                    defaultValue={250000}
                    className="w-full bg-[#1A1A1A] border border-[#444] rounded px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">المسؤول عن المركز</label>
                  <input
                    type="text"
                    defaultValue="مدير العمليات والتشغيل"
                    className="w-full bg-[#1A1A1A] border border-[#444] rounded px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              {/* Status & Analytics metrics */}
              <div className="mt-6 pt-4 border-t border-[#383838] grid grid-cols-3 gap-3">
                <div className="bg-[#1A1A1A] p-3 rounded-lg border border-[#333]">
                  <span className="text-[11px] text-gray-400 block">إجمالي المصاريف المحملة</span>
                  <span className="text-sm font-bold font-mono text-amber-400 mt-1 block">195,000 {currentCompany.currency}</span>
                </div>
                <div className="bg-[#1A1A1A] p-3 rounded-lg border border-[#333]">
                  <span className="text-[11px] text-gray-400 block">الموازنة المعتمدة</span>
                  <span className="text-sm font-bold font-mono text-blue-400 mt-1 block">250,000 {currentCompany.currency}</span>
                </div>
                <div className="bg-[#1A1A1A] p-3 rounded-lg border border-[#333]">
                  <span className="text-[11px] text-gray-400 block">نسبة استهلاك الموازنة</span>
                  <span className="text-sm font-bold font-mono text-emerald-400 mt-1 block">78.0% (ضمن الحدود)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'balance' && (
          <div className="bg-[#252526] rounded-xl border border-[#383838] p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="بحث في مراكز الكلفة..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="bg-[#1A1A1A] border border-[#444] rounded-lg px-3 py-1.5 text-xs text-white w-64"
                />
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => showToast('تم تصدير ميزان مراكز الكلفة إلى ملف Excel بنجاح')}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs rounded flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>تصدير Excel</span>
                </button>
              </div>
            </div>

            <div className="border border-[#383838] rounded-lg overflow-hidden">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-[#1E1E1E] text-gray-300 border-b border-[#383838]">
                    <th className="p-2.5">رمز المركز</th>
                    <th className="p-2.5">اسم مركز الكلفة</th>
                    <th className="p-2.5 text-left font-mono">مدين ({currentCompany.currency})</th>
                    <th className="p-2.5 text-left font-mono">دائن ({currentCompany.currency})</th>
                    <th className="p-2.5 text-left font-mono">الرصيد الصافي</th>
                    <th className="p-2.5 text-left font-mono">الموازنة التقديرية</th>
                    <th className="p-2.5 text-center">نسبة الاستهلاك</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#333333]">
                  {filteredBalances.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#2D2D2D] transition-colors">
                      <td className="p-2.5 font-mono text-blue-400 font-bold">{item.code}</td>
                      <td className="p-2.5 text-white font-medium">{item.name}</td>
                      <td className="p-2.5 text-left font-mono text-amber-400">{item.debit.toLocaleString()}</td>
                      <td className="p-2.5 text-left font-mono text-gray-400">{item.credit.toLocaleString()}</td>
                      <td className="p-2.5 text-left font-mono font-bold text-white">{item.balance.toLocaleString()}</td>
                      <td className="p-2.5 text-left font-mono text-blue-300">{item.budget.toLocaleString()}</td>
                      <td className="p-2.5 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          item.utilization > 80 ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {item.utilization}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {(activeTab === 'link' || activeTab === 'report' || activeTab === 'materials') && (
          <div className="bg-[#252526] rounded-xl border border-[#383838] p-6 text-center">
            <Layers className="w-10 h-10 text-blue-400 mx-auto mb-2 opacity-80" />
            <h3 className="text-sm font-bold text-white mb-1">
              {activeTab === 'link' ? 'مصفوفة ربط مراكز الكلفة بدليل الحسابات' : activeTab === 'report' ? 'التقرير التحليلي المقارن لمراكز الكلفة' : 'تقرير حركة المواد والمستودعات حسب مركز الكلفة'}
            </h3>
            <p className="text-xs text-gray-400 max-w-lg mx-auto mb-4">
              نظام المحاسبة التحليلية متعدد الأبعاد يربط سندات القيد وفواتير المشتريات والمبيعات وحركات المستودعات تلقائياً بنسب مئوية موزعة على مراكز الكلفة.
            </p>
            <button 
              onClick={() => showToast('تم تفعيل التوزيع التلقائي لمراكز الكلفة')}
              className="px-4 py-2 bg-[#0078D4] hover:bg-[#006cbd] text-white text-xs font-bold rounded-lg shadow"
            >
              تشغيل معالج التوزيع المحاسبي الآلي
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
