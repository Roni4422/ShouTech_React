import React, { useMemo, useState } from 'react';
import { Search, UserPlus, ShieldCheck, UserRound, UserX, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const UsersView: React.FC = () => {
  const { users, addUser, updateUser, currentUser } = useApp();
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [fullNameEn, setFullNameEn] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [formError, setFormError] = useState('');

  const filteredUsers = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase();
    if (!needle) return users;
    return users.filter(user =>
      [user.username, user.fullName, user.fullNameEn, user.email, user.role]
        .some(value => value.toLocaleLowerCase().includes(needle))
    );
  }, [users, query]);

  const handleCreate = (event: React.FormEvent) => {
    event.preventDefault();
    const normalized = username.trim().toLocaleLowerCase();
    if (!normalized || !fullName.trim()) {
      setFormError('Username and full name are required.');
      return;
    }
    if (users.some(user => user.username.trim().toLocaleLowerCase() === normalized)) {
      setFormError('This username already exists. Choose a unique username.');
      return;
    }
    if (role === 'admin' && !window.confirm('Grant full administrator privileges to this account?')) return;
    addUser({
      username: username.trim(),
      fullName: fullName.trim(),
      fullNameEn: fullNameEn.trim() || fullName.trim(),
      email: email.trim(),
      role,
      active: true,
      permissions: role === 'admin' ? ['all'] : role === 'viewer' ? ['read'] : ['operations']
    });
    setShowForm(false);
    setUsername('');
    setFullName('');
    setFullNameEn('');
    setEmail('');
    setRole('user');
    setFormError('');
  };

  const activeCount = users.filter(user => user.active).length;
  const adminCount = users.filter(user => user.active && user.role === 'admin').length;

  return (
    <section className="h-full overflow-y-auto bg-[#1E1E1E] p-5 text-white md:p-7">
      <header className="mb-6 flex flex-col gap-4 border-b border-[#383838] pb-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-sky-400"><ShieldCheck className="h-4 w-4" /> Security & access governance</div>
          <h1 className="text-2xl font-bold">User administration</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-400">Manage user profiles, access roles and account availability for this application session.</p>
        </div>
        <button onClick={() => { setShowForm(value => !value); setFormError(''); }} disabled={currentUser?.role !== 'admin'} className="inline-flex items-center justify-center gap-2 rounded-md bg-[#0078D4] px-4 py-2.5 text-sm font-semibold hover:bg-[#1687dc] disabled:cursor-not-allowed disabled:opacity-40"><UserPlus className="h-4 w-4" /> Create user</button>
      </header>

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-[#383838] bg-[#252526] p-4"><p className="text-xs text-gray-400">Total accounts</p><p className="mt-2 text-2xl font-semibold">{users.length}</p></div>
        <div className="rounded-lg border border-[#383838] bg-[#252526] p-4"><p className="text-xs text-gray-400">Active accounts</p><p className="mt-2 text-2xl font-semibold text-emerald-400">{activeCount}</p></div>
        <div className="rounded-lg border border-[#383838] bg-[#252526] p-4"><p className="text-xs text-gray-400">Active administrators</p><p className="mt-2 text-2xl font-semibold text-sky-400">{adminCount}</p></div>
      </div>

      {showForm && <form onSubmit={handleCreate} className="mb-5 rounded-lg border border-[#3f3f46] bg-[#252526] p-5">
        <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold">New user account</h2><span className="text-xs text-gray-500">Required fields marked *</span></div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <label className="text-xs text-gray-300">Username *<input autoComplete="off" value={username} onChange={e => setUsername(e.target.value)} className="mt-1.5 w-full rounded border border-[#484848] bg-[#181818] px-3 py-2 text-sm text-white outline-none focus:border-sky-500" required /></label>
          <label className="text-xs text-gray-300">Full name *<input value={fullName} onChange={e => setFullName(e.target.value)} className="mt-1.5 w-full rounded border border-[#484848] bg-[#181818] px-3 py-2 text-sm text-white outline-none focus:border-sky-500" required /></label>
          <label className="text-xs text-gray-300">English name<input value={fullNameEn} onChange={e => setFullNameEn(e.target.value)} className="mt-1.5 w-full rounded border border-[#484848] bg-[#181818] px-3 py-2 text-sm text-white outline-none focus:border-sky-500" /></label>
          <label className="text-xs text-gray-300">Email address<input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5 w-full rounded border border-[#484848] bg-[#181818] px-3 py-2 text-sm text-white outline-none focus:border-sky-500" /></label>
          <label className="text-xs text-gray-300 sm:col-span-2">Access role<select value={role} onChange={e => setRole(e.target.value as UserRole)} className="mt-1.5 w-full rounded border border-[#484848] bg-[#181818] px-3 py-2 text-sm text-white"><option value="viewer">Viewer — read-only intent</option><option value="user">Standard user</option><option value="admin">Administrator — full permissions</option></select></label>
        </div>
        {formError && <p role="alert" className="mt-3 text-sm text-rose-300">{formError}</p>}
        <div className="mt-4 flex justify-end gap-2"><button type="button" onClick={() => setShowForm(false)} className="rounded border border-[#484848] px-4 py-2 text-sm text-gray-300 hover:bg-white/5">Cancel</button><button type="submit" className="rounded bg-[#0078D4] px-4 py-2 text-sm font-semibold hover:bg-[#1687dc]">Create account</button></div>
      </form>}

      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><h2 className="text-sm font-semibold">Registered accounts <span className="ms-2 rounded bg-white/10 px-2 py-0.5 text-xs text-gray-300">{filteredUsers.length}</span></h2><label className="relative block sm:w-80"><Search className="absolute start-3 top-2.5 h-4 w-4 text-gray-500" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search name, username, email or role…" className="w-full rounded-md border border-[#383838] bg-[#252526] py-2 ps-9 pe-3 text-sm outline-none focus:border-sky-500" /></label></div>

      <div className="overflow-x-auto rounded-lg border border-[#383838]">
        <table className="w-full min-w-[760px] text-start text-sm">
          <thead className="bg-[#252526] text-xs text-gray-400"><tr><th className="px-4 py-3 text-start font-medium">Account</th><th className="px-4 py-3 text-start font-medium">Role</th><th className="px-4 py-3 text-start font-medium">Email</th><th className="px-4 py-3 text-start font-medium">Last sign-in</th><th className="px-4 py-3 text-start font-medium">Status</th><th className="px-4 py-3 text-end font-medium">Action</th></tr></thead>
          <tbody className="divide-y divide-[#383838]">
            {filteredUsers.map(user => <tr key={user.id} className="hover:bg-white/[0.025]">
              <td className="px-4 py-3"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500/10 text-sky-300"><UserRound className="h-4 w-4" /></span><span><span className="block font-medium">{user.fullName}</span><span className="block text-xs text-gray-500">@{user.username}{currentUser?.id === user.id ? ' · You' : ''}</span></span></div></td>
              <td className="px-4 py-3"><select aria-label={'Role for ' + user.username} value={user.role} onChange={e => updateUser(user.id, { role: e.target.value as UserRole, permissions: e.target.value === 'admin' ? ['all'] : e.target.value === 'viewer' ? ['read'] : ['operations'] })} className="rounded border border-[#414141] bg-[#202020] px-2 py-1.5 text-xs" disabled={currentUser?.role !== 'admin'}><option value="admin">Administrator</option><option value="user">Standard user</option><option value="viewer">Viewer</option></select></td>
              <td className="px-4 py-3 text-gray-300">{user.email || '—'}</td><td className="px-4 py-3 text-xs text-gray-400">{user.lastLogin || 'Never recorded'}</td>
              <td className="px-4 py-3"><span className={'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ' + (user.active ? 'bg-emerald-500/10 text-emerald-300' : 'bg-gray-500/15 text-gray-400')}><span className={'h-1.5 w-1.5 rounded-full ' + (user.active ? 'bg-emerald-400' : 'bg-gray-500')} />{user.active ? 'Active' : 'Inactive'}</span></td>
              <td className="px-4 py-3 text-end"><button onClick={() => updateUser(user.id, { active: !user.active })} disabled={currentUser?.role !== 'admin' || currentUser.id === user.id} title={currentUser?.role !== 'admin' ? 'Administrator role required' : currentUser.id === user.id ? 'You cannot deactivate your own account' : user.active ? 'Deactivate account' : 'Activate account'} className="inline-flex items-center gap-1.5 rounded border border-[#454545] px-2.5 py-1.5 text-xs text-gray-300 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40">{user.active ? <><UserX className="h-3.5 w-3.5" /> Deactivate</> : <><CheckCircle2 className="h-3.5 w-3.5" /> Activate</>}</button></td>
            </tr>)}
            {filteredUsers.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-sm text-gray-500"><AlertTriangle className="mx-auto mb-2 h-5 w-5" />No matching accounts found.</td></tr>}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs leading-5 text-amber-200/80"><strong>Implementation boundary:</strong> this screen updates shared in-memory application state and audit events. It does not provision credentials or persist accounts to a server/database; those require authenticated backend and database integration.</p>
    </section>
  );
};
