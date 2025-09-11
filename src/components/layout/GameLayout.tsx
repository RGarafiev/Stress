import React from 'react';
import { Outlet } from 'react-router-dom';

export const GameLayout: React.FC = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};


