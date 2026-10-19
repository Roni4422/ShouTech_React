import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Warehouse } from '../../types';
import { 
  Warehouse as WhIcon, Plus, Save, ArrowLeftRight, CheckCircle2, 
  MapPin, Layers, Building 
} from 'lucide-react';

export const WarehouseView: React.FC = () => {
  const { 
    warehouses, materials, addWarehouse, updateWarehouse, transferStock, 
    translate, showToast 
  } = useApp();

  const [selectedId, setSelectedId] = useState<number>(warehouses[0]?.id || 1);
  const currentWh = warehouses.find(w => w.id === selectedId) || warehouses[0];
  const [formData, setFormData] = useState<Partial<Warehouse>>(currentWh ? { ...currentWh } : {});

  // Transfer modal state
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [sourceWhId, setSourceWhId] = useState<number>(warehouses[0]?.id || 1);
  const [targetWhId, setTargetWhId] = useState<number>(warehouses[1]?.id || 2);
  const [selectedMatCode, setSelectedMatCode] = useState<string>(materials[0]?.code || '');
  const [transferQty, setTransferQty] = useState<number>(1);
  const [transferReason, setTransferReason] = useState<string>('Refill showroom store');

  const handleSelect = (w: Warehouse) => {
    setSelectedId(w.id);
    setFormData({ ...w });
  };

  const handleNew = () => {
    const nextCode = `WH0${warehouses.length + 1}`;
    setSelectedId(-1);
    setFormData({
      code: nextCode,
      cardNo: warehouses.length + 1,
      nameAr: '',
      nameEn: '',
      parentId: warehouses[0]?.id || null,
      address: '',
      city: 'Riyadh',
      aisle: 'A',
      rack: '01',
      shelf: '01',
      isDefault: false,
      isActive: true,
      notes: ''
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nameAr) {
      showToast('Warehouse name is required');
      return;
    }

    if (selectedId === -1) {
      addWarehouse(formData as Omit<Warehouse, 'id'>);
    } else {
      updateWarehouse(selectedId, formData);
    }
  };

  const handleExecuteTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (sourceWhId === targetWhId) {
      showToast(translate('whs.transferDifferentWarehouses') || 'Choose two different warehouses');
      return;
    }

    const success = transferStock(sourceWhId, targetWhId, selectedMatCode, transferQty, transferReason);
    if (success) {
      setShowTransferModal(false);
      setTransferQty(1);
    } else {
      showToast('Insufficient stock in source warehouse');
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-[#1E1E1E] text-white overflow-hidden">
      {/* Left Sidebar: Warehouse List */}
      <div className="w-full md:w-80 border-e border-[#383838] flex flex-col bg-[#242424] shrink-0">
        <div className="p-3 border-b border-[#383838] flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
            <WhIcon className="w-4 h-4 text-[#0078D4]" />
            <span>{translate('whs.title')}</span>
          </h2>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowTransferModal(true)}
              className="px-2 py-1 bg-[#2D2D2D] hover:bg-[#3D3D3D] border border-white/20 text-white rounded text-xs flex items-center gap-1"
              title="Stock Transfer"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-purple-400" />
              <span>Transfer</span>
            </button>
            <button
              onClick={handleNew}
              className="px-2 py-1 bg-[#0078D4] hover:bg-[#1084D9] text-white rounded text-xs flex items-center gap-1 shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{translate('common.new')}</span>
            </button>
          </div>
        </div>

        {/* Warehouses list */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#303030]">
          {warehouses.map(w => {
            const isSelected = selectedId === w.id;
            return (
              <div
                key={w.id}
                onClick={() => handleSelect(w)}
                className={`p-3 cursor-pointer transition-colors ${
                  isSelected ? 'bg-[#0078D4]/20 border-s-4 border-[#0078D4]' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{w.nameAr}</span>
                  {w.isDefault && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                      Default
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-gray-400 mt-1">{w.nameEn}</div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-1 font-mono">
                  <span>Code: {w.code}</span>
                  <span>·</span>
                  <span>Card No: #{w.cardNo}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right / Main Warehouse Card */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#1E1E1E]">
        <form onSubmit={handleSave} className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#383838]">
            <div>
              <h1 className="text-base font-bold text-white">
                {selectedId === -1 ? translate('common.new') : formData.nameAr}
              </h1>
              <p className="text-xs text-gray-400">{formData.nameEn || 'Warehouse Card'}</p>
            </div>

            <button
              type="submit"
              className="px-4 py-1.5 bg-[#0078D4] hover:bg-[#1084D9] text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{translate('common.save')}</span>
            </button>
          </div>

          <div className="bg-[#242424] p-5 rounded-lg border border-[#383838] space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('whs.nameAr')} *</label>
                <input
                  type="text"
                  value={formData.nameAr || ''}
                  onChange={e => setFormData({ ...formData, nameAr: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white focus:border-[#0078D4]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('whs.nameEn')}</label>
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
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('whs.code')}</label>
                <input
                  type="text"
                  value={formData.code || ''}
                  onChange={e => setFormData({ ...formData, code: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('whs.city')}</label>
                <input
                  type="text"
                  value={formData.city || ''}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('whs.parent')}</label>
                <select
                  value={formData.parentId || ''}
                  onChange={e => setFormData({ ...formData, parentId: e.target.value ? Number(e.target.value) : null })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                >
                  <option value="">(No Parent - Root)</option>
                  {warehouses.filter(w => w.id !== selectedId).map(w => (
                    <option key={w.id} value={w.id}>{w.nameAr}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('whs.aisle')}</label>
                <input
                  type="text"
                  value={formData.aisle || ''}
                  onChange={e => setFormData({ ...formData, aisle: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('whs.rack')}</label>
                <input
                  type="text"
                  value={formData.rack || ''}
                  onChange={e => setFormData({ ...formData, rack: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('whs.shelf')}</label>
                <input
                  type="text"
                  value={formData.shelf || ''}
                  onChange={e => setFormData({ ...formData, shelf: e.target.value })}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('whs.address')}</label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Stock Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
          <div className="w-[520px] bg-[#2D2D2D] border border-[#3F3F46] rounded-xl shadow-2xl overflow-hidden text-white animate-scale-up">
            <div className="p-4 bg-[#242424] border-b border-[#3F3F46] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ArrowLeftRight className="w-4 h-4 text-purple-400" />
                <span>{translate('whs.transferTitle')}</span>
              </h3>
              <button onClick={() => setShowTransferModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleExecuteTransfer} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('whs.sourceWarehouse')}</label>
                  <select
                    value={sourceWhId}
                    onChange={e => setSourceWhId(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                  >
                    {warehouses.map(w => (
                      <option key={w.id} value={w.id}>{w.nameAr}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('whs.targetWarehouse')}</label>
                  <select
                    value={targetWhId}
                    onChange={e => setTargetWhId(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                  >
                    {warehouses.map(w => (
                      <option key={w.id} value={w.id}>{w.nameAr}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Material to transfer</label>
                <select
                  value={selectedMatCode}
                  onChange={e => setSelectedMatCode(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                >
                  {materials.map(m => (
                    <option key={m.id} value={m.code}>
                      {m.nameAr} ({m.code}) — Avail: {m.qtyOnHand} {m.defaultUnit}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('whs.transferQty')}</label>
                  <input
                    type="number"
                    min="1"
                    value={transferQty}
                    onChange={e => setTransferQty(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('whs.transferReason')}</label>
                  <input
                    type="text"
                    value={transferReason}
                    onChange={e => setTransferReason(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTransferModal(false)}
                  className="px-4 py-1.5 text-xs text-gray-400 hover:text-white"
                >
                  {translate('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-[#0078D4] hover:bg-[#1084D9] text-white rounded text-xs font-semibold shadow flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{translate('whs.postTransfer')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
