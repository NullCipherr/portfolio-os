/**
 * features/tools/components/Personalize.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { useState } from 'react';
import { Monitor, Moon, Sun, LayoutGrid, MousePointer2, Settings2, Image as ImageIcon, PanelBottom, Info, Languages, Type } from 'lucide-react';
import { useSettings, LightSurfaceColor, DarkSurfaceColor, UIFont } from '@/features/system/contexts/SettingsContext';
import { useToast } from '@/features/system/contexts/ToastContext';
import { cn } from '@/shared/lib/utils';
import { MESSAGES } from '@/shared/i18n/messages';
import { Locale } from '@/shared/i18n/types';

const WALLPAPERS = [
  'https://picsum.photos/seed/desktopbg/1920/1080',
  'https://picsum.photos/seed/bg1/1920/1080',
  'https://picsum.photos/seed/bg2/1920/1080',
  'https://picsum.photos/seed/bg3/1920/1080',
  'https://picsum.photos/seed/bg4/1920/1080',
  'https://picsum.photos/seed/bg5/1920/1080',
];

export function Personalize() {
  const { 
    theme, setTheme, 
    wallpaper, setWallpaper,
    iconSize, setIconSize,
    iconLayout, setIconLayout,
    sortBy, setSortBy,
    glassColor, setGlassColor,
    lightSurface, setLightSurface,
    darkSurface, setDarkSurface,
    locale, setLocale,
    uiFont, setUIFont
  } = useSettings();
  const { addToast } = useToast();
  const text = MESSAGES[locale];

  const [activeTab, setActiveTab] = useState<'appearance' | 'wallpaper' | 'desktop' | 'taskbar' | 'language' | 'fonts' | 'system'>('appearance');

  return (
    <div className="flex h-full bg-transparent transition-colors">
      <div className="w-64 bg-black/5 dark:bg-white/5 border-r border-gray-200/50 dark:border-gray-700/50 p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{text.personalize.settings}</h2>
        <nav className="space-y-1">
          <button 
            onClick={() => setActiveTab('appearance')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors",
              activeTab === 'appearance' 
                ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <Monitor className="w-5 h-5" />
            {text.personalize.appearance}
          </button>
          <button 
            onClick={() => setActiveTab('wallpaper')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors",
              activeTab === 'wallpaper' 
                ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <ImageIcon className="w-5 h-5" />
            {text.personalize.wallpaper}
          </button>
          <button 
            onClick={() => setActiveTab('desktop')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors",
              activeTab === 'desktop' 
                ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <Settings2 className="w-5 h-5" />
            {text.personalize.desktop}
          </button>
          <button 
            onClick={() => setActiveTab('taskbar')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors",
              activeTab === 'taskbar' 
                ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <PanelBottom className="w-5 h-5" />
            {text.personalize.taskbar}
          </button>
          <button 
            onClick={() => setActiveTab('language')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors",
              activeTab === 'language' 
                ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <Languages className="w-5 h-5" />
            {text.personalize.languages}
          </button>
          <button 
            onClick={() => setActiveTab('fonts')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors",
              activeTab === 'fonts' 
                ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <Type className="w-5 h-5" />
            {text.personalize.fonts}
          </button>
          <button 
            onClick={() => setActiveTab('system')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors",
              activeTab === 'system' 
                ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <Info className="w-5 h-5" />
            {text.personalize.system}
          </button>
        </nav>
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          {activeTab === 'appearance' && text.personalize.appearance}
          {activeTab === 'wallpaper' && text.personalize.wallpaper}
          {activeTab === 'desktop' && text.personalize.desktop}
          {activeTab === 'taskbar' && text.personalize.taskbar}
          {activeTab === 'language' && text.personalize.languages}
          {activeTab === 'fonts' && text.personalize.fonts}
          {activeTab === 'system' && text.personalize.system}
        </h1>
        
        {activeTab === 'appearance' && (
          <div className="space-y-8">
            {/* Theme Toggle */}
            <section>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-4">{text.personalize.colorMode}</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => { setTheme('light'); addToast(text.personalize.toastThemeLight, 'success'); }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors",
                    theme === 'light' 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                      : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  )}
                >
                  <Sun className="w-5 h-5" />
                  {text.personalize.light}
                </button>
                <button
                  onClick={() => { setTheme('dark'); addToast(text.personalize.toastThemeDark, 'success'); }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors",
                    theme === 'dark' 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                      : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  )}
                >
                  <Moon className="w-5 h-5" />
                  {text.personalize.dark}
                </button>
              </div>
            </section>

            {/* Surface Color (Fundo de Janelas) */}
            <section>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-4">
                {text.personalize.windowBackground} ({theme === 'light' ? text.personalize.light : text.personalize.dark})
              </h3>
              <div className="flex flex-wrap gap-4">
                {theme === 'light' ? (
                  [
                    { id: 'white', bg: 'bg-white', label: 'Branco' },
                    { id: 'gray', bg: 'bg-gray-100', label: 'Cinza Claro' },
                    { id: 'cream', bg: 'bg-amber-50', label: 'Creme' },
                    { id: 'sky', bg: 'bg-sky-50', label: 'Azul Gelo' },
                    { id: 'rose', bg: 'bg-rose-50', label: 'Rosa Claro' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setLightSurface(c.id as LightSurfaceColor)}
                      title={c.label}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 shadow-sm",
                        c.bg, "border-gray-200",
                        lightSurface === c.id ? "ring-2 ring-offset-2 ring-blue-500 scale-110" : ""
                      )}
                      aria-label={`Cor ${c.label}`}
                    />
                  ))
                ) : (
                  [
                    { id: 'gray', bg: 'bg-gray-900', label: 'Cinza Escuro' },
                    { id: 'slate', bg: 'bg-slate-900', label: 'Azul Marinho' },
                    { id: 'black', bg: 'bg-black', label: 'Preto Profundo' },
                    { id: 'zinc', bg: 'bg-zinc-900', label: 'Carbono' },
                    { id: 'indigo', bg: 'bg-indigo-950', label: 'Roxo Escuro' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setDarkSurface(c.id as DarkSurfaceColor)}
                      title={c.label}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 shadow-sm",
                        c.bg, "border-gray-600",
                        darkSurface === c.id ? "ring-2 ring-offset-2 ring-blue-500 ring-offset-gray-900 scale-110" : ""
                      )}
                      aria-label={`Cor ${c.label}`}
                    />
                  ))
                )}
              </div>
            </section>

            {/* Glass Color Selection */}
            <section>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-4">{text.personalize.accentColor}</h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { id: 'white', color: 'bg-white/50 dark:bg-white/20', border: 'border-gray-300 dark:border-gray-600' },
                  { id: 'red', color: 'bg-red-500', border: 'border-red-600' },
                  { id: 'orange', color: 'bg-orange-500', border: 'border-orange-600' },
                  { id: 'amber', color: 'bg-amber-500', border: 'border-amber-600' },
                  { id: 'yellow', color: 'bg-yellow-500', border: 'border-yellow-600' },
                  { id: 'green', color: 'bg-green-500', border: 'border-green-600' },
                  { id: 'emerald', color: 'bg-emerald-500', border: 'border-emerald-600' },
                  { id: 'teal', color: 'bg-teal-500', border: 'border-teal-600' },
                  { id: 'cyan', color: 'bg-cyan-500', border: 'border-cyan-600' },
                  { id: 'sky', color: 'bg-sky-500', border: 'border-sky-600' },
                  { id: 'blue', color: 'bg-blue-500', border: 'border-blue-600' },
                  { id: 'indigo', color: 'bg-indigo-500', border: 'border-indigo-600' },
                  { id: 'purple', color: 'bg-purple-500', border: 'border-purple-600' },
                  { id: 'fuchsia', color: 'bg-fuchsia-500', border: 'border-fuchsia-600' },
                  { id: 'pink', color: 'bg-pink-500', border: 'border-pink-600' },
                  { id: 'rose', color: 'bg-rose-500', border: 'border-rose-600' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setGlassColor(c.id as any); addToast(text.personalize.toastAccentUpdated, 'success'); }}
                    className={cn(
                      "w-10 h-10 rounded-full border-2 transition-transform hover:scale-110",
                      c.color,
                      glassColor === c.id ? "ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-900 scale-110" : c.border
                    )}
                    aria-label={`Cor ${c.id}`}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'wallpaper' && (
          <div className="space-y-8">
            {/* Wallpaper Selection */}
            <section>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-4">{text.personalize.chooseWallpaper}</h3>
              
              <div className="aspect-video w-full max-w-md rounded-xl overflow-hidden border-4 border-gray-200 dark:border-gray-700 shadow-sm relative mb-6">
                <img 
                  src={wallpaper} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md">
                {WALLPAPERS.map((wp, i) => (
                  <button 
                    key={i} 
                    onClick={() => { setWallpaper(wp); addToast(text.personalize.toastWallpaperUpdated, 'success'); }}
                    className={cn(
                      "aspect-video rounded-lg overflow-hidden border-2 transition-all",
                      wallpaper === wp 
                        ? "border-blue-500 scale-105 shadow-md" 
                        : "border-transparent hover:border-blue-400/50"
                    )}
                  >
                    <img 
                      src={wp} 
                      alt={`Wallpaper ${i}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'desktop' && (
          <div className="space-y-8">
            {/* Icon Size */}
            <section>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-4">{text.personalize.iconSize}</h3>
              <div className="flex gap-4">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setIconSize(size)}
                    className={cn(
                      "px-4 py-2 rounded-lg border-2 transition-colors capitalize",
                      iconSize === size 
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                        : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                    )}
                  >
                    {size === 'small' ? (locale === 'pt-BR' ? 'Pequeno' : 'Small') : size === 'medium' ? (locale === 'pt-BR' ? 'Médio' : 'Medium') : (locale === 'pt-BR' ? 'Grande' : 'Large')}
                  </button>
                ))}
              </div>
            </section>

            {/* Icon Layout */}
            <section>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-4">{text.personalize.iconLayout}</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setIconLayout('grid')}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors",
                    iconLayout === 'grid' 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                      : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  )}
                >
                  <LayoutGrid className="w-5 h-5" />
                  {text.personalize.alignToGrid}
                </button>
                <button
                  onClick={() => setIconLayout('free')}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors",
                    iconLayout === 'free' 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                      : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  )}
                >
                  <MousePointer2 className="w-5 h-5" />
                  {text.personalize.freeMovement}
                </button>
              </div>
            </section>

            {/* Sorting */}
            <section>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-4">{text.personalize.sortBy}</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => setSortBy('default')}
                  className={cn(
                    "px-4 py-2 rounded-lg border-2 transition-colors",
                    sortBy === 'default' 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                      : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  )}
                >
                  {text.personalize.default}
                </button>
                <button
                  onClick={() => setSortBy('name')}
                  className={cn(
                    "px-4 py-2 rounded-lg border-2 transition-colors",
                    sortBy === 'name' 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400" 
                      : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  )}
                >
                  {text.personalize.name}
                </button>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'taskbar' && (
          <div className="space-y-8">
            <section>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-4">{text.personalize.taskbarBehavior}</h3>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {text.personalize.taskbarBehaviorDescription}
                </p>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'language' && (
          <div className="space-y-8">
            <section>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-4">{text.personalize.language}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{text.personalize.languageDescription}</p>
              <div className="flex gap-4">
                {(['pt-BR', 'en-US'] as Locale[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLocale(lang);
                      addToast(MESSAGES[lang].personalize.toastLanguageUpdated, 'success');
                    }}
                    className={cn(
                      "px-4 py-2 rounded-lg border-2 transition-colors",
                      locale === lang
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400"
                        : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'fonts' && (
          <div className="space-y-8">
            <section>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-4">{text.personalize.fonts}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{text.personalize.fontDescription}</p>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-4xl">
                {([
                  {
                    id: 'system',
                    label: locale === 'pt-BR' ? 'Sistema' : 'System',
                    preview: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
                  },
                  { id: 'segoe', label: 'Segoe UI', preview: '"Segoe UI", "Inter", "Arial", sans-serif' },
                  { id: 'poppins', label: 'Poppins', preview: '"Poppins", "Segoe UI", "Arial", sans-serif' },
                  { id: 'jetbrains', label: 'JetBrains Mono', preview: '"JetBrains Mono", "Consolas", monospace' },
                ] as { id: UIFont; label: string; preview: string }[]).map((font) => (
                  <button
                    key={font.id}
                    onClick={() => {
                      setUIFont(font.id);
                      addToast(text.personalize.toastFontUpdated, 'success');
                    }}
                    className={cn(
                      "p-4 rounded-lg border-2 text-left transition-colors",
                      uiFont === font.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    )}
                  >
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">{font.label}</p>
                    <p
                      className="text-sm text-gray-700 dark:text-gray-300"
                      style={{ fontFamily: font.preview }}
                    >
                      Portfolio OS Interface
                    </p>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-8">
            <section>
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-4">{text.personalize.aboutSystem}</h3>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 space-y-2">
                <p className="text-sm text-gray-900 dark:text-gray-200 font-medium">Portfólio OS v1.0</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {text.personalize.systemDescription}
                </p>
                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    © 2026 {text.personalize.allRightsReserved}
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
