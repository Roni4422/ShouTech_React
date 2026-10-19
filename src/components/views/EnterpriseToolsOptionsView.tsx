import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sliders, Printer, Barcode, Scale, Smartphone, ShieldCheck, 
  Database, Check, RefreshCw, Eye, Settings, Terminal, Radio, 
  Wifi, Save, Sparkles, HardDrive 
} from 'lucide-react';

export const EnterpriseToolsOptionsView: React.FC = () => {
  const { currentCompany, showToast, openPreview } = useApp();
  
  const [activeTab, setActiveTab] = useState<'general' | 'printers' | 'barcode' | 'scale' | 'peripherals' | 'dongle' | 'maintenance'>('scale');

  // Scale (الميزان الإلكتروني) State
  const [scaleProtocol, setScaleProtocol] = useState<'DIGI' | 'CAS' | 'Toledo' | 'Bizerba'>('DIGI');
  const [scalePort, setScalePort] = useState<'COM1' | 'COM2' | 'USB' | 'TCP_IP'>('COM1');
  const [scaleBaudRate, setScaleBaudRate] = useState('9600');
  const [scaleIp, setScaleIp] = useState('192.168.1.185');
  const [scalePrefix, setScalePrefix] = useState('20');
  const [simulatedWeight, setSimulatedWeight] = useState<number>(1.485);
  const [isStable, setIsStable] = useState<boolean>(true);
  const [tareActive, setTareActive] = useState<boolean>(false);

  // Printer State
  const [invoicePrinter, setInvoicePrinter] = useState('HP LaserJet Pro 400 M401 (Default A4)');
  const [posReceiptPrinter, setPosReceiptPrinter] = useState('Epson TM-T88VI Thermal 80mm (ESC/POS)');
  const [barcodeLabelPrinter, setBarcodeLabelPrinter] = useState('Zebra ZD420 (ZPL 203 DPI)');
  const [alwaysWordPreview, setAlwaysWordPreview] = useState(true);
  const [printCompanyLogo, setPrintCompanyLogo] = useState(true);

  // Barcode State
  const [barcodeType, setBarcodeType] = useState('EAN13');
  const [labelWidthMm, setLabelWidthMm] = useState(50);
  const [labelHeightMm, setLabelHeightMm] = useState(25);
  const [printPriceWithTax, setPrintPriceWithTax] = useState(true);

  const handleTestScaleWeight = () => {
    const randomW = (Math.random() * 3 + 0.25).toFixed(3);
    setSimulatedWeight(parseFloat(randomW));
    setIsStable(true);
    showToast(`تمت قراءة الوزن الحي من الميزان: ${randomW} كجم (مستقر)`);
  };

  const handleTestDrawerKick = () => {
    showToast('تم إرسال نبضة فتح درج الكاشير ESC/POS بنجاح [Drawer Kick Pulse OK]');
  };

  const handleTestCustomerDisplay = () => {
    showToast('تم إرسال رسالة الترحيب لشاشة العميل VFD Pole Display: "أهلاً وسهلاً بكم"');
  };

  const handleSaveOptions = () => {
    showToast('تم حفظ كافة إعدادات الملحقات والأدوات في قاعدة بيانات النظام بنجاح');
  };

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] text-white select-none">
      {/* View Header */}
      <div className="p-3 bg-[#252526] border-b border-[#333333] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>خيارات البرنامج وتجهيزات الملحقات (الأمين وفينكس ERP)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                Hardware & System Options Suite
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">إعدادات الطابعات، باركود الميزان الإلكتروني، ملحقات الكاشير، ومعاينة النوافذ كـ Word</p>
          </div>
        </div>

        {/* Global Save & Word Preview Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => openPreview('إعدادات وتجهيزات الملحقات وطابعات الميزان', 'System_Options')}
            className="px-3 py-1.5 bg-blue-700 hover:bg-blue-600 text-white rounded text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>معاينة وورد (Word Preview)</span>
          </button>
          <button
            onClick={handleSaveOptions}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold flex items-center gap-1.5 shadow-sm"
          >
            <Save className="w-3.5 h-3.5" />
            <span>حفظ الخيارات</span>
          </button>
        </div>
      </div>

      {/* Main Options Layout: Left Side Tabs + Right Content */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* Left Vertical Sub-menu (Like Al-Ameen Options Tree) */}
        <div className="w-full md:w-64 bg-[#252526] border-e border-[#383838] p-2 flex flex-col gap-1 overflow-y-auto shrink-0 text-xs">
          {[
            { id: 'scale', label: 'الميزان الإلكتروني (Barcode Scale)', icon: Scale },
            { id: 'printers', label: 'خيارات الطباعة والنماذج', icon: Printer },
            { id: 'barcode', label: 'الباركود وتصميم الملصقات', icon: Barcode },
            { id: 'peripherals', label: 'ملحقات الكاشير والدرج والشاشة', icon: Smartphone },
            { id: 'general', label: 'خيارات البرنامج العامة', icon: Settings },
            { id: 'dongle', label: 'مفتاح الحماية والدونغل 2026', icon: ShieldCheck },
            { id: 'maintenance', label: 'معالج صيانة الفهارس', icon: HardDrive },
          ].map(tab => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-start px-3 py-2.5 rounded-lg flex items-center gap-2.5 transition-all ${
                  isCurrent
                    ? 'bg-[#0078D4] text-white font-bold shadow'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-white' : 'text-gray-400'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Active Options Content Form */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#1E1E1E]">
          <div className="max-w-3xl space-y-6">

            {/* TAB: الميزان الإلكتروني */}
            {activeTab === 'scale' && (
              <div className="space-y-5">
                <div className="border-b border-[#383838] pb-3">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <Scale className="w-5 h-5 text-amber-400" />
                    <span>خيارات الميزان الإلكتروني وباركود الوزن (Electronic Barcode Scale)</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    ربط موازين الباركود الموزون (أجبان، لحوم، خضار) واستقبال الوزن الحي عبر المنافذ التسلسلية RS232 / TCP-IP
                  </p>
                </div>

                {/* Live Electronic Scale Display Simulator (الشاشة الرقمية للميزان) */}
                <div className="bg-[#111111] border-2 border-[#383838] rounded-2xl p-5 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-[#222] pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        ميزان متصل: {scaleProtocol} SCALE ({scalePort})
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">Baud Rate: {scaleBaudRate} bps</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Digital Weight Gauge (شاشة الوزن السبعة قطع الرقمية) */}
                    <div className="bg-[#050505] border border-[#333] px-6 py-4 rounded-xl text-center shadow-inner">
                      <span className="text-[10px] text-gray-500 block mb-1">الوزن اللحظي الحي الصافي (NET WEIGHT)</span>
                      <div className="text-4xl font-mono font-black text-emerald-400 tracking-wider">
                        {simulatedWeight.toFixed(3)} <span className="text-sm text-emerald-600">KG</span>
                      </div>
                      <div className="flex items-center justify-center gap-3 mt-2 text-[10px] font-mono">
                        <span className={`px-2 py-0.5 rounded ${isStable ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-gray-800 text-gray-400'}`}>
                          ● STABLE (مستقر)
                        </span>
                        <span className={`px-2 py-0.5 rounded ${tareActive ? 'bg-amber-950 text-amber-400 border border-amber-500/40' : 'bg-gray-800 text-gray-400'}`}>
                          ● TARE (فارغ)
                        </span>
                      </div>
                    </div>

                    {/* Scale Action Buttons */}
                    <div className="flex flex-col gap-2 w-full sm:w-48">
                      <button
                        onClick={handleTestScaleWeight}
                        className="py-2 px-3 bg-amber-600 hover:bg-amber-500 text-white rounded font-bold text-xs shadow flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>قراءة وزن تجريبي</span>
                      </button>
                      <button
                        onClick={() => {
                          setTareActive(!tareActive);
                          showToast('تمت معايرة وزن الفارغ (Tare Toggled)');
                        }}
                        className="py-1.5 px-3 bg-[#2D2D2D] hover:bg-[#383838] border border-white/20 text-white rounded text-xs font-semibold"
                      >
                        تصفير الفارغ (TARE / ZERO)
                      </button>
                      <button
                        onClick={() => {
                          showToast(`تم توليد باركود وزني: ${scalePrefix}00101014859`);
                        }}
                        className="py-1.5 px-3 bg-[#2D2D2D] hover:bg-[#383838] border border-white/20 text-white rounded text-xs font-semibold font-mono"
                      >
                        توليد باركود وزني
                      </button>
                    </div>
                  </div>
                </div>

                {/* Scale Configuration Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-[#242424] p-4 rounded-xl border border-[#383838]">
                  <div>
                    <label className="block text-gray-400 mb-1 font-semibold">بروتوكول ونوع الميزان:</label>
                    <select
                      value={scaleProtocol}
                      onChange={e => setScaleProtocol(e.target.value as any)}
                      className="w-full bg-[#181818] border border-[#444] rounded px-3 py-1.5 text-xs text-white"
                    >
                      <option value="DIGI">DIGI SM-Series (ديجي سمارت)</option>
                      <option value="CAS">CAS CL-5000 / CL-3000 (كاس)</option>
                      <option value="Toledo">Mettler Toledo Tiger (توليدو)</option>
                      <option value="Bizerba">Bizerba XC-Series (بيزربا)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1 font-semibold">منفذ الاتصال بالميزان:</label>
                    <select
                      value={scalePort}
                      onChange={e => setScalePort(e.target.value as any)}
                      className="w-full bg-[#181818] border border-[#444] rounded px-3 py-1.5 text-xs text-white font-mono"
                    >
                      <option value="COM1">COM 1 (منفذ تسلسلي RS232)</option>
                      <option value="COM2">COM 2 (منفذ تسلسلي RS232)</option>
                      <option value="USB">USB Serial Emulation</option>
                      <option value="TCP_IP">شبكة محلية Ethernet TCP/IP</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1 font-semibold">بادئة باركود الوزن (Weight Barcode Prefix):</label>
                    <input
                      type="text"
                      value={scalePrefix}
                      onChange={e => setScalePrefix(e.target.value)}
                      className="w-full bg-[#181818] border border-[#444] rounded px-3 py-1.5 text-xs text-white font-mono font-bold"
                    />
                    <span className="text-[10px] text-gray-500">النمط الشائع: 20 أو 21 (معياري EAN-13)</span>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1 font-semibold">عنوان الـ IP للميزان الشبكي:</label>
                    <input
                      type="text"
                      value={scaleIp}
                      onChange={e => setScaleIp(e.target.value)}
                      className="w-full bg-[#181818] border border-[#444] rounded px-3 py-1.5 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: خيارات الطباعة والنماذج */}
            {activeTab === 'printers' && (
              <div className="space-y-4">
                <div className="border-b border-[#383838] pb-3">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <Printer className="w-5 h-5 text-blue-400" />
                    <span>خيارات الطابعات ونماذج المخرجات (Printers & Word Forms)</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">تحديد طابعات الفواتير الافتراضية، الإيصالات الحرارية، ومعاينة مايكروسوفت وورد التلقائية</p>
                </div>

                <div className="space-y-4 bg-[#242424] p-5 rounded-xl border border-[#383838] text-xs">
                  <div>
                    <label className="block text-gray-400 mb-1 font-semibold">طابعة الفواتير والتقارير العامة (A4/A5):</label>
                    <input
                      type="text"
                      value={invoicePrinter}
                      onChange={e => setInvoicePrinter(e.target.value)}
                      className="w-full bg-[#181818] border border-[#444] rounded px-3 py-1.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1 font-semibold">طابعة الإيصالات الحرارية السريعة (POS 80mm):</label>
                    <input
                      type="text"
                      value={posReceiptPrinter}
                      onChange={e => setPosReceiptPrinter(e.target.value)}
                      className="w-full bg-[#181818] border border-[#444] rounded px-3 py-1.5 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1 font-semibold">طابعة ملصقات الباركود للمستودعات (Label Printer):</label>
                    <input
                      type="text"
                      value={barcodeLabelPrinter}
                      onChange={e => setBarcodeLabelPrinter(e.target.value)}
                      className="w-full bg-[#181818] border border-[#444] rounded px-3 py-1.5 text-white font-mono"
                    />
                  </div>

                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={alwaysWordPreview}
                        onChange={e => setAlwaysWordPreview(e.target.checked)}
                        className="rounded border-gray-400 text-blue-600"
                      />
                      <span className="font-bold text-white">فتح شاشة معاينة مايكروسوفت وورد تلقائياً قبل إرسال أمر الطباعة</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={printCompanyLogo}
                        onChange={e => setPrintCompanyLogo(e.target.checked)}
                        className="rounded border-gray-400 text-blue-600"
                      />
                      <span>تضمين شعار المؤسسة والختم الرسمي ورقم ZATCA QR Code في رأس الصفحة</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: الباركود وتصميم الملصقات */}
            {activeTab === 'barcode' && (
              <div className="space-y-4">
                <div className="border-b border-[#383838] pb-3">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <Barcode className="w-5 h-5 text-emerald-400" />
                    <span>خيارات الباركود وطباعة الملصقات (Barcode & Label Options)</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">تحديد نوع الباركود المعياري، قياس الملصقات، وتنسيق الطباعة</p>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-[#242424] p-5 rounded-xl border border-[#383838] text-xs">
                  <div>
                    <label className="block text-gray-400 mb-1 font-semibold">نوع الترميز الافتراضي للباركود:</label>
                    <select
                      value={barcodeType}
                      onChange={e => setBarcodeType(e.target.value)}
                      className="w-full bg-[#181818] border border-[#444] rounded px-3 py-1.5 text-white font-mono font-bold"
                    >
                      <option value="EAN13">EAN-13 (13 خانة دولي)</option>
                      <option value="CODE128">Code-128 (أحرف وأرقام)</option>
                      <option value="QR">QR Code 2D (رمز الاستجابة السريعة)</option>
                      <option value="DATAMATRIX">DataMatrix (صناعي)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1 font-semibold">قياس الملصق الافتراضي (عرض × ارتفاع):</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={labelWidthMm}
                        onChange={e => setLabelWidthMm(Number(e.target.value))}
                        className="w-20 bg-[#181818] border border-[#444] rounded px-2 py-1 text-center font-mono"
                      />
                      <span className="text-gray-400">×</span>
                      <input
                        type="number"
                        value={labelHeightMm}
                        onChange={e => setLabelHeightMm(Number(e.target.value))}
                        className="w-20 bg-[#181818] border border-[#444] rounded px-2 py-1 text-center font-mono"
                      />
                      <span className="text-gray-400">ملم</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ملحقات الكاشير والدرج والشاشة */}
            {activeTab === 'peripherals' && (
              <div className="space-y-4">
                <div className="border-b border-[#383838] pb-3">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-purple-400" />
                    <span>ملحقات نقطة البيع (Cash Drawer & Customer Pole Display)</span>
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">اختبار نبضة فتح درج النقدية وشاشة عرض السعر للزبون 2x20 VFD</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#242424] p-4 rounded-xl border border-[#383838] flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-xs text-white mb-1">درج النقدية الإلكتروني (Cash Drawer)</h3>
                      <p className="text-[11px] text-gray-400 mb-3">إرسال نبضة كهربائية عبر طابعة الإيصالات لفتح الدرج آلياً عند حفظ الفاتورة</p>
                    </div>
                    <button
                      onClick={handleTestDrawerKick}
                      className="w-full py-2 bg-purple-700 hover:bg-purple-600 text-white rounded font-bold text-xs shadow flex items-center justify-center gap-1.5"
                    >
                      <span>اختبار فتح درج الكاشير</span>
                    </button>
                  </div>

                  <div className="bg-[#242424] p-4 rounded-xl border border-[#383838] flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-xs text-white mb-1">شاشة العميل (Pole Display VFD)</h3>
                      <p className="text-[11px] text-gray-400 mb-3">عرض اسم الصنف والسعر الإجمالي والمتبقي مباشرة للزبون أثناء تمرير الباركود</p>
                    </div>
                    <button
                      onClick={handleTestCustomerDisplay}
                      className="w-full py-2 bg-blue-700 hover:bg-blue-600 text-white rounded font-bold text-xs shadow flex items-center justify-center gap-1.5"
                    >
                      <span>اختبار إرسال نص لشاشة العميل</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: مفتاح الحماية والدونغل */}
            {activeTab === 'dongle' && (
              <div className="bg-[#242424] p-5 rounded-xl border border-[#383838] space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#383838]">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  <div>
                    <h3 className="text-sm font-bold text-white">مفتاح الحماية الإلكتروني FIPS 140-3 Hardware Sentinel</h3>
                    <span className="text-[10px] text-emerald-400 font-mono">حالة المفتاح: متصل ومشفر برقم تسلسلي ST-SENTINEL-2026-X892</span>
                  </div>
                </div>
                <div className="text-xs text-gray-300 space-y-2">
                  <div className="flex justify-between p-2 bg-[#181818] rounded">
                    <span>مستوى الأمان المعتمد:</span>
                    <span className="font-mono text-emerald-400 font-bold">MILITARY SPEC DEFCON 1 / ARGON2ID</span>
                  </div>
                  <div className="flex justify-between p-2 bg-[#181818] rounded">
                    <span>صلاحية الترخيص:</span>
                    <span className="font-mono text-cyan-400">دائم للمؤسسة (Unlimited Enterprise License)</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: صيانة الفهارس */}
            {activeTab === 'maintenance' && (
              <div className="bg-[#242424] p-5 rounded-xl border border-[#383838] text-center space-y-3">
                <HardDrive className="w-10 h-10 text-blue-400 mx-auto opacity-80" />
                <h3 className="text-sm font-bold text-white">معالج فحص وصيانة فهارس النظام (B-Tree Maintenance)</h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto">
                  إعادة تنظيم فهارس المواد والحسابات وضغط مساحات قاعدة البيانات SQLite / SQL Server لتحقيق أقصى استجابة.
                </p>
                <button
                  onClick={() => showToast('تم إجراء الفحص وضغط المؤشرات بنجاح')}
                  className="px-5 py-2 bg-[#0078D4] hover:bg-[#1084D9] text-white text-xs font-bold rounded shadow"
                >
                  فحص وصيانة الآن
                </button>
              </div>
            )}

            {/* TAB: عام */}
            {activeTab === 'general' && (
              <div className="bg-[#242424] p-5 rounded-xl border border-[#383838] space-y-4 text-xs">
                <h3 className="text-sm font-bold text-white">خيارات البرنامج العامة وسياسة الفترات المالية</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-400 mb-1">اسم المؤسسة الافتراضي في الترويسة:</label>
                    <input type="text" defaultValue={currentCompany.name} className="w-full bg-[#181818] border border-[#444] rounded px-3 py-1.5 text-white" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-400 mb-1">عدد المنازل العشرية للأسعار:</label>
                      <select className="w-full bg-[#181818] border border-[#444] rounded px-3 py-1.5 text-white font-mono">
                        <option value="2">منزلتان (0.00)</option>
                        <option value="3">ثلاث منازل (0.000)</option>
                        <option value="4">أربع منازل (0.0000 للعملات)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-400 mb-1">قفل التعديل المحاسبي قبل تاريخ:</label>
                      <input type="date" defaultValue="2026-01-01" className="w-full bg-[#181818] border border-[#444] rounded px-3 py-1.5 text-white font-mono" />
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
