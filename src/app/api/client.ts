import { getToken } from '../auth/session';

export type ApiValidationErrors = Record<string, string[]>;

export type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: ApiValidationErrors;
  error?: string;
};

export class ApiError extends Error {
  status: number;
  errors?: ApiValidationErrors;

  constructor(message: string, status: number, errors?: ApiValidationErrors) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || '').replace(/\/+$/, '');

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = API_BASE_URL ? `${API_BASE_URL}${normalizedPath}` : normalizedPath;
  const token = getToken();

  const headers: HeadersInit = {
    'Accept': 'application/json',
    ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    ...(init.headers || {}),
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };

  const res = await fetch(url, { ...init, headers });
  let json: ApiEnvelope<T> | null = null;
  try {
    json = await res.json();
  } catch {
    // ignore json parse errors, will throw below
  }

  if (!res.ok || (json && json.success === false)) {
    const message = json?.message || json?.error || `Request failed with status ${res.status}`;
    throw new ApiError(message, res.status, json?.errors);
  }

  if (!json) {
    throw new ApiError('Empty response from server', res.status || 0);
  }

  return (json.data as T);
}


