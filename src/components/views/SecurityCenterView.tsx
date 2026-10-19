import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, Lock, Key, Cpu, HardDrive, CheckCircle2, 
  AlertTriangle, RefreshCw, Layers, ShieldAlert, Hash 
} from 'lucide-react';

export const SecurityCenterView: React.FC = () => {
  const { 
    securityStatus, auditLogs, resetSecurityLockout, users, showToast 
  } = useApp();

    const [activeTab, setActiveTab] = useState<'status' | 'audit_chain' | 'rbac'>('status');

  const triggerHandshake = () => {
    showToast('Hardware security integration is not configured. No handshake was attempted or verified.');
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-[#1E1E1E] text-white space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#383838]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-rose-700 flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span>2026 Enterprise Security & Integrity Center</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-mono font-bold">
                Security integration unavailable
              </span>
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Security status is unverified · Hardware dongle is not connected · Audit hashes are not cryptographic
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-[#242424] p-1 rounded-lg border border-[#383838]">
          <button
            onClick={() => setActiveTab('status')}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'status' ? 'bg-[#0078D4] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Hardware & Dongle</span>
          </button>
          <button
            onClick={() => setActiveTab('audit_chain')}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'audit_chain' ? 'bg-[#0078D4] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Hash className="w-3.5 h-3.5" />
            <span>Audit Log (Unverified)</span>
          </button>
          <button
            onClick={() => setActiveTab('rbac')}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'rbac' ? 'bg-[#0078D4] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>RBAC Permissions</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Hardware & Dongle Status */}
      {activeTab === 'status' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#242424] border border-rose-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="font-semibold text-white">Hardware Dongle Status</span>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              </div>
              <div className="text-xl font-bold font-mono text-rose-300">{securityStatus.dongleId}</div>
              <div className="text-[11px] text-gray-400">Firmware: {securityStatus.dongleFirmware}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#242424] border border-rose-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="font-semibold text-white">Anti-Tamper & Memory Guard</span>
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-xl font-bold text-white">Not active / not verified</div>
              <div className="text-[11px] text-gray-400">No hardware handshake has been verified</div>
            </div>

            <div className="p-4 rounded-xl bg-[#242424] border border-purple-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="font-semibold text-white">Encryption Standard</span>
                <Cpu className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-xl font-bold text-white">{securityStatus.encryptionMode}</div>
              <div className="text-[11px] text-gray-400">Encryption and key derivation are not configured in this client.</div>
            </div>
          </div>

          <div className="bg-[#242424] p-5 rounded-xl border border-[#383838] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Hardware integration check (not configured)</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                No hardware dongle adapter is configured. This control cannot verify hardware or authorize accounting periods.
              </p>
            </div>
            <button
              onClick={triggerHandshake}
              className="px-4 py-2 bg-[#0078D4] hover:bg-[#1084D9] text-white rounded-lg text-xs font-semibold shadow flex items-center gap-1.5 shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Check integration status</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Unverified local audit log */}
      {activeTab === 'audit_chain' && (
        <div className="space-y-4">
          <div className="bg-[#242424] p-4 rounded-xl border border-[#383838]">
            <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <Hash className="w-4 h-4 text-cyan-400" />
              <span>Local audit log (integrity not verified)</span>
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Audit entries are currently stored in browser localStorage and use a non-cryptographic digest. This view does not verify the chain and cannot detect tampering. Do not treat these hashes as SHA-256 or as a security control.
            </p>
          </div>

          <div className="bg-[#242424] rounded-xl border border-[#383838] overflow-hidden">
            <table className="w-full text-start text-xs font-mono">
              <thead className="bg-[#1A1A1A] text-gray-400 border-b border-[#383838]">
                <tr>
                  <th className="py-2.5 px-3 text-start">Timestamp</th>
                  <th className="py-2.5 px-3 text-start">User</th>
                  <th className="py-2.5 px-3 text-start">Action</th>
                  <th className="py-2.5 px-3 text-start">Target ID</th>
                  <th className="py-2.5 px-3 text-start">Previous Hash</th>
                  <th className="py-2.5 px-3 text-start">Legacy Digest (Not Secure)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#303030]">
                {auditLogs.slice(0, 15).map(log => (
                  <tr key={log.id} className="hover:bg-white/5">
                    <td className="py-2.5 px-3 text-gray-400">{log.timestamp}</td>
                    <td className="py-2.5 px-3 text-white font-bold">{log.user}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-300">{log.recordId}</td>
                    <td className="py-2.5 px-3 text-gray-500 truncate max-w-[120px]" title={log.prevHash}>
                      {log.prevHash.slice(0, 16)}...
                    </td>
                    <td className="py-2.5 px-3 text-gray-400 font-bold truncate max-w-[140px]" title={log.hash}>
                      {log.hash.slice(0, 18)}...
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: RBAC Permissions Matrix */}
      {activeTab === 'rbac' && (
        <div className="bg-[#242424] rounded-xl border border-[#383838] p-5 space-y-4">
          <h3 className="text-sm font-bold text-white mb-2">Client-side role and permission display (not server-enforced)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                role: 'Administrator (admin)',
                desc: 'Full system authorization: General Ledger close, Chart modifications, User creation, Encrypted backup restore, Fiscal period locks.',
                perms: ['Post & Reverse Invoices', 'Modify Chart of Accounts', 'User RBAC Management', 'Restore Backups', 'Dongle Diagnostics']
              },
              {
                role: 'Standard User (user)',
                desc: 'Daily operational workflows: Sales and purchase invoices, POS cashier checkout, stock movements, and customer management.',
                perms: ['Create Invoices & POS', 'View Stock Balances', 'Print Receipts', 'Inter-Warehouse Transfers']
              },
              {
                role: 'Auditor / Viewer (viewer)',
                desc: 'Read-only financial oversight: Trial Balance auditing, Ledger inspection, Stock valuation verification. All mutating actions blocked.',
                perms: ['View Trial Balance', 'Inspect Ledger', 'Export Financial Statements']
              }
            ].map(r => (
              <div key={r.role} className="p-4 rounded-lg bg-[#181818] border border-white/10 space-y-2">
                <div className="text-xs font-bold text-white">{r.role}</div>
                <p className="text-[11px] text-gray-400 leading-relaxed">{r.desc}</p>
                <div className="pt-2 border-t border-white/10 space-y-1">
                  {r.perms.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-gray-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
