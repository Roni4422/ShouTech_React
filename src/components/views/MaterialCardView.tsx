import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Material, CostMethod } from '../../types';
import { 
  Package, Plus, Save, Trash2, Search, Barcode, DollarSign, 
  Layers, CheckCircle, Printer 
} from 'lucide-react';

export const MaterialCardView: React.FC = () => {
  const { materials, warehouses, addMaterial, updateMaterial, deleteMaterial, translate, showToast } = useApp();
  const [selectedId, setSelectedId] = useState<number>(materials[0]?.id || 101);
  const [searchQuery, setSearchQuery] = useState('');

  const currentMat = materials.find(m => m.id === selectedId) || materials[0];

  const [formData, setFormData] = useState<Partial<Material>>(currentMat ? { ...currentMat } : {});

  const handleSelect = (mat: Material) => {
    setSelectedId(mat.id);
    setFormData({ ...mat });
  };

  const handleNew = () => {
    const nextCode = `MAT-${(materials.length + 1).toString().padStart(3, '0')}`;
    const nextBarcode = `628100${(materials.length + 1).toString().padStart(7, '0')}`;
    const newTemplate: Partial<Material> = {
      code: nextCode,
      barcode: nextBarcode,
      nameAr: '',
      nameEn: '',
      category: 'General',
      group: 'Standard',
      defaultWarehouseId: warehouses[0]?.id || 1,
      defaultUnit: 'Piece',
      unit2: 'Box',
      unit2Factor: 12,
      priceRetail: 0,
      priceWholesale: 0,
      priceSpecial: 0,
      priceMin: 0,
      cost: 0,
      standardCost: 0,
      lastPurchaseCost: 0,
      costMethod: 'weighted_avg',
      qtyOnHand: 0,
      minQty: 5,
      maxQty: 100,
      reorderQty: 10,
      taxRate: 15,
      taxable: true,
      active: true,
    };
    setSelectedId(-1);
    setFormData(newTemplate);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.nameAr) {
      showToast('Material Code and Arabic Name are required.');
      return;
    }

    if (selectedId === -1) {
      addMaterial(formData as Omit<Material, 'id'>);
      const newlyAdded = materials[0];
      if (newlyAdded) setSelectedId(newlyAdded.id);
    } else {
      updateMaterial(selectedId, formData);
    }
  };

  const handleDelete = () => {
    if (selectedId !== -1 && window.confirm('Delete / Deactivate this material card?')) {
      deleteMaterial(selectedId);
      if (materials.length > 1) {
        const next = materials.find(m => m.id !== selectedId);
        if (next) handleSelect(next);
      }
    }
  };

  const filteredMaterials = materials.filter(m => 
    m.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.barcode.includes(searchQuery)
  );

  return (
    <div className="h-full flex flex-col md:flex-row bg-[#1E1E1E] text-white overflow-hidden">
      {/* Left Sidebar: Material List & Search */}
      <div className="w-full md:w-80 border-e border-[#383838] flex flex-col bg-[#242424] shrink-0">
        <div className="p-3 border-b border-[#383838] space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <Package className="w-4 h-4 text-[#0078D4]" />
              <span>{translate('mat.cardTitle')}</span>
            </h2>
            <button
              onClick={handleNew}
              className="px-2 py-1 bg-[#0078D4] hover:bg-[#1084D9] text-white rounded text-xs flex items-center gap-1 shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{translate('common.new')}</span>
            </button>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute inset-y-0 my-auto start-2.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search code, name, barcode..."
              className="w-full ps-8 pe-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#0078D4]"
            />
          </div>
        </div>

        {/* Material Items List */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#303030]">
          {filteredMaterials.map(m => {
            const isSelected = selectedId === m.id;
            return (
              <div
                key={m.id}
                onClick={() => handleSelect(m)}
                className={`p-3 cursor-pointer transition-colors ${
                  isSelected ? 'bg-[#0078D4]/20 border-s-4 border-[#0078D4]' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white truncate max-w-[170px]">{m.nameAr}</span>
                  <span className="font-mono text-cyan-400 font-bold">{m.priceRetail} SAR</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1 font-mono">
                  <span>{m.code}</span>
                  <span>Stock: {m.qtyOnHand} {m.defaultUnit}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right / Main Card Form */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#1E1E1E]">
        <form onSubmit={handleSave} className="max-w-4xl mx-auto space-y-6">
          {/* Top Form Action Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-[#383838]">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white">
                {selectedId === -1 ? translate('common.new') : formData.nameAr || formData.code}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-300 font-mono">
                {formData.code}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => showToast(`Printing barcode label for ${formData.barcode}...`)}
                className="px-3 py-1.5 bg-[#2A2A2A] hover:bg-[#353535] border border-white/20 rounded text-xs text-gray-200 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Barcode</span>
              </button>
              {selectedId !== -1 && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-300 rounded text-xs flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{translate('common.delete')}</span>
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#0078D4] hover:bg-[#1084D9] text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{translate('common.save')}</span>
              </button>
            </div>
          </div>

          {/* Section 1: Identification & Barcodes */}
          <div className="bg-[#242424] p-4 rounded-lg border border-[#383838] space-y-4">
            <h3 className="text-xs font-bold text-[#60A5FA] uppercase tracking-wider flex items-center gap-1.5">
              <Barcode className="w-4 h-4" />
              <span>Identification & Barcodes</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('mat.itemCode')} *</label>
                <input
                  type="text"
                  value={formData.code || ''}
                  onChange={e => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white font-mono focus:border-[#0078D4]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('mat.barcode')}</label>
                <input
                  type="text"
                  value={formData.barcode || ''}
                  onChange={e => setFormData({ ...formData, barcode: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-cyan-300 font-mono focus:border-[#0078D4]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('mat.barcode2')}</label>
                <input
                  type="text"
                  value={formData.barcode2 || ''}
                  onChange={e => setFormData({ ...formData, barcode2: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-gray-300 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('mat.nameAr')} *</label>
                <input
                  type="text"
                  value={formData.nameAr || ''}
                  onChange={e => setFormData({ ...formData, nameAr: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white focus:border-[#0078D4]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('mat.nameEn')}</label>
                <input
                  type="text"
                  value={formData.nameEn || ''}
                  onChange={e => setFormData({ ...formData, nameEn: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white focus:border-[#0078D4]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('mat.category')}</label>
                <input
                  type="text"
                  value={formData.category || ''}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('mat.group')}</label>
                <input
                  type="text"
                  value={formData.group || ''}
                  onChange={e => setFormData({ ...formData, group: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('mat.warehouse')}</label>
                <select
                  value={formData.defaultWarehouseId || 1}
                  onChange={e => setFormData({ ...formData, defaultWarehouseId: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                >
                  {warehouses.map(w => (
                    <option key={w.id} value={w.id}>{w.nameAr} ({w.code})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Pricing Matrix & Units */}
          <div className="bg-[#242424] p-4 rounded-lg border border-[#383838] space-y-4">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" />
              <span>Pricing Tiers & Units</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('mat.priceRetail')}</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.priceRetail || 0}
                  onChange={e => setFormData({ ...formData, priceRetail: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('mat.priceWholesale')}</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.priceWholesale || 0}
                  onChange={e => setFormData({ ...formData, priceWholesale: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('mat.priceSpecial')}</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.priceSpecial || 0}
                  onChange={e => setFormData({ ...formData, priceSpecial: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('mat.priceMin')}</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.priceMin || 0}
                  onChange={e => setFormData({ ...formData, priceMin: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-white/10">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('mat.unit1')}</label>
                <input
                  type="text"
                  value={formData.defaultUnit || 'Piece'}
                  onChange={e => setFormData({ ...formData, defaultUnit: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('mat.unit2')}</label>
                <input
                  type="text"
                  value={formData.unit2 || ''}
                  onChange={e => setFormData({ ...formData, unit2: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('mat.unit2Factor')}</label>
                <input
                  type="number"
                  value={formData.unit2Factor || 1}
                  onChange={e => setFormData({ ...formData, unit2Factor: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Costing & Stock Levels */}
          <div className="bg-[#242424] p-4 rounded-lg border border-[#383838] space-y-4">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>Costing & Stock Controls</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('mat.cost')}</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.cost || 0}
                  onChange={e => setFormData({ ...formData, cost: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('mat.costMethod')}</label>
                <select
                  value={formData.costMethod || 'weighted_avg'}
                  onChange={e => setFormData({ ...formData, costMethod: e.target.value as CostMethod })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                >
                  <option value="weighted_avg">{translate('mat.weightedAvg')}</option>
                  <option value="fifo">{translate('mat.fifo')}</option>
                  <option value="lifo">{translate('mat.lifo')}</option>
                  <option value="standard">{translate('mat.standardCost')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('mat.qtyOnHand')}</label>
                <input
                  type="number"
                  value={formData.qtyOnHand || 0}
                  onChange={e => setFormData({ ...formData, qtyOnHand: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs font-mono font-bold text-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('mat.reorderQty')}</label>
                <input
                  type="number"
                  value={formData.reorderQty || 0}
                  onChange={e => setFormData({ ...formData, reorderQty: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white font-mono"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
