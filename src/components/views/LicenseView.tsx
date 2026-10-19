import React from 'react';
import { KeyRound, ShieldAlert, Server } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LicenseView: React.FC = () => {
  const { translate } = useApp();

  return (
    <section className="h-full overflow-y-auto p-6 bg-[var(--workspace-bg)] text-[var(--text-primary)]">
      <div className="max-w-5xl mx-auto space-y-5">
        <header className="flex items-center gap-3 border-b border-[var(--border-color)] pb-4">
          <div className="rounded-xl p-3 bg-[var(--surface-light)]"><KeyRound className="w-7 h-7 text-[var(--primary)]" /></div>
          <div>
            <h1 className="text-xl font-semibold">{translate('window.license')}</h1>
            <p className="text-sm text-[var(--text-secondary)]">{translate('ribbon.status')}</p>
          </div>
        </header>
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-5 flex gap-3">
          <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0" />
          <div className="space-y-2">
            <h2 className="font-semibold">{translate('ribbon.pending')}</h2>
            <p className="text-sm leading-6">{translate('ribbon.noLicense')}</p>
            <p className="text-sm leading-6">{translate('ribbon.notIntegrated')}</p>
          </div>
        </div>
        <div className="rounded-lg border border-[var(--border-color)] p-5 flex gap-3">
          <Server className="w-5 h-5 text-[var(--text-secondary)] shrink-0" />
          <p className="text-sm leading-6 text-[var(--text-secondary)]">{translate('ribbon.sessionOnly')}</p>
        </div>
      </div>
    </section>
  );
};
