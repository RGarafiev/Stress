const TOKEN_KEY = 'auth_token';
const EMAIL_KEY = 'auth_email';

export function saveSession(token: string, email?: string, remember = true): void {
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem(TOKEN_KEY, token);
  if (email) storage.setItem(EMAIL_KEY, email);
}

export function clearSession(): void {
  try { localStorage.removeItem(TOKEN_KEY); } catch {}
  try { localStorage.removeItem(EMAIL_KEY); } catch {}
  try { sessionStorage.removeItem(TOKEN_KEY); } catch {}
  try { sessionStorage.removeItem(EMAIL_KEY); } catch {}
}

export function getToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
}

export function getEmail(): string | null {
  return sessionStorage.getItem(EMAIL_KEY) || localStorage.getItem(EMAIL_KEY);
}


