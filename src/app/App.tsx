/**
 * app/App.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { LayoutGrid, ArrowUpDown, RotateCw, PlusCircle, Monitor, Paintbrush, Copy, Terminal as TerminalIcon } from 'lucide-react';
import { AppConfig } from '@/shared/types';
import { useWindowManager } from '@/features/system/hooks/useWindowManager';
import { Desktop } from '@/features/system/components/Desktop';
import { Taskbar } from '@/features/system/components/Taskbar';
import { Window } from '@/features/system/components/Window';
import { BootScreen } from '@/features/system/components/BootScreen';
import { ContextMenu, ContextMenuItem } from '@/features/system/components/ContextMenu';
import { useSettings } from '@/features/system/contexts/SettingsContext';
import { useToast } from '@/features/system/contexts/ToastContext';
import { ToastContainer } from '@/features/system/components/ToastContainer';
import { useAppRegistry } from '@/features/system/config/appRegistry';
import { MESSAGES } from '@/shared/i18n/messages';

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>(() => {
    try {
      const saved = localStorage.getItem('os_iconPositions');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const { 
    wallpaper, 
    iconSize, setIconSize, 
    iconLayout, setIconLayout, 
    sortBy, setSortBy,
    glassColor,
    locale
  } = useSettings();
  const { addToast } = useToast();
  const { apps, renderAppContent } = useAppRegistry();
  const text = MESSAGES[locale];

  const {
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
  } = useWindowManager(apps);

  const handleTaskbarClick = (appId: AppConfig['id']) => {
    const windowState = windows.find(w => w.id === appId);
    if (!windowState) {
      openWindow(appId);
    } else if (windowState.isMinimized) {
      toggleMinimize(appId);
    } else if (activeWindowId === appId) {
      toggleMinimize(appId);
    } else {
      focusWindow(appId);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 150);
  };

  const handleIconPositionChange = (id: string, delta: { x: number; y: number }) => {
    setIconPositions(prev => {
      const newPositions = {
        ...prev,
        [id]: {
          x: (prev[id]?.x || 0) + delta.x,
          y: (prev[id]?.y || 0) + delta.y
        }
      };
      localStorage.setItem('os_iconPositions', JSON.stringify(newPositions));
      return newPositions;
    });
  };

  const contextMenuItems: ContextMenuItem[] = [
    {
      label: text.contextMenu.view,
      icon: LayoutGrid,
      submenu: [
        { label: text.contextMenu.largeIcons, checked: iconSize === 'large', action: () => setIconSize('large') },
        { label: text.contextMenu.mediumIcons, checked: iconSize === 'medium', action: () => setIconSize('medium') },
        { label: text.contextMenu.smallIcons, checked: iconSize === 'small', action: () => setIconSize('small') },
        { divider: true },
        { label: text.contextMenu.alignToGrid, checked: iconLayout === 'grid', action: () => setIconLayout('grid') },
        { label: text.contextMenu.freeMovement, checked: iconLayout === 'free', action: () => setIconLayout('free') },
      ]
    },
    {
      label: text.contextMenu.sortBy,
      icon: ArrowUpDown,
      submenu: [
        { label: text.contextMenu.default, checked: sortBy === 'default', action: () => setSortBy('default') },
        { label: text.contextMenu.name, checked: sortBy === 'name', action: () => setSortBy('name') },
      ]
    },
    {
      label: text.contextMenu.refresh,
      icon: RotateCw,
      action: handleRefresh
    },
    { divider: true },
    {
      label: text.contextMenu.new,
      icon: PlusCircle,
      submenu: [
        { label: text.contextMenu.folder, action: () => addToast(text.contextMenu.toastFolder, 'success') },
        { label: text.contextMenu.shortcut, action: () => addToast(text.contextMenu.toastShortcut, 'success') },
        { divider: true },
        { label: text.contextMenu.textDocument, action: () => addToast(text.contextMenu.toastTextDocument, 'success') },
      ]
    },
    { divider: true },
    {
      label: text.contextMenu.displaySettings,
      icon: Monitor,
      action: () => addToast(text.contextMenu.toastDisplayNotImplemented, 'info')
    },
    {
      label: text.contextMenu.personalize,
      icon: Paintbrush,
      action: () => openWindow('personalize')
    },
    { divider: true },
    {
      label: text.contextMenu.openInTerminal,
      icon: TerminalIcon,
      action: () => openWindow('terminal')
    },
    { divider: true },
    {
      label: text.contextMenu.moreOptions,
      icon: Copy,
      action: () => addToast(text.contextMenu.toastNoMoreOptions, 'info')
    }
  ];

  return (
    <div 
      className="fixed inset-0 overflow-hidden bg-black select-none"
      style={{ fontFamily: 'var(--os-font-family, "Poppins", "Segoe UI", "Inter", "Arial", sans-serif)' }}
      onContextMenu={(e) => e.preventDefault()} // Prevent default browser context menu globally
    >
      <AnimatePresence>
        {isBooting && <BootScreen onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{ backgroundImage: `url(${wallpaper})` }}
        />
        <div className="absolute inset-0 bg-black/10 dark:bg-black/40 pointer-events-none transition-colors duration-500" />
        
        <Desktop 
          apps={apps} 
          onOpenApp={openWindow} 
          onContextMenu={handleContextMenu}
          iconSize={iconSize}
          sortBy={sortBy}
          isRefreshing={isRefreshing}
          iconLayout={iconLayout}
          iconPositions={iconPositions}
          onIconPositionChange={handleIconPositionChange}
          glassColor={glassColor}
        />

        <AnimatePresence>
          {windows.map((windowState) => {
            const appConfig = apps.find(a => a.id === windowState.id)!;
            return (
              <React.Fragment key={windowState.id}>
                <Window
                  windowState={windowState}
                  appConfig={appConfig}
                  isActive={activeWindowId === windowState.id}
                  onClose={() => closeWindow(windowState.id)}
                  onMinimize={() => toggleMinimize(windowState.id)}
                  onMaximize={() => toggleMaximize(windowState.id)}
                  onSnap={(pos) => snapWindow(windowState.id, pos)}
                  onFocus={() => focusWindow(windowState.id)}
                  onPositionChange={(pos) => updateWindowPosition(windowState.id, pos)}
                  onSizeChange={(size) => updateWindowSize(windowState.id, size)}
                >
                  {renderAppContent({
                    appId: windowState.id,
                    apps,
                    windows,
                    openWindow,
                    closeWindow,
                  })}
                </Window>
              </React.Fragment>
            );
          })}
        </AnimatePresence>

        <Taskbar 
          apps={apps} 
          windows={windows} 
          activeWindowId={activeWindowId}
          onWindowClick={handleTaskbarClick} 
          onCloseWindow={closeWindow}
          onMinimizeWindow={toggleMinimize}
          onMaximizeWindow={toggleMaximize}
        />

        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            items={contextMenuItems}
            onClose={() => setContextMenu(null)}
          />
        )}
        
        <ToastContainer />
    </div>
  );
}
