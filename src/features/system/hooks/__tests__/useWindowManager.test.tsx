/**
 * features/system/hooks/__tests__/useWindowManager.test.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import { act, renderHook } from '@testing-library/react';
import { AppConfig } from '@/shared/types';
import { useWindowManager } from '@/features/system/hooks/useWindowManager';

const apps: AppConfig[] = [
  {
    id: 'about',
    title: 'Sobre Mim',
    icon: () => null,
    defaultSize: { width: 600, height: 400 },
  },
  {
    id: 'projects',
    title: 'Projetos',
    icon: () => null,
    defaultSize: { width: 800, height: 500 },
  },
];

describe('useWindowManager', () => {
  it('abre janelas e controla foco/z-index corretamente', () => {
    const { result } = renderHook(() => useWindowManager(apps));

    act(() => result.current.openWindow('about'));
    act(() => result.current.openWindow('projects'));

    expect(result.current.windows).toHaveLength(2);
    expect(result.current.activeWindowId).toBe('projects');

    act(() => result.current.focusWindow('about'));

    const aboutWindow = result.current.windows.find((w) => w.id === 'about');
    const projectsWindow = result.current.windows.find((w) => w.id === 'projects');

    expect(aboutWindow?.zIndex).toBeGreaterThan(projectsWindow?.zIndex ?? 0);
    expect(result.current.activeWindowId).toBe('about');
  });

  it('aplica minimizar/restaurar e snap de janela', () => {
    const { result } = renderHook(() => useWindowManager(apps));

    act(() => result.current.openWindow('about'));
    act(() => result.current.toggleMinimize('about'));

    expect(result.current.windows[0]?.isMinimized).toBe(true);

    act(() => result.current.toggleMinimize('about'));
    expect(result.current.windows[0]?.isMinimized).toBe(false);

    act(() => result.current.snapWindow('about', 'left'));
    expect(result.current.windows[0]?.snapPosition).toBe('left');
  });
});
