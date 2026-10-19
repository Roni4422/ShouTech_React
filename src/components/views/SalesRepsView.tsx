import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExcelSchedule } from '../common/ExcelSchedule';
import { 
  UserCheck, Smartphone, MapPin, Target, DollarSign, 
  CheckCircle2, RefreshCw, Battery, Wifi, Shield 
} from 'lucide-react';

interface SalesRep {
  id: string;
  code: string;
  name: string;
  team: string;
  phone: string;
  commissionPct: number;
  monthlyTarget: number;
  achievedSales: number;
  collectionsAmount: number;
  handheldId: string;
  handheldBattery: number;
  syncStatus: 'Synced' | 'Pending' | 'Offline';
  currentRoute: string;
}

export const SalesRepsView: React.FC = () => {
  const { currentCompany, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'reps' | 'targets' | 'collections' | 'handhelds'>('reps');

  const [reps, setReps] = useState<SalesRep[]>([
    { id: '1', code: 'REP-101', name: 'أحمد محمود العلي', team: 'فريق قطاع الوسطى', phone: '+966 50 1112233', commissionPct: 2.5, monthlyTarget: 250000, achievedSales: 215000, collectionsAmount: 180000, handheldId: 'HH-Z9-01', handheldBattery: 92, syncStatus: 'Synced', currentRoute: 'مسار تجار الجملة - البطحاء' },
    { id: '2', code: 'REP-102', name: 'سامر خليل الحداد', team: 'فريق التوزيع السريع', phone: '+966 55 4445566', commissionPct: 3.0, monthlyTarget: 180000, achievedSales: 195000, collectionsAmount: 165000, handheldId: 'HH-Z9-02', handheldBattery: 78, syncStatus: 'Synced', currentRoute: 'مسار السوبرماركت - العليا' },
    { id: '3', code: 'REP-103', name: 'خالد عبد الرحمن النجار', team: 'فريق المنطقة الشرقية', phone: '+966 54 7778899', commissionPct: 2.5, monthlyTarget: 300000, achievedSales: 240000, collectionsAmount: 210000, handheldId: 'HH-Z9-03', handheldBattery: 45, syncStatus: 'Pending', currentRoute: 'مسار الخبر والدمام التجاري' },
    { id: '4', code: 'REP-104', name: 'يوسف مصطفى الباشا', team: 'فريق التجزئة والميني ماركت', phone: '+966 56 2223344', commissionPct: 3.5, monthlyTarget: 150000, achievedSales: 135000, collectionsAmount: 120000, handheldId: 'HH-Z9-04', handheldBattery: 85, syncStatus: 'Synced', currentRoute: 'مسار أحياء شمال الرياض' },
  ]);

  const columns = [
    {
      key: 'code',
      header: 'رمز المندوب',
      width: '100px',
      render: (row: SalesRep) => (
        <span className="font-mono font-bold text-indigo-900">{row.code}</span>
      )
    },
    {
      key: 'name',
      header: 'اسم مندوب المبيعات',
      render: (row: SalesRep) => (
        <div>
          <span className="font-semibold text-gray-900 block">{row.name}</span>
          <span className="text-[10px] text-gray-500">{row.team}</span>
        </div>
      )
    },
    {
      key: 'phone',
      header: 'رقم الهاتف',
      width: '115px',
      align: 'center' as const
    },
    {
      key: 'commissionPct',
      header: 'نسبة العمولة',
      width: '90px',
      align: 'center' as const,
      render: (row: SalesRep) => (
        <span className="font-mono font-bold text-indigo-700">{row.commissionPct}%</span>
      )
    },
    {
      key: 'monthlyTarget',
      header: `الهدف (${currentCompany.currency})`,
      width: '110px',
      align: 'left' as const,
      render: (row: SalesRep) => (
        <span className="font-mono text-gray-700">{row.monthlyTarget.toLocaleString()}</span>
      )
    },
    {
      key: 'achievedSales',
      header: `المبيعات المحققة`,
      width: '110px',
      align: 'left' as const,
      render: (row: SalesRep) => (
        <span className="font-mono font-bold text-emerald-800">{row.achievedSales.toLocaleString()}</span>
      )
    },
    {
      key: 'collectionsAmount',
      header: `التحصيلات النقدية`,
      width: '110px',
      align: 'left' as const,
      render: (row: SalesRep) => (
        <span className="font-mono font-bold text-blue-900">{row.collectionsAmount.toLocaleString()}</span>
      )
    },
    {
      key: 'handheldId',
      header: 'جهاز الـ Handheld',
      width: '110px',
      align: 'center' as const,
      render: (row: SalesRep) => (
        <div className="flex items-center justify-center gap-1">
          <Smartphone className="w-3 h-3 text-indigo-600" />
          <span className="font-mono text-xs">{row.handheldId}</span>
          <span className="text-[10px] text-gray-500 font-mono">({row.handheldBattery}%)</span>
        </div>
      )
    },
    {
      key: 'syncStatus',
      header: 'المزامنة الحية',
      width: '95px',
      align: 'center' as const,
      render: (row: SalesRep) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
          row.syncStatus === 'Synced' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
        }`}>
          {row.syncStatus === 'Synced' ? 'متزامن' : 'معلق'}
        </span>
      )
    },
    {
      key: 'currentRoute',
      header: 'المسار الجغرافي (GPS)',
      render: (row: SalesRep) => (
        <span className="text-[11px] text-gray-700 truncate block">{row.currentRoute}</span>
      )
    }
  ];

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] text-white select-none">
      {/* View Header */}
      <div className="p-3 bg-[#252526] border-b border-[#333333] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>إدارة المندوبين والأجهزة الكفية (Handheld POS)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                Van Sales & Field Reps
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">بطاقات المندوبين، أهداف المبيعات والعمولات، تحصيلات الصناديق الكفية، وتتبع مسارات الـ GPS</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-[#181818] p-1 rounded-lg border border-[#383838]">
          {[
            { id: 'reps', label: 'سجل المندوبين' },
            { id: 'targets', label: 'مستهدفات المبيعات' },
            { id: 'collections', label: 'تحصيلات المندوبين' },
            { id: 'handhelds', label: 'الأجهزة الكفية والمسارات' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 text-xs rounded transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-700 text-white font-semibold shadow'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-4 flex flex-col">
        {/* Authentic Excel Schedule: 2-Color Alternating: White + Indigo Slate (#E0E7FF) */}
        <div className="flex-1 min-h-[380px]">
          <ExcelSchedule<SalesRep>
            title="جدول مناديب المبيعات والتحصيلات (Excel Sales Reps Ledger)"
            sheetName="Sales_Reps"
            themeColor="indigo"
            columns={columns}
            data={reps}
            keyExtractor={row => row.id}
            onRowClick={row => {
              showToast(`تم فتح ملف المندوب: ${row.name}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};
