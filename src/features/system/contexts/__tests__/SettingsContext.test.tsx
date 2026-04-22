/**
 * features/system/contexts/__tests__/SettingsContext.test.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { SettingsProvider, useSettings } from '@/features/system/contexts/SettingsContext';

function wrapper({ children }: { children: React.ReactNode }) {
  return <SettingsProvider>{children}</SettingsProvider>;
}

describe('SettingsContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('inicia com fallback esperado e persiste alterações no localStorage', () => {
    const { result } = renderHook(() => useSettings(), { wrapper });

    expect(result.current.theme).toBe('dark');

    act(() => {
      result.current.setTheme('light');
      result.current.setIconSize('large');
    });

    expect(result.current.theme).toBe('light');
    expect(result.current.iconSize).toBe('large');
    expect(localStorage.getItem('os_theme')).toBe(JSON.stringify('light'));
    expect(localStorage.getItem('os_iconSize')).toBe(JSON.stringify('large'));
  });
});
