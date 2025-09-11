import React, { createContext, useContext, useMemo, useState } from 'react';

export type User = {
  id: string;
  email: string;
};

export type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  confirmEmail: (code: string) => Promise<void>;
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

  const fakeWait = async (ms: number) => new Promise<void>(r => setTimeout(() => r(), ms));

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isLoading,
    async signIn(email, _password) {
      setIsLoading(true); await fakeWait(500); setIsLoading(false);
      setUser({ id: '1', email });
    },
    async signUp(email, _password) {
      setIsLoading(true); await fakeWait(600); setIsLoading(false);
      setUser({ id: '1', email });
    },
    async signOut() {
      setIsLoading(true); await fakeWait(200); setIsLoading(false);
      setUser(null);
    },
    async requestPasswordReset(_email) { await fakeWait(400); },
    async confirmEmail(_code) { await fakeWait(300); }
  }), [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


