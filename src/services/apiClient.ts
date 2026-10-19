const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5080').replace(/\/+$/, '');

let accessToken: string | null = null;

export interface ApiCompany {
  companyId: string;
  code: string;
  name: string;
  nameEn: string;
  currency: string;
  language: string;
}

export interface InitialCompanyRequest {
  companyCode: string;
  companyNameAr: string;
  companyNameEn: string;
  adminUsername: string;
  adminPassword: string;
  adminFullName: string;
  email?: string;
  phone?: string;
  address?: string;
  commercialRegistration?: string;
  currencyCode?: string;
  languageCode?: string;
}

export interface AuthenticatedSession {
  accessToken: string;
  expiresAt: string;
  userId: string;
  companyId: string;
  username: string;
  fullName: string;
  fullNameEn: string;
  email: string;
  roleCode: string;
  permissions: string[];
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
  } catch {
    throw new Error('api_unavailable');
  }

  if (!response.ok) {
    let code = 'api_request_failed';
    try {
      const payload = await response.json() as { error?: string };
      if (payload.error) code = payload.error;
    } catch {
      // Keep the generic failure code for non-JSON error responses.
    }
    throw new Error(code);
  }

  if (response.status === 204) return undefined as T;
  return await response.json() as T;
}

export const apiClient = {
  listCompanies: () => request<ApiCompany[]>('/api/companies'),
  createInitialCompany: (data: InitialCompanyRequest) =>
    request<{ companyId: string; companyCode: string; userId: string; username: string }>(
      '/api/setup/initial-company', { method: 'POST', body: JSON.stringify(data) }),
  async login(username: string, password: string, companyId: string): Promise<AuthenticatedSession> {
    const session = await request<AuthenticatedSession>('/api/auth/login', {
      method: 'POST', body: JSON.stringify({ username, password, companyId })
    });
    accessToken = session.accessToken;
    return session;
  },
  async logout(): Promise<void> {
    try {
      if (accessToken) await request<void>('/api/auth/logout', { method: 'POST' });
    } finally {
      accessToken = null;
    }
  },
  clearLocalSession(): void {
    accessToken = null;
  }
};
