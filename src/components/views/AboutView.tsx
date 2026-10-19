import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Cpu, HardDrive, FileText, Globe, Mail } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { translate } = useApp();

  return (
    <div className="h-full overflow-y-auto p-8 bg-[#1E1E1E] text-white">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-[#383838]">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-[#005A9E] to-[#0078D4] flex items-center justify-center text-white font-black text-2xl shadow-lg border border-white/20">
            ST
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>ShouTech ERP</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#0078D4]/30 text-[#60A5FA] border border-[#0078D4]/40">
                v10.6.0
              </span>
            </h1>
            <p className="text-sm text-gray-300">شو تيك لإدارة المؤسسات — نظام إدارة الموارد المتكامل</p>
            <p className="text-xs text-gray-400 font-mono">Build 20260801 · Release 2026</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-[#242424] border border-[#383838] space-y-2">
            <h3 className="text-xs font-bold text-[#60A5FA] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>License Status</span>
            </h3>
            <div className="text-xs space-y-1 text-gray-300">
              <div>Type: <strong>Per User (Enterprise)</strong></div>
              <div>Max Users: <strong>10 Workstations</strong></div>
              <div>Expiry Date: <strong>2027-01-01</strong></div>
              <div>Security Dongle: <strong>Virtual Guard Active</strong></div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-[#242424] border border-[#383838] space-y-2">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <HardDrive className="w-4 h-4" />
              <span>Database Architecture</span>
            </h3>
            <div className="text-xs space-y-1 text-gray-300">
              <div>Engine: <strong>SQLite / PostgreSQL Dual-Engine</strong></div>
              <div>Offline-First: <strong>Local Synchronized Mirror</strong></div>
              <div>Backup Format: <strong>STBK2 (AES-256 Encrypted)</strong></div>
              <div>Fiscal Isolation: <strong>Year 2026 Partitioning</strong></div>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-lg bg-[#242424] border border-[#383838] space-y-3">
          <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wider">
            Vendor & Intellectual Property
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed font-mono">
            © 2026 ShouTech Software — ShouTech. All rights reserved.
            <br />
            © 2026 شو تيك للبرمجيات — جميع الحقوق محفوظة.
          </p>
          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-gray-400 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>https://www.shoutech.com</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>support@shoutech.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
