/**
 * features/system/hooks/useWindowManager.ts
 * Portfolio OS module with a specific architectural responsibility.
 */
import { useState, useCallback } from 'react';
import { AppId, WindowState, AppConfig } from '@/shared/types';

export function useWindowManager(apps: AppConfig[]) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<AppId | null>(null);

  const openWindow = useCallback((appId: AppId) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === appId);
      const maxZIndex = prev.length > 0 ? Math.max(...prev.map((w) => w.zIndex)) : 0;
      
      if (existing) {
        return prev.map((w) =>
          w.id === appId
            ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 }
            : w
        );
      }

      const app = apps.find((a) => a.id === appId);
      if (!app) return prev;

      // Calculate center position
      const width = app.defaultSize?.width || 600;
      const height = app.defaultSize?.height || 400;
      const x = Math.max(0, (window.innerWidth - width) / 2) + prev.length * 20;
      const y = Math.max(0, (window.innerHeight - height) / 2) + prev.length * 20;

      return [
        ...prev,
        {
          id: appId,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: maxZIndex + 1,
          position: app.defaultPosition || { x, y },
          size: app.defaultSize || { width, height },
        },
      ];
    });
    setActiveWindowId(appId);
  }, [apps]);

  const closeWindow = useCallback((appId: AppId) => {
    setWindows((prev) => prev.filter((w) => w.id !== appId));
    setActiveWindowId((prev) => (prev === appId ? null : prev));
  }, []);

  const toggleMinimize = useCallback((appId: AppId) => {
    setWindows((prev) => {
      const window = prev.find(w => w.id === appId);
      if (!window) return prev;
      
      const willMinimize = !window.isMinimized;
      
      if (!willMinimize) {
        // If restoring, bring to front
        const maxZIndex = Math.max(...prev.map((w) => w.zIndex));
        setActiveWindowId(appId);
        return prev.map((w) =>
          w.id === appId ? { ...w, isMinimized: false, zIndex: maxZIndex + 1 } : w
        );
      }
      
      // If minimizing, remove focus
      setActiveWindowId(current => current === appId ? null : current);
      return prev.map((w) =>
        w.id === appId ? { ...w, isMinimized: true } : w
      );
    });
  }, []);

  const toggleMaximize = useCallback((appId: AppId) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === appId ? { ...w, isMaximized: !w.isMaximized, snapPosition: null } : w
      )
    );
  }, []);

  const snapWindow = useCallback((appId: AppId, snapPosition: 'left' | 'right' | null) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === appId ? { ...w, snapPosition, isMaximized: false } : w
      )
    );
  }, []);

  const focusWindow = useCallback((appId: AppId) => {
    setWindows((prev) => {
      const maxZIndex = prev.length > 0 ? Math.max(...prev.map((w) => w.zIndex)) : 0;
      const window = prev.find(w => w.id === appId);
      if (window && window.zIndex === maxZIndex) return prev; // Already focused
      
      return prev.map((w) =>
        w.id === appId ? { ...w, zIndex: maxZIndex + 1 } : w
      );
    });
    setActiveWindowId(appId);
  }, []);

  const updateWindowPosition = useCallback((appId: AppId, position: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === appId ? { ...w, position } : w))
    );
  }, []);

  const updateWindowSize = useCallback((appId: AppId, size: { width: number; height: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === appId ? { ...w, size } : w))
    );
  }, []);

  const refreshWindows = useCallback(() => {
    setWindows((prev) =>
      prev.map((w, index) => {
        const app = apps.find((a) => a.id === w.id);
        const width = app?.defaultSize?.width || 600;
        const height = app?.defaultSize?.height || 400;
        const x = Math.max(0, (window.innerWidth - width) / 2) + index * 20;
        const y = Math.max(0, (window.innerHeight - height) / 2) + index * 20;
        return { ...w, position: { x, y } };
      })
    );
  }, [apps]);

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    toggleMinimize,
    toggleMaximize,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    refreshWindows,
    snapWindow,
  };
}
