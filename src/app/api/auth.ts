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


