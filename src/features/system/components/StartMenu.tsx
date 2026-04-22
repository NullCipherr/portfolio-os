/**
 * features/system/components/StartMenu.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { useState, useRef, useEffect } from 'react';
import { Search, User, ChevronRight } from 'lucide-react';
import { AppConfig } from '@/shared/types';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/shared/lib/utils';
import { useSettings, LIGHT_SURFACE_CLASSES, DARK_SURFACE_CLASSES } from '@/features/system/contexts/SettingsContext';
import { MESSAGES } from '@/shared/i18n/messages';

interface StartMenuProps {
  apps: AppConfig[];
  onOpenApp: (id: AppConfig['id']) => void;
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

export function StartMenu({ apps, onOpenApp, isOpen, onClose, buttonRef }: StartMenuProps) {
  const [search, setSearch] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const { lightSurface, darkSurface, locale } = useSettings();
  const text = MESSAGES[locale];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, buttonRef]);

  // Reset search when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setSearch(''), 200);
    }
  }, [isOpen]);

  const filteredApps = apps.filter(app => 
    !app.hideShortcut && app.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom left' }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="fixed bottom-12 left-0 w-[440px] h-[520px] bg-white/40 dark:bg-black/50 backdrop-blur-xl border border-white/50 dark:border-gray-600/50 shadow-[0_0_20px_rgba(0,0,0,0.3)] rounded-tr-xl z-[200] p-1.5 flex"
        >
          {/* Left Column - Programs */}
          <div className={cn(
            "flex-1 border border-gray-300 dark:border-gray-700/50 rounded-l-md flex flex-col overflow-hidden",
            LIGHT_SURFACE_CLASSES[lightSurface],
            DARK_SURFACE_CLASSES[darkSurface]
          )}>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredApps.map(app => (
                <button
                  key={app.id}
                  onClick={() => { onOpenApp(app.id); onClose(); }}
                  className="w-full flex items-center gap-3 p-2 rounded hover:bg-blue-500 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-transparent group-hover:scale-110 transition-transform">
                    <app.icon className="w-6 h-6 text-blue-500 dark:text-blue-400 group-hover:text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-white">
                    {app.title}
                  </span>
                </button>
              ))}
              {filteredApps.length === 0 && (
                <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-400">
                  {text.startMenu.noPrograms}
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="p-3 border-t border-gray-200/50 dark:border-gray-700/50 bg-black/5 dark:bg-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  placeholder={text.startMenu.searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-sm transition-all shadow-inner"
                  autoFocus
                />
              </div>
            </div>
          </div>

          {/* Right Column - System Links */}
          <div className="w-[160px] bg-[#d3e5fa]/90 dark:bg-gray-900/90 border-y border-r border-gray-300 dark:border-gray-700 rounded-r-md flex flex-col relative">
            {/* User Avatar */}
            <div className="absolute -top-8 right-4 w-14 h-14 bg-white dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-600 shadow-md flex items-center justify-center overflow-hidden z-10">
              <User className="w-8 h-8 text-gray-400" />
            </div>

            <div className="mt-10 px-2 flex-1 flex flex-col gap-1">
              <button onClick={() => { onOpenApp('about'); onClose(); }} className="text-left px-3 py-1.5 text-sm font-bold text-[#1e395b] dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10 rounded transition-colors">
                {text.startMenu.visitor}
              </button>
              
              <div className="h-px bg-gradient-to-r from-transparent via-gray-400/50 dark:via-gray-600 to-transparent my-1" />
              
              <button onClick={() => { onOpenApp('curriculum'); onClose(); }} className="text-left px-3 py-1.5 text-sm font-medium text-[#1e395b] dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10 rounded transition-colors">
                {text.startMenu.documents}
              </button>
              <button onClick={() => { onOpenApp('projects'); onClose(); }} className="text-left px-3 py-1.5 text-sm font-medium text-[#1e395b] dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10 rounded transition-colors">
                {text.startMenu.projects}
              </button>
              
              <div className="h-px bg-gradient-to-r from-transparent via-gray-400/50 dark:via-gray-600 to-transparent my-1" />
              
              <button onClick={() => { onOpenApp('personalize'); onClose(); }} className="text-left px-3 py-1.5 text-sm font-medium text-[#1e395b] dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10 rounded transition-colors">
                {text.startMenu.controlPanel}
              </button>
              <button onClick={() => { onOpenApp('terminal'); onClose(); }} className="text-left px-3 py-1.5 text-sm font-medium text-[#1e395b] dark:text-gray-200 hover:bg-white/50 dark:hover:bg-white/10 rounded transition-colors">
                {text.startMenu.terminal}
              </button>
            </div>

            {/* Shutdown Button Area */}
            <div className="p-3 flex justify-end items-center">
              <div className="flex items-center bg-white/50 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 rounded shadow-sm hover:bg-white/80 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-gray-800 dark:text-gray-200">
                  {text.startMenu.shutdown}
                </button>
                <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                <button className="px-1.5 py-1 text-gray-800 dark:text-gray-200">
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
