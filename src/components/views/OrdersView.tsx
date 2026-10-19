import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExcelSchedule } from '../common/ExcelSchedule';
import { 
  ClipboardList, Plus, Search, FileText, CheckCircle2, 
  Clock, Truck, DollarSign, ArrowRight 
} from 'lucide-react';

interface OrderItem {
  id: string;
  orderNo: string;
  type: 'purchase' | 'sales';
  date: string;
  dueDate: string;
  partyName: string;
  itemsCount: number;
  totalAmount: number;
  downPayment: number;
  remainingAmount: number;
  status: 'Pending' | 'Approved' | 'In Production' | 'Delivered' | 'Invoiced';
  notes: string;
}

export const OrdersView: React.FC = () => {
  const { currentCompany, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'salesOrders' | 'purchaseOrders' | 'pipeline' | 'downPayments'>('salesOrders');
  const [orders, setOrders] = useState<OrderItem[]>([
    { id: '1', orderNo: 'SO-2026-0041', type: 'sales', date: '2026-10-18', dueDate: '2026-10-25', partyName: 'مؤسسة الآفاق الرقمية', itemsCount: 15, totalAmount: 48500, downPayment: 15000, remainingAmount: 33500, status: 'Approved', notes: 'تسليم مستودع الرياض الرئيسي' },
    { id: '2', orderNo: 'SO-2026-0042', type: 'sales', date: '2026-10-19', dueDate: '2026-10-28', partyName: 'شركة النور الحديثة للتجارة', itemsCount: 40, totalAmount: 112000, downPayment: 40000, remainingAmount: 72000, status: 'In Production', notes: 'شحن بحري سريع' },
    { id: '3', orderNo: 'PO-2026-0089', type: 'purchase', date: '2026-10-15', dueDate: '2026-10-22', partyName: 'مورد التقنيات العالمي', itemsCount: 100, totalAmount: 185000, downPayment: 50000, remainingAmount: 135000, status: 'Pending', notes: 'بضاعة مستوردة عبر ميناء جدة' },
    { id: '4', orderNo: 'SO-2026-0043', type: 'sales', date: '2026-10-17', dueDate: '2026-10-21', partyName: 'مجموعة الفجر الهندسية', itemsCount: 8, totalAmount: 24300, downPayment: 24300, remainingAmount: 0, status: 'Delivered', notes: 'مدفوع بالكامل نقداً' },
    { id: '5', orderNo: 'PO-2026-0090', type: 'purchase', date: '2026-10-19', dueDate: '2026-11-05', partyName: 'مصنع الشرق للقطع الإلكترونية', itemsCount: 250, totalAmount: 94000, downPayment: 20000, remainingAmount: 74000, status: 'Approved', notes: 'دفعة توريد شهر نوفمبر' },
  ]);

  const displayedOrders = orders.filter(o => 
    activeTab === 'purchaseOrders' ? o.type === 'purchase' : 
    activeTab === 'salesOrders' ? o.type === 'sales' : true
  );

  const columns = [
    {
      key: 'orderNo',
      header: 'رقم الطلبية',
      width: '120px',
      render: (row: OrderItem) => (
        <span className="font-mono font-bold text-orange-800">{row.orderNo}</span>
      )
    },
    {
      key: 'type',
      header: 'نوع الطلب',
      width: '90px',
      render: (row: OrderItem) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
          row.type === 'sales' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {row.type === 'sales' ? 'طلبية بيع' : 'طلبية شراء'}
        </span>
      )
    },
    {
      key: 'partyName',
      header: 'العميل / المورد',
      render: (row: OrderItem) => (
        <span className="font-semibold text-gray-900">{row.partyName}</span>
      )
    },
    {
      key: 'date',
      header: 'تاريخ الطلب',
      width: '95px',
      align: 'center' as const
    },
    {
      key: 'dueDate',
      header: 'تاريخ الاستحقاق',
      width: '95px',
      align: 'center' as const
    },
    {
      key: 'totalAmount',
      header: `القيمة (${currentCompany.currency})`,
      width: '110px',
      align: 'left' as const,
      render: (row: OrderItem) => (
        <span className="font-mono font-bold text-gray-900">{row.totalAmount.toLocaleString()}</span>
      )
    },
    {
      key: 'downPayment',
      header: 'الدفعة المقدمة',
      width: '100px',
      align: 'left' as const,
      render: (row: OrderItem) => (
        <span className="font-mono text-emerald-700">{row.downPayment.toLocaleString()}</span>
      )
    },
    {
      key: 'remainingAmount',
      header: 'المتبقي',
      width: '100px',
      align: 'left' as const,
      render: (row: OrderItem) => (
        <span className="font-mono text-amber-800 font-bold">{row.remainingAmount.toLocaleString()}</span>
      )
    },
    {
      key: 'status',
      header: 'الحالة',
      width: '100px',
      align: 'center' as const,
      render: (row: OrderItem) => {
        const styles: Record<string, string> = {
          Pending: 'bg-amber-100 text-amber-800',
          Approved: 'bg-blue-100 text-blue-800',
          'In Production': 'bg-purple-100 text-purple-800',
          Delivered: 'bg-emerald-100 text-emerald-800',
          Invoiced: 'bg-teal-100 text-teal-800'
        };
        return (
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${styles[row.status] || 'bg-gray-100'}`}>
            {row.status}
          </span>
        );
      }
    },
    {
      key: 'actions',
      header: 'العمليات',
      width: '110px',
      align: 'center' as const,
      sortable: false,
      render: (row: OrderItem) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            showToast(`توليد فاتورة رسمية من الطلبية رقم ${row.orderNo}`);
          }}
          className="px-2 py-0.5 bg-orange-600 hover:bg-orange-500 text-white rounded text-[10px] font-bold shadow-xs flex items-center gap-1 mx-auto"
        >
          <span>ترحيل لفاتورة</span>
          <ArrowRight className="w-2.5 h-2.5" />
        </button>
      )
    }
  ];

  const totalOrdersAmount = displayedOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalDownPayments = displayedOrders.reduce((sum, o) => sum + o.downPayment, 0);

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] text-white select-none">
      {/* Header View Bar */}
      <div className="p-3 bg-[#252526] border-b border-[#333333] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
            <ClipboardList className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>إدارة الطلبيات والمبيعات الآجلة</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300 font-mono">
                Order Fulfillment Pipeline
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">طلبيات الشراء والتوريد، طلبيات البيع، الدفعات المقدمة، وتوليد فواتير التسليم والاستلام</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-[#181818] p-1 rounded-lg border border-[#383838]">
          {[
            { id: 'salesOrders', label: 'طلبيات البيع' },
            { id: 'purchaseOrders', label: 'طلبيات الشراء' },
            { id: 'downPayments', label: 'دفعات الطلبيات' },
            { id: 'pipeline', label: 'متابعة مراحل التنفيذ' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 text-xs rounded transition-all ${
                activeTab === tab.id
                  ? 'bg-orange-600 text-white font-semibold shadow'
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
        {/* Authentic Excel Schedule: 2-Color Alternating: White + Orange-Peach (#FFEDD5) */}
        <div className="flex-1 min-h-[380px]">
          <ExcelSchedule<OrderItem>
            title="مجدول طلبيات المؤسسة (Excel Order Book)"
            sheetName="Orders_Book"
            themeColor="orange"
            columns={columns}
            data={displayedOrders}
            keyExtractor={row => row.id}
            onRowClick={row => {
              showToast(`تم فتح تفاصيل الطلبية: ${row.orderNo}`);
            }}
            summaryRow={
              <tr>
                <td colSpan={6} className="px-3 py-2 text-right font-bold text-gray-800">
                  المجموع الكلي للطلبيات المحددة:
                </td>
                <td className="px-3 py-2 text-left font-mono font-bold text-gray-900">
                  {totalOrdersAmount.toLocaleString()} {currentCompany.currency}
                </td>
                <td className="px-3 py-2 text-left font-mono font-bold text-emerald-800">
                  {totalDownPayments.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-left font-mono font-bold text-amber-900">
                  {(totalOrdersAmount - totalDownPayments).toLocaleString()}
                </td>
                <td colSpan={2}></td>
              </tr>
            }
          />
        </div>
      </div>
    </div>
  );
};
