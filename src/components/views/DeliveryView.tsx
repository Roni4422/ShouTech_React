import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExcelSchedule } from '../common/ExcelSchedule';
import { 
  Truck, Plus, Search, Navigation, DollarSign, 
  CheckCircle2, Clock, MapPin, User, Package 
} from 'lucide-react';

interface DeliveryOrder {
  id: string;
  dispatchNo: string;
  driverName: string;
  vehicleNo: string;
  customerName: string;
  destinationZone: string;
  packagesCount: number;
  codAmount: number; // Cash On Delivery
  collectedAmount: number;
  deliveryFee: number;
  status: 'In Transit' | 'Delivered' | 'Returned' | 'Settled';
  dispatchedAt: string;
}

export const DeliveryView: React.FC = () => {
  const { currentCompany, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'dispatches' | 'drivers' | 'rates' | 'settlement'>('dispatches');

  const [orders, setOrders] = useState<DeliveryOrder[]>([
    { id: '1', dispatchNo: 'DSP-2026-081', driverName: 'محمد عثمان النجار', vehicleNo: 'أ ب ج 4921', customerName: 'مؤسسة الآفاق الرقمية', destinationZone: 'الرياض - حي الملز', packagesCount: 4, codAmount: 1850, collectedAmount: 1850, deliveryFee: 45, status: 'Delivered', dispatchedAt: '2026-10-19 08:30' },
    { id: '2', dispatchNo: 'DSP-2026-082', driverName: 'سعيد عبد الله القرني', vehicleNo: 'د هـ و 8812', customerName: 'شركة الأفق الحديث', destinationZone: 'الرياض - حي النخيل', packagesCount: 12, codAmount: 6400, collectedAmount: 6400, deliveryFee: 75, status: 'Delivered', dispatchedAt: '2026-10-19 09:15' },
    { id: '3', dispatchNo: 'DSP-2026-083', driverName: 'محمد عثمان النجار', vehicleNo: 'أ ب ج 4921', customerName: 'مؤسسة النور لمواد البناء', destinationZone: 'الخرج - المنطقة الصناعية', packagesCount: 20, codAmount: 12500, collectedAmount: 0, deliveryFee: 150, status: 'In Transit', dispatchedAt: '2026-10-19 11:00' },
    { id: '4', dispatchNo: 'DSP-2026-084', driverName: 'فهد إبراهيم السالم', vehicleNo: 'س ص ع 3301', customerName: 'مجموعة الفجر الهندسية', destinationZone: 'الرياض - الدرعية', packagesCount: 6, codAmount: 3200, collectedAmount: 3200, deliveryFee: 60, status: 'Settled', dispatchedAt: '2026-10-18 14:00' },
  ]);

  const columns = [
    {
      key: 'dispatchNo',
      header: 'رقم إرسالية التوصيل',
      width: '130px',
      render: (row: DeliveryOrder) => (
        <span className="font-mono font-bold text-teal-900">{row.dispatchNo}</span>
      )
    },
    {
      key: 'driverName',
      header: 'السائق والمركبة',
      render: (row: DeliveryOrder) => (
        <div>
          <span className="font-semibold text-gray-900 block">{row.driverName}</span>
          <span className="text-[10px] text-gray-500 font-mono">لوحة: {row.vehicleNo}</span>
        </div>
      )
    },
    {
      key: 'customerName',
      header: 'العميل المستلم',
      render: (row: DeliveryOrder) => (
        <span className="text-gray-800 font-medium">{row.customerName}</span>
      )
    },
    {
      key: 'destinationZone',
      header: 'منطقة التسليم',
      width: '135px',
      render: (row: DeliveryOrder) => (
        <span className="text-gray-700 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-teal-600" />
          <span>{row.destinationZone}</span>
        </span>
      )
    },
    {
      key: 'packagesCount',
      header: 'الطرود',
      width: '65px',
      align: 'center' as const,
      render: (row: DeliveryOrder) => (
        <span className="font-mono font-bold text-gray-700">{row.packagesCount}</span>
      )
    },
    {
      key: 'codAmount',
      header: `التحصيل (COD)`,
      width: '105px',
      align: 'left' as const,
      render: (row: DeliveryOrder) => (
        <span className="font-mono font-bold text-gray-900">{row.codAmount.toLocaleString()}</span>
      )
    },
    {
      key: 'deliveryFee',
      header: 'أجور التوصيل',
      width: '85px',
      align: 'left' as const,
      render: (row: DeliveryOrder) => (
        <span className="font-mono text-emerald-800">{row.deliveryFee.toLocaleString()}</span>
      )
    },
    {
      key: 'dispatchedAt',
      header: 'وقت الانطلاق',
      width: '120px',
      align: 'center' as const
    },
    {
      key: 'status',
      header: 'الحالة',
      width: '95px',
      align: 'center' as const,
      render: (row: DeliveryOrder) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
          row.status === 'Settled' ? 'bg-teal-100 text-teal-800' :
          row.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
        }`}>
          {row.status === 'In Transit' ? 'في الطريق' : row.status === 'Delivered' ? 'تم التسليم' : 'تم الإغلاق'}
        </span>
      )
    }
  ];

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] text-white select-none">
      {/* View Header */}
      <div className="p-3 bg-[#252526] border-b border-[#333333] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>إدارة التوصيل والأسطول واللوجستيات (Delivery & Fleet)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 font-mono">
                Fleet Dispatch & Driver Cash Settlement
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">إرساليات التوصيل، بطاقات السائقين، تسليم الشحنات والتحصيل COD، وإغلاق صناديق السائقين</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-[#181818] p-1 rounded-lg border border-[#383838]">
          {[
            { id: 'dispatches', label: 'إرساليات التوصيل' },
            { id: 'drivers', label: 'بطاقات السائقين' },
            { id: 'rates', label: 'أسعار التوصيل والمناطق' },
            { id: 'settlement', label: 'إغلاق صندوق السائق' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 text-xs rounded transition-all ${
                activeTab === tab.id
                  ? 'bg-teal-700 text-white font-semibold shadow'
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
        {/* Authentic Excel Schedule: 2-Color Alternating: White + Aqua Teal (#CCFBF1) */}
        <div className="flex-1 min-h-[380px]">
          <ExcelSchedule<DeliveryOrder>
            title="سجل إرساليات التوصيل والتحصيل (Excel Delivery Dispatch)"
            sheetName="Dispatch_Log"
            themeColor="teal"
            columns={columns}
            data={orders}
            keyExtractor={row => row.id}
            onRowClick={row => {
              showToast(`تم فتح تفاصيل الإرسالية: ${row.dispatchNo}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};
