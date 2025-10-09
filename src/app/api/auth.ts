import { apiFetch } from './client';

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type AuthResponse = {
  token: string;
  user?: { id: string; email: string; name?: string };
};

export type MeResponse = {
  id: number;
  name: string | null;
  email: string;
  email_verified_at?: string | null;
  avatar?: string | null;
  is_admin?: boolean;
};

export async function login(req: LoginRequest): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(req),
  });
}

export async function register(req: RegisterRequest): Promise<AuthResponse> {
  return apiFetch<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(req),
  });
}

export async function logout(): Promise<{ ok: true }> {
  await apiFetch<unknown>('/auth/logout', { method: 'POST' });
  return { ok: true };
}

export async function me(): Promise<MeResponse> {
  // The API returns { success, data } envelope; apiFetch unwraps to data
  return apiFetch<MeResponse>('/auth/me', { method: 'GET' });
}


