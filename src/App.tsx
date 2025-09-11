import React from 'react';
import { AppRoutes } from './app/routes/AppRoutes';
import { ToastViewport } from './components/ui/Toast';
import { AuthModals } from './features/auth/modals/AuthModals';
import { PageBlobs } from './components/ui/BlobElements';

const App: React.FC = () => {
  return (
    <>
      <PageBlobs />
      <AppRoutes />
      <AuthModals />
      <ToastViewport />
    </>
  );
};

export default App;


