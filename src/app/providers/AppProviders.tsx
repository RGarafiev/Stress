import React from 'react';
import { AuthProvider } from './AuthProvider';
import { ModalProvider } from './ModalProvider';
import { ToastProvider } from './ToastProvider';

type Props = { children: React.ReactNode };

export const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </AuthProvider>
    </ToastProvider>
  );
};


