import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteHeader } from '../shared/SiteHeader';
import { SiteFooter } from '../shared/SiteFooter';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <div>
      {!isHome && <SiteHeader translucent={false} />}
      <main className={isHome ? "" : "container"} style={isHome ? { paddingTop: 0, paddingBottom: 0 } : { paddingTop: 32, paddingBottom: 48 }}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
};


