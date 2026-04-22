/**
 * app/main.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SettingsProvider } from '@/features/system/contexts/SettingsContext';
import { ToastProvider } from '@/features/system/contexts/ToastContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </SettingsProvider>
  </StrictMode>,
);
