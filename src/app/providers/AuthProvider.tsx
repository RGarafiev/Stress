import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout, me as apiMe } from '../api/auth';
import { requestRefresh } from '../api/client';
import { clearSession, getEmail, getToken, saveSession } from '../auth/session';

export type User = {
  id: string;
  email: string;
};

export type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string, remember?: boolean) => Promise<void>;
  signUp: (params: { name: string; email: string; password: string; passwordConfirmation: string; remember?: boolean }) => Promise<void>;
  signOut: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  confirmEmail: (code: string) => Promise<void>;
  ensureAuthenticated: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Restore session on mount; if token exists, try to fetch current user and require verified email
  useEffect(() => {
    const token = getToken();
    if (!token) return;
    let cancelled = false;
    (async () => {
      try {
        const me = await apiMe();
        if (!cancelled) {
          if (!me.email_verified_at) {
            clearSession();
            return;
          }
          setUser({ id: String(me.id), email: me.email });
        }
      } catch {
        // Fallback to stored email if available
        const storedEmail = getEmail();
        if (storedEmail && !cancelled) {
          setUser({ id: 'self', email: storedEmail });
        }
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isLoading,
    async signIn(email, password, remember = true) {
      setIsLoading(true);
      try {
        const res = await apiLogin({ email, password });
        saveSession(res.token, res.user?.email || email, remember);
        const me = await apiMe();
        if (!me.email_verified_at) {
          clearSession();
          throw new Error('Подтвердите email, чтобы войти в систему');
        }
        setUser({ id: String(me.id), email: me.email });
      } finally {
        setIsLoading(false);
      }
    },
    async signUp({ name, email, password, passwordConfirmation, remember = true }) {
      setIsLoading(true);
      try {
        // Register but do NOT authorize yet; wait for email verification
        await apiRegister({ name, email, password, password_confirmation: passwordConfirmation });
      } finally {
        setIsLoading(false);
      }
    },
    async signOut() {
      setIsLoading(true);
      apiLogout().catch(() => {});
      clearSession();
      setUser(null);
      setIsLoading(false);
    },
    async requestPasswordReset(_email) { /* Not implemented on API spec */ },
    async confirmEmail(_code) { /* Not implemented on API spec */ },
    async ensureAuthenticated() {
      const token = getToken();
      if (token) {
        try {
          const me = await apiMe();
          if (!me.email_verified_at) {
            clearSession();
            return false;
          }
          setUser({ id: String(me.id), email: me.email });
          return true;
        } catch {
          // continue to refresh attempt
        }
      }
      const newToken = await requestRefresh();
      if (newToken) {
        try {
          const me = await apiMe();
          if (!me.email_verified_at) {
            clearSession();
            return false;
          }
          setUser({ id: String(me.id), email: me.email });
          return true;
        } catch {
          return false;
        }
      }
      return false;
    }
  }), [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


