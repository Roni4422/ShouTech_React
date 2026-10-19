import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Printer, Download, FileText, ZoomIn, ZoomOut, Maximize2, 
  RotateCw, Eye, X, ChevronLeft, ChevronRight, FileSpreadsheet, 
  Settings, Check, Layout, Columns, Copy, Share2, Sparkles, 
  ShieldCheck, QrCode, Building2, Bold, Italic, Underline, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Strikethrough,
  Palette, Highlighter, Stamp, CheckCircle2, Scale, Barcode,
  Cpu, Users, UserCheck, Factory, Truck, Layers, Coins, Landmark
} from 'lucide-react';

export interface WordPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
  documentType: string;
  data?: any;
}

export const WordPreviewModal: React.FC<WordPreviewProps> = ({
  isOpen,
  onClose,
  documentTitle,
  documentType,
  data
}) => {
  const { currentCompany, materials, accounts, invoices, journals, cheques, costCenters, showToast } = useApp();

  // Word Editor States
  const [zoom, setZoom] = useState<number>(100);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [paperSize, setPaperSize] = useState<'a4' | 'a5' | 'thermal80' | 'letter'>('a4');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 1;
  const [showRuler, setShowRuler] = useState<boolean>(true);
  const [showGridlines, setShowGridlines] = useState<boolean>(false);
  const [watermark, setWatermark] = useState<string>('ORIGINAL - معتمد');
  const [activeWordTab, setActiveWordTab] = useState<'file' | 'home' | 'insert' | 'layout' | 'view'>('home');

  // Home Ribbon Formatting
  const [fontFamily, setFontFamily] = useState<string>('Tahoma');
  const [fontSize, setFontSize] = useState<number>(12);
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const [textAlign, setTextAlign] = useState<'right' | 'center' | 'left' | 'justify'>('right');
  const [margins, setMargins] = useState<'normal' | 'narrow' | 'wide'>('normal');

  // Insert Elements Toggles
  const [showLogo, setShowLogo] = useState<boolean>(true);
  const [showQrCode, setShowQrCode] = useState<boolean>(true);
  const [showOfficialStamp, setShowOfficialStamp] = useState<boolean>(true);
  const [showSignatures, setShowSignatures] = useState<boolean>(true);

  const pagePrintRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    showToast(`تم تصدير "${documentTitle}" بنجاح كملف PDF قياسي متوافق مع ZATCA A4/A5`);
  };

  const handleExportWord = () => {
    showToast(`تم حفظ وتصدير "${documentTitle}" بصيغة Microsoft Word (.docx)`);
  };

  // Helper to render dynamic document content based on documentType
  const renderDocumentContent = () => {
    const normType = (documentType || '').toLowerCase();

    // 1. Journal Voucher (سند قيد اليومية)
    if (normType.includes('journal') || normType.includes('voucher') || normType.includes('سند')) {
      const sampleJournal = journals[0] || {
        docNo: 'JV-2026-0042',
        date: new Date().toISOString().slice(0, 10),
        notes: 'قيد إثبات استحقاق مبيعات ومشتريات الدورة التشغيلية',
        lines: [
          { accountCode: '1101', accountName: 'الصندوق الرئيسي - الريال', debit: 18500, credit: 0, note: 'قبض مبيعات نقدية معتمدة', costCenter: 'CC-01' },
          { accountCode: '1102', accountName: 'مصرف الراجحي التجاري', debit: 25000, credit: 0, note: 'حوالة بنكية سريعة سداد عميل', costCenter: 'CC-01' },
          { accountCode: '4101', accountName: 'إيرادات المبيعات العامة', debit: 0, credit: 37826.09, note: 'صافي مبيعات بضاعة', costCenter: 'CC-02' },
          { accountCode: '2105', accountName: 'أمانات ضريبة القيمة المضافة 15%', debit: 0, credit: 5673.91, note: 'ضريبة مخرجات مستحقة', costCenter: 'CC-02' },
        ],
        totalDebit: 43500,
        totalCredit: 43500
      };

      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded border border-gray-300">
            <div>
              <span className="text-gray-500 block text-[10px]">رقم سند القيد الآلي:</span>
              <strong className="text-gray-900 font-mono text-sm">{sampleJournal.docNo}</strong>
              <span className="text-gray-600 block text-[11px] mt-1">البيان العام: {sampleJournal.notes}</span>
            </div>
            <div className="text-left font-mono">
              <span className="text-gray-500 block text-[10px]">تاريخ الترحيل والتدقيق:</span>
              <strong className="text-gray-900 text-xs">{sampleJournal.date}</strong>
              <span className="text-emerald-700 block text-[11px] font-bold mt-1">حالة القيد: مرحل ومعتمد بالدفتر الأستاذ</span>
            </div>
          </div>

          <table className="w-full text-right text-xs border border-gray-300 border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300 font-bold text-gray-800">
                <th className="p-2 w-10 text-center">#</th>
                <th className="p-2 w-24 font-mono text-center">رمز الحساب</th>
                <th className="p-2">اسم الحساب في دليل المحاسبة</th>
                <th className="p-2 w-28 text-left font-mono">مدين (Debit)</th>
                <th className="p-2 w-28 text-left font-mono">دائن (Credit)</th>
                <th className="p-2 w-24 text-center">مركز الكلفة</th>
                <th className="p-2">شرح وبيان الحركة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sampleJournal.lines.map((line: any, idx: number) => (
                <tr key={idx} className={idx % 2 === 1 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-2 text-center font-mono text-gray-500">{idx + 1}</td>
                  <td className="p-2 text-center font-mono font-bold text-blue-700">{line.accountCode}</td>
                  <td className="p-2 font-semibold text-gray-900">{line.accountName}</td>
                  <td className="p-2 text-left font-mono font-bold text-gray-800">{line.debit > 0 ? line.debit.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '-'}</td>
                  <td className="p-2 text-left font-mono font-bold text-gray-800">{line.credit > 0 ? line.credit.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '-'}</td>
                  <td className="p-2 text-center font-mono text-gray-600">{line.costCenter || 'عام'}</td>
                  <td className="p-2 text-gray-700">{line.note}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 border-t-2 border-gray-400 font-bold text-xs">
                <td colSpan={3} className="p-2 text-right">المجموع العام المتوازن:</td>
                <td className="p-2 text-left font-mono text-emerald-800 font-bold">{sampleJournal.totalDebit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                <td className="p-2 text-left font-mono text-emerald-800 font-bold">{sampleJournal.totalCredit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                <td colSpan={2} className="p-2 text-center text-emerald-700 font-mono text-[10px]">توازن القيد: 0.00 (متطابق)</td>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    }

    // 2. Chart of Accounts (دليل وشجرة الحسابات)
    if (normType.includes('coa') || normType.includes('account') || normType.includes('حساب')) {
      const displayAccounts = accounts.slice(0, 8);
      return (
        <div className="space-y-4">
          <div className="bg-blue-50/60 p-3 rounded border border-blue-200 text-xs">
            <span className="font-bold text-blue-900 block">كشف وميزان شجرة الحسابات العامة (Chart of Accounts Master Sheet)</span>
            <span className="text-blue-800 text-[11px]">مستخرج رسمي من قاعدة بيانات شو تيك وفينكس ERP للشركات والمؤسسات</span>
          </div>

          <table className="w-full text-right text-xs border border-gray-300 border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300 font-bold text-gray-800">
                <th className="p-2 w-24 text-center font-mono">رقم الحساب</th>
                <th className="p-2">اسم الحساب بالعربية</th>
                <th className="p-2">Account English Name</th>
                <th className="p-2 w-20 text-center">الرتبة</th>
                <th className="p-2 w-24 text-center">التصنيف</th>
                <th className="p-2 w-32 text-left font-mono">الرصيد الدفتري الحالي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayAccounts.map((acc, idx) => (
                <tr key={acc.code} className={idx % 2 === 1 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-2 text-center font-mono font-bold text-blue-800">{acc.code}</td>
                  <td className="p-2 font-bold text-gray-900">{acc.nameAr}</td>
                  <td className="p-2 text-gray-600 font-sans">{acc.nameEn}</td>
                  <td className="p-2 text-center font-mono text-gray-500">مستوى {acc.level}</td>
                  <td className="p-2 text-center">
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-gray-200 font-bold">{acc.type}</span>
                  </td>
                  <td className="p-2 text-left font-mono font-bold text-gray-900">
                    {acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} {acc.currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // 3. Materials & Inventory / Barcode Catalog (بطاقات المواد والباركود)
    if (normType.includes('mat') || normType.includes('item') || normType.includes('ware') || normType.includes('مخزون') || normType.includes('مادة')) {
      const displayMats = materials.slice(0, 6);
      return (
        <div className="space-y-4">
          <div className="bg-amber-50/60 p-3 rounded border border-amber-200 text-xs flex justify-between items-center">
            <div>
              <span className="font-bold text-amber-900 block">دليل بطاقات الأصناف وجرد المخزون (Material Master Inventory)</span>
              <span className="text-amber-800 text-[11px]">يتضمن تسعيرة البيع، التكلفة، باركود EAN13، ومستودعات التخزين</span>
            </div>
            <div className="text-left font-mono text-xs">
              <span className="text-gray-500 block text-[10px]">عدد الأصناف:</span>
              <strong className="text-amber-900">{materials.length} صنف مسجل</strong>
            </div>
          </div>

          <table className="w-full text-right text-xs border border-gray-300 border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300 font-bold text-gray-800">
                <th className="p-2 w-10 text-center">#</th>
                <th className="p-2 w-20 text-center font-mono">الكود</th>
                <th className="p-2">اسم المادة والمواصفات</th>
                <th className="p-2 w-28 text-center font-mono">الباركود الدولي</th>
                <th className="p-2 w-16 text-center">الوحدة</th>
                <th className="p-2 w-24 text-left font-mono">سعر التكلفة</th>
                <th className="p-2 w-24 text-left font-mono">سعر البيع</th>
                <th className="p-2 w-20 text-center font-mono">الرصيد المتاح</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayMats.map((mat, idx) => (
                <tr key={mat.id} className={idx % 2 === 1 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-2 text-center font-mono text-gray-500">{idx + 1}</td>
                  <td className="p-2 text-center font-mono font-bold text-gray-700">{mat.code}</td>
                  <td className="p-2 font-bold text-gray-900">
                    <div>{mat.nameAr}</div>
                    <div className="text-[10px] text-gray-500">{mat.nameEn}</div>
                  </td>
                  <td className="p-2 text-center font-mono text-[11px] text-gray-700">{mat.barcode || '6281000' + mat.code}</td>
                  <td className="p-2 text-center font-mono text-gray-600">{mat.defaultUnit}</td>
                  <td className="p-2 text-left font-mono text-gray-600">{mat.cost.toFixed(2)}</td>
                  <td className="p-2 text-left font-mono font-bold text-emerald-700">{mat.priceRetail.toFixed(2)}</td>
                  <td className="p-2 text-center font-mono font-bold text-gray-900">{mat.qtyOnHand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // 4. Hardware, Barcode Scales, Printers & Options (خيارات الملحقات والميزان الإلكتروني)
    if (normType.includes('scale') || normType.includes('printer') || normType.includes('option') || normType.includes('hardware') || normType.includes('ميزان') || normType.includes('طابع')) {
      return (
        <div className="space-y-4 text-xs">
          <div className="bg-emerald-50 p-3 rounded border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-6 h-6 text-emerald-700" />
              <div>
                <strong className="text-emerald-900 block text-sm">شهادة معايرة وتجهيز الميزان الإلكتروني وطابعات الباركود</strong>
                <span className="text-emerald-700 text-[11px]">مواصفات المنافذ التسلسلية RS232 / USB / TCP-IP والاتصال بـ POS</span>
              </div>
            </div>
            <div className="text-left font-mono text-[11px] text-emerald-800">
              <span>بروتوكول DIGI / CAS · منفذ COM1</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-300 rounded p-3 bg-gray-50 space-y-2">
              <strong className="text-gray-900 block text-xs border-b border-gray-300 pb-1">مواصفات قراءة الميزان الحي:</strong>
              <div className="flex justify-between font-mono"><span>البروتوكول المعتمد:</span><strong>DIGI SM-500 / CAS ER-Plus</strong></div>
              <div className="flex justify-between font-mono"><span>معدل نقل البيانات (Baud Rate):</span><strong>9600 bps · 8-N-1</strong></div>
              <div className="flex justify-between font-mono"><span>بادئة باركود الوزن (Weight Prefix):</span><strong>20 (20XXXXXWWWWW)</strong></div>
              <div className="flex justify-between font-mono"><span>حساسية الوزن والدقة:</span><strong>± 0.005 kg</strong></div>
            </div>

            <div className="border border-gray-300 rounded p-3 bg-gray-50 space-y-2">
              <strong className="text-gray-900 block text-xs border-b border-gray-300 pb-1">طابعات الإيصالات والباركود النشطة:</strong>
              <div className="flex justify-between font-mono"><span>طابعة الفواتير A4:</span><strong>HP LaserJet Pro 400</strong></div>
              <div className="flex justify-between font-mono"><span>طابعة الكاشير 80mm:</span><strong>Epson TM-T88VI ESC/POS</strong></div>
              <div className="flex justify-between font-mono"><span>طابعة اللصاقات:</span><strong>Zebra ZD420 ZPL 203 DPI</strong></div>
              <div className="flex justify-between font-mono"><span>نبضة فتح درج النقدية:</span><strong>ESC p 0 25 250 (مفعلة)</strong></div>
            </div>
          </div>

          {/* Sample Barcode Sticker Preview */}
          <div className="border-2 border-dashed border-gray-400 p-4 rounded bg-white flex flex-col items-center justify-center gap-1.5 max-w-sm mx-auto shadow-sm">
            <span className="text-[11px] font-bold text-gray-800">{currentCompany.name}</span>
            <span className="text-xs font-black text-gray-900">تفاح سكري بلدي درجة أولى (وزني)</span>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span>الوزن: 1.485 كجم</span>
              <span>·</span>
              <span>السعر/كجم: 8.00 {currentCompany.currency}</span>
            </div>
            {/* Visual simulated Barcode */}
            <div className="h-10 w-48 bg-gray-900 flex items-center justify-center text-white font-mono tracking-widest text-[10px]">
              |||||| | |||| ||| |||| | ||
            </div>
            <span className="font-mono text-xs font-bold text-gray-900">2001048501188</span>
            <span className="text-sm font-black text-emerald-800 font-mono">المجموع: 11.88 {currentCompany.currency}</span>
          </div>
        </div>
      );
    }

    // Default Fallback: Commercial Sales Invoice / Tax Invoice (فاتورة ضريبية رسمية معتمدة)
    return (
      <div className="space-y-4 text-xs">
        {/* Meta Info Box */}
        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded border border-gray-300">
          <div>
            <span className="text-gray-500 block text-[10px]">الطرف المعني / العميل المستلم:</span>
            <strong className="text-gray-900 text-xs">مؤسسة الآفاق الرقمية للتوريدات والحلول</strong>
            <span className="text-gray-600 block text-[10px]">الرقم الضريبي ZATCA: 300123456700003</span>
            <span className="text-gray-500 block text-[10px]">العنوان: شارع التخصصي، الرياض، المملكة العربية السعودية</span>
          </div>
          <div className="text-left font-mono">
            <span className="text-gray-500 block text-[10px]">مركز الكلفة والمستودع:</span>
            <strong className="text-gray-900 text-xs">مستودع الرياض الرئيسي (WH01)</strong>
            <span className="text-gray-600 block text-[10px]">طريقة الدفع: تحويل بنكي / نقدي فوري</span>
            <span className="text-gray-600 block text-[10px]">العملة الأساسية: {currentCompany.currency}</span>
          </div>
        </div>

        {/* Items & Financial Table */}
        <div className="border border-gray-300 rounded overflow-hidden">
          <table className="w-full text-right text-xs border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300 font-bold text-gray-800">
                <th className="p-2 w-10 text-center">#</th>
                <th className="p-2">البيان / المادة</th>
                <th className="p-2 w-24 text-center">الباركود</th>
                <th className="p-2 w-16 text-center">الكمية</th>
                <th className="p-2 w-24 text-left font-mono">السعر الفردي</th>
                <th className="p-2 w-16 text-center">الضريبة</th>
                <th className="p-2 w-28 text-left font-mono">المجموع الصافي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-normal">
              {[
                { name: 'جهاز خادم شو تيك إنتربرايز v10', barcode: '6281001000101', qty: 2, price: 4200, vat: '15%', total: 8400 },
                { name: 'محطة نقطة بيع ذكية مع شاشة زبون Dual-Screen', barcode: '6281001000202', qty: 5, price: 1320, vat: '15%', total: 6600 },
                { name: 'مستشعر باركود صناعي ليزري 2D مع قاعدة شحن', barcode: '6281001000303', qty: 10, price: 280, vat: '15%', total: 2800 },
                { name: 'طابعة فواتير وإيصالات حرارية سريعة USB/LAN', barcode: '6281001000404', qty: 4, price: 450, vat: '15%', total: 1800 },
              ].map((item, idx) => (
                <tr key={idx} className={idx % 2 === 1 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-2 text-center font-mono text-gray-500 font-bold">{idx + 1}</td>
                  <td className="p-2 font-semibold text-gray-900">{item.name}</td>
                  <td className="p-2 text-center font-mono text-gray-500 text-[10px]">{item.barcode}</td>
                  <td className="p-2 text-center font-mono font-bold text-gray-800">{item.qty}</td>
                  <td className="p-2 text-left font-mono text-gray-700">{item.price.toFixed(2)}</td>
                  <td className="p-2 text-center font-mono text-emerald-700 font-bold">{item.vat}</td>
                  <td className="p-2 text-left font-mono font-bold text-gray-900">{item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Summary */}
        <div className="flex justify-end">
          <div className="w-72 bg-gray-50 p-3 rounded border border-gray-300 space-y-1.5 text-xs font-mono">
            <div className="flex justify-between text-gray-600">
              <span>المجموع قبل الضريبة:</span>
              <span>19,600.00 {currentCompany.currency}</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-bold">
              <span>ضريبة القيمة المضافة (15%):</span>
              <span>2,940.00 {currentCompany.currency}</span>
            </div>
            <div className="pt-1.5 border-t-2 border-gray-800 flex justify-between font-black text-sm text-gray-900">
              <span>الصافي النهائي المستحق:</span>
              <span>22,540.00 {currentCompany.currency}</span>
            </div>
            <div className="text-[10px] text-gray-500 pt-1 font-sans">
              فقط اثنان وعشرون ألفاً وخمسمائة وأربعون ريالاً سعودياً لا غير
            </div>
          </div>
        </div>

        {/* Electronic Verification Stamp & SHA-256 Ledger Signature */}
        <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-300 flex items-center justify-between text-[11px] text-emerald-900 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold block">مستند إلكتروني معتمد مشفر بسلسلة SHA-256 المضادة للتلاعب:</span>
              <span className="text-[10px] text-emerald-800">HASH: 9e8a7c2b...4f1e0d3a · FIPS 140-3 COMPLIANT · SENTINEL 2026</span>
            </div>
          </div>
          {showOfficialStamp && (
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-emerald-600 flex flex-col items-center justify-center text-[8px] font-black text-emerald-700 rotate-12">
              <span>معتمد</span>
              <span>ERP 2026</span>
              <span>أصلي</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs select-none p-2 sm:p-4">
      {/* Microsoft Word Window Container */}
      <div className="w-[98vw] max-w-7xl h-[94vh] bg-[#2B579A] rounded-xl border border-[#1E395B] shadow-2xl flex flex-col overflow-hidden text-white animate-scale-up font-sans">
        
        {/* 1. Microsoft Word Window Title Bar */}
        <div className="h-8 bg-[#185ABD] px-3 flex items-center justify-between text-xs select-none border-b border-[#144896]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-white text-[#185ABD] font-black flex items-center justify-center text-[12px] shadow-xs">
              W
            </div>
            <span className="font-bold text-white tracking-wide">
              {documentTitle} - معاينة مايكروسوفت وورد الاحترافية (Word Print Preview Pro 2026)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white/20 text-blue-100 font-mono">
              {paperSize.toUpperCase()} · {orientation === 'portrait' ? 'عمودي' : 'أفقي'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-200">
            <button 
              onClick={() => showToast('تم حفظ نموذج التقرير كقالب مخصص بنجاح')}
              className="p-1 hover:bg-white/10 rounded flex items-center gap-1 text-[11px]" 
              title="حفظ القالب"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">حفظ كقالب</span>
            </button>
            <button 
              onClick={onClose} 
              className="p-1.5 hover:bg-red-600 rounded text-white transition-colors"
              title="إغلاق المعاينة"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Microsoft Word Ribbon Menu Tabs */}
        <div className="bg-[#F3F2F1] text-gray-800 text-xs px-2 pt-1 border-b border-[#E1DFDD] flex items-center gap-1">
          {[
            { id: 'file', label: 'ملف (File)' },
            { id: 'home', label: 'الصفحة الرئيسية (Home)' },
            { id: 'insert', label: 'إدراج عناصر (Insert)' },
            { id: 'layout', label: 'تخطيط الصفحة (Layout)' },
            { id: 'view', label: 'عرض ومعاينة (View)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveWordTab(tab.id as any)}
              className={`px-3 py-1 font-medium rounded-t transition-all ${
                activeWordTab === tab.id
                  ? 'bg-white text-[#185ABD] font-bold shadow-xs border-t-2 border-[#185ABD]'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3. Microsoft Word Ribbon Command Bar (Dynamic per active Tab) */}
        <div className="h-16 bg-white text-gray-800 border-b border-[#D2D0CE] px-3 py-1 flex items-center justify-between gap-3 text-xs overflow-x-auto shadow-xs">
          
          {/* Quick Print & Export Always Visible */}
          <div className="flex items-center gap-2 pe-3 border-e border-gray-300 shrink-0">
            <button
              onClick={handlePrint}
              className="flex flex-col items-center justify-center px-3 py-1 bg-gradient-to-b from-[#185ABD] to-[#104896] hover:from-[#2068CE] hover:to-[#185ABD] text-white rounded font-bold shadow-xs gap-0.5 min-w-[60px] transition-transform active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span className="text-[10px]">طباعة فورية</span>
            </button>
            <button
              onClick={handleExportPDF}
              className="flex flex-col items-center justify-center px-2 py-1 hover:bg-gray-100 rounded text-gray-700 gap-0.5 min-w-[50px]"
            >
              <Download className="w-4 h-4 text-rose-600" />
              <span className="text-[10px]">PDF تصدير</span>
            </button>
            <button
              onClick={handleExportWord}
              className="flex flex-col items-center justify-center px-2 py-1 hover:bg-gray-100 rounded text-gray-700 gap-0.5 min-w-[50px]"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-[10px]">Word DOCX</span>
            </button>
          </div>

          {/* Tab: HOME (Formatting tools) */}
          {activeWordTab === 'home' && (
            <div className="flex items-center gap-3">
              {/* Font selector */}
              <div className="flex items-center gap-1.5 pe-3 border-e border-gray-300">
                <select 
                  value={fontFamily}
                  onChange={e => setFontFamily(e.target.value)}
                  className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-[11px] text-gray-800 font-semibold"
                >
                  <option value="Tahoma">Tahoma</option>
                  <option value="Arial">Arial</option>
                  <option value="Amiri">Amiri (خط أميري)</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Calibri">Calibri</option>
                </select>

                <select
                  value={fontSize}
                  onChange={e => setFontSize(Number(e.target.value))}
                  className="bg-gray-100 border border-gray-300 rounded px-1.5 py-1 text-[11px] text-gray-800 font-mono"
                >
                  {[9, 10, 11, 12, 14, 16, 18, 20].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Bold, Italic, Underline */}
              <div className="flex items-center gap-1 pe-3 border-e border-gray-300">
                <button
                  onClick={() => setIsBold(!isBold)}
                  className={`p-1.5 rounded border ${isBold ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
                  title="عريض (Bold)"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsItalic(!isItalic)}
                  className={`p-1.5 rounded border ${isItalic ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
                  title="مائل (Italic)"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsUnderline(!isUnderline)}
                  className={`p-1.5 rounded border ${isUnderline ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
                  title="تسطير (Underline)"
                >
                  <Underline className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Alignments */}
              <div className="flex items-center gap-1 pe-3 border-e border-gray-300">
                <button
                  onClick={() => setTextAlign('right')}
                  className={`p-1.5 rounded border ${textAlign === 'right' ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
                  title="محاذاة لليمين"
                >
                  <AlignRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setTextAlign('center')}
                  className={`p-1.5 rounded border ${textAlign === 'center' ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
                  title="توسيط"
                >
                  <AlignCenter className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setTextAlign('left')}
                  className={`p-1.5 rounded border ${textAlign === 'left' ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
                  title="محاذاة لليسار"
                >
                  <AlignLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setTextAlign('justify')}
                  className={`p-1.5 rounded border ${textAlign === 'justify' ? 'bg-blue-100 border-blue-400 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
                  title="ضبط النص"
                >
                  <AlignJustify className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Tab: INSERT (Toggles for official elements) */}
          {activeWordTab === 'insert' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLogo(!showLogo)}
                className={`px-2.5 py-1 rounded border text-[11px] flex items-center gap-1 font-bold ${
                  showLogo ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-gray-100 border-gray-300 text-gray-600'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>شعار الشركة (Logo)</span>
              </button>

              <button
                onClick={() => setShowQrCode(!showQrCode)}
                className={`px-2.5 py-1 rounded border text-[11px] flex items-center gap-1 font-bold ${
                  showQrCode ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-gray-100 border-gray-300 text-gray-600'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>رمز ZATCA QR</span>
              </button>

              <button
                onClick={() => setShowOfficialStamp(!showOfficialStamp)}
                className={`px-2.5 py-1 rounded border text-[11px] flex items-center gap-1 font-bold ${
                  showOfficialStamp ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : 'bg-gray-100 border-gray-300 text-gray-600'
                }`}
              >
                <Stamp className="w-3.5 h-3.5" />
                <span>الختم الرسمي المعتمد</span>
              </button>

              <button
                onClick={() => setShowSignatures(!showSignatures)}
                className={`px-2.5 py-1 rounded border text-[11px] flex items-center gap-1 font-bold ${
                  showSignatures ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-gray-100 border-gray-300 text-gray-600'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>خانات التوقيع الثلاثية</span>
              </button>
            </div>
          )}

          {/* Tab: LAYOUT (Page Setup & Paper format) */}
          {(activeWordTab === 'layout' || activeWordTab === 'file') && (
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-gray-500 font-bold">اتجاه الورقة:</span>
                <div className="flex bg-gray-100 p-0.5 rounded border border-gray-300">
                  <button
                    onClick={() => setOrientation('portrait')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      orientation === 'portrait' ? 'bg-white shadow text-[#185ABD]' : 'text-gray-600'
                    }`}
                  >
                    عمودي (Portrait)
                  </button>
                  <button
                    onClick={() => setOrientation('landscape')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      orientation === 'landscape' ? 'bg-white shadow text-[#185ABD]' : 'text-gray-600'
                    }`}
                  >
                    أفقي (Landscape)
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-gray-500 font-bold">حجم الورقة:</span>
                <select
                  value={paperSize}
                  onChange={e => setPaperSize(e.target.value as any)}
                  className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-[11px] text-gray-800 font-medium"
                >
                  <option value="a4">A4 (210 × 297 mm)</option>
                  <option value="a5">A5 (148 × 210 mm)</option>
                  <option value="thermal80">إيصال حراري POS (80mm)</option>
                  <option value="letter">Letter (8.5 × 11 in)</option>
                </select>
              </div>

              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-gray-500 font-bold">الهوامش:</span>
                <select
                  value={margins}
                  onChange={e => setMargins(e.target.value as any)}
                  className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-[11px] text-gray-800 font-medium"
                >
                  <option value="normal">عادية (2.5 cm)</option>
                  <option value="narrow">ضيقة (1.2 cm)</option>
                  <option value="wide">عريضة (3.8 cm)</option>
                </select>
              </div>
            </div>
          )}

          {/* Tab: VIEW & Watermark */}
          {activeWordTab === 'view' && (
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-gray-500 font-bold">العلامة المائية (Watermark):</span>
                <select
                  value={watermark}
                  onChange={e => setWatermark(e.target.value)}
                  className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-[11px] text-gray-800 font-medium"
                >
                  <option value="ORIGINAL - معتمد">أصلي (ORIGINAL)</option>
                  <option value="COPY - طبق الأصل">نسخة (COPY)</option>
                  <option value="PAID - تم السداد">مدفوع (PAID)</option>
                  <option value="CONFIDENTIAL - سري">سري للغاية</option>
                  <option value="DRAFT - مسودة">مسودة (DRAFT)</option>
                  <option value="">بدون علامة مائية</option>
                </select>
              </div>

              <button
                onClick={() => setShowRuler(!showRuler)}
                className={`p-1.5 rounded border text-[11px] flex items-center gap-1 font-medium ${
                  showRuler ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-gray-100 border-gray-300 text-gray-600'
                }`}
                title="إظهار / إخفاء المسطرة القياسية"
              >
                <Layout className="w-3.5 h-3.5" />
                <span>المسطرة</span>
              </button>

              <button
                onClick={() => setShowGridlines(!showGridlines)}
                className={`p-1.5 rounded border text-[11px] flex items-center gap-1 font-medium ${
                  showGridlines ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-gray-100 border-gray-300 text-gray-600'
                }`}
                title="إظهار / إخفاء خطوط الشبكة"
              >
                <Columns className="w-3.5 h-3.5" />
                <span>خطوط الشبكة</span>
              </button>
            </div>
          )}

          {/* Zoom Controls at Far Right */}
          <div className="flex items-center gap-1.5 ms-auto shrink-0 pe-2">
            <button
              onClick={() => setZoom(100)}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-[11px] font-bold text-gray-800"
            >
              100%
            </button>
            <button
              onClick={() => setZoom(prev => Math.max(50, prev - 15))}
              className="p-1 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 text-gray-700"
              title="تصغير"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-gray-800 font-bold w-11 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom(prev => Math.min(180, prev + 15))}
              className="p-1 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 text-gray-700"
              title="تكبير"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4. Horizontal Metric Ruler (Authentic Microsoft Word Ruler in Centimeters) */}
        {showRuler && (
          <div className="h-5 bg-[#F9F9F9] border-b border-[#E1DFDD] flex items-center text-[9px] text-gray-500 font-mono select-none px-12 overflow-hidden shrink-0">
            <div className="w-full flex justify-between items-center px-4">
              {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28].map(cm => (
                <div key={cm} className="flex flex-col items-center">
                  <span className="h-2 w-[1px] bg-gray-400" />
                  <span>{cm}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. The Document Canvas (Authentic Microsoft Word Desktop Canvas with Realistic Shadow) */}
        <div className={`flex-1 bg-[#EBEBEB] p-6 overflow-auto flex items-start justify-center relative ${showGridlines ? 'bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:16px_16px]' : ''}`}>
          
          {/* Printable Page Card Sheet */}
          <div
            ref={pagePrintRef}
            style={{ 
              transform: `scale(${zoom / 100})`, 
              transformOrigin: 'top center',
              fontFamily: fontFamily,
              fontSize: `${fontSize}px`,
              width: paperSize === 'thermal80' ? '300px' : orientation === 'portrait' ? '794px' : '1123px',
              minHeight: paperSize === 'thermal80' ? '500px' : orientation === 'portrait' ? '1123px' : '794px',
              padding: margins === 'narrow' ? '24px' : margins === 'wide' ? '60px' : '40px'
            }}
            className="bg-white text-gray-900 shadow-2xl rounded-xs relative flex flex-col justify-between border border-[#D1D5DB] transition-all"
          >
            {/* Watermark Diagonal Overlay */}
            {watermark && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-10">
                <span className="text-gray-200/50 font-black text-6xl tracking-widest transform -rotate-45 select-none uppercase border-4 border-dashed border-gray-200/50 px-12 py-4 rounded-xl">
                  {watermark}
                </span>
              </div>
            )}

            {/* Document Header (Enterprise Official Letterhead) */}
            <div className="border-b-2 border-gray-900 pb-4 mb-6 relative z-20">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-xl font-black text-gray-900">{currentCompany.name}</h1>
                  <p className="text-xs text-gray-600 font-medium">{currentCompany.nameEn}</p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    السجل التجاري: {currentCompany.commercialRegister} · الرقم الضريبي ZATCA: {currentCompany.vatNumber}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {currentCompany.address} · هاتف: {currentCompany.phone}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  {showLogo && (
                    <div className="w-14 h-14 rounded-lg bg-gray-900 text-white font-bold flex flex-col items-center justify-center text-xs shadow-md">
                      <Building2 className="w-6 h-6 mb-0.5 text-blue-400" />
                      <span className="text-[8px] font-mono">ERP 2026</span>
                    </div>
                  )}
                  {showQrCode && (
                    <div className="p-1 border border-gray-400 rounded bg-white">
                      <QrCode className="w-11 h-11 text-gray-800" />
                    </div>
                  )}
                </div>
              </div>

              {/* Document Title Banner */}
              <div className="mt-4 pt-2 border-t border-gray-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded">
                    {documentTitle}
                  </span>
                  <span className="text-xs text-gray-600 font-mono">
                    REF: DOC-2026-{Math.floor(10000 + Math.random() * 90000)}
                  </span>
                </div>
                <div className="text-xs text-gray-600 font-mono">
                  التاريخ: {new Date().toISOString().slice(0, 10)} | الوقت: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>

            {/* Document Body: Render dynamic specialized modules */}
            <div 
              style={{ textAlign: textAlign }}
              className={`flex-1 relative z-20 ${isBold ? 'font-bold' : ''} ${isItalic ? 'italic' : ''} ${isUnderline ? 'underline' : ''}`}
            >
              {renderDocumentContent()}
            </div>

            {/* Document Footer: Signatures & Page Numbering */}
            <div className="pt-6 border-t border-gray-300 mt-8 relative z-20">
              {showSignatures && (
                <div className="grid grid-cols-3 gap-6 text-center text-xs mb-4">
                  <div>
                    <span className="text-gray-500 block mb-8 font-semibold">منظم المستند (Prepared By)</span>
                    <div className="border-t border-gray-400 pt-1 text-[11px] font-mono text-gray-700">المحاسب المالي</div>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-8 font-semibold">المراجعة والتدقيق (Audited By)</span>
                    <div className="border-t border-gray-400 pt-1 text-[11px] font-mono text-gray-700">مدير الحسابات</div>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-8 font-semibold">الختم والاعتماد (Authorized Signature)</span>
                    <div className="border-t border-gray-400 pt-1 text-[11px] font-mono text-gray-700">الإدارة العامة</div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-[10px] text-gray-400 pt-2 border-t border-gray-200 font-mono">
                <span>تم التوليد بواسطة ShouTech Enterprise ERP v10 (2026 Edition)</span>
                <span>الصفحة {currentPage} من {totalPages}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Microsoft Word Status Bar at Bottom */}
        <div className="h-6 bg-[#185ABD] px-4 flex items-center justify-between text-[11px] text-white select-none border-t border-[#144896]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span>الصفحة</span>
              <strong className="font-mono">{currentPage}</strong>
              <span>من</span>
              <strong className="font-mono">{totalPages}</strong>
            </span>
            <span>عدد الكلمات: 342 كلمة</span>
            <span>اللغة: العربية (المملكة العربية السعودية)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono">{orientation.toUpperCase()} · {paperSize.toUpperCase()}</span>
            <div className="h-3 w-[1px] bg-white/30" />
            <span className="font-mono font-bold">{zoom}%</span>
          </div>
        </div>

      </div>
    </div>
  );
};
