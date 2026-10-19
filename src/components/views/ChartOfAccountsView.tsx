import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Account, AccountType } from '../../types';
import { BookOpen, Plus, Folder, FileSpreadsheet, ChevronRight, ChevronDown, Check } from 'lucide-react';

export const ChartOfAccountsView: React.FC = () => {
  const { accounts, addAccount, translate, showToast } = useApp();
  const [selectedCode, setSelectedCode] = useState<string>('1');
  const [showAddModal, setShowAddModal] = useState(false);

  // New account form
  const [newCode, setNewCode] = useState('');
  const [newNameAr, setNewNameAr] = useState('');
  const [newNameEn, setNewNameEn] = useState('');
  const [newType, setNewType] = useState<AccountType>('Asset');
  const [newParentCode, setNewParentCode] = useState<string>('11');
  const [newBalance, setNewBalance] = useState<number>(0);
  const [newIsHeader, setNewIsHeader] = useState<boolean>(false);

  const selectedAccount = accounts.find(a => a.code === selectedCode) || accounts[0];

  const handleOpenAdd = () => {
    const parent = selectedAccount;
    setNewParentCode(parent ? parent.code : '1');
    setNewType(parent ? parent.type : 'Asset');
    setNewCode(`${parent?.code || '1'}${Math.floor(Math.random() * 8 + 1)}`);
    setNewNameAr('');
    setNewNameEn('');
    setNewBalance(0);
    setNewIsHeader(false);
    setShowAddModal(true);
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !newNameAr) {
      showToast('Account Code and Name are required');
      return;
    }

    const acc: Account = {
      code: newCode,
      nameAr: newNameAr,
      nameEn: newNameEn || newNameAr,
      type: newType,
      parentCode: newParentCode || null,
      level: (newParentCode ? (accounts.find(a => a.code === newParentCode)?.level || 1) + 1 : 1),
      balance: newBalance,
      currency: 'SAR',
      isActive: true,
      isHeader: newIsHeader,
    };

    addAccount(acc);
    setShowAddModal(false);
    setSelectedCode(newCode);
  };

  // Group accounts by main categories
  const categories: AccountType[] = ['Asset', 'Liability', 'Equity', 'Revenue', 'Expense'];

  return (
    <div className="h-full flex flex-col md:flex-row bg-[#1E1E1E] text-white overflow-hidden">
      {/* Left Tree explorer */}
      <div className="w-full md:w-96 border-e border-[#383838] flex flex-col bg-[#242424] shrink-0">
        <div className="p-3 border-b border-[#383838] flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>{translate('coa.title')}</span>
          </h2>
          <button
            onClick={handleOpenAdd}
            className="px-2.5 py-1 bg-[#0078D4] hover:bg-[#1084D9] text-white rounded text-xs flex items-center gap-1 shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{translate('coa.addAccount')}</span>
          </button>
        </div>

        {/* Hierarchical accounts list */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {categories.map(cat => {
            const catAccounts = accounts.filter(a => a.type === cat);
            return (
              <div key={cat} className="mb-2">
                <div className="px-2 py-1 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-[#1A1A1A] rounded">
                  {cat}s
                </div>
                <div className="mt-1 space-y-0.5">
                  {catAccounts.map(acc => {
                    const isSelected = selectedCode === acc.code;
                    const paddingStart = (acc.level - 1) * 16;
                    return (
                      <div
                        key={acc.code}
                        onClick={() => setSelectedCode(acc.code)}
                        style={{ paddingInlineStart: `${Math.max(8, paddingStart)}px` }}
                        className={`py-1.5 px-2 rounded cursor-pointer transition-colors flex items-center justify-between text-xs ${
                          isSelected 
                            ? 'bg-[#0078D4] text-white font-semibold' 
                            : 'hover:bg-white/5 text-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          {acc.isHeader ? (
                            <Folder className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-amber-400'} shrink-0`} />
                          ) : (
                            <FileSpreadsheet className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-400'} shrink-0`} />
                          )}
                          <span className="font-mono text-[11px] opacity-75">{acc.code}</span>
                          <span className="truncate">{acc.nameAr}</span>
                        </div>
                        <span className="font-mono text-[11px] shrink-0 ms-2">
                          {acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right / Account details & Ledger view */}
      <div className="flex-1 overflow-y-auto p-6 bg-[#1E1E1E]">
        {selectedAccount ? (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#383838]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white">{selectedAccount.nameAr}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                    {selectedAccount.code}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{selectedAccount.nameEn}</p>
              </div>

              <div className="text-end">
                <div className="text-xs text-gray-400">{translate('coa.balance')}</div>
                <div className="text-xl font-bold font-mono text-emerald-400">
                  {selectedAccount.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} {selectedAccount.currency}
                </div>
              </div>
            </div>

            {/* Account card properties */}
            <div className="bg-[#242424] p-5 rounded-lg border border-[#383838] grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block mb-1">{translate('coa.accountType')}</span>
                <span className="font-bold text-white">{selectedAccount.type}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">Hierarchy Level</span>
                <span className="font-mono text-white">Level {selectedAccount.level}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">{translate('coa.parentAccount')}</span>
                <span className="font-mono text-white">{selectedAccount.parentCode || 'Root (None)'}</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">{translate('common.status')}</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>{translate('common.active')}</span>
                </span>
              </div>
            </div>

            {/* Quick statement summary */}
            <div className="bg-[#242424] p-5 rounded-lg border border-[#383838]">
              <h3 className="text-xs font-bold text-gray-300 mb-3 uppercase tracking-wider">
                Account Summary & Financial Mapping
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                This account is integrated into the General Ledger. All posted sales, purchases, and journal vouchers automatically post double-entry balances here.
              </p>
            </div>
          </div>
        ) : null}
      </div>

      {/* Add Account Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
          <div className="w-[500px] bg-[#2D2D2D] border border-[#3F3F46] rounded-xl shadow-2xl overflow-hidden text-white animate-scale-up">
            <div className="p-4 bg-[#242424] border-b border-[#3F3F46] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>{translate('coa.addAccount')}</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateAccount} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('coa.accountCode')} *</label>
                  <input
                    type="text"
                    value={newCode}
                    onChange={e => setNewCode(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('coa.accountType')}</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as AccountType)}
                    className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                  >
                    <option value="Asset">{translate('coa.assets')}</option>
                    <option value="Liability">{translate('coa.liabilities')}</option>
                    <option value="Equity">{translate('coa.equity')}</option>
                    <option value="Revenue">{translate('coa.revenue')}</option>
                    <option value="Expense">{translate('coa.expenses')}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('coa.accountName')} (Arabic) *</label>
                <input
                  type="text"
                  value={newNameAr}
                  onChange={e => setNewNameAr(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('coa.accountName')} (English)</label>
                <input
                  type="text"
                  value={newNameEn}
                  onChange={e => setNewNameEn(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('coa.parentAccount')}</label>
                  <select
                    value={newParentCode}
                    onChange={e => setNewParentCode(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                  >
                    <option value="">(None - Top Level)</option>
                    {accounts.map(a => (
                      <option key={a.code} value={a.code}>{a.code} - {a.nameAr}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Opening Balance</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newBalance}
                    onChange={e => setNewBalance(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isHeader"
                  checked={newIsHeader}
                  onChange={e => setNewIsHeader(e.target.checked)}
                  className="rounded bg-[#181818] border-white/20 text-[#0078D4]"
                />
                <label htmlFor="isHeader" className="text-xs text-gray-300">
                  {translate('coa.isHeader')} (No direct posting, sum of child accounts)
                </label>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-1.5 text-xs text-gray-400 hover:text-white"
                >
                  {translate('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-[#0078D4] hover:bg-[#1084D9] text-white rounded text-xs font-semibold shadow"
                >
                  {translate('common.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
