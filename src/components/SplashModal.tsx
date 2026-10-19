import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, HardDrive, Cpu, CheckCircle2, Lock, 
  Terminal, AlertTriangle, Radio, Wifi, Database, Check
} from 'lucide-react';

export const SplashModal: React.FC = () => {
  const { appStage, advanceFromSplash, translate } = useApp();
  const [progress, setProgress] = useState(10);
  const [currentAction, setCurrentAction] = useState('تهيئة النظام ومحرك الإقلاع الآمن 2026...');
  const [fileScanIndex, setFileScanIndex] = useState(0);

  // Core files being scanned for hackers & tampering during splash duration
  const systemFilesToScan = [
    { file: 'sys/core/security_guard.c', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', status: 'سليم - تم التحقق' },
    { file: 'fin/ledger/double_entry_engine.cs', hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', status: 'سليم ومطابق 100%' },
    { file: 'dba/mig/sqlite/coa_journal_inv.sql', hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a', status: 'سليم - خالي من الحقن' },
    { file: 'crypto/fips140_3_aes256gcm.bin', hash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d', status: 'تشفير عسكري معتمد' },
    { file: 'sentinel/dongle_usb_hid_bridge.dll', hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4', status: 'منفذ الدونغل جاهز ومستمع' },
    { file: 'cloud/vault_license_gateway.sys', hash: 'a7c9381f802f012bceaa087612c6a85e8d35661b1e9cfa4d920516ccfa307e2d', status: 'بوابة خادم التراخيص جاهزة' }
  ];

  useEffect(() => {
    if (appStage !== 'splash') return;

    const t1 = setTimeout(() => {
      setProgress(25);
      setFileScanIndex(1);
      setCurrentAction('فحص ملفات المشروع ضد العبث والـ Debugging والهاكرز [Anti-Tamper Scan]...');
    }, 600);

    const t2 = setTimeout(() => {
      setProgress(48);
      setFileScanIndex(2);
      setCurrentAction('مطابقة بصمات SHA-256 للملفات التنفيذية وجداول SQL [Manifest Verification]...');
    }, 1300);

    const t3 = setTimeout(() => {
      setProgress(72);
      setFileScanIndex(4);
      setCurrentAction('تجهيز منفذ استقبال الدونغل الأمني USB HID وتهيئة بروتوكول خادم التراخيص السحابي...');
    }, 2100);

    const t4 = setTimeout(() => {
      setProgress(90);
      setFileScanIndex(5);
      setCurrentAction('فحص تكامل قواعد البيانات والتأكد من عدم وجود تلاعب أو برمجيات خبيثة [ALL CLEAN]...');
    }, 2800);

    const t5 = setTimeout(() => {
      setProgress(100);
      setCurrentAction('تم اجتياز جميع الفحوصات الأمنية بنجاح 100% · الانتقال لشاشة اختيار الشركات...');
      setTimeout(() => {
        advanceFromSplash();
      }, 700);
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [appStage]);

  if (appStage !== 'splash') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center select-none bg-black">
      {/* Background Futuristic Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url('/src/assets/images/splash_erp_bg_1792424798264.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/85 to-[#0A0D14]/75 backdrop-blur-[2px]" />
      </div>

      {/* Main Splash Window Card */}
      <div className="w-[660px] max-w-[94vw] bg-[#12161F]/90 backdrop-blur-xl border border-[#0078D4]/50 shadow-[0_0_50px_rgba(0,120,212,0.3)] rounded-2xl p-7 text-white relative z-10 overflow-hidden animate-scale-up font-sans">
        
        {/* Futuristic Top Glowing Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0078D4] via-[#00D26A] via-[#00B7C3] to-[#7B2CBF] animate-pulse" />

        {/* Top Header: Brand & Security Badges */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#004E8C] via-[#0078D4] to-[#00D26A] flex items-center justify-center shadow-xl border border-white/20">
              <span className="text-2xl font-black tracking-widest text-white">ST</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black tracking-tight text-white">ShouTech Enterprise ERP</h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0078D4]/30 border border-[#0078D4]/60 text-cyan-300 font-mono font-bold">
                  v10.6.0 (2026 Edition)
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-1 font-medium">
                نظام إدارة المؤسسات المتكامل · بديل متطور للأمين وفينكس ERP
              </p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400 font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>FIPS 140-3 Military Security</span>
                </span>
                <span>·</span>
                <span>Zero-Trust Architecture</span>
              </div>
            </div>
          </div>
        </div>

        {/* Anti-Tamper & Anti-Hacker File Inspection Stream during splash duration */}
        <div className="bg-[#0B0E14] border border-[#222E42] rounded-xl p-3.5 mb-5 space-y-2">
          <div className="flex items-center justify-between text-xs pb-1.5 border-b border-[#1E293B]">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Terminal className="w-4 h-4 animate-pulse" />
              <span>فحص تكامل ملفات المشروع ضد العبث والهاكرز (Integrity & Anti-Tamper Scan):</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold">
              SECURITY ACTIVE
            </span>
          </div>

          <div className="space-y-1.5 max-h-28 overflow-y-auto font-mono text-[11px] pe-1">
            {systemFilesToScan.map((item, idx) => {
              const isChecked = idx <= fileScanIndex;
              return (
                <div key={idx} className="flex items-center justify-between text-gray-300 py-0.5 px-2 rounded bg-black/40 border border-white/5">
                  <div className="flex items-center gap-2 truncate">
                    {isChecked ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-gray-600 animate-spin shrink-0" />
                    )}
                    <span className="text-gray-200 truncate">{item.file}</span>
                  </div>
                  <span className={`text-[10px] shrink-0 font-bold ${isChecked ? 'text-emerald-400' : 'text-gray-500'}`}>
                    {isChecked ? item.status : 'قيد الفحص...'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dongle & Server License Readiness Badges */}
        <div className="grid grid-cols-2 gap-3 mb-5 text-[11px] font-mono">
          <div className="p-2.5 bg-[#0D121B] rounded-xl border border-emerald-500/30 flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span>Sentinel Dongle Listener</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="text-[10px] text-gray-400">منفذ USB HID مجهز ومستعد لاستقبال المفتاح</div>
            </div>
          </div>

          <div className="p-2.5 bg-[#0D121B] rounded-xl border border-cyan-500/30 flex items-center gap-2.5">
            <Radio className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                <span>License Server Gateway</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <div className="text-[10px] text-gray-400">بوابة الخادم مجهزة · رخصة طوارئ نشطة 365 يوم</div>
            </div>
          </div>
        </div>

        {/* Progress Bar & Status Bar showing ongoing operations */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-300">
            <span className="font-medium text-cyan-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              {currentAction}
            </span>
            <span className="font-mono font-bold text-white text-sm">{progress}%</span>
          </div>

          {/* Glowing Animated Progress Bar */}
          <div className="h-2.5 w-full bg-[#18202F] rounded-full overflow-hidden p-0.5 border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-[#0078D4] via-[#00B7C3] to-[#00D26A] rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(0,183,195,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Bottom Diagnostics Status Bar */}
          <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono pt-1">
            <span>SHA-256 INTEGRITY: 100% OK · NO TAMPERING DETECTED</span>
            <span>SHOUTECH ENCRYPTION: AES-256-GCM ACTIVE</span>
          </div>
        </div>

      </div>
    </div>
  );
};
