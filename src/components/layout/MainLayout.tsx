import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteHeader } from '../shared/SiteHeader';
import { SiteFooter } from '../shared/SiteFooter';
import { ScrollToTop } from '../shared/ScrollToTop';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isPrivacy = location.pathname === '/privacy';
  return (
    <div>
      {!isHome && <SiteHeader translucent={!isPrivacy} />}
      <main className={isHome ? "" : "container"} style={isHome ? { paddingTop: 0, paddingBottom: 0 } : { paddingTop: 32, paddingBottom: 48 }}>
        <Outlet />
      </main>
      <ScrollToTop />
      <SiteFooter />
    </div>
  );
};


