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

// Ensure refreshed token is stored in the same place as the current one (session vs local)
export function saveRefreshedToken(token: string): void {
  try {
    const hasSession = sessionStorage.getItem(TOKEN_KEY) !== null;
    const hasLocal = localStorage.getItem(TOKEN_KEY) !== null;

    if (hasSession && !hasLocal) {
      sessionStorage.setItem(TOKEN_KEY, token);
      return;
    }
    if (!hasSession && hasLocal) {
      localStorage.setItem(TOKEN_KEY, token);
      return;
    }
    if (hasSession && hasLocal) {
      // Prefer session storage when both exist, and remove local to avoid ambiguity
      sessionStorage.setItem(TOKEN_KEY, token);
      try { localStorage.removeItem(TOKEN_KEY); } catch {}
      return;
    }
    // Default: persist to local storage (remembered session)
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // As a fallback, attempt to write somewhere to avoid losing the token entirely
    try { localStorage.setItem(TOKEN_KEY, token); } catch {}
  }
}


