import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  KeyRound, User, Lock, Building, ArrowLeft, ShieldCheck, 
  AlertCircle, ShieldAlert 
} from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { 
    appStage, currentCompany, login, translate, 
    backToCompanySelect, securityStatus 
  } = useApp();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (appStage !== 'login') return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);
    try {
      const success = await login(username, password);
      setError(!success);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#121212] select-none p-4">
      {/* Background radial ambient glow */}
      <div className="absolute inset-0 bg-radial from-[#0078D4]/12 via-transparent to-black pointer-events-none" />

      <div className="w-[500px] bg-[#1E1E1E] border border-[#3F3F46] rounded-2xl shadow-2xl overflow-hidden text-white relative z-10 animate-scale-up">
        {/* Top Company Brand Header */}
        <div className="p-6 bg-gradient-to-r from-[#171717] to-[#222222] border-b border-[#383838]">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={backToCompanySelect}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
              <span>Switch Company</span>
            </button>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#0078D4]/20 border border-[#0078D4]/40 text-cyan-300 font-mono font-bold">
              Stage 3 of 3
            </span>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#005A9E] to-[#0078D4] flex items-center justify-center text-white font-black text-xl shadow">
              ST
            </div>
            <div>
              <h2 className="text-base font-bold text-white">{translate('login.title')}</h2>
              <div className="flex items-center gap-1.5 text-xs text-gray-300 mt-0.5">
                <Building className="w-3.5 h-3.5 text-[#0078D4]" />
                <span className="font-semibold text-white">{currentCompany.name}</span>
                <span className="text-[10px] text-cyan-300 font-mono">[{currentCompany.code}]</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2026 Security Bar */}
        <div className="px-6 py-2.5 bg-[#171717] border-b border-white/5 flex items-center justify-between text-[11px] font-mono text-gray-300">
          <div className={`flex items-center gap-1.5 ${securityStatus.dongleConnected ? 'text-emerald-400' : 'text-amber-300'}`}>
            {securityStatus.dongleConnected ? <ShieldCheck className="w-3.5 h-3.5" /> : <ShieldAlert className="w-3.5 h-3.5" />}
            <span>{securityStatus.dongleConnected ? `Hardware dongle connected (ID: ${securityStatus.dongleId.slice(-8)})` : 'Hardware dongle unavailable'}</span>
          </div>
          <div className="text-gray-400 text-[10px]">
            Client-side checks only
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && !securityStatus.lockoutActive && (
            <div className="flex items-center gap-2 p-3 bg-red-950/60 border border-red-500/40 rounded-lg text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{translate('login.error')}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              {translate('login.username')}
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute inset-y-0 my-auto start-3 text-gray-400" />
              <input 
                type="text" 
                value={username}
                onChange={e => { setUsername(e.target.value); setError(false); }}
                className="w-full ps-9 pe-3 py-2 bg-[#141414] border border-white/20 rounded-lg focus:border-[#0078D4] focus:outline-none text-sm text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              {translate('login.password')}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute inset-y-0 my-auto start-3 text-gray-400" />
              <input 
                type="password" 
                value={password}
                onChange={e => { setPassword(e.target.value); setError(false); }}
                className="w-full ps-9 pe-3 py-2 bg-[#141414] border border-white/20 rounded-lg focus:border-[#0078D4] focus:outline-none text-sm text-white"
                required
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-white/10">
            <button
              type="button"
              onClick={backToCompanySelect}
              className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <span>إغلاق (Close)</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-7 py-2.5 bg-gradient-to-r from-[#0078D4] to-[#005A9E] hover:from-[#1084D9] hover:to-[#0078D4] text-white rounded-xl font-bold text-xs shadow-lg transition-all hover:scale-102 disabled:opacity-50"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Signing in…' : 'Sign in'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
