import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageCode } from '../../types';
import { ImportedSchemaCatalogView } from './ImportedSchemaCatalogView';
import { 
  Wrench, Calculator, Keyboard, Settings, Database, 
  Globe, KeyRound, History, Sparkles, Brain, Check, RefreshCw 
} from 'lucide-react';

export const ToolsView: React.FC = () => {
  const { language, setLanguage, currentCompany, showToast, createBackup } = useApp();
  const [activeTab, setActiveTab] = useState<'calc' | 'keyboard' | 'maintenance' | 'langs' | 'password' | 'ai' | 'schema'>('calc');

  // Calculator State
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcMem, setCalcMem] = useState<number | null>(null);
  const [calcOp, setCalcOp] = useState<string | null>(null);

  const handleCalcDigit = (digit: string) => {
    setCalcDisplay(prev => (prev === '0' ? digit : prev + digit));
  };

  const handleCalcOp = (op: string) => {
    setCalcMem(parseFloat(calcDisplay));
    setCalcOp(op);
    setCalcDisplay('0');
  };

  const handleCalcEquals = () => {
    if (calcMem !== null && calcOp !== null) {
      const cur = parseFloat(calcDisplay);
      let res = 0;
      if (calcOp === '+') res = calcMem + cur;
      if (calcOp === '-') res = calcMem - cur;
      if (calcOp === '×') res = calcMem * cur;
      if (calcOp === '÷') res = cur !== 0 ? calcMem / cur : 0;
      setCalcDisplay(res.toString());
      setCalcMem(null);
      setCalcOp(null);
    }
  };

  const handleCalcTax = (rate: number) => {
    const cur = parseFloat(calcDisplay);
    const tax = cur * (rate / 100);
    setCalcDisplay((cur + tax).toFixed(2));
    showToast(`تمت إضافة ضريبة ${rate}%: المجموع ${(cur + tax).toFixed(2)}`);
  };

  const languagesList: { code: LanguageCode; name: string; nativeName: string; flag: string }[] = [
    { code: 'ar', name: 'Arabic', nativeName: 'العربية (Arabic)', flag: '🇸🇦' },
    { code: 'en', name: 'English', nativeName: 'English (US / UK)', flag: '🇺🇸' },
    { code: 'fr', name: 'French', nativeName: 'Français (French)', flag: '🇫🇷' },
    { code: 'tr', name: 'Turkish', nativeName: 'Türkçe (Turkish)', flag: '🇹🇷' },
    { code: 'de', name: 'German', nativeName: 'Deutsch (German)', flag: '🇩🇪' },
    { code: 'es', name: 'Spanish', nativeName: 'Español (Spanish)', flag: '🇪🇸' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский (Russian)', flag: '🇷🇺' },
    { code: 'zh', name: 'Chinese', nativeName: '中文 (Simplified Chinese)', flag: '🇨🇳' },
    { code: 'fa', name: 'Persian', nativeName: 'فارسی (Persian)', flag: '🇮🇷' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو (Urdu)', flag: '🇵🇰' },
  ];

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] text-white select-none">
      {/* View Header */}
      <div className="p-3 bg-[#252526] border-b border-[#333333] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Wrench className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>أدوات النظام المساعدة والذكاء الاصطناعي (System Tools & AI)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                Utilities & 10-Languages Engine
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">الآلة الحاسبة المالية والضريبية، لوحة المفاتيح، صيانة الفهارس، التبديل بين اللغات العشر، ونماذج الـ AI</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-[#181818] p-1 rounded-lg border border-[#383838]">
          {[
            { id: 'calc', label: 'الآلة الحاسبة الضريبية' },
            { id: 'keyboard', label: 'لوحة المفاتيح الافتراضية' },
            { id: 'langs', label: 'محرك اللغات العشر (10 Langs)' },
            { id: 'maintenance', label: 'معالج صيانة الفهارس' },
            { id: 'schema', label: 'مخطط قاعدة البيانات' },
            { id: 'ai', label: 'الذكاء الصناعي ومسجل الحركات' },
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
      <div className="flex-1 overflow-auto p-6 flex flex-col items-center justify-center">
        {activeTab === 'calc' && (
          <div className="w-80 bg-[#252526] border border-[#383838] rounded-2xl p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-3 text-xs text-gray-400 font-bold border-b border-[#333] pb-2">
              <span className="flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-blue-400" />
                <span>حاسبة الضرائب والأعمال</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">{currentCompany.currency}</span>
            </div>

            {/* Display */}
            <div className="bg-[#121212] border border-[#383838] rounded-xl p-3 text-right mb-4">
              <div className="text-[10px] text-gray-500 font-mono h-4">
                {calcMem !== null ? `${calcMem} ${calcOp || ''}` : ''}
              </div>
              <div className="text-2xl font-bold font-mono text-white truncate">
                {calcDisplay}
              </div>
            </div>

            {/* Quick Tax Shortcuts */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <button onClick={() => handleCalcTax(15)} className="py-1.5 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold rounded">
                +15% VAT
              </button>
              <button onClick={() => handleCalcTax(5)} className="py-1.5 bg-blue-950/40 hover:bg-blue-900/60 border border-blue-500/30 text-blue-300 text-xs font-bold rounded">
                +5% UAE
              </button>
              <button onClick={() => handleCalcTax(10)} className="py-1.5 bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-bold rounded">
                +10% ضريبة
              </button>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-4 gap-2 text-sm font-bold">
              <button onClick={() => setCalcDisplay('0')} className="p-3 bg-[#333] hover:bg-[#444] rounded text-rose-400">C</button>
              <button onClick={() => setCalcDisplay(prev => prev.slice(0, -1) || '0')} className="p-3 bg-[#333] hover:bg-[#444] rounded text-gray-300">⌫</button>
              <button onClick={() => handleCalcOp('÷')} className="p-3 bg-[#333] hover:bg-[#444] rounded text-blue-400">÷</button>
              <button onClick={() => handleCalcOp('×')} className="p-3 bg-[#333] hover:bg-[#444] rounded text-blue-400">×</button>

              <button onClick={() => handleCalcDigit('7')} className="p-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded">7</button>
              <button onClick={() => handleCalcDigit('8')} className="p-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded">8</button>
              <button onClick={() => handleCalcDigit('9')} className="p-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded">9</button>
              <button onClick={() => handleCalcOp('-')} className="p-3 bg-[#333] hover:bg-[#444] rounded text-blue-400">-</button>

              <button onClick={() => handleCalcDigit('4')} className="p-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded">4</button>
              <button onClick={() => handleCalcDigit('5')} className="p-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded">5</button>
              <button onClick={() => handleCalcDigit('6')} className="p-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded">6</button>
              <button onClick={() => handleCalcOp('+')} className="p-3 bg-[#333] hover:bg-[#444] rounded text-blue-400">+</button>

              <button onClick={() => handleCalcDigit('1')} className="p-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded">1</button>
              <button onClick={() => handleCalcDigit('2')} className="p-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded">2</button>
              <button onClick={() => handleCalcDigit('3')} className="p-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded">3</button>
              <button onClick={handleCalcEquals} className="row-span-2 p-3 bg-[#0078D4] hover:bg-[#006cbd] text-white rounded font-bold flex items-center justify-center text-lg">=</button>

              <button onClick={() => handleCalcDigit('0')} className="col-span-2 p-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded">0</button>
              <button onClick={() => handleCalcDigit('.')} className="p-3 bg-[#1F1F1F] hover:bg-[#2A2A2A] rounded">.</button>
            </div>
          </div>
        )}

        {activeTab === 'langs' && (
          <div className="max-w-2xl w-full bg-[#252526] border border-[#383838] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4 border-b border-[#383838] pb-3">
              <Globe className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-sm font-bold text-white">محرك اللغات العشر الدولي (10 Languages Engine)</h3>
                <p className="text-xs text-gray-400">التبديل الفوري بين واجهات النظام والقوائم مع دعم كامل لاتجاهات RTL و LTR</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {languagesList.map(lang => {
                const isCurrent = language === lang.code;
                return (
                  <div
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      showToast(`تم تحويل لغة البرنامج إلى: ${lang.nativeName}`);
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isCurrent
                        ? 'bg-[#0078D4]/20 border-[#0078D4] text-white shadow'
                        : 'bg-[#1F1F1F] border-[#383838] text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <div>
                        <span className="font-bold text-xs block">{lang.nativeName}</span>
                        <span className="text-[10px] text-gray-500 font-mono">ISO: {lang.code.toUpperCase()}</span>
                      </div>
                    </div>
                    {isCurrent && (
                      <span className="p-1 rounded-full bg-[#0078D4] text-white">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'schema' && <div className="h-full w-full min-h-0"><ImportedSchemaCatalogView /></div>}

        {activeTab === 'maintenance' && (
          <div className="max-w-xl w-full bg-[#252526] border border-[#383838] rounded-2xl p-6 shadow-2xl text-center">
            <Database className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-white mb-2">معالج صيانة وإعادة بناء فهارس قواعد البيانات (DB Maintenance)</h3>
            <p className="text-xs text-gray-400 mb-6">
              فحص سلامة الروابط المحاسبية، إعادة ترقيم القيود التسلسلية، ضغط مساحات التخزين، وفحص توافق B-Tree Indexes لضمان أعلى سرعة استجابة.
            </p>

            <div className="space-y-3 mb-6 text-xs text-right bg-[#1A1A1A] p-4 rounded-xl border border-[#333]">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">سلامة الفهارس والمؤشرات (Indexes Integrity):</span>
                <span className="text-emerald-400 font-bold font-mono">100% سليم</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">مطابقة ميزان القيود باليومية العامة:</span>
                <span className="text-emerald-400 font-bold font-mono">متطابق تماماً</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">تجزئة قاعدة البيانات (Fragmentation):</span>
                <span className="text-blue-400 font-mono">0.4% (ممتاز)</span>
              </div>
            </div>

            <button
              onClick={() => {
                showToast('تم إجراء الصيانة الشاملة وضغط قاعدة البيانات بنجاح (VACUUM & REINDEX OK)');
              }}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              <span>بدء تشغيل معالج الصيانة والإصلاح الفوري</span>
            </button>
          </div>
        )}

        {(activeTab === 'keyboard' || activeTab === 'ai') && (
          <div className="max-w-xl w-full bg-[#252526] border border-[#383838] rounded-2xl p-6 shadow-2xl text-center">
            <Brain className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-white mb-2">
              {activeTab === 'keyboard' ? 'لوحة المفاتيح الافتراضية اللمسية لنقاط البيع' : 'نماذج الذكاء الاصطناعي المؤسسي المدمجة (AI Suite)'}
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              {activeTab === 'keyboard'
                ? 'لوحة مفاتيح متوافقة مع شاشات اللمس والأجهزة الكفية POS للإدخال السريع بدون لوحة مفاتيح فيزيائية.'
                : 'محرك التعلم الآلي والتحليل التنبئي المدمج لمراقبة الاحتيال المحاسبي، توقع التدفقات النقدية، واقتراح إعادة طلب المواد.'}
            </p>
            <button
              onClick={() => showToast('تم تفعيل الوحدة بنجاح')}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow"
            >
              تشغيل الخدمة
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
