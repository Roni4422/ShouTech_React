import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Invoice, InvoiceKind, InvoiceLine } from '../../types';
import { 
  Receipt, Plus, Trash2, CheckCircle2, RotateCcw, Save, 
  Printer, FileText, Search, User, AlertCircle 
} from 'lucide-react';

export const InvoiceView: React.FC = () => {
  const { 
    invoices, materials, parties, saveInvoice, postInvoice, reverseInvoice, 
    translate, showToast, currentCompany 
  } = useApp();

  const [selectedId, setSelectedId] = useState<number>(invoices[0]?.id || 1);
  const currentInv = invoices.find(i => i.id === selectedId) || invoices[0];

  const [kind, setKind] = useState<InvoiceKind>(currentInv?.kind || 'sales');
  const [docNo, setDocNo] = useState(currentInv?.docNo || 'SINV-2026-00102');
  const [date, setDate] = useState(currentInv?.date || new Date().toISOString().slice(0, 10));
  const [partyCode, setPartyCode] = useState(currentInv?.partyCode || 'CUST-001');
  const [partyName, setPartyName] = useState(currentInv?.partyName || 'مؤسسة الآفاق الرقمية');
  const [currency, setCurrency] = useState(currentInv?.currency || 'SAR');
  const [taxRate, setTaxRate] = useState(currentInv?.taxRate || 15);
  const [notes, setNotes] = useState(currentInv?.notes || '');
  const [lines, setLines] = useState<InvoiceLine[]>(currentInv?.lines || []);
  const [status, setStatus] = useState<'Draft' | 'Posted' | 'Reversed'>(currentInv?.status || 'Draft');

  // Reversal dialog state
  const [showReversalModal, setShowReversalModal] = useState(false);
  const [reversalReason, setReversalReason] = useState('Customer returned goods due to spec changes');

  const handleSelect = (inv: Invoice) => {
    setSelectedId(inv.id);
    setKind(inv.kind);
    setDocNo(inv.docNo);
    setDate(inv.date);
    setPartyCode(inv.partyCode);
    setPartyName(inv.partyName);
    setCurrency(inv.currency);
    setTaxRate(inv.taxRate);
    setNotes(inv.notes);
    setLines([...inv.lines]);
    setStatus(inv.status);
  };

  const handleNew = (newKind: InvoiceKind = 'sales') => {
    const prefix = newKind === 'sales' ? 'SINV' : newKind === 'purchase' ? 'PINV' : 'RET';
    const nextNo = `${prefix}-2026-${(invoices.length + 1).toString().padStart(5, '0')}`;
    setSelectedId(-1);
    setKind(newKind);
    setDocNo(nextNo);
    setDate(new Date().toISOString().slice(0, 10));
    setPartyCode(newKind === 'sales' ? 'CUST-001' : 'SUPP-001');
    setPartyName(newKind === 'sales' ? 'مؤسسة الآفاق الرقمية' : 'شركة المورد الدولي');
    setCurrency('SAR');
    setTaxRate(15);
    setNotes('');
    setStatus('Draft');

    const defaultMat = materials[0];
    setLines([
      {
        id: '1',
        materialId: defaultMat?.id,
        materialCode: defaultMat?.code || 'MAT-001',
        description: defaultMat?.nameAr || 'Material Item',
        unit: defaultMat?.defaultUnit || 'Piece',
        qty: 1,
        unitPrice: newKind === 'sales' ? defaultMat?.priceRetail || 100 : defaultMat?.cost || 80,
        discountPct: 0,
        taxRate: 15,
        lineTotal: newKind === 'sales' ? defaultMat?.priceRetail || 100 : defaultMat?.cost || 80
      }
    ]);
  };

  const addLine = () => {
    const defaultMat = materials[0];
    const newLine: InvoiceLine = {
      id: Date.now().toString(),
      materialId: defaultMat?.id,
      materialCode: defaultMat?.code || 'MAT-001',
      description: defaultMat?.nameAr || 'Item',
      unit: defaultMat?.defaultUnit || 'Piece',
      qty: 1,
      unitPrice: kind === 'sales' ? defaultMat?.priceRetail || 100 : defaultMat?.cost || 80,
      discountPct: 0,
      taxRate: 15,
      lineTotal: kind === 'sales' ? defaultMat?.priceRetail || 100 : defaultMat?.cost || 80
    };
    setLines([...lines, newLine]);
  };

  const updateLine = (id: string, field: keyof InvoiceLine, value: any) => {
    setLines(prev => prev.map(l => {
      if (l.id === id) {
        const updated = { ...l, [field]: value };
        if (field === 'materialCode') {
          const mat = materials.find(m => m.code === value);
          if (mat) {
            updated.materialId = mat.id;
            updated.description = mat.nameAr;
            updated.unit = mat.defaultUnit;
            updated.unitPrice = kind === 'sales' ? mat.priceRetail : mat.cost;
            updated.taxRate = mat.taxRate || 15;
          }
        }
        // Recalculate line total
        const sub = updated.qty * updated.unitPrice * (1 - updated.discountPct / 100);
        updated.lineTotal = sub;
        return updated;
      }
      return l;
    }));
  };

  const removeLine = (id: string) => {
    if (lines.length > 1) {
      setLines(lines.filter(l => l.id !== id));
    }
  };

  const subtotal = lines.reduce((sum, l) => sum + (l.lineTotal || 0), 0);
  const taxAmount = subtotal * (taxRate / 100);
  const grandTotal = subtotal + taxAmount;

  const handleSaveDraft = () => {
    if (lines.length === 0) return;
    const inv: Omit<Invoice, 'id'> = {
      kind,
      docNo,
      date,
      partyCode,
      partyName,
      currency,
      warehouseId: 1,
      taxRate,
      notes,
      status: 'Draft',
      lines,
      subtotal,
      taxAmount,
      grandTotal
    };
    const id = saveInvoice(inv);
    setSelectedId(id);
    setStatus('Draft');
  };

  const handlePost = () => {
    if (lines.length === 0) return;
    if (selectedId === -1) {
      const inv: Omit<Invoice, 'id'> = {
        kind,
        docNo,
        date,
        partyCode,
        partyName,
        currency,
        warehouseId: 1,
        taxRate,
        notes,
        status: 'Draft',
        lines,
        subtotal,
        taxAmount,
        grandTotal
      };
      const id = saveInvoice(inv);
      postInvoice(id);
      setSelectedId(id);
    } else {
      postInvoice(selectedId);
    }
    setStatus('Posted');
  };

  const handleExecuteReversal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reversalReason.trim()) {
      showToast('Reversal reason is required');
      return;
    }
    const success = reverseInvoice(selectedId, reversalReason);
    if (success) {
      setStatus('Reversed');
      setShowReversalModal(false);
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-[#1E1E1E] text-white overflow-hidden">
      {/* Left List of Invoices */}
      <div className="w-full md:w-80 border-e border-[#383838] flex flex-col bg-[#242424] shrink-0">
        <div className="p-3 border-b border-[#383838] flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
            <Receipt className="w-4 h-4 text-[#0078D4]" />
            <span>{translate('inv.salesTitle')}</span>
          </h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleNew('sales')}
              className="px-2 py-1 bg-[#0078D4] hover:bg-[#1084D9] text-white rounded text-xs flex items-center gap-1 shadow"
              title="New Sales Invoice"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Sales</span>
            </button>
            <button
              onClick={() => handleNew('purchase')}
              className="px-2 py-1 bg-[#2D2D2D] hover:bg-[#3D3D3D] border border-white/20 text-white rounded text-xs flex items-center gap-1"
              title="New Purchase Invoice"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Purch</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#303030]">
          {invoices.map(inv => {
            const isSelected = selectedId === inv.id;
            return (
              <div
                key={inv.id}
                onClick={() => handleSelect(inv)}
                className={`p-3 cursor-pointer transition-colors ${
                  isSelected ? 'bg-[#0078D4]/20 border-s-4 border-[#0078D4]' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-white">{inv.docNo}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    inv.status === 'Posted' ? 'bg-emerald-500/20 text-emerald-400' :
                    inv.status === 'Reversed' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {inv.status}
                  </span>
                </div>
                <div className="text-[11px] text-gray-300 truncate mt-1">{inv.partyName}</div>
                <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono mt-1">
                  <span className="capitalize">{inv.kind}</span>
                  <span className="text-gray-300 font-bold">{inv.grandTotal.toFixed(2)} {inv.currency}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right / Document Form */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#1E1E1E]">
        <div className="max-w-4xl mx-auto space-y-5">
          {/* Action Toolbar */}
          <div className="flex items-center justify-between pb-4 border-b border-[#383838]">
            <div className="flex items-center gap-3">
              <span className="text-base font-bold text-white font-mono">{docNo}</span>
              <span className={`text-xs px-2 py-0.5 rounded capitalize ${
                status === 'Posted' ? 'bg-emerald-500/20 text-emerald-400' :
                status === 'Reversed' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {status}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-400 capitalize">
                {kind}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-[#2A2A2A] hover:bg-[#333333] border border-white/20 rounded text-xs text-gray-200 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{translate('common.print')}</span>
              </button>

              {status === 'Draft' && (
                <>
                  <button
                    onClick={handleSaveDraft}
                    className="px-3 py-1.5 bg-[#2D2D2D] hover:bg-[#3D3D3D] border border-white/20 rounded text-xs text-white flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{translate('inv.saveDraft')}</span>
                  </button>
                  <button
                    onClick={handlePost}
                    className="px-4 py-1.5 bg-[#0078D4] hover:bg-[#1084D9] text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{translate('inv.postInvoice')}</span>
                  </button>
                </>
              )}

              {status === 'Posted' && (
                <button
                  onClick={() => setShowReversalModal(true)}
                  className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 border border-red-500/40 text-red-300 rounded text-xs flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{translate('inv.reverseDoc')}</span>
                </button>
              )}
            </div>
          </div>

          {/* Document Header fields */}
          <div className="bg-[#242424] p-4 rounded-lg border border-[#383838] grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('inv.docNo')}</label>
              <input
                type="text"
                value={docNo}
                disabled={status !== 'Draft'}
                onChange={e => setDocNo(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('inv.date')}</label>
              <input
                type="date"
                value={date}
                disabled={status !== 'Draft'}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('inv.partyName')}</label>
              {status === 'Draft' ? (
                <select
                  value={partyCode}
                  onChange={e => {
                    setPartyCode(e.target.value);
                    const p = parties.find(party => party.code === e.target.value);
                    if (p) setPartyName(p.nameAr);
                  }}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                >
                  {parties.map(p => (
                    <option key={p.code} value={p.code}>{p.nameAr} ({p.code})</option>
                  ))}
                </select>
              ) : (
                <div className="px-3 py-1.5 bg-[#181818] border border-white/10 rounded font-semibold text-white">
                  {partyName}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('inv.taxRate')}</label>
              <input
                type="number"
                value={taxRate}
                disabled={status !== 'Draft'}
                onChange={e => setTaxRate(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white font-mono"
              />
            </div>
          </div>

          {/* Items Line Table */}
          <div className="bg-[#242424] rounded-lg border border-[#383838] overflow-hidden">
            <div className="p-3 bg-[#1A1A1A] border-b border-[#383838] flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-300">Invoice Items & Pricing</h3>
              {status === 'Draft' && (
                <button
                  onClick={addLine}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded text-xs text-white flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>{translate('inv.addLine')}</span>
                </button>
              )}
            </div>

            <table className="w-full text-start text-xs">
              <thead className="bg-[#1D1D1D] text-gray-400 border-b border-[#383838]">
                <tr>
                  <th className="py-2.5 px-3 text-start w-36">Code</th>
                  <th className="py-2.5 px-3 text-start">Description</th>
                  <th className="py-2.5 px-3 text-center w-20">Unit</th>
                  <th className="py-2.5 px-3 text-center w-20">Qty</th>
                  <th className="py-2.5 px-3 text-end w-24">Price</th>
                  <th className="py-2.5 px-3 text-end w-20">Disc %</th>
                  <th className="py-2.5 px-3 text-end w-28">Total (SAR)</th>
                  {status === 'Draft' && <th className="py-2.5 px-3 text-center w-10"></th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#303030]">
                {lines.map(l => (
                  <tr key={l.id}>
                    <td className="py-2 px-3">
                      {status === 'Draft' ? (
                        <select
                          value={l.materialCode}
                          onChange={e => updateLine(l.id, 'materialCode', e.target.value)}
                          className="w-full px-2 py-1 bg-[#181818] border border-white/15 rounded text-xs text-cyan-400 font-mono"
                        >
                          {materials.map(m => (
                            <option key={m.code} value={m.code}>{m.code}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="font-mono text-cyan-400">{l.materialCode}</span>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      <span className="text-white font-medium">{l.description}</span>
                    </td>
                    <td className="py-2 px-3 text-center text-gray-400">{l.unit}</td>
                    <td className="py-2 px-3 text-center">
                      {status === 'Draft' ? (
                        <input
                          type="number"
                          min="1"
                          value={l.qty}
                          onChange={e => updateLine(l.id, 'qty', Number(e.target.value))}
                          className="w-full px-1 py-1 bg-[#181818] border border-white/15 rounded text-xs text-center font-mono text-white"
                        />
                      ) : (
                        <span className="font-mono font-bold text-white">{l.qty}</span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-end">
                      {status === 'Draft' ? (
                        <input
                          type="number"
                          step="0.01"
                          value={l.unitPrice}
                          onChange={e => updateLine(l.id, 'unitPrice', Number(e.target.value))}
                          className="w-full px-1 py-1 bg-[#181818] border border-white/15 rounded text-xs text-end font-mono text-white"
                        />
                      ) : (
                        <span className="font-mono text-white">{l.unitPrice.toFixed(2)}</span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-end">
                      {status === 'Draft' ? (
                        <input
                          type="number"
                          value={l.discountPct}
                          onChange={e => updateLine(l.id, 'discountPct', Number(e.target.value))}
                          className="w-full px-1 py-1 bg-[#181818] border border-white/15 rounded text-xs text-end font-mono text-white"
                        />
                      ) : (
                        <span className="font-mono text-gray-400">{l.discountPct}%</span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-end font-mono font-bold text-white">
                      {l.lineTotal.toFixed(2)}
                    </td>
                    {status === 'Draft' && (
                      <td className="py-2 px-3 text-center">
                        <button onClick={() => removeLine(l.id)} className="text-gray-400 hover:text-red-400 p-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Footer Summary */}
            <div className="p-4 bg-[#1A1A1A] border-t border-[#383838] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-xs text-gray-400 max-w-md">
                <span className="font-semibold text-gray-300 block mb-1">{translate('inv.notes')}:</span>
                {status === 'Draft' ? (
                  <input
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Enter document memo, terms or delivery notes..."
                    className="w-full px-3 py-1 bg-[#181818] border border-white/15 rounded text-xs text-white"
                  />
                ) : (
                  <span>{notes || 'No special terms'}</span>
                )}
              </div>

              <div className="space-y-1.5 font-mono text-xs w-64">
                <div className="flex justify-between text-gray-300">
                  <span>{translate('inv.subtotal')}:</span>
                  <span>{subtotal.toFixed(2)} {currency}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>{translate('inv.tax')} ({taxRate}%):</span>
                  <span>{taxAmount.toFixed(2)} {currency}</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-sm text-white">
                  <span>{translate('inv.total')}:</span>
                  <span className="text-[#FF6B35]">{grandTotal.toFixed(2)} {currency}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory Reversal Reason Modal */}
      {showReversalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
          <div className="w-[460px] bg-[#2D2D2D] border border-[#3F3F46] rounded-xl shadow-2xl overflow-hidden text-white animate-scale-up">
            <div className="p-4 bg-[#242424] border-b border-[#3F3F46] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-red-400" />
                <span>{translate('inv.reverseDoc')} — {docNo}</span>
              </h3>
              <button onClick={() => setShowReversalModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleExecuteReversal} className="p-5 space-y-4">
              <p className="text-xs text-gray-300 leading-relaxed">
                A reversal document will be created for <strong>{docNo}</strong>. The original invoice will remain for audit tracking and inventory stock balances will be rolled back.
              </p>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  {translate('inv.reverseReasonPrompt')} *
                </label>
                <textarea
                  value={reversalReason}
                  onChange={e => setReversalReason(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-[#181818] border border-white/20 rounded text-xs text-white focus:outline-none focus:border-red-400"
                  required
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReversalModal(false)}
                  className="px-4 py-1.5 text-xs text-gray-400 hover:text-white"
                >
                  {translate('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-semibold shadow"
                >
                  Confirm Reversal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
