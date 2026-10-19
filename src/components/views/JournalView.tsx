import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JournalEntry, JournalLine } from '../../types';
import { FileCheck, Plus, Trash2, CheckCircle2, AlertCircle, Save, Printer } from 'lucide-react';

export const JournalView: React.FC = () => {
  const { journals, accounts, saveJournal, postJournal, translate, showToast } = useApp();
  const [selectedId, setSelectedId] = useState<number>(journals[0]?.id || 1);

  const currentJrn = journals.find(j => j.id === selectedId) || journals[0];

  const [docNo, setDocNo] = useState(currentJrn?.docNo || 'JRN-2026-0003');
  const [date, setDate] = useState(currentJrn?.date || new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState(currentJrn?.notes || '');
  const [lines, setLines] = useState<JournalLine[]>(currentJrn?.lines || []);
  const [status, setStatus] = useState<'Draft' | 'Posted'>(currentJrn?.status || 'Draft');

  const handleSelect = (j: JournalEntry) => {
    setSelectedId(j.id);
    setDocNo(j.docNo);
    setDate(j.date);
    setNotes(j.notes);
    setLines([...j.lines]);
    setStatus(j.status);
  };

  const handleNew = () => {
    const nextNo = `JRN-2026-${(journals.length + 1).toString().padStart(4, '0')}`;
    setSelectedId(-1);
    setDocNo(nextNo);
    setDate(new Date().toISOString().slice(0, 10));
    setNotes('قيد محاسبي جديد');
    setStatus('Draft');
    setLines([
      { id: '1', accountCode: '111', accountName: 'الصندوق والنقدية', debit: 1000, credit: 0, note: '' },
      { id: '2', accountCode: '41', accountName: 'إيراد مبيعات', debit: 0, credit: 1000, note: '' }
    ]);
  };

  const addLine = () => {
    const newLine: JournalLine = {
      id: Date.now().toString(),
      accountCode: accounts[0]?.code || '111',
      accountName: accounts[0]?.nameAr || 'الصندوق',
      debit: 0,
      credit: 0,
      note: ''
    };
    setLines([...lines, newLine]);
  };

  const updateLine = (id: string, field: keyof JournalLine, value: any) => {
    setLines(prev => prev.map(l => {
      if (l.id === id) {
        if (field === 'accountCode') {
          const acc = accounts.find(a => a.code === value);
          return { ...l, accountCode: value, accountName: acc?.nameAr || l.accountName };
        }
        return { ...l, [field]: value };
      }
      return l;
    }));
  };

  const removeLine = (id: string) => {
    if (lines.length > 2) {
      setLines(lines.filter(l => l.id !== id));
    } else {
      showToast('Journal voucher requires at least two lines');
    }
  };

  const totalDebit = lines.reduce((sum, l) => sum + (Number(l.debit) || 0), 0);
  const totalCredit = lines.reduce((sum, l) => sum + (Number(l.credit) || 0), 0);
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.001;

  const handleSave = () => {
    if (lines.length < 2) return;
    const newEntry: Omit<JournalEntry, 'id'> = {
      docNo,
      date,
      notes,
      status: 'Draft',
      lines,
      totalDebit,
      totalCredit
    };
    const id = saveJournal(newEntry);
    setSelectedId(id);
    setStatus('Draft');
  };

  const handlePost = () => {
    if (!isBalanced) {
      showToast(`${translate('jrn.unbalanced')} ${(totalDebit - totalCredit).toFixed(2)}`);
      return;
    }

    if (selectedId === -1) {
      const newEntry: Omit<JournalEntry, 'id'> = {
        docNo,
        date,
        notes,
        status: 'Draft',
        lines,
        totalDebit,
        totalCredit
      };
      const newId = saveJournal(newEntry);
      postJournal(newId);
      setSelectedId(newId);
    } else {
      postJournal(selectedId);
    }
    setStatus('Posted');
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-[#1E1E1E] text-white overflow-hidden">
      {/* Left List of Vouchers */}
      <div className="w-full md:w-80 border-e border-[#383838] flex flex-col bg-[#242424] shrink-0">
        <div className="p-3 border-b border-[#383838] flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            <span>{translate('jrn.title')}</span>
          </h2>
          <button
            onClick={handleNew}
            className="px-2.5 py-1 bg-[#0078D4] hover:bg-[#1084D9] text-white rounded text-xs flex items-center gap-1 shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{translate('common.new')}</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#303030]">
          {journals.map(j => {
            const isSelected = selectedId === j.id;
            return (
              <div
                key={j.id}
                onClick={() => handleSelect(j)}
                className={`p-3 cursor-pointer transition-colors ${
                  isSelected ? 'bg-[#0078D4]/20 border-s-4 border-[#0078D4]' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-white">{j.docNo}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    j.status === 'Posted' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {j.status}
                  </span>
                </div>
                <div className="text-[11px] text-gray-400 truncate mt-1">{j.notes}</div>
                <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono mt-1">
                  <span>{j.date}</span>
                  <span>{j.totalDebit.toLocaleString('en-US', { minimumFractionDigits: 2 })} SAR</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right / Journal Voucher Form */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#1E1E1E]">
        <div className="max-w-4xl mx-auto space-y-5">
          {/* Header Controls */}
          <div className="flex items-center justify-between pb-4 border-b border-[#383838]">
            <div className="flex items-center gap-3">
              <span className="text-base font-bold text-white font-mono">{docNo}</span>
              <span className={`text-xs px-2 py-0.5 rounded ${
                status === 'Posted' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {status}
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
              {status !== 'Posted' && (
                <>
                  <button
                    onClick={handleSave}
                    className="px-3.5 py-1.5 bg-[#2D2D2D] hover:bg-[#3D3D3D] border border-white/20 rounded text-xs text-white flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{translate('common.save')}</span>
                  </button>
                  <button
                    onClick={handlePost}
                    disabled={!isBalanced}
                    className="px-4 py-1.5 bg-[#0078D4] hover:bg-[#1084D9] text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{translate('jrn.postJournal')}</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Form Meta */}
          <div className="bg-[#242424] p-4 rounded-lg border border-[#383838] grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('jrn.docNo')}</label>
              <input
                type="text"
                value={docNo}
                disabled={status === 'Posted'}
                onChange={e => setDocNo(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Document Date</label>
              <input
                type="date"
                value={date}
                disabled={status === 'Posted'}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('jrn.notes')}</label>
              <input
                type="text"
                value={notes}
                disabled={status === 'Posted'}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
              />
            </div>
          </div>

          {/* Lines Table */}
          <div className="bg-[#242424] rounded-lg border border-[#383838] overflow-hidden">
            <div className="p-3 bg-[#1A1A1A] border-b border-[#383838] flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-300">Journal Lines (Debit / Credit)</h3>
              {status !== 'Posted' && (
                <button
                  onClick={addLine}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded text-xs text-white flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Line</span>
                </button>
              )}
            </div>

            <table className="w-full text-start text-xs">
              <thead className="bg-[#1D1D1D] text-gray-400 border-b border-[#383838]">
                <tr>
                  <th className="py-2 px-3 text-start">Account</th>
                  <th className="py-2 px-3 text-start">Memo / Note</th>
                  <th className="py-2 px-3 text-end w-32">{translate('jrn.debit')} (SAR)</th>
                  <th className="py-2 px-3 text-end w-32">{translate('jrn.credit')} (SAR)</th>
                  {status !== 'Posted' && <th className="py-2 px-3 text-center w-10"></th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#303030]">
                {lines.map(l => (
                  <tr key={l.id}>
                    <td className="py-2 px-3">
                      {status === 'Posted' ? (
                        <span className="font-semibold text-white">{l.accountCode} - {l.accountName}</span>
                      ) : (
                        <select
                          value={l.accountCode}
                          onChange={e => updateLine(l.id, 'accountCode', e.target.value)}
                          className="w-full px-2 py-1 bg-[#181818] border border-white/15 rounded text-xs text-white"
                        >
                          {accounts.map(a => (
                            <option key={a.code} value={a.code}>{a.code} - {a.nameAr}</option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      {status === 'Posted' ? (
                        <span className="text-gray-400">{l.note}</span>
                      ) : (
                        <input
                          type="text"
                          value={l.note}
                          onChange={e => updateLine(l.id, 'note', e.target.value)}
                          placeholder="Line description"
                          className="w-full px-2 py-1 bg-[#181818] border border-white/15 rounded text-xs text-white"
                        >
                        </input>
                      )}
                    </td>
                    <td className="py-2 px-3 text-end">
                      {status === 'Posted' ? (
                        <span className="font-mono font-bold text-white">{l.debit > 0 ? l.debit.toFixed(2) : '-'}</span>
                      ) : (
                        <input
                          type="number"
                          step="0.01"
                          value={l.debit || ''}
                          onChange={e => updateLine(l.id, 'debit', Number(e.target.value))}
                          className="w-full px-2 py-1 bg-[#181818] border border-white/15 rounded text-xs text-end font-mono text-white"
                        />
                      )}
                    </td>
                    <td className="py-2 px-3 text-end">
                      {status === 'Posted' ? (
                        <span className="font-mono font-bold text-white">{l.credit > 0 ? l.credit.toFixed(2) : '-'}</span>
                      ) : (
                        <input
                          type="number"
                          step="0.01"
                          value={l.credit || ''}
                          onChange={e => updateLine(l.id, 'credit', Number(e.target.value))}
                          className="w-full px-2 py-1 bg-[#181818] border border-white/15 rounded text-xs text-end font-mono text-white"
                        />
                      )}
                    </td>
                    {status !== 'Posted' && (
                      <td className="py-2 px-3 text-center">
                        <button
                          onClick={() => removeLine(l.id)}
                          className="text-gray-400 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals & Balance indicator */}
            <div className="p-3 bg-[#1A1A1A] border-t border-[#383838] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                {isBalanced ? (
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{translate('jrn.balanced')}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-red-400 font-semibold">
                    <AlertCircle className="w-4 h-4" />
                    <span>{translate('jrn.unbalanced')} {Math.abs(totalDebit - totalCredit).toFixed(2)} SAR</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-6 font-mono text-sm">
                <div>
                  <span className="text-gray-400 me-2 text-xs">{translate('jrn.totalDebit')}</span>
                  <span className="font-bold text-white">{totalDebit.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-gray-400 me-2 text-xs">{translate('jrn.totalCredit')}</span>
                  <span className="font-bold text-white">{totalCredit.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
