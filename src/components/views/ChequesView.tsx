import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChequeRecord } from '../../types';
import { ExcelSchedule } from '../common/ExcelSchedule';
import { 
  FileCheck, Plus, CheckCircle2, AlertCircle, Building, 
  Calendar, DollarSign, Filter, Search 
} from 'lucide-react';

export const ChequesView: React.FC = () => {
  const { cheques, updateChequeStatus, addCheque, translate, showToast } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'receivable' | 'payable'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Cheque form
  const [newNo, setNewNo] = useState(`CHK-${Math.floor(10000 + Math.random() * 90000)}`);
  const [newDueDate, setNewDueDate] = useState('2026-11-30');
  const [newBank, setNewBank] = useState('البنك الأهلي التجاري (SNB)');
  const [newParty, setNewParty] = useState('مؤسسة الآفاق الرقمية الحديثة');
  const [newAmount, setNewAmount] = useState<number>(10000);
  const [newType, setNewType] = useState<'receivable' | 'payable'>('receivable');

  const handleCreateCheque = (e: React.FormEvent) => {
    e.preventDefault();
    addCheque({
      chequeNo: newNo,
      date: new Date().toISOString().slice(0, 10),
      dueDate: newDueDate,
      bankName: newBank,
      partyName: newParty,
      amount: newAmount,
      type: newType,
      status: 'under_collection',
      notes: 'مسجل بنظام الشيكات والأوراق التجارية'
    });
    setShowAddModal(false);
  };

  const filteredCheques = cheques.filter(c => filterType === 'all' || c.type === filterType);

  return (
    <div className="h-full overflow-y-auto p-6 bg-[#1E1E1E] text-white space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#383838]">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-cyan-400" />
            <span>Al-Ameen Securities & Cheques (أوراق القبض والدفع)</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Negotiable Commercial Instruments · Under Collection Tracking · Bank Endorsement
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter */}
          <div className="flex bg-[#242424] p-1 rounded-lg border border-[#383838] text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded transition-colors ${filterType === 'all' ? 'bg-[#0078D4] text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
            >
              All Cheques
            </button>
            <button
              onClick={() => setFilterType('receivable')}
              className={`px-3 py-1 rounded transition-colors ${filterType === 'receivable' ? 'bg-[#0078D4] text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
            >
              أوراق قبض (Receivable)
            </button>
            <button
              onClick={() => setFilterType('payable')}
              className={`px-3 py-1 rounded transition-colors ${filterType === 'payable' ? 'bg-[#0078D4] text-white font-semibold' : 'text-gray-400 hover:text-white'}`}
            >
              أوراق دفع (Payable)
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 bg-[#0078D4] hover:bg-[#1084D9] text-white rounded-lg text-xs font-semibold shadow flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Register Cheque</span>
          </button>
        </div>
      </div>

      {/* Cheques Excel Schedule */}
      <div className="h-[460px]">
        <ExcelSchedule<ChequeRecord>
          title="محفظة الأوراق المالية والشيكات (Commercial Cheques Schedule)"
          sheetName="Cheques_Portfolio"
          themeColor="violet"
          data={filteredCheques}
          keyExtractor={c => c.id}
          columns={[
            {
              key: 'chequeNo',
              header: 'رقم الشيك',
              width: '120px',
              render: (c: ChequeRecord) => (
                <span className="font-mono font-bold text-purple-900">{c.chequeNo}</span>
              )
            },
            {
              key: 'type',
              header: 'النوع',
              width: '95px',
              align: 'center',
              render: (c: ChequeRecord) => (
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  c.type === 'receivable' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {c.type === 'receivable' ? 'ورقة قبض' : 'ورقة دفع'}
                </span>
              )
            },
            {
              key: 'partyName',
              header: 'المستفيد / الساحب',
              render: (c: ChequeRecord) => (
                <span className="font-semibold text-gray-900">{c.partyName}</span>
              )
            },
            {
              key: 'bankName',
              header: 'اسم البنك المسحوب عليه',
              render: (c: ChequeRecord) => (
                <span className="text-gray-700">{c.bankName}</span>
              )
            },
            {
              key: 'dueDate',
              header: 'تاريخ الاستحقاق',
              width: '105px',
              align: 'center'
            },
            {
              key: 'amount',
              header: 'المبلغ (SAR)',
              width: '120px',
              align: 'left',
              render: (c: ChequeRecord) => (
                <span className="font-mono font-bold text-gray-900">
                  {c.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              )
            },
            {
              key: 'status',
              header: 'حالة الشيك',
              width: '120px',
              align: 'center',
              render: (c: ChequeRecord) => (
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  c.status === 'collected' ? 'bg-emerald-100 text-emerald-800' :
                  c.status === 'returned' ? 'bg-rose-100 text-rose-800' : 'bg-purple-100 text-purple-800'
                }`}>
                  {c.status === 'collected' ? 'تم التحصيل' :
                   c.status === 'returned' ? 'مرتجع بدون رصيد' : 'برسم التحصيل'}
                </span>
              )
            },
            {
              key: 'actions',
              header: 'العمليات',
              width: '130px',
              align: 'center',
              sortable: false,
              render: (c: ChequeRecord) => (
                <div className="inline-flex items-center gap-1">
                  {c.status !== 'collected' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateChequeStatus(c.id, 'collected');
                      }}
                      className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold shadow-xs"
                    >
                      تحصيل
                    </button>
                  )}
                  {c.status !== 'returned' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateChequeStatus(c.id, 'returned');
                      }}
                      className="px-2 py-0.5 bg-rose-600 hover:bg-rose-500 text-white rounded text-[10px] font-bold shadow-xs"
                    >
                      إرجاع
                    </button>
                  )}
                </div>
              )
            }
          ]}
          summaryRow={
            <tr>
              <td colSpan={5} className="px-3 py-2 text-right font-bold text-gray-800">
                إجمالي قيمة الشيكات المسجلة:
              </td>
              <td className="px-3 py-2 text-left font-mono font-bold text-purple-950">
                {filteredCheques.reduce((sum, c) => sum + c.amount, 0).toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR
              </td>
              <td colSpan={2}></td>
            </tr>
          }
        />
      </div>

      {/* Add Cheque Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
          <div className="w-[480px] bg-[#2D2D2D] border border-[#3F3F46] rounded-xl shadow-2xl overflow-hidden text-white animate-scale-up">
            <div className="p-4 bg-[#242424] border-b border-[#3F3F46] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-cyan-400" />
                <span>Register Commercial Cheque</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateCheque} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Cheque Number *</label>
                  <input
                    type="text"
                    value={newNo}
                    onChange={e => setNewNo(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#181818] border border-white/20 rounded font-mono text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Cheque Type</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 bg-[#181818] border border-white/20 rounded text-white"
                  >
                    <option value="receivable">ورقة قبض (Receivable)</option>
                    <option value="payable">ورقة دفع (Payable)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">Party / Beneficiary</label>
                <input
                  type="text"
                  value={newParty}
                  onChange={e => setNewParty(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-[#181818] border border-white/20 rounded text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={newBank}
                    onChange={e => setNewBank(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#181818] border border-white/20 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-300 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={e => setNewDueDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#181818] border border-white/20 rounded text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-300 mb-1">Cheque Amount (SAR)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newAmount}
                  onChange={e => setNewAmount(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-[#181818] border border-white/20 rounded font-mono font-bold text-emerald-400"
                  required
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-1.5 text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-[#0078D4] hover:bg-[#1084D9] text-white rounded text-xs font-semibold shadow"
                >
                  Save Cheque
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
