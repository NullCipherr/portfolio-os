/**
 * features/system/contexts/SettingsContext.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale } from '@/shared/i18n/types';

export type GlassColor = 'white' | 'blue' | 'purple' | 'green' | 'rose' | 'amber' | 'red' | 'orange' | 'yellow' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'indigo' | 'fuchsia' | 'pink';

export type LightSurfaceColor = 'white' | 'cream' | 'gray' | 'rose' | 'sky';
export type DarkSurfaceColor = 'gray' | 'slate' | 'black' | 'zinc' | 'indigo';
export type UIFont = 'system' | 'segoe' | 'poppins' | 'jetbrains';

export const UI_FONT_FAMILIES: Record<UIFont, string> = {
  system: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  segoe: '"Segoe UI", "Inter", "Arial", sans-serif',
  poppins: '"Poppins", "Segoe UI", "Arial", sans-serif',
  jetbrains: '"JetBrains Mono", "Consolas", monospace',
};

export const LIGHT_SURFACE_CLASSES: Record<LightSurfaceColor, string> = {
  white: 'bg-white/90',
  cream: 'bg-amber-50/90',
  gray: 'bg-gray-100/90',
  rose: 'bg-rose-50/90',
  sky: 'bg-sky-50/90'
};

export const DARK_SURFACE_CLASSES: Record<DarkSurfaceColor, string> = {
  gray: 'dark:bg-gray-900/90',
  slate: 'dark:bg-slate-900/90',
  black: 'dark:bg-black/90',
  zinc: 'dark:bg-zinc-900/90',
  indigo: 'dark:bg-indigo-950/90'
};

interface SettingsContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  wallpaper: string;
  setWallpaper: (url: string) => void;
  iconSize: 'small' | 'medium' | 'large';
  setIconSize: (size: 'small' | 'medium' | 'large') => void;
  iconLayout: 'grid' | 'free';
  setIconLayout: (layout: 'grid' | 'free') => void;
  sortBy: 'default' | 'name';
  setSortBy: (sort: 'default' | 'name') => void;
  glassColor: GlassColor;
  setGlassColor: (color: GlassColor) => void;
  pinnedApps: string[];
  setPinnedApps: (apps: string[]) => void;
  lightSurface: LightSurfaceColor;
  setLightSurface: (color: LightSurfaceColor) => void;
  darkSurface: DarkSurfaceColor;
  setDarkSurface: (color: DarkSurfaceColor) => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  uiFont: UIFont;
  setUIFont: (font: UIFont) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const getSaved = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => getSaved('os_theme', 'dark'));
  const [wallpaper, setWallpaper] = useState(() => getSaved('os_wallpaper', 'https://picsum.photos/seed/desktopbg/1920/1080'));
  const [iconSize, setIconSize] = useState<'small' | 'medium' | 'large'>(() => getSaved('os_iconSize', 'medium'));
  const [iconLayout, setIconLayout] = useState<'grid' | 'free'>(() => getSaved('os_iconLayout', 'grid'));
  const [sortBy, setSortBy] = useState<'default' | 'name'>(() => getSaved('os_sortBy', 'default'));
  const [glassColor, setGlassColor] = useState<GlassColor>(() => getSaved('os_glassColor', 'white'));
  const [pinnedApps, setPinnedApps] = useState<string[]>(() => getSaved('os_pinnedApps', ['browser', 'finder']));
  const [lightSurface, setLightSurface] = useState<LightSurfaceColor>(() => getSaved('os_lightSurface', 'white'));
  const [darkSurface, setDarkSurface] = useState<DarkSurfaceColor>(() => getSaved('os_darkSurface', 'gray'));
  const [locale, setLocale] = useState<Locale>(() => getSaved('os_locale', 'pt-BR'));
  const [uiFont, setUIFont] = useState<UIFont>(() => getSaved('os_uiFont', 'poppins'));

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('os_theme', JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('os_lightSurface', JSON.stringify(lightSurface));
  }, [lightSurface]);

  useEffect(() => {
    localStorage.setItem('os_darkSurface', JSON.stringify(darkSurface));
  }, [darkSurface]);

  useEffect(() => { localStorage.setItem('os_wallpaper', JSON.stringify(wallpaper)); }, [wallpaper]);
  useEffect(() => { localStorage.setItem('os_iconSize', JSON.stringify(iconSize)); }, [iconSize]);
  useEffect(() => { localStorage.setItem('os_iconLayout', JSON.stringify(iconLayout)); }, [iconLayout]);
  useEffect(() => { localStorage.setItem('os_sortBy', JSON.stringify(sortBy)); }, [sortBy]);
  useEffect(() => { localStorage.setItem('os_glassColor', JSON.stringify(glassColor)); }, [glassColor]);
  useEffect(() => { localStorage.setItem('os_pinnedApps', JSON.stringify(pinnedApps)); }, [pinnedApps]);
  useEffect(() => { localStorage.setItem('os_locale', JSON.stringify(locale)); }, [locale]);
  useEffect(() => {
    localStorage.setItem('os_uiFont', JSON.stringify(uiFont));
    document.documentElement.style.setProperty('--os-font-family', UI_FONT_FAMILIES[uiFont]);
  }, [uiFont]);

  return (
    <SettingsContext.Provider value={{ 
      theme, setTheme, 
      wallpaper, setWallpaper,
      iconSize, setIconSize,
      iconLayout, setIconLayout,
      sortBy, setSortBy,
      glassColor, setGlassColor,
      pinnedApps, setPinnedApps,
      lightSurface, setLightSurface,
      darkSurface, setDarkSurface,
      locale, setLocale,
      uiFont, setUIFont
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
}
