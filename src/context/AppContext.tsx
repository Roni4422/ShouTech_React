import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Company, User, Material, Warehouse, Account, Invoice, JournalEntry, 
  StockMovement, BackupRecord, LanguageCode, ThemeMode, ActiveWindow, CustomerParty,
  AppStage, CostCenter, ChequeRecord, AuditLogEntry, SecurityStatus, DockedWindow
} from '../types';
import { 
  INITIAL_COMPANIES, INITIAL_USERS, INITIAL_MATERIALS, INITIAL_WAREHOUSES, 
  INITIAL_ACCOUNTS, INITIAL_INVOICES, INITIAL_JOURNALS, INITIAL_MOVEMENTS, 
  INITIAL_BACKUPS, INITIAL_PARTIES, INITIAL_COST_CENTERS, INITIAL_CHEQUES, INITIAL_AUDIT_LOGS 
} from '../data/initialData';
import { t } from '../i18n';

interface AppContextType {
  // App lifecycle stages: Splash -> Company Selection -> Login -> Main Window
  appStage: AppStage;
  setAppStage: (stage: AppStage) => void;
  advanceFromSplash: () => void;
  selectCompanyAndProceed: (comp: Company) => void;
  backToCompanySelect: () => void;
  lockWorkstation: () => void;
  switchCompany: () => void;
  showCompanySelect: boolean;
  setShowCompanySelect: (show: boolean) => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;

  // Language & Theme
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  activeWindow: ActiveWindow;
  setActiveWindow: (win: ActiveWindow) => void;

  // Multi-Window MDI Desktop Architecture (Phenix v9 & Al-Ameen)
  openWindows: DockedWindow[];
  activeWindowId: string;
  openWindow: (winType: ActiveWindow, title?: string, subTab?: string) => void;
  closeWindow: (id: string) => void;
  closeAllWindows: () => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  windowLayout: 'tabbed' | 'tileH' | 'tileV' | 'cascade';
  setWindowLayout: (layout: 'tabbed' | 'tileH' | 'tileV' | 'cascade') => void;
  
  // Auth & Session
  currentUser: User | null;
  currentCompany: Company;
  setCurrentCompany: (comp: Company) => void;
  isLoggedIn: boolean;
  login: (username: string) => boolean;
  logout: () => void;
  
  // 2026 Security Engine & Integrity Status
  securityStatus: SecurityStatus;
  auditLogs: AuditLogEntry[];
  recordAuditEvent: (action: string, module: string, recordId: string) => void;
  resetSecurityLockout: () => void;

  // Data
  companies: Company[];
  addCompany: (comp: Omit<Company, 'id'>) => void;
  users: User[];
  materials: Material[];
  warehouses: Warehouse[];
  accounts: Account[];
  invoices: Invoice[];
  journals: JournalEntry[];
  movements: StockMovement[];
  backups: BackupRecord[];
  parties: CustomerParty[];
  costCenters: CostCenter[];
  cheques: ChequeRecord[];
  
  // Actions
  addMaterial: (mat: Omit<Material, 'id'>) => void;
  updateMaterial: (id: number, mat: Partial<Material>) => void;
  deleteMaterial: (id: number) => void;
  
  addWarehouse: (wh: Omit<Warehouse, 'id'>) => void;
  updateWarehouse: (id: number, wh: Partial<Warehouse>) => void;
  
  addAccount: (acc: Account) => void;
  
  saveInvoice: (inv: Omit<Invoice, 'id'>) => number;
  postInvoice: (id: number) => boolean;
  reverseInvoice: (id: number, reason: string) => boolean;
  
  saveJournal: (jrn: Omit<JournalEntry, 'id'>) => number;
  postJournal: (id: number) => boolean;
  
  transferStock: (sourceWhId: number, targetWhId: number, materialCode: string, qty: number, reason: string) => boolean;
  
  createBackup: (note?: string, target?: 'local', trigger?: 'session_end' | 'session_start' | 'manual' | 'daily_scheduled') => BackupRecord;
  restoreBackup: (id: string) => boolean;
  syncCloudBackups: () => void;
  
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, changes: Partial<Pick<User, 'fullName' | 'fullNameEn' | 'email' | 'role' | 'active' | 'permissions'>>) => boolean;
  updateChequeStatus: (id: string, status: 'under_collection' | 'collected' | 'returned') => void;
  addCheque: (cheque: Omit<ChequeRecord, 'id'>) => void;
  
  // Microsoft Word-like Document & Print Preview
  isPreviewOpen: boolean;
  previewMeta: { title: string; docType: string; data?: any };
  openPreview: (title: string, docType?: string, data?: any) => void;
  closePreview: () => void;

  // Notification / Alert toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  // Translation helper bound to current language
  translate: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Non-cryptographic digest retained for legacy audit display continuity only.
// This is not SHA-256 and does not provide cryptographic tamper protection.
function nonCryptographicAuditDigest(str: string): string {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const part1 = (4294967296 + h1).toString(16).padStart(8, '0');
  const part2 = (4294967296 + h2).toString(16).padStart(8, '0');
  const part3 = (4294967296 + (h1 ^ h2)).toString(16).padStart(8, '0');
  const part4 = (4294967296 + (h1 + h2)).toString(16).padStart(8, '0');
  return (part1 + part2 + part3 + part4 + part2 + part1 + part4 + part3).slice(0, 64);
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Config
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    return (localStorage.getItem('shoutech_lang') as LanguageCode) || 'ar';
  });

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return (localStorage.getItem('shoutech_theme') as ThemeMode) || 'dark';
  });

  const [activeWindow, setActiveWindowState] = useState<ActiveWindow>('dashboard');

  const DEFAULT_WINDOW_TITLES: Record<ActiveWindow, string> = {
    dashboard: 'لوحة التحكم والمؤشرات (Dashboard)',
    pos: 'نقطة البيع والكاشير (POS)',
    invoices: 'إدارة الفواتير والمناقلات (Invoices)',
    materials: 'دليل بطاقات المواد والمخزون (Items)',
    warehouses: 'إدارة المستودعات والتخزين (Warehouses)',
    coa: 'دليل وشجرة الحسابات العامة (COA)',
    costCenters: 'مراكز الكلفة والتحليل التشغيلي (Cost Centers)',
    currencies: 'نشرة أسعار العملات وفروق الصرف (Currencies)',
    journals: 'دفتر اليومية وسندات القيد (Journals)',
    cheques: 'الأوراق المالية والشيكات (Cheques)',
    closingAccounts: 'الحسابات الختامية والميزانية (Closing Accounts)',
    financialAnalysis: 'التحليل المالي وتنبؤات AI (Analytics & AI)',
    orders: 'إدارة الطلبيات والمبيعات (Orders)',
    crm: 'إدارة علاقات العملاء والذمم (CRM)',
    salesReps: 'مندوبو المبيعات والأجهزة الكفية (Sales Reps)',
    manufacturing: 'التصنيع وتكاليف الإنتاج (MRP & BOM)',
    banks: 'إدارة البنوك والتسوية البنكية (Banks)',
    reports: 'التقارير التنفيذية والمخصصة (Reports)',
    aiEnterprise: 'الذكاء الاصطناعي وكشف الاحتيال (AI Suite)',
    securityCenter: 'الأمان العسكري والدونغل Sentinel (Military Security)',
    tools: 'أدوات النظام واللغات العشر (Tools)',
    enterpriseOptions: 'خيارات وتجهيزات الملحقات والميزان (Options & Peripherals)',
    delivery: 'إدارة التوصيل والأسطول (Delivery)',
    backup: 'النسخ الاحتياطي المشفر (Backup)',
    dataExchange: 'استيراد وتصدير البيانات (Data Exchange)',
    settings: 'خيارات النظام وصلاحيات المستخدمين (Settings)',
    users: 'سجل المستخدمين ومصفوفة الأمان (Users & RBAC)',
    nativeEngine: 'المحرك الأصلي C & C# (Native Engine)',
    license: 'إدارة ترخيص النظام (License)',
    about: 'حول برنامج شو تيك ERP v10 (About)'
  };

  const [openWindows, setOpenWindows] = useState<DockedWindow[]>([
    { id: 'win-dashboard', windowType: 'dashboard', title: DEFAULT_WINDOW_TITLES.dashboard, isMinimized: false, openedAt: new Date().toISOString() }
  ]);
  const [activeWindowId, setActiveWindowId] = useState<string>('win-dashboard');
  const [windowLayout, setWindowLayout] = useState<'tabbed' | 'tileH' | 'tileV' | 'cascade'>('tabbed');

  const openWindow = (winType: ActiveWindow, title?: string, subTab?: string) => {
    setActiveWindowState(winType);
    const existing = openWindows.find(w => w.windowType === winType);
    if (existing) {
      setActiveWindowId(existing.id);
      if (existing.isMinimized) {
        setOpenWindows(prev => prev.map(w => w.id === existing.id ? { ...w, isMinimized: false } : w));
      }
    } else {
      const newId = `win-${winType}-${Date.now()}`;
      const newWin: DockedWindow = {
        id: newId,
        windowType: winType,
        title: title || DEFAULT_WINDOW_TITLES[winType] || winType,
        subTab,
        isMinimized: false,
        openedAt: new Date().toISOString()
      };
      setOpenWindows(prev => [...prev, newWin]);
      setActiveWindowId(newId);
    }
  };

  const setActiveWindow = (win: ActiveWindow) => {
    openWindow(win);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => {
      const filtered = prev.filter(w => w.id !== id);
      if (filtered.length === 0) {
        const fallback: DockedWindow = {
          id: 'win-dashboard',
          windowType: 'dashboard',
          title: DEFAULT_WINDOW_TITLES.dashboard,
          isMinimized: false,
          openedAt: new Date().toISOString()
        };
        setActiveWindowState('dashboard');
        setActiveWindowId('win-dashboard');
        return [fallback];
      }
      if (activeWindowId === id) {
        const next = filtered[filtered.length - 1];
        setActiveWindowState(next.windowType);
        setActiveWindowId(next.id);
      }
      return filtered;
    });
  };

  const closeAllWindows = () => {
    const fallback: DockedWindow = {
      id: 'win-dashboard',
      windowType: 'dashboard',
      title: DEFAULT_WINDOW_TITLES.dashboard,
      isMinimized: false,
      openedAt: new Date().toISOString()
    };
    setOpenWindows([fallback]);
    setActiveWindowState('dashboard');
    setActiveWindowId('win-dashboard');
  };

  const focusWindow = (id: string) => {
    const win = openWindows.find(w => w.id === id);
    if (win) {
      setActiveWindowState(win.windowType);
      setActiveWindowId(id);
      if (win.isMinimized) {
        setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
      }
    }
  };

  const minimizeWindow = (id: string) => {
    setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
  };
  
  // Strict Enterprise Startup Lifecycle: Splash -> Company Select -> Login -> Main
  const [appStage, setAppStage] = useState<AppStage>('splash');

  // Entities
  const [companies, setCompanies] = useState<Company[]>(() => {
    const saved = localStorage.getItem('shoutech_companies');
    return saved ? JSON.parse(saved) : INITIAL_COMPANIES;
  });
  const [currentCompany, setCurrentCompany] = useState<Company>(INITIAL_COMPANIES[0]);
  // User profiles are cached per browser only. This is not a secure identity store.
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('shoutech_users');
      if (!saved) return INITIAL_USERS;
      const parsed: unknown = JSON.parse(saved);
      if (
        Array.isArray(parsed) &&
        parsed.every((entry: unknown) => {
          if (!entry || typeof entry !== 'object') return false;
          const user = entry as Partial<User>;
          return typeof user.id === 'string' &&
            typeof user.username === 'string' &&
            typeof user.fullName === 'string' &&
            typeof user.fullNameEn === 'string' &&
            typeof user.email === 'string' &&
            (user.role === 'admin' || user.role === 'user' || user.role === 'viewer') &&
            typeof user.active === 'boolean' &&
            Array.isArray(user.permissions);
        })
      ) {
        return parsed as User[];
      }
    } catch {
      // Ignore malformed browser cache and fall back to bundled starter profiles.
    }
    return INITIAL_USERS;
  });
  // Authentication must start unauthenticated; never grant the first seeded user implicitly.
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 2026 High-Level Security Engine State
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>({
    dongleConnected: false, // Per request: hardware dongle is currently physically unavailable, but primed and listening
    dongleId: 'Not connected',
    dongleFirmware: 'Not detected',
    donglePrimedForReception: false,
    dongleListeningPort: 'USB HID \\\\?\\hid#vid_04b9&pid_0300 (Listening...)',
    licenseServerUrl: 'https://license-vault.shoutech-erp.com:8443/v1',
    licenseServerStatus: 'offline_grace_mode',
    serverLeaseDaysRemaining: 0,
    antiTamperActive: false,
    sha256ChainIntact: false,
    failedLoginAttempts: 0,
    maxAttempts: 5,
    lockoutActive: false,
    encryptionMode: 'Not configured',
    sessionTimeoutMin: 30,
    remoteCloudBackupActive: false,
    cloudBackupsRetainedCount: 0,
    lastCloudBackupTimestamp: new Date().toISOString()
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem('shoutech_audit');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [materials, setMaterials] = useState<Material[]>(() => {
    const saved = localStorage.getItem('shoutech_materials');
    return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
  });

  const [warehouses, setWarehouses] = useState<Warehouse[]>(() => {
    const saved = localStorage.getItem('shoutech_warehouses');
    return saved ? JSON.parse(saved) : INITIAL_WAREHOUSES;
  });

  const [accounts, setAccounts] = useState<Account[]>(() => {
    const saved = localStorage.getItem('shoutech_accounts');
    return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('shoutech_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [journals, setJournals] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('shoutech_journals');
    return saved ? JSON.parse(saved) : INITIAL_JOURNALS;
  });

  const [movements, setMovements] = useState<StockMovement[]>(() => {
    const saved = localStorage.getItem('shoutech_movements');
    return saved ? JSON.parse(saved) : INITIAL_MOVEMENTS;
  });

  const [backups, setBackups] = useState<BackupRecord[]>(() => {
    const saved = localStorage.getItem('shoutech_backups');
    return saved ? JSON.parse(saved) : INITIAL_BACKUPS;
  });

  const [parties] = useState<CustomerParty[]>(INITIAL_PARTIES);
  const [costCenters] = useState<CostCenter[]>(INITIAL_COST_CENTERS);
  const [cheques, setCheques] = useState<ChequeRecord[]>(() => {
    const saved = localStorage.getItem('shoutech_cheques');
    return saved ? JSON.parse(saved) : INITIAL_CHEQUES;
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Microsoft Word-like Document & Print Preview
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [previewMeta, setPreviewMeta] = useState<{ title: string; docType: string; data?: any }>({
    title: 'معاينة المستند',
    docType: 'general'
  });

  const openPreview = (title: string, docType: string = 'general', data?: any) => {
    setPreviewMeta({ title, docType, data });
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('shoutech_lang', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    localStorage.setItem('shoutech_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('theme-light');
    } else {
      document.documentElement.classList.remove('theme-light');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('shoutech_companies', JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem('shoutech_materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('shoutech_warehouses', JSON.stringify(warehouses));
  }, [warehouses]);

  useEffect(() => {
    localStorage.setItem('shoutech_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('shoutech_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('shoutech_journals', JSON.stringify(journals));
  }, [journals]);

  useEffect(() => {
    localStorage.setItem('shoutech_movements', JSON.stringify(movements));
  }, [movements]);

  useEffect(() => {
    localStorage.setItem('shoutech_backups', JSON.stringify(backups));
  }, [backups]);

  useEffect(() => {
    localStorage.setItem('shoutech_cheques', JSON.stringify(cheques));
  }, [cheques]);

  useEffect(() => {
    localStorage.setItem('shoutech_audit', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('shoutech_users', JSON.stringify(users));
  }, [users]);

  const setLanguage = (lang: LanguageCode) => setLanguageState(lang);
  const setTheme = (mode: ThemeMode) => setThemeState(mode);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const translate = (key: string) => t(key, language);

  // Legacy audit chaining uses a non-cryptographic digest and is not tamper-proof.
  const recordAuditEvent = (action: string, module: string, recordId: string) => {
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const lastEntry = auditLogs[0];
    const prevHash = lastEntry ? lastEntry.hash : '0000000000000000000000000000000000000000000000000000000000000000';
    const payload = `${prevHash}|${timestamp}|${currentUser?.username || 'system'}|${action}|${module}|${recordId}`;
    const hash = nonCryptographicAuditDigest(payload);

    const newEntry: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      timestamp,
      user: currentUser?.username || 'system',
      action,
      module,
      recordId,
      prevHash,
      hash
    };

    setAuditLogs(prev => [newEntry, ...prev]);
  };

  // Lifecycle Flow Steps
  const advanceFromSplash = () => {
    recordAuditEvent('STARTUP_DIAGNOSTICS_PASSED', 'SecurityGuard', 'SYSTEM');
    setAppStage('company_select');
  };

  const selectCompanyAndProceed = (comp: Company) => {
    setCurrentCompany(comp);
    recordAuditEvent('SELECT_COMPANY', 'MultiCompany', comp.code);
    setAppStage('login');
  };

  const backToCompanySelect = () => {
    setAppStage('company_select');
  };

  const lockWorkstation = () => {
    setIsLoggedIn(false);
    recordAuditEvent('WORKSTATION_LOCKED', 'SecurityGuard', currentUser?.username || 'user');
    setAppStage('login');
  };

  const switchCompany = () => {
    setIsLoggedIn(false);
    recordAuditEvent('SWITCH_COMPANY_REQUEST', 'MultiCompany', currentCompany.code);
    setAppStage('company_select');
  };

  const showCompanySelect = appStage === 'company_select';
  const setShowCompanySelect = (show: boolean) => setAppStage(show ? 'company_select' : 'main');
  const showLoginModal = appStage === 'login';
  const setShowLoginModal = (show: boolean) => setAppStage(show ? 'login' : 'main');
  const showSplash = appStage === 'splash';
  const setShowSplash = (show: boolean) => setAppStage(show ? 'splash' : 'main');

  const login = (username: string): boolean => {
    if (securityStatus.lockoutActive) {
      showToast('Security Lockout Active: Too many failed login attempts.');
      return false;
    }

    const normalizedUsername = username.trim().toLocaleLowerCase();
    const found = users.find(u => u.username.trim().toLocaleLowerCase() === normalizedUsername);
    if (found && found.active) {
      setCurrentUser(found);
      setIsLoggedIn(true);
      setSecurityStatus(prev => ({ ...prev, failedLoginAttempts: 0 }));
      recordAuditEvent('SECURITY_AUTH_SUCCESS', 'SecurityGuard', found.username);
      setAppStage('main');
      showToast(`${translate('login.welcome')} ${found.fullName}`);
      return true;
    }

    // Handle failed login attempt
    const attempts = securityStatus.failedLoginAttempts + 1;
    const isLocked = attempts >= securityStatus.maxAttempts;
    setSecurityStatus(prev => ({
      ...prev,
      failedLoginAttempts: attempts,
      lockoutActive: isLocked
    }));
    recordAuditEvent('SECURITY_AUTH_FAILED', 'SecurityGuard', username);

    if (isLocked) {
      showToast('2026 Sentinel Alert: Account locked due to 5 consecutive failed attempts.');
    }
    return false;
  };

  const resetSecurityLockout = () => {
    setSecurityStatus(prev => ({ ...prev, failedLoginAttempts: 0, lockoutActive: false }));
    showToast('Security lockout cleared by Administrator.');
  };

  const logout = () => {
    setIsLoggedIn(false);
    recordAuditEvent('USER_LOGOUT', 'SecurityGuard', currentUser?.username || 'user');
    setAppStage('login');
  };

  const addCompany = (comp: Omit<Company, 'id'>) => {
    const newComp: Company = { ...comp, id: `ST-COMP-${Date.now().toString().slice(-3)}` };
    setCompanies(prev => [...prev, newComp]);
    recordAuditEvent('CREATE_COMPANY', 'MultiCompany', newComp.code);
    showToast(`Company registered: ${newComp.name}`);
  };

  const addMaterial = (mat: Omit<Material, 'id'>) => {
    const newId = materials.length > 0 ? Math.max(...materials.map(m => m.id)) + 1 : 101;
    const newMat: Material = { ...mat, id: newId };
    setMaterials(prev => [newMat, ...prev]);
    recordAuditEvent('CREATE_MATERIAL', 'Inventory', newMat.code);
    showToast(translate('mat.saveSuccess'));
  };

  const updateMaterial = (id: number, mat: Partial<Material>) => {
    setMaterials(prev => prev.map(m => m.id === id ? { ...m, ...mat } : m));
    recordAuditEvent('UPDATE_MATERIAL', 'Inventory', id.toString());
    showToast(translate('mat.saveSuccess'));
  };

  const deleteMaterial = (id: number) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
    recordAuditEvent('DELETE_MATERIAL', 'Inventory', id.toString());
    showToast(translate('common.delete'));
  };

  const addWarehouse = (wh: Omit<Warehouse, 'id'>) => {
    const newId = warehouses.length > 0 ? Math.max(...warehouses.map(w => w.id)) + 1 : 1;
    const newWh: Warehouse = { ...wh, id: newId };
    setWarehouses(prev => [...prev, newWh]);
    recordAuditEvent('CREATE_WAREHOUSE', 'Inventory', newWh.code);
    showToast(translate('whs.title') + ': ' + newWh.nameAr);
  };

  const updateWarehouse = (id: number, wh: Partial<Warehouse>) => {
    setWarehouses(prev => prev.map(w => w.id === id ? { ...w, ...wh } : w));
    recordAuditEvent('UPDATE_WAREHOUSE', 'Inventory', id.toString());
    showToast(translate('common.save'));
  };

  const addAccount = (acc: Account) => {
    setAccounts(prev => [...prev, acc]);
    recordAuditEvent('CREATE_ACCOUNT', 'GeneralLedger', acc.code);
    showToast(translate('coa.addAccount') + ': ' + acc.nameAr);
  };

  const saveInvoice = (inv: Omit<Invoice, 'id'>): number => {
    const newId = invoices.length > 0 ? Math.max(...invoices.map(i => i.id)) + 1 : 1;
    const newInv: Invoice = { ...inv, id: newId };
    setInvoices(prev => [newInv, ...prev]);
    recordAuditEvent('SAVE_INVOICE_DRAFT', 'Invoices', newInv.docNo);
    showToast(translate('inv.saveDraft') + ': ' + newInv.docNo);
    return newId;
  };

  const postInvoice = (id: number): boolean => {
    const inv = invoices.find(i => i.id === id);
    if (!inv || inv.status !== 'Draft') return false;
    if (inv.kind === 'quotation' || inv.kind === 'stock_transfer') {
      showToast('Posting rejected: quotations and stock transfers require their dedicated workflow.');
      return false;
    }
    if (!inv.lines.length || inv.lines.some(line =>
      !line.materialCode || !Number.isFinite(line.qty) || line.qty <= 0 ||
      !Number.isFinite(line.unitPrice) || line.unitPrice < 0 ||
      !Number.isFinite(line.lineTotal) || line.lineTotal < 0
    )) {
      showToast('Posting rejected: invoice lines contain invalid quantities or amounts.');
      return false;
    }

    const stockDirection = (kind: Invoice['kind']): number => {
      if (kind === 'sales' || kind === 'pos' || kind === 'stock_out' || kind === 'purchase_return') return -1;
      if (kind === 'purchase' || kind === 'stock_in' || kind === 'sales_return') return 1;
      return 0;
    };
    const direction = stockDirection(inv.kind);
    const requestedByCode = new Map<string, number>();
    if (direction !== 0) {
      for (const line of inv.lines) {
        requestedByCode.set(line.materialCode, (requestedByCode.get(line.materialCode) || 0) + line.qty * direction);
      }
      for (const [code, delta] of requestedByCode) {
        const material = materials.find(item => item.code === code);
        if (!material) {
          showToast('Posting rejected: material ' + code + ' does not exist.');
          return false;
        }
        if (material.qtyOnHand + delta < -0.000001) {
          showToast('Posting rejected: insufficient stock for material ' + code + '.');
          return false;
        }
      }
    }

    const materialNames = new Map(materials.map(material => [material.code, material.nameAr]));
    const now = Date.now();
    const newMovements: StockMovement[] = direction === 0 ? [] : inv.lines.map((line, idx) => ({
      id: now + idx,
      docNo: inv.docNo,
      date: inv.date,
      moveType: direction < 0 ? (inv.kind === 'purchase_return' ? 'Purchase Return' : 'Sale') : (inv.kind === 'sales_return' ? 'Sales Return' : 'Purchase'),
      materialCode: line.materialCode,
      materialName: materialNames.get(line.materialCode) || line.description,
      warehouseCode: warehouses.find(warehouse => warehouse.id === inv.warehouseId)?.code || 'UNASSIGNED',
      unit: line.unit,
      qtyIn: direction > 0 ? line.qty : 0,
      qtyOut: direction < 0 ? line.qty : 0,
      unitCost: line.unitPrice,
      totalValue: line.lineTotal,
      note: 'Posting ' + inv.docNo
    }));

    if (direction !== 0) {
      setMaterials(prev => prev.map(material => {
        const delta = requestedByCode.get(material.code);
        return delta === undefined ? material : { ...material, qtyOnHand: material.qtyOnHand + delta };
      }));
      setMovements(prev => [...newMovements, ...prev]);
    }

    setInvoices(prev => prev.map(i => i.id === id ? { ...i, status: 'Posted', postedBy: currentUser?.username || 'unknown' } : i));
    recordAuditEvent('POST_INVOICE_LEDGER', 'Invoices', inv.docNo);
    showToast(translate('inv.postInvoice') + ': ' + inv.docNo);
    return true;
  };

  const reverseInvoice = (id: number, reason: string): boolean => {
    const target = invoices.find(i => i.id === id);
    const cleanReason = reason.trim();
    if (!target || target.status !== 'Posted' || !cleanReason) {
      showToast('Reversal rejected: a posted invoice and a reason are required.');
      return false;
    }
    const reversalDocNo = 'REV-' + target.docNo;
    if (invoices.some(invoice => invoice.docNo === reversalDocNo)) {
      showToast('Reversal rejected: a reversal record already exists for this invoice.');
      return false;
    }
    const originalDirection = (kind: Invoice['kind']): number => {
      if (kind === 'sales' || kind === 'pos' || kind === 'stock_out' || kind === 'purchase_return') return -1;
      if (kind === 'purchase' || kind === 'stock_in' || kind === 'sales_return') return 1;
      return 0;
    };
    const direction = -originalDirection(target.kind);
    const requestedByCode = new Map<string, number>();
    if (direction !== 0) {
      for (const line of target.lines) {
        requestedByCode.set(line.materialCode, (requestedByCode.get(line.materialCode) || 0) + line.qty * direction);
      }
      for (const [code, delta] of requestedByCode) {
        const material = materials.find(item => item.code === code);
        if (!material || material.qtyOnHand + delta < -0.000001) {
          showToast('Reversal rejected: current stock cannot support reversing material ' + code + '.');
          return false;
        }
      }
    }
    const materialNames = new Map(materials.map(material => [material.code, material.nameAr]));
    const now = Date.now();
    const reversalMovements: StockMovement[] = direction === 0 ? [] : target.lines.map((line, idx) => ({
      id: now + idx,
      docNo: reversalDocNo,
      date: new Date().toISOString().slice(0, 10),
      moveType: 'Reversal',
      materialCode: line.materialCode,
      materialName: materialNames.get(line.materialCode) || line.description,
      warehouseCode: warehouses.find(warehouse => warehouse.id === target.warehouseId)?.code || 'UNASSIGNED',
      unit: line.unit,
      qtyIn: direction > 0 ? line.qty : 0,
      qtyOut: direction < 0 ? line.qty : 0,
      unitCost: line.unitPrice,
      totalValue: line.lineTotal,
      note: 'Reversal of ' + target.docNo + ': ' + cleanReason
    }));
    if (direction !== 0) {
      setMaterials(prev => prev.map(material => {
        const delta = requestedByCode.get(material.code);
        return delta === undefined ? material : { ...material, qtyOnHand: material.qtyOnHand + delta };
      }));
      setMovements(prev => [...reversalMovements, ...prev]);
    }
    setInvoices(prev => prev.map(i => i.id === id ? {
      ...i,
      status: 'Reversed',
      reversedDocNo: reversalDocNo,
      reversalReason: cleanReason
    } : i));
    recordAuditEvent('REVERSE_INVOICE', 'Invoices', target.docNo + ' -> ' + reversalDocNo + '; reason: ' + cleanReason);
    showToast(translate('inv.reverseSuccess'));
    return true;
  };

  const saveJournal = (jrn: Omit<JournalEntry, 'id'>): number => {
    const newId = journals.length > 0 ? Math.max(...journals.map(j => j.id)) + 1 : 1;
    const newJrn: JournalEntry = { ...jrn, id: newId };
    setJournals(prev => [newJrn, ...prev]);
    recordAuditEvent('SAVE_JOURNAL_DRAFT', 'GeneralLedger', newJrn.docNo);
    showToast(translate('common.save') + ': ' + newJrn.docNo);
    return newId;
  };

  const postJournal = (id: number): boolean => {
    const jrn = journals.find(j => j.id === id);
    if (!jrn || jrn.status === 'Posted') return false;

    // Validate the actual lines, not the header totals supplied by the editor.
    const lines = jrn.lines || [];
    if (lines.length < 2 || lines.some(line =>
      !line.accountCode ||
      !Number.isFinite(line.debit) || !Number.isFinite(line.credit) ||
      line.debit < 0 || line.credit < 0 ||
      (line.debit > 0 && line.credit > 0) ||
      (line.debit === 0 && line.credit === 0)
    )) {
      showToast('Posting rejected: journal lines are invalid. Correct the lines and try again.');
      return false;
    }

    const totalDebit = lines.reduce((sum, line) => sum + line.debit, 0);
    const totalCredit = lines.reduce((sum, line) => sum + line.credit, 0);
    if (totalDebit <= 0 || Math.abs(totalDebit - totalCredit) > 0.000001) {
      showToast('Posting rejected: journal debits must equal credits.');
      return false;
    }

    const accountCodes = new Set(accounts.map(account => account.code));
    if (lines.some(line => !accountCodes.has(line.accountCode))) {
      showToast('Posting rejected: one or more accounts do not exist in the current chart.');
      return false;
    }

    const deltas = new Map<string, number>();
    for (const line of lines) {
      deltas.set(line.accountCode, (deltas.get(line.accountCode) || 0) + line.debit - line.credit);
    }

    setAccounts(prev => prev.map(account => {
      const delta = deltas.get(account.code);
      return delta === undefined ? account : { ...account, balance: (account.balance || 0) + delta };
    }));

    setJournals(prev => prev.map(j => j.id === id ? {
      ...j,
      totalDebit,
      totalCredit,
      status: 'Posted',
      postedBy: currentUser?.username || 'unknown',
      postedAt: new Date().toISOString()
    } : j));

    recordAuditEvent('POST_JOURNAL_LEDGER', 'GeneralLedger', jrn.docNo);
    showToast(translate('jrn.postJournal') + ': ' + jrn.docNo);
    return true;
  };

  const transferStock = (sourceWhId: number, targetWhId: number, materialCode: string, qty: number, reason: string): boolean => {
    const mat = materials.find(m => m.code === materialCode);
    const sourceWh = warehouses.find(w => w.id === sourceWhId);
    const targetWh = warehouses.find(w => w.id === targetWhId);
    if (!Number.isFinite(qty) || qty <= 0 || !mat || mat.qtyOnHand < qty ||
      !sourceWh || !targetWh || sourceWhId === targetWhId ||
      !sourceWh.isActive || !targetWh.isActive) {
      showToast('Transfer rejected: choose different active warehouses and enter a valid quantity within available stock.');
      return false;
    }

    const docNo = `TRN-${Date.now().toString().slice(-5)}`;
    const move: StockMovement = {
      id: Date.now(),
      docNo,
      date: new Date().toISOString().slice(0, 10),
      moveType: 'Transfer',
      materialCode: mat.code,
      materialName: mat.nameAr,
      warehouseCode: `${sourceWh?.code || 'WH1'} → ${targetWh?.code || 'WH2'}`,
      unit: mat.defaultUnit,
      qtyIn: qty,
      qtyOut: qty,
      unitCost: mat.cost,
      totalValue: mat.cost * qty,
      note: reason || 'Warehouse transfer'
    };

    setMovements(prev => [move, ...prev]);
    recordAuditEvent('STOCK_TRANSFER', 'Inventory', `${docNo} (${mat.code} qty ${qty})`);
    showToast(translate('whs.transferSuccess'));
    return true;
  };

  const syncCloudBackups = () => {
    showToast('Cloud backup is unavailable: no cloud storage service is configured. No data was uploaded.');
  };

  const createBackup = (
    note?: string,
    target: 'local' = 'local',
    trigger: 'session_end' | 'session_start' | 'manual' | 'daily_scheduled' = 'manual'
  ): BackupRecord => {
    const createdAt = new Date();
    const timestamp = createdAt.toISOString().replace(/[-:T]/g, '').slice(0, 14);
    const snapshotData = {
      timestamp: createdAt.toISOString(),
      version: '10.6.0',
      company: currentCompany,
      preferences: { language, theme, windowLayout },
      users,
      currentUser,
      database: { materials, warehouses, accounts, invoices, journals, movements, cheques, costCenters, parties },
      securityState: { auditLogs: auditLogs.slice(0, 20) }
    };
    const archive = { format: 'ShouTech ERP JSON Snapshot', schemaVersion: 1, createdAt: createdAt.toISOString(), companyCode: currentCompany.code, snapshotData };
    const archiveText = JSON.stringify(archive, null, 2);
    const archiveBlob = new Blob([archiveText], { type: 'application/json;charset=utf-8' });
    const filename = 'ShouTech_' + currentCompany.code + '_' + timestamp + '.stbackup.json';
    const downloadUrl = URL.createObjectURL(archiveBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = downloadUrl;
    downloadLink.download = filename;
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    try { downloadLink.click(); }
    finally { downloadLink.remove(); window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000); }
    const bytes = archiveBlob.size;
    const sizeLabel = bytes < 1048576 ? (bytes / 1024).toFixed(1) + ' KB' : (bytes / 1048576).toFixed(2) + ' MB';
    const newRecord: BackupRecord = {
      id: 'bkp-' + Date.now(),
      name: filename,
      date: createdAt.toLocaleString(),
      size: sizeLabel,
      status: 'Not checked',
      note: note?.trim() || ('JSON snapshot download (' + trigger + ') — not encrypted; no cloud upload'),
      type: 'MIRROR_FULL',
      storageTarget: target,
      storagePath: 'Browser download; choose the save location in your browser',
      companyCode: currentCompany.code,
      triggerEvent: trigger,
      snapshotData
    };
    setBackups(prev => [newRecord, ...prev]);
    recordAuditEvent('EXPORT_JSON_BACKUP', 'Backup', filename);
    showToast('Backup download started: ' + filename + '. This JSON file is not encrypted or cloud-synced.');
    return newRecord;
  };

  const restoreBackup = (id: string): boolean => {
    const bkp = backups.find(b => b.id === id);
    if (!bkp?.snapshotData) {
      showToast('Restore failed: this entry has no restorable snapshot data.');
      return false;
    }

    // Restore an in-memory snapshot from this running session only.
    if (bkp.snapshotData) {
      const snap = bkp.snapshotData;
      if (snap.company) setCurrentCompany(snap.company);
      if (snap.database) {
        if (snap.database.materials) setMaterials(snap.database.materials);
        if (snap.database.warehouses) setWarehouses(snap.database.warehouses);
        if (snap.database.accounts) setAccounts(snap.database.accounts);
        if (snap.database.invoices) setInvoices(snap.database.invoices);
        if (snap.database.journals) setJournals(snap.database.journals);
        if (snap.database.movements) setMovements(snap.database.movements);
        if (snap.database.cheques) setCheques(snap.database.cheques);
      }
      if (snap.preferences) {
        if (snap.preferences.language) setLanguageState(snap.preferences.language);
        if (snap.preferences.theme) setThemeState(snap.preferences.theme);
        if (snap.preferences.windowLayout) setWindowLayout(snap.preferences.windowLayout);
      }
      if (snap.users) setUsers(snap.users);
      if (snap.currentUser) setCurrentUser(snap.currentUser);
    }

    recordAuditEvent('RESTORE_SESSION_SNAPSHOT', 'Backup', bkp.name);
    showToast(`Session snapshot restored in memory: ${bkp.name}. This does not restore an exported file or persist changes to a database.`);
    return true;
  };

  const addUser = (userData: Omit<User, 'id'>) => {
    if (currentUser?.role !== 'admin') {
      showToast('User creation denied: administrator privileges are required.');
      return;
    }
    const normalizedUsername = userData.username.trim().toLocaleLowerCase();
    if (!normalizedUsername || users.some(user => user.username.trim().toLocaleLowerCase() === normalizedUsername)) {
      showToast('User was not created: username is required or already exists.');
      return;
    }
    if (userData.role === 'admin' && !userData.permissions.includes('all')) {
      showToast('Administrator role requires the explicit all-permissions grant.');
      return;
    }
    const newUser: User = {
      ...userData,
      username: userData.username.trim(),
      fullName: userData.fullName.trim(),
      fullNameEn: userData.fullNameEn.trim() || userData.fullName.trim(),
      email: userData.email.trim(),
      id: `usr-${Date.now()}`
    };
    setUsers(prev => [...prev, newUser]);
    recordAuditEvent('CREATE_USER', 'UserAdministration', newUser.username);
    showToast(`User created in the current application session: ${newUser.username}`);
  };

  const updateUser = (
    id: string,
    changes: Partial<Pick<User, 'fullName' | 'fullNameEn' | 'email' | 'role' | 'active' | 'permissions'>>
  ): boolean => {
    if (currentUser?.role !== 'admin') {
      showToast('User update denied: administrator privileges are required.');
      return false;
    }
    const target = users.find(user => user.id === id);
    if (!target) {
      showToast('User update failed: record not found.');
      return false;
    }
    if (currentUser?.id === id && changes.active === false) {
      showToast('You cannot deactivate the currently signed-in user.');
      return false;
    }
    const removesAdmin = target.role === 'admin' &&
      ((changes.role !== undefined && changes.role !== 'admin') || changes.active === false);
    if (removesAdmin && users.filter(user => user.role === 'admin' && user.active).length <= 1) {
      showToast('The last active administrator cannot be demoted or deactivated.');
      return false;
    }
    const nextPermissions = changes.permissions ?? target.permissions;
    if (changes.role === 'admin' && !nextPermissions.includes('all')) {
      showToast('Administrator role requires the explicit all-permissions grant.');
      return false;
    }
    setUsers(prev => prev.map(user => user.id === id ? { ...user, ...changes } : user));
    recordAuditEvent('UPDATE_USER', 'UserAdministration', target.username);
    showToast(`User updated in the current application session: ${target.username}`);
    return true;
  };

  const updateChequeStatus = (id: string, status: 'under_collection' | 'collected' | 'returned') => {
    setCheques(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    recordAuditEvent('UPDATE_CHEQUE_STATUS', 'Securities', `${id} -> ${status}`);
    showToast('Cheque status updated');
  };

  const addCheque = (cheque: Omit<ChequeRecord, 'id'>) => {
    const newCheque: ChequeRecord = { ...cheque, id: `chq-${Date.now()}` };
    setCheques(prev => [newCheque, ...prev]);
    recordAuditEvent('REGISTER_CHEQUE', 'Securities', newCheque.chequeNo);
    showToast(`Cheque registered: ${newCheque.chequeNo}`);
  };

  return (
    <AppContext.Provider
      value={{
        appStage,
        setAppStage,
        advanceFromSplash,
        selectCompanyAndProceed,
        backToCompanySelect,
        lockWorkstation,
        switchCompany,
        showCompanySelect,
        setShowCompanySelect,
        showLoginModal,
        setShowLoginModal,
        showSplash,
        setShowSplash,
        language,
        setLanguage,
        theme,
        setTheme,
        activeWindow,
        setActiveWindow,
        openWindows,
        activeWindowId,
        openWindow,
        closeWindow,
        closeAllWindows,
        focusWindow,
        minimizeWindow,
        windowLayout,
        setWindowLayout,
        currentUser,
        currentCompany,
        setCurrentCompany,
        isLoggedIn,
        login,
        logout,
        securityStatus,
        auditLogs,
        recordAuditEvent,
        resetSecurityLockout,
        companies,
        addCompany,
        users,
        materials,
        warehouses,
        accounts,
        invoices,
        journals,
        movements,
        backups,
        parties,
        costCenters,
        cheques,
        addMaterial,
        updateMaterial,
        deleteMaterial,
        addWarehouse,
        updateWarehouse,
        addAccount,
        saveInvoice,
        postInvoice,
        reverseInvoice,
        saveJournal,
        postJournal,
        transferStock,
        createBackup,
        restoreBackup,
        syncCloudBackups,
        addUser,
        updateUser,
        updateChequeStatus,
        addCheque,
        isPreviewOpen,
        previewMeta,
        openPreview,
        closePreview,
        toastMessage,
        showToast,
        translate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
