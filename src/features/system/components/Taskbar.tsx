/**
 * features/system/components/Taskbar.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { useState, useEffect, useRef } from 'react';
import { AppConfig, WindowState } from '@/shared/types';
import { cn } from '@/shared/lib/utils';
import { Command, X, Maximize2, Minimize2, Focus, Pin, PinOff, Play, Languages } from 'lucide-react';
import { Calendar } from './Calendar';
import { StartMenu } from './StartMenu';
import { AnimatePresence, motion } from 'motion/react';
import { useSettings } from '@/features/system/contexts/SettingsContext';
import { useToast } from '@/features/system/contexts/ToastContext';
import { MESSAGES } from '@/shared/i18n/messages';
import { Locale } from '@/shared/i18n/types';

interface TaskbarProps {
  apps: AppConfig[];
  windows: WindowState[];
  activeWindowId: string | null;
  onWindowClick: (id: AppConfig['id']) => void;
  onCloseWindow: (id: AppConfig['id']) => void;
  onMinimizeWindow: (id: AppConfig['id']) => void;
  onMaximizeWindow: (id: AppConfig['id']) => void;
}

export function Taskbar({ 
  apps, 
  windows, 
  activeWindowId, 
  onWindowClick,
  onCloseWindow,
  onMinimizeWindow,
  onMaximizeWindow
}: TaskbarProps) {
  const [time, setTime] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ appId: string, x: number, y: number } | null>(null);
  
  const { pinnedApps, setPinnedApps, locale, setLocale } = useSettings();
  const { addToast } = useToast();

  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarButtonRef = useRef<HTMLButtonElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const languageButtonRef = useRef<HTMLButtonElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        calendarRef.current && 
        !calendarRef.current.contains(e.target as Node) &&
        calendarButtonRef.current &&
        !calendarButtonRef.current.contains(e.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(e.target as Node) &&
        languageButtonRef.current &&
        !languageButtonRef.current.contains(e.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        setContextMenu(null);
      }
    };
    if (isCalendarOpen || isLanguageMenuOpen || contextMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCalendarOpen, isLanguageMenuOpen, contextMenu]);

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-white/20 dark:bg-black/40 backdrop-blur-2xl border-t border-white/20 dark:border-white/10 flex items-center justify-between px-4 z-[150]">
        <div className="flex items-center gap-2 h-full">
          <button 
            ref={startButtonRef}
            onClick={() => setIsStartMenuOpen(!isStartMenuOpen)}
            className={cn(
              "h-8 w-8 flex items-center justify-center rounded-lg transition-colors mr-2",
              isStartMenuOpen ? "bg-white/40 dark:bg-white/20" : "hover:bg-white/20 dark:hover:bg-white/10"
            )}
          >
            <Command className="w-5 h-5 text-gray-900 dark:text-white" />
          </button>
          
          <div className="w-px h-6 bg-black/10 dark:bg-white/20 mx-1" />

          {apps.map((app) => {
            const windowState = windows.find((w) => w.id === app.id);
            const isOpen = !!windowState;
            const isPinned = pinnedApps.includes(app.id);
            const isActive = activeWindowId === app.id && !windowState?.isMinimized;
            
            // Only show if it's pinned OR open. 
            // Also respect hideShortcut if it's not open AND not pinned.
            if (!isOpen && !isPinned) return null;
            if (app.hideShortcut && !isOpen) return null;

            return (
              <button
                key={app.id}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setContextMenu({ appId: app.id, x: rect.left, y: rect.top - 10 });
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  const rect = e.currentTarget.getBoundingClientRect();
                  setContextMenu({ appId: app.id, x: rect.left, y: rect.top - 10 });
                }}
                style={{ willChange: "transform, opacity" }}
                className={cn(
                  "relative h-9 px-3 flex items-center gap-2 rounded-lg transition-all duration-200",
                  isActive ? "bg-white/40 dark:bg-white/20" : "hover:bg-white/20 dark:hover:bg-white/10",
                  !isOpen && "opacity-70 hover:opacity-100"
                )}
              >
                <app.icon className="w-4 h-4 text-gray-900 dark:text-white" />
                {isOpen && (
                  <div 
                    className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-1 rounded-t-full transition-all",
                      isActive ? "bg-gray-900 dark:bg-white" : "bg-gray-900/50 dark:bg-white/50"
                    )} 
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center h-full">
          <button
            ref={languageButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              setIsLanguageMenuOpen((prev) => !prev);
            }}
            className={cn(
              "h-8 px-3 mr-1 rounded-lg transition-colors text-xs font-semibold tracking-wide text-gray-900 dark:text-white/90 flex items-center gap-1.5",
              isLanguageMenuOpen ? "bg-white/40 dark:bg-white/20" : "hover:bg-white/20 dark:hover:bg-white/10"
            )}
            aria-label={locale === 'pt-BR' ? 'Trocar idioma' : 'Change language'}
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{locale}</span>
          </button>

          <button 
            ref={calendarButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              setIsCalendarOpen(!isCalendarOpen);
            }}
            className={cn(
              "flex flex-col items-end justify-center h-full px-3 rounded-lg transition-colors text-gray-900 dark:text-white/90 text-sm font-medium leading-tight",
              isCalendarOpen ? "bg-white/40 dark:bg-white/20" : "hover:bg-white/20 dark:hover:bg-white/10"
            )}
          >
            <span>{time.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })}</span>
            <span className="text-[10px] text-gray-700 dark:text-white/70">{time.toLocaleDateString(locale)}</span>
          </button>
        </div>
      </div>

      <StartMenu 
        apps={apps}
        isOpen={isStartMenuOpen}
        onClose={() => setIsStartMenuOpen(false)}
        onOpenApp={onWindowClick}
        buttonRef={startButtonRef}
      />

      <AnimatePresence>
        {isLanguageMenuOpen && (
          <motion.div
            ref={languageMenuRef}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-14 right-28 z-[180] w-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-2xl rounded-xl overflow-hidden p-1"
          >
            {(['pt-BR', 'en-US'] as Locale[]).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLocale(lang);
                  addToast(MESSAGES[lang].personalize.toastLanguageUpdated, 'success');
                  setIsLanguageMenuOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                  locale === lang
                    ? "bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 font-medium"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {lang}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {contextMenu && (
          <motion.div
            ref={contextMenuRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{ 
              position: 'fixed', 
              left: Math.max(10, contextMenu.x), 
              bottom: window.innerHeight - contextMenu.y,
            }}
            className="w-48 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-2xl rounded-xl overflow-hidden z-[200] py-1 flex flex-col-reverse"
          >
            {/* Flex col reverse so it flows upwards properly from the bottom since we're using ContextMenu from bottom */}
            
            {pinnedApps.includes(contextMenu.appId) ? (
              <button
                onClick={() => { 
                  setPinnedApps(pinnedApps.filter(id => id !== contextMenu.appId)); 
                  setContextMenu(null); 
                }}
                className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
              >
                <PinOff className="w-4 h-4" />
                Desafixar
              </button>
            ) : (
              <button
                onClick={() => { 
                  setPinnedApps([...pinnedApps, contextMenu.appId]); 
                  setContextMenu(null); 
                }}
                className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 transition-colors"
              >
                <Pin className="w-4 h-4" />
                Fixar na barra
              </button>
            )}

            <div className="h-px bg-gray-200 dark:bg-gray-700 my-1 mx-2" />

            {windows.find(w => w.id === contextMenu.appId) ? (
              <>
                <button
                  onClick={() => { onCloseWindow(contextMenu.appId); setContextMenu(null); }}
                  className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-red-500 hover:text-white text-red-600 dark:text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Fechar Janela
                </button>
                <button
                  onClick={() => { onMaximizeWindow(contextMenu.appId); setContextMenu(null); }}
                  className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-blue-500 hover:text-white text-gray-700 dark:text-gray-200 transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                  Maximizar
                </button>
                <button
                  onClick={() => { onMinimizeWindow(contextMenu.appId); setContextMenu(null); }}
                  className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-blue-500 hover:text-white text-gray-700 dark:text-gray-200 transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                  Minimizar
                </button>
                <button
                  onClick={() => { onWindowClick(contextMenu.appId); setContextMenu(null); }}
                  className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-blue-500 hover:text-white text-gray-700 dark:text-gray-200 transition-colors"
                >
                  <Focus className="w-4 h-4" />
                  Focar / Restaurar
                </button>
              </>
            ) : (
              <button
                onClick={() => { onWindowClick(contextMenu.appId); setContextMenu(null); }}
                className="w-full px-4 py-2 text-left text-sm flex items-center gap-2 hover:bg-blue-500 hover:text-white text-gray-700 dark:text-gray-200 transition-colors"
              >
                <Play className="w-4 h-4" />
                Abrir aplicativo
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCalendarOpen && (
          <motion.div
            ref={calendarRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-14 right-4 z-[150]"
          >
            <Calendar />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
