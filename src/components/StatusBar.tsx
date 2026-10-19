import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, HardDrive, UserCheck, Clock } from 'lucide-react';

export const StatusBar: React.FC = () => {
  const { currentCompany, currentUser } = useApp();
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1A1A1A] border-t border-[#333333] px-3 py-1 flex items-center justify-between text-[11px] text-gray-300 font-sans select-none z-30">
      {/* Left status items (Fixed English as specified by StatBarEn) */}
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className="flex items-center gap-1.5 text-emerald-400 font-medium pe-3 border-e border-gray-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Status: Ready</span>
        </div>

        <div className="flex items-center gap-1 pe-3 border-e border-gray-700 text-gray-300">
          <span className="text-gray-400">Company:</span>
          <span className="font-semibold text-white">{currentCompany.nameEn || currentCompany.name}</span>
          <span className="text-gray-400 text-[10px]">({currentCompany.code})</span>
        </div>

        <div className="flex items-center gap-1 pe-3 border-e border-gray-700 text-gray-300">
          <HardDrive className="w-3 h-3 text-cyan-400" />
          <span className="text-gray-400">Database:</span>
          <span className="font-mono text-gray-200">SQLite (SHOUTECH_2026.db)</span>
        </div>

        <div className="flex items-center gap-1 text-gray-300">
          <UserCheck className="w-3 h-3 text-blue-400" />
          <span className="text-gray-400">User:</span>
          <span className="font-semibold text-white">{currentUser?.username || 'admin'}</span>
          <span className="text-[10px] text-gray-400 font-mono capitalize">[{currentUser?.role || 'admin'}]</span>
        </div>
      </div>

      {/* Right status items */}
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className="flex items-center gap-1 text-gray-400">
          <ShieldCheck className="w-3 h-3 text-amber-400" />
          <span className="text-[10px]">License: Valid · ShouTech Enterprise (10 Users)</span>
        </div>

        <div className="flex items-center gap-1.5 text-gray-400 font-mono text-[11px] ps-2 border-s border-gray-700">
          <Clock className="w-3 h-3 text-gray-400" />
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};
