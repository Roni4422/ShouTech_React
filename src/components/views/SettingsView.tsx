import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, UserRole } from '../../types';
import { 
  Settings, Users, Shield, Building2, Key, Plus, Check, 
  Moon, Sun, Globe 
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { 
    currentCompany, users, addUser, theme, setTheme, 
    language, setLanguage, translate, showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'users' | 'company' | 'appearance'>('users');

  // Add user form
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('user');

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newFullName) {
      showToast('Username and Full Name are required');
      return;
    }

    addUser({
      username: newUsername,
      fullName: newFullName,
      fullNameEn: newFullName,
      role: newRole,
      email: newEmail || `${newUsername}@shoutech.com`,
      active: true,
      permissions: newRole === 'admin' ? ['all'] : ['operations']
    });

    setShowAddUserModal(false);
    setNewUsername('');
    setNewFullName('');
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-[#1E1E1E] text-white space-y-6">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-[#383838]">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-300" />
            <span>{translate('settings.title')}</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Enterprise Management · RBAC Security · Workstation Configuration
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 bg-[#242424] p-1 rounded-lg border border-[#383838]">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'users' ? 'bg-[#0078D4] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{translate('settings.usersManagement')}</span>
          </button>
          <button
            onClick={() => setActiveTab('company')}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'company' ? 'bg-[#0078D4] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{translate('settings.companyInfo')}</span>
          </button>
          <button
            onClick={() => setActiveTab('appearance')}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'appearance' ? 'bg-[#0078D4] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>{translate('settings.theme')} & i18n</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Users & RBAC */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>RBAC User Levels & Permissions</span>
            </h2>
            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-3.5 py-1.5 bg-[#0078D4] hover:bg-[#1084D9] text-white rounded text-xs font-semibold flex items-center gap-1.5 shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{translate('settings.addUser')}</span>
            </button>
          </div>

          <div className="bg-[#242424] rounded-lg border border-[#383838] overflow-hidden">
            <table className="w-full text-start text-xs">
              <thead className="bg-[#1D1D1D] text-gray-400 border-b border-[#383838]">
                <tr>
                  <th className="py-2.5 px-3 text-start">Username</th>
                  <th className="py-2.5 px-3 text-start">Full Name</th>
                  <th className="py-2.5 px-3 text-start">Role / Privilege</th>
                  <th className="py-2.5 px-3 text-start">Email Address</th>
                  <th className="py-2.5 px-3 text-start">Last Sign In</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#303030]">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-white/5">
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">{u.username}</td>
                    <td className="py-2.5 px-3 text-white font-medium">{u.fullName}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono capitalize ${
                        u.role === 'admin' ? 'bg-purple-500/20 text-purple-300 font-bold' :
                        u.role === 'user' ? 'bg-blue-500/20 text-blue-300' : 'bg-gray-500/20 text-gray-300'
                      }`}>
                        {u.role === 'admin' ? translate('settings.roleAdmin') :
                         u.role === 'user' ? translate('settings.roleUser') : translate('settings.roleViewer')}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-gray-400">{u.email}</td>
                    <td className="py-2.5 px-3 font-mono text-gray-400">{u.lastLogin || 'Never'}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="text-emerald-400 font-bold">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Company Profile */}
      {activeTab === 'company' && (
        <div className="bg-[#242424] p-6 rounded-lg border border-[#383838] max-w-2xl space-y-4">
          <h2 className="text-sm font-bold text-white mb-2">{translate('settings.companyInfo')}</h2>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-400 block mb-1">Company Name (Arabic)</span>
              <span className="font-bold text-white text-sm">{currentCompany.name}</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-1">Company Name (English)</span>
              <span className="font-bold text-white text-sm">{currentCompany.nameEn}</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-1">Tax ID / VAT Number</span>
              <span className="font-mono text-cyan-300">{currentCompany.vatNumber}</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-1">Commercial Registration</span>
              <span className="font-mono text-gray-200">{currentCompany.commercialRegister}</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-1">Address</span>
              <span className="text-gray-200">{currentCompany.address}</span>
            </div>
            <div>
              <span className="text-gray-400 block mb-1">Phone / Support</span>
              <span className="text-gray-200 font-mono">{currentCompany.phone}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Appearance & Language */}
      {activeTab === 'appearance' && (
        <div className="bg-[#242424] p-6 rounded-lg border border-[#383838] max-w-2xl space-y-6">
          <div>
            <h2 className="text-sm font-bold text-white mb-3">{translate('settings.theme')}</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-lg border text-start transition-all flex items-center gap-3 ${
                  theme === 'dark' ? 'bg-[#0078D4]/20 border-[#0078D4] ring-1 ring-[#0078D4]' : 'bg-[#1E1E1E] border-white/10'
                }`}
              >
                <Moon className="w-5 h-5 text-indigo-400" />
                <div>
                  <div className="text-xs font-bold text-white">{translate('settings.themeDark')}</div>
                  <div className="text-[11px] text-gray-400">Windows 11 Fluent Dark ERP Palette</div>
                </div>
              </button>

              <button
                onClick={() => setTheme('light')}
                className={`p-4 rounded-lg border text-start transition-all flex items-center gap-3 ${
                  theme === 'light' ? 'bg-[#0078D4]/20 border-[#0078D4] ring-1 ring-[#0078D4]' : 'bg-[#1E1E1E] border-white/10'
                }`}
              >
                <Sun className="w-5 h-5 text-yellow-400" />
                <div>
                  <div className="text-xs font-bold text-white">{translate('settings.themeLight')}</div>
                  <div className="text-[11px] text-gray-400">Classic Office Daylight Palette</div>
                </div>
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-white mb-3">{translate('settings.language')}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { code: 'ar', label: 'العربية (RTL)' },
                { code: 'en', label: 'English (LTR)' },
                { code: 'fr', label: 'Français' },
                { code: 'tr', label: 'Türkçe' },
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={`p-3 rounded border text-xs text-center font-semibold transition-all ${
                    language === lang.code ? 'bg-[#0078D4] text-white border-[#0078D4]' : 'bg-[#1E1E1E] text-gray-300 border-white/10'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
          <div className="w-[460px] bg-[#2D2D2D] border border-[#3F3F46] rounded-xl shadow-2xl overflow-hidden text-white animate-scale-up">
            <div className="p-4 bg-[#242424] border-b border-[#3F3F46] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0078D4]" />
                <span>{translate('settings.addUser')}</span>
              </h3>
              <button onClick={() => setShowAddUserModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateUser} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('login.username')} *</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={e => setNewUsername(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={newFullName}
                  onChange={e => setNewFullName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">{translate('login.role')}</label>
                <select
                  value={newRole}
                  onChange={e => setNewRole(e.target.value as UserRole)}
                  className="w-full px-3 py-1.5 bg-[#181818] border border-white/20 rounded text-xs text-white"
                >
                  <option value="admin">{translate('settings.roleAdmin')}</option>
                  <option value="user">{translate('settings.roleUser')}</option>
                  <option value="viewer">{translate('settings.roleViewer')}</option>
                </select>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
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
