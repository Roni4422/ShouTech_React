import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExcelSchedule } from '../common/ExcelSchedule';
import { 
  Factory, Plus, Search, Cpu, CheckCircle2, 
  Layers, AlertTriangle, Calculator, FileSpreadsheet, Play 
} from 'lucide-react';

interface BOMTemplate {
  id: string;
  bomCode: string;
  productName: string;
  category: string;
  batchQty: number;
  unit: string;
  rawMaterialsCost: number;
  directLaborCost: number;
  overheadCost: number;
  totalCostPerBatch: number;
  unitCost: number;
  standardRetailPrice: number;
  grossMarginPct: number;
  status: 'Active' | 'Under Review';
}

export const ManufacturingView: React.FC = () => {
  const { currentCompany, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'bom' | 'workOrders' | 'variance' | 'capacity'>('bom');

  const [boms, setBoms] = useState<BOMTemplate[]>([
    { id: '1', bomCode: 'BOM-SRV-01', productName: 'خادم شبكي شو تيك برو 2026', category: 'أجهزة وأنظمة', batchQty: 10, unit: 'وحدة', rawMaterialsCost: 35000, directLaborCost: 4500, overheadCost: 2500, totalCostPerBatch: 42000, unitCost: 4200, standardRetailPrice: 6500, grossMarginPct: 35.4, status: 'Active' },
    { id: '2', bomCode: 'BOM-POS-02', productName: 'محطة نقطة بيع لمسية ذكية Dual-Screen', category: 'أجهزة كاشير', batchQty: 25, unit: 'وحدة', rawMaterialsCost: 28000, directLaborCost: 3200, overheadCost: 1800, totalCostPerBatch: 33000, unitCost: 1320, standardRetailPrice: 2200, grossMarginPct: 40.0, status: 'Active' },
    { id: '3', bomCode: 'BOM-UPS-03', productName: 'وحدة طاقة احتياطية 3000VA معزولة', category: 'طاقة وحماية', batchQty: 50, unit: 'وحدة', rawMaterialsCost: 18500, directLaborCost: 2100, overheadCost: 1400, totalCostPerBatch: 22000, unitCost: 440, standardRetailPrice: 750, grossMarginPct: 41.3, status: 'Active' },
    { id: '4', bomCode: 'BOM-ACC-04', productName: 'مستشعر باركود ليزري صناعي عالي السرعة', category: 'ملحقات', batchQty: 100, unit: 'وحدة', rawMaterialsCost: 12000, directLaborCost: 1500, overheadCost: 900, totalCostPerBatch: 14400, unitCost: 144, standardRetailPrice: 280, grossMarginPct: 48.6, status: 'Active' },
  ]);

  const columns = [
    {
      key: 'bomCode',
      header: 'رمز نموذج التصنيع',
      width: '120px',
      render: (row: BOMTemplate) => (
        <span className="font-mono font-bold text-gray-900">{row.bomCode}</span>
      )
    },
    {
      key: 'productName',
      header: 'المنتج النهائي المصنع',
      render: (row: BOMTemplate) => (
        <div>
          <span className="font-semibold text-gray-900 block">{row.productName}</span>
          <span className="text-[10px] text-gray-500 font-mono">دفعة التشغيل: {row.batchQty} {row.unit}</span>
        </div>
      )
    },
    {
      key: 'rawMaterialsCost',
      header: `المواد الأولية (${currentCompany.currency})`,
      width: '115px',
      align: 'left' as const,
      render: (row: BOMTemplate) => (
        <span className="font-mono text-gray-700">{row.rawMaterialsCost.toLocaleString()}</span>
      )
    },
    {
      key: 'directLaborCost',
      header: 'الأجور المباشرة',
      width: '95px',
      align: 'left' as const,
      render: (row: BOMTemplate) => (
        <span className="font-mono text-blue-800">{row.directLaborCost.toLocaleString()}</span>
      )
    },
    {
      key: 'overheadCost',
      header: 'التكاليف الإضافية',
      width: '95px',
      align: 'left' as const,
      render: (row: BOMTemplate) => (
        <span className="font-mono text-amber-800">{row.overheadCost.toLocaleString()}</span>
      )
    },
    {
      key: 'totalCostPerBatch',
      header: 'إجمالي تكلفة الوجبة',
      width: '115px',
      align: 'left' as const,
      render: (row: BOMTemplate) => (
        <span className="font-mono font-bold text-gray-900">{row.totalCostPerBatch.toLocaleString()}</span>
      )
    },
    {
      key: 'unitCost',
      header: 'تكلفة الوحدة',
      width: '95px',
      align: 'left' as const,
      render: (row: BOMTemplate) => (
        <span className="font-mono font-bold text-emerald-800">{row.unitCost.toLocaleString()}</span>
      )
    },
    {
      key: 'standardRetailPrice',
      header: 'سعر البيع المعتمد',
      width: '105px',
      align: 'left' as const,
      render: (row: BOMTemplate) => (
        <span className="font-mono font-bold text-blue-900">{row.standardRetailPrice.toLocaleString()}</span>
      )
    },
    {
      key: 'grossMarginPct',
      header: 'هامش الربح %',
      width: '90px',
      align: 'center' as const,
      render: (row: BOMTemplate) => (
        <span className="font-mono font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded text-[10px]">
          {row.grossMarginPct}%
        </span>
      )
    },
    {
      key: 'actions',
      header: 'أمر تشغيل',
      width: '105px',
      align: 'center' as const,
      sortable: false,
      render: (row: BOMTemplate) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            showToast(`إصدار أمر تشغيل تصنيع فوري للنموذج: ${row.bomCode}`);
          }}
          className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-[10px] font-bold shadow-xs flex items-center gap-1 mx-auto"
        >
          <Play className="w-2.5 h-2.5 text-emerald-400" />
          <span>بدء تشغيل</span>
        </button>
      )
    }
  ];

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] text-white select-none">
      {/* View Header */}
      <div className="p-3 bg-[#252526] border-b border-[#333333] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-zinc-600/30 border border-zinc-500/40 flex items-center justify-center text-zinc-300">
            <Factory className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>نظام التصنيع وتكاليف الإنتاج (MRP & Manufacturing)</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-700/40 text-zinc-300 font-mono">
                Bill of Materials & Production Run
              </span>
            </h1>
            <p className="text-[11px] text-gray-400">نماذج التصنيع BOM، أوامر التشغيل، تحليل انحرافات التكاليف (المواد الأولية، الأجور، التكاليف غير المباشرة)</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-[#181818] p-1 rounded-lg border border-[#383838]">
          {[
            { id: 'bom', label: 'نماذج التصنيع (BOM)' },
            { id: 'workOrders', label: 'أوامر الشغل والتشغيل' },
            { id: 'variance', label: 'انحراف تكاليف المواد' },
            { id: 'capacity', label: 'دراسة الطاقة الإنتاجية' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 text-xs rounded transition-all ${
                activeTab === tab.id
                  ? 'bg-zinc-700 text-white font-semibold shadow'
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
        {/* Authentic Excel Schedule: 2-Color Alternating: White + Bronze Zinc (#E4E4E7) */}
        <div className="flex-1 min-h-[380px]">
          <ExcelSchedule<BOMTemplate>
            title="جدول نماذج التصنيع والتكاليف المعيارية (Excel BOM Master)"
            sheetName="BOM_Production"
            themeColor="bronze"
            columns={columns}
            data={boms}
            keyExtractor={row => row.id}
            onRowClick={row => {
              showToast(`تم فتح تفاصيل بطاقة التصنيع: ${row.productName}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};
