import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../api/auth';
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

  // Restore session on mount (best-effort from stored email)
  useEffect(() => {
    const token = getToken();
    const storedEmail = getEmail();
    if (token && storedEmail && !user) {
      setUser({ id: 'self', email: storedEmail });
    }
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
        setUser({ id: res.user?.id || 'self', email: res.user?.email || email });
      } finally {
        setIsLoading(false);
      }
    },
    async signUp({ name, email, password, passwordConfirmation, remember = true }) {
      setIsLoading(true);
      try {
        const res = await apiRegister({ name, email, password, password_confirmation: passwordConfirmation });
        saveSession(res.token, res.user?.email || email, remember);
        setUser({ id: res.user?.id || 'self', email: res.user?.email || email });
      } finally {
        setIsLoading(false);
      }
    },
    async signOut() {
      setIsLoading(true);
      try {
        await apiLogout();
      } catch {
        // ignore logout errors
      } finally {
        clearSession();
        setUser(null);
        setIsLoading(false);
      }
    },
    async requestPasswordReset(_email) { /* Not implemented on API spec */ },
    async confirmEmail(_code) { /* Not implemented on API spec */ },
    async ensureAuthenticated() {
      if (getToken()) return true;
      const newToken = await requestRefresh();
      if (newToken) {
        const email = getEmail();
        setUser(prev => prev || (email ? { id: 'self', email } : { id: 'self', email: 'user@example.com' }));
        return true;
      }
      return false;
    }
  }), [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


