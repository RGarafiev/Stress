import { getToken, saveRefreshedToken, clearSession } from '../auth/session';

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

// Always target production API for now to avoid CORS/redirect issues with IP/http or local backend absence
const API_BASE_URL = 'https://stressapi.ru/api';
const REFRESH_ENDPOINT = '/auth/refresh';

async function doFetch<T>(path: string, init: RequestInit = {}): Promise<{ res: Response; json: ApiEnvelope<T> | null }> {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = API_BASE_URL ? `${API_BASE_URL}${normalizedPath}` : normalizedPath;
  const token = getToken();

  // Build headers so that explicit headers passed in init.headers take precedence,
  // especially Authorization when we retry with a refreshed token
  const headers: HeadersInit = {
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    ...(init.headers || {}),
  };

  const res = await fetch(url, { ...init, headers });
  let json: ApiEnvelope<T> | null = null;
  try {
    json = await res.json();
  } catch {
    // ignore json parse errors, will throw below
  }

  return { res, json };
}

export async function requestRefresh(): Promise<string | null> {
  const normalizedPath = REFRESH_ENDPOINT;
  const url = API_BASE_URL ? `${API_BASE_URL}${normalizedPath}` : normalizedPath;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        ...(getToken() ? { 'Authorization': `Bearer ${getToken()}` } : {}),
      },
    });
    const json = (await res.json()) as ApiEnvelope<{ token: string; token_type?: string; expires_in?: number }>;
    if (!res.ok || json.success === false || !json.data?.token) {
      return null;
    }
    const newToken = json.data.token;
    // Persist new token to the same storage where the previous token lived
    saveRefreshedToken(newToken);
    return newToken;
  } catch {
    return null;
  }
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const { res, json } = await doFetch<T>(path, init);

  if (res.status === 401) {
    const newToken = await requestRefresh();
    if (newToken) {
      // Retry original request once with the new token
      const retryInit: RequestInit = {
        ...init,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${newToken}`,
          ...(init.body ? { 'Content-Type': 'application/json' } : {}),
          ...(init.headers || {}),
        },
      };
      const retry = await doFetch<T>(path, retryInit);
      if (!retry.res.ok || (retry.json && retry.json.success === false)) {
        const message = retry.json?.message || retry.json?.error || `Request failed with status ${retry.res.status}`;
        throw new ApiError(message, retry.res.status, retry.json?.errors);
      }
      if (!retry.json) {
        throw new ApiError('Empty response from server', retry.res.status || 0);
      }
      return (retry.json.data as T);
    }
    // If refresh failed, clear session and propagate error
    clearSession();
    const message = json?.message || json?.error || 'Unauthorized';
    throw new ApiError(message, 401, json?.errors);
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


