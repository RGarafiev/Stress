import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type ModalId =
  | 'login'
  | 'register'
  | 'reset-password'
  | 'confirm-email'
  | 'profile'
  | 'signup-info'
  | 'reset-info';

export type ModalContextValue = {
  open: (id: ModalId) => void;
  close: () => void;
  isOpen: (id?: ModalId) => boolean;
  current: ModalId | null;
};

export const RESET_INFO_MODAL_ID: ModalId = 'reset-info';

const ModalContext = createContext<ModalContextValue | null>(null);

export const useModal = (): ModalContextValue => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [current, setCurrent] = useState<ModalId | null>(null);

  const open = useCallback((id: ModalId) => setCurrent(id), []);
  const close = useCallback(() => setCurrent(null), []);
  const isOpen = useCallback((id?: ModalId) => (id ? current === id : current !== null), [current]);

  const value = useMemo<ModalContextValue>(() => ({ open, close, isOpen, current }), [open, close, isOpen, current]);

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};


