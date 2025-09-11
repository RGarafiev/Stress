import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { MainLayout } from '../../components/layout/MainLayout';
import { GameLayout } from '../../components/layout/GameLayout';
import { HomePage } from '../../pages/home/HomePage';
import { GamePage } from '../../pages/game/GamePage';
import { PrivacyPage } from '../../pages/legal/PrivacyPage';
import { TermsPage } from '../../pages/legal/TermsPage';
import { NotFoundPage } from '../../pages/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}> 
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Route>
      <Route element={<GameLayout />}> 
        <Route path="/game" element={<GamePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};


