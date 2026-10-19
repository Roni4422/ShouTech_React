import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExcelSchedule } from '../common/ExcelSchedule';
import { 
  Users, Plus, Search, MapPin, Target, DollarSign, 
  CreditCard, Phone, Mail, Award, CheckCircle2, TrendingUp 
} from 'lucide-react';

interface CustomerProfile {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  category: string;
  region: string;
  phone: string;
  taxNumber: string;
  creditLimit: number;
  currentBalance: number;
  priceCategory: 'Wholesale' | 'Retail' | 'Special';
  targetQuota: number;
  targetAchieved: number;
  status: 'Active' | 'Warning' | 'Locked';
}

export const CRMView: React.FC = () => {
  const { currentCompany, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'customers' | 'pricing' | 'targets' | 'settlement'>('customers');
  
  const [customers, setCustomers] = useState<CustomerProfile[]>([
    { id: '1', code: 'CUST-001', nameAr: 'مؤسسة الآفاق الرقمية الحديثة', nameEn: 'Digital Horizons Est.', category: 'شركات تكنولوجيا', region: 'الرياض - العليا', phone: '+966 11 4829100', taxNumber: '300123456700003', creditLimit: 150000, currentBalance: 64200, priceCategory: 'Wholesale', targetQuota: 500000, targetAchieved: 420000, status: 'Active' },
    { id: '2', code: 'CUST-002', nameAr: 'شركة الأفق الحديث للتقنية', nameEn: 'Al-Ofuq Tech Co.', category: 'موزع معتمد', region: 'جدة - التحلية', phone: '+966 12 6901234', taxNumber: '300987654300003', creditLimit: 200000, currentBalance: 98500, priceCategory: 'Special', targetQuota: 800000, targetAchieved: 760000, status: 'Active' },
    { id: '3', code: 'CUST-003', nameAr: 'مؤسسة النور لمواد البناء', nameEn: 'Al-Noor Materials', category: 'مقاولات وتوريدات', region: 'الدمام - الخبر', phone: '+966 13 8334455', taxNumber: '301112233400003', creditLimit: 80000, currentBalance: 78500, priceCategory: 'Wholesale', targetQuota: 300000, targetAchieved: 210000, status: 'Warning' },
    { id: '4', code: 'CUST-004', nameAr: 'شركة الشرق السريعة للخدمات', nameEn: 'Eastern Express Co.', category: 'خدمات لوجستية', region: 'مكة المكرمة', phone: '+966 12 5556677', taxNumber: '300445566700003', creditLimit: 50000, currentBalance: 52000, priceCategory: 'Retail', targetQuota: 150000, targetAchieved: 95000, status: 'Locked' },
    { id: '5', code: 'CUST-005', nameAr: 'مجموعة الفجر الهندسية', nameEn: 'Al-Fajer Engineering', category: 'استشارات وتطوير', region: 'المدينة المنورة', phone: '+966 14 8441122', taxNumber: '300778899000003', creditLimit: 120000, currentBalance: 24300, priceCategory: 'Wholesale', targetQuota: 400000, targetAchieved: 390000, status: 'Active' },
  ]);

  const columns = [
    {
      key: 'code',
      header: 'رمز العميل',
      width: '100px',
      render: (row: CustomerProfile) => (
        <span className="font-mono font-bold text-fuchsia-900">{row.code}</span>
      )
    },
    {
      key: 'nameAr',
      header: 'اسم العميل / الشركة',
      render: (row: CustomerProfile) => (
        <div>
          <span className="font-semibold text-gray-900 block">{row.nameAr}</span>
          <span className="text-[10px] text-gray-500">{row.nameEn}</span>
        </div>
      )
    },
    {
      key: 'region',
      header: 'المنطقة الجغرافية',
      width: '120px',
      render: (row: CustomerProfile) => (
        <span className="text-gray-700 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-fuchsia-600" />
          <span>{row.region}</span>
        </span>
      )
    },
    {
      key: 'priceCategory',
      header: 'فئة السعر',
      width: '90px',
      align: 'center' as const,
      render: (row: CustomerProfile) => (
        <span className="px-2 py-0.5 rounded text-[10px] bg-fuchsia-100 text-fuchsia-800 font-bold">
          {row.priceCategory === 'Wholesale' ? 'جملة' : row.priceCategory === 'Retail' ? 'مفرق' : 'خاص'}
        </span>
      )
    },
    {
      key: 'creditLimit',
      header: `سقف الائتمان (${currentCompany.currency})`,
      width: '120px',
      align: 'left' as const,
      render: (row: CustomerProfile) => (
        <span className="font-mono text-gray-700">{row.creditLimit.toLocaleString()}</span>
      )
    },
    {
      key: 'currentBalance',
      header: `الرصيد المدين (${currentCompany.currency})`,
      width: '120px',
      align: 'left' as const,
      render: (row: CustomerProfile) => (
        <span className={`font-mono font-bold ${
          row.currentBalance > row.creditLimit ? 'text-rose-700' : 'text-gray-900'
        }`}>
          {row.currentBalance.toLocaleString()}
        </span>
      )
    },
    {
      key: 'targetQuota',
      header: 'المستهدف البيعي',
      width: '110px',
      align: 'left' as const,
      render: (row: CustomerProfile) => (
        <span className="font-mono text-blue-800">{row.targetQuota.toLocaleString()}</span>
      )
    },
    {
      key: 'targetAchieved',
      header: 'نسبة الإنجاز',
      width: '95px',
      align: 'center' as const,
      render: (row: CustomerProfile) => {
        const pct = Math.round((row.targetAchieved / row.targetQuota) * 100);
        return (
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            pct >= 90 ? 'bg-emerald-100 text-emerald-800' : pct >= 70 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
          }`}>
            {pct}%
          </span>
        );
      }
    },
    {
      key: 'status',
      header: 'الحالة',
      width: '85px',
      align: 'center' as const,
      render: (row: CustomerProfile) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
          row.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
          row.status === 'Warning' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
        }`}>
          {row.status === 'Active' ? 'نشط' : row.status === 'Warning' ? 'تجاوز حد' : 'موقف'}
        </span>
      )
    }
  ];

  const totalBalances = customers.reduce((s, c) => s + c.currentBalance, 0);
  const totalCreditLimits = customers.reduce((s, c) => s + c.creditLimit, 0);

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] text-white select-none">
      {/* View Header */}
      <div className="p-3 bg-[#252526] border-b border-[#333333] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-fuchsia-500/20 border border-fuchsia-500/40 flex items-center justify-center text-fuchsia-400">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>إدارة علاقات العملاء والذمم (CRM & Customers)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 font-mono">
                Customer Master Dossier
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">بطاقات العملاء، أسعار وحسومات العملاء، المناطق الجغرافية، الأهداف البيعية، ومطابقة الاستحقاقات</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-[#181818] p-1 rounded-lg border border-[#383838]">
          {[
            { id: 'customers', label: 'دليل بطاقات العملاء' },
            { id: 'pricing', label: 'مصفوفة أسعار وحسومات العميل' },
            { id: 'targets', label: 'أهداف ومستهدفات العملاء' },
            { id: 'settlement', label: 'ترصيد ومطابقة الحسابات' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 text-xs rounded transition-all ${
                activeTab === tab.id
                  ? 'bg-fuchsia-700 text-white font-semibold shadow'
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
        {/* Authentic Excel Schedule: 2-Color Alternating: White + Fuchsia/Pink (#FDF2F8) */}
        <div className="flex-1 min-h-[380px]">
          <ExcelSchedule<CustomerProfile>
            title="سجل بطاقات العملاء (Excel Customer Registry)"
            sheetName="Customers_Register"
            themeColor="fuchsia"
            columns={columns}
            data={customers}
            keyExtractor={row => row.id}
            onRowClick={row => {
              showToast(`تم فتح بطاقة العميل: ${row.nameAr} (${row.code})`);
            }}
            summaryRow={
              <tr>
                <td colSpan={5} className="px-3 py-2 text-right font-bold text-gray-800">
                  إجمالي أرصدة وسقوف الائتمان المفتوحة:
                </td>
                <td className="px-3 py-2 text-left font-mono font-bold text-gray-700">
                  {totalCreditLimits.toLocaleString()} {currentCompany.currency}
                </td>
                <td className="px-3 py-2 text-left font-mono font-bold text-fuchsia-950">
                  {totalBalances.toLocaleString()} {currentCompany.currency}
                </td>
                <td colSpan={3}></td>
              </tr>
            }
          />
        </div>
      </div>
    </div>
  );
};
