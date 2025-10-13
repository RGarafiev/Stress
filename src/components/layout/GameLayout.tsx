import React from 'react';
import { Outlet } from 'react-router-dom';

export const GameLayout: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh', margin: 0, padding: 0, background: 'transparent', overflow: 'hidden' }}>
      <main style={{ width: '100%', height: '100%', margin: 0, padding: 0, background: 'transparent' }}>
        <Outlet />
      </main>
    </div>
  );
};


