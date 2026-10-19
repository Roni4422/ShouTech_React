import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { QuickToolbar } from './components/QuickToolbar';
import { Ribbon } from './components/Ribbon';
import { MdiTabBar } from './components/MdiTabBar';
import { StatusBar } from './components/StatusBar';
import { SplashModal } from './components/SplashModal';
import { CompanyModal } from './components/CompanyModal';
import { LoginModal } from './components/LoginModal';
import { ActiveWindow } from './types';

// Views
import { DashboardView } from './components/views/DashboardView';
import { POSView } from './components/views/POSView';
import { InvoiceView } from './components/views/InvoiceView';
import { MaterialCardView } from './components/views/MaterialCardView';
import { WarehouseView } from './components/views/WarehouseView';
import { ChartOfAccountsView } from './components/views/ChartOfAccountsView';
import { JournalView } from './components/views/JournalView';
import { ReportsView } from './components/views/ReportsView';
import { BackupView } from './components/views/BackupView';
import { SettingsView } from './components/views/SettingsView';
import { UsersView } from './components/views/UsersView';
import { AboutView } from './components/views/AboutView';
import { AIEnterpriseView } from './components/views/AIEnterpriseView';
import { DataExchangeView } from './components/views/DataExchangeView';
import { LicenseView } from './components/views/LicenseView';
import { NativeEngineView } from './components/views/NativeEngineView';
import { SecurityCenterView } from './components/views/SecurityCenterView';
import { ClosingAccountsView } from './components/views/ClosingAccountsView';
import { ChequesView } from './components/views/ChequesView';
import { CostCentersView } from './components/views/CostCentersView';
import { CurrenciesView } from './components/views/CurrenciesView';
import { FinancialAnalysisView } from './components/views/FinancialAnalysisView';
import { OrdersView } from './components/views/OrdersView';
import { CRMView } from './components/views/CRMView';
import { SalesRepsView } from './components/views/SalesRepsView';
import { ManufacturingView } from './components/views/ManufacturingView';
import { BanksView } from './components/views/BanksView';
import { ToolsView } from './components/views/ToolsView';
import { EnterpriseToolsOptionsView } from './components/views/EnterpriseToolsOptionsView';
import { DeliveryView } from './components/views/DeliveryView';
import { WordPreviewModal } from './components/common/WordPreviewModal';

function renderWindowView(type: ActiveWindow) {
  switch (type) {
    case 'dashboard': return <DashboardView />;
    case 'pos': return <POSView />;
    case 'invoices': return <InvoiceView />;
    case 'materials': return <MaterialCardView />;
    case 'warehouses': return <WarehouseView />;
    case 'coa': return <ChartOfAccountsView />;
    case 'costCenters': return <CostCentersView />;
    case 'currencies': return <CurrenciesView />;
    case 'journals': return <JournalView />;
    case 'cheques': return <ChequesView />;
    case 'closingAccounts': return <ClosingAccountsView />;
    case 'financialAnalysis': return <FinancialAnalysisView />;
    case 'aiEnterprise': return <AIEnterpriseView />;
    case 'orders': return <OrdersView />;
    case 'crm': return <CRMView />;
    case 'salesReps': return <SalesRepsView />;
    case 'manufacturing': return <ManufacturingView />;
    case 'banks': return <BanksView />;
    case 'reports': return <ReportsView />;
    case 'securityCenter': return <SecurityCenterView />;
    case 'tools': return <ToolsView />;
    case 'enterpriseOptions': return <EnterpriseToolsOptionsView />;
    case 'delivery': return <DeliveryView />;
    case 'backup': return <BackupView />;
    case 'dataExchange': return <DataExchangeView />;
    case 'settings': return <SettingsView />;
    case 'users': return <UsersView />;
    case 'nativeEngine': return <NativeEngineView />;
    case 'license': return <LicenseView />;
    case 'about': return <AboutView />;
    default:
      return <DashboardView />;
  }
}

const MainShell: React.FC = () => {
  const { 
    activeWindow, openWindows, activeWindowId, 
    windowLayout, focusWindow, closeWindow, toastMessage,
    isPreviewOpen, closePreview, previewMeta 
  } = useApp();

  return (
    <div className="st-shell flex flex-col h-screen w-screen overflow-hidden">
      {/* 1. Windows Classic Menu Bar (UIchart.md) */}
     

      {/* 2. Quick Action Toolbar */}
      <QuickToolbar />

      {/* 3. Office / Phenix v9 Multi-Ribbon Bar */}
      <Ribbon />

      {/* 4. MDI Multi-Window Tab Bar */}
      <MdiTabBar />

      {/* 5. Active MDI Module Workspace Area */}
      <main className="st-workspace flex-1 overflow-hidden relative">
        {windowLayout === 'tabbed' ? (
          // Tabbed Maximized View (Current Active Window)
          <div className="h-full w-full overflow-hidden">
            {renderWindowView(activeWindow)}
          </div>
        ) : (
          // Split / Tiled Multi-Window View
          <div className={`h-full w-full p-2 gap-2 overflow-auto grid ${
            windowLayout === 'tileH' 
              ? openWindows.length <= 2 ? 'grid-cols-2' : 'grid-cols-3' 
              : 'grid-rows-2'
          }`}>
            {openWindows.map(win => {
              const isActive = win.id === activeWindowId;
              return (
                <div
                  key={win.id}
                  onClick={() => focusWindow(win.id)}
                  className="st-window-panel flex flex-col transition-all shadow-lg" data-active={isActive}
                >
                  {/* Sub-window title bar */}
                  <div className="st-window-titlebar px-3 py-1.5 flex items-center justify-between text-xs select-none">
                    <span className="font-bold text-gray-200 truncate">{win.title}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        closeWindow(win.id);
                      }}
                      className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  {/* Sub-window content */}
                  <div className="flex-1 overflow-auto">
                    {renderWindowView(win.windowType)}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="absolute bottom-4 end-4 z-50 bg-[#0078D4] text-white text-xs px-4 py-2.5 rounded-lg shadow-xl border border-white/20 animate-slide-up flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>{toastMessage}</span>
          </div>
        )}
      </main>

      {/* 6. Status Bar */}
      <StatusBar />

      {/* Strict Startup Modals & Dialogs: Splash -> Company Selection -> Login */}
      <SplashModal />
      <CompanyModal />
      <LoginModal />

      {/* Microsoft Word-Like Document & Print Preview Pro */}
      <WordPreviewModal
        isOpen={isPreviewOpen}
        onClose={closePreview}
        documentTitle={previewMeta.title}
        documentType={previewMeta.docType}
        data={previewMeta.data}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainShell />
    </AppProvider>
  );
};

export default App;
