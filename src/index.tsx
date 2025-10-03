import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppProviders } from './app/providers/AppProviders';
import './styles/globals.css';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

export const BASENAME = process.env.PUBLIC_URL;

root.render(
  <React.StrictMode>
    <BrowserRouter basename={BASENAME}>
      <AppProviders>
        <App />
      </AppProviders>
    </BrowserRouter>
  </React.StrictMode>
);


