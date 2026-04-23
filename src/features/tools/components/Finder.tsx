/**
 * features/tools/components/Finder.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { useEffect, useMemo, useState } from 'react';
import {
  Folder, File, ChevronLeft, ChevronRight, LayoutGrid, List,
  Search, Monitor, Download, FileText, Image as ImageIcon,
  Terminal, User, Settings, Mail, FolderGit2, Globe, Gamepad2, Bomb, Rocket, Spade, Type
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useToast } from '@/features/system/contexts/ToastContext';
import { useSettings } from '@/features/system/contexts/SettingsContext';
import { MESSAGES } from '@/shared/i18n/messages';
import { usePortfolioContent } from '@/features/portfolio/config/portfolioContent';

type FileItem = {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'app';
  path: string;
  appId?: string;
  size?: string;
  date?: string;
};

const getIconForFile = (file: FileItem, className = 'w-12 h-12') => {
  if (file.type === 'folder') return <Folder className={cn(className, 'text-blue-400 fill-blue-400/20')} />;
  if (file.appId === 'terminal') return <Terminal className={cn(className, 'text-gray-700 dark:text-gray-300')} />;
  if (file.appId === 'personalize') return <Settings className={cn(className, 'text-gray-700 dark:text-gray-300')} />;
  if (file.appId === 'about') return <User className={cn(className, 'text-blue-500')} />;
  if (file.appId === 'contact') return <Mail className={cn(className, 'text-blue-500')} />;
  if (file.appId === 'projects') return <FolderGit2 className={cn(className, 'text-orange-500')} />;
  if (file.appId === 'curriculum') return <FileText className={cn(className, 'text-red-500')} />;
  if (file.appId === 'browser') return <Globe className={cn(className, 'text-blue-600')} />;
  if (file.appId === 'minesweeper') return <Bomb className={cn(className, 'text-gray-800 dark:text-gray-300')} />;
  if (file.appId === 'solitaire') return <Spade className={cn(className, 'text-red-600')} />;
  if (file.appId === 'pinball') return <Rocket className={cn(className, 'text-indigo-500')} />;
  if (file.appId === 'rito') return <Type className={cn(className, 'text-gray-800 dark:text-gray-200')} />;
  if (file.name.endsWith('.png')) return <ImageIcon className={cn(className, 'text-purple-500')} />;
  return <File className={cn(className, 'text-gray-400')} />;
};

export function Finder({ openWindow }: { openWindow: (id: string) => void }) {
  const { addToast } = useToast();
  const { locale } = useSettings();
  const text = MESSAGES[locale];
  const portfolio = usePortfolioContent(locale);

  const finderData = useMemo(() => {
    const folders = text.finder.folders;
    const dates = text.finder.dates;

    const paths = {
      apps: `/${folders.apps}`,
      documents: `/${folders.documents}`,
      projects: `/${folders.projects}`,
      downloads: `/${folders.downloads}`,
      games: `/${folders.games}`,
      portfolio: `/${folders.portfolio}`,
    };

    const files: FileItem[] = [
      { id: '1', name: folders.apps, type: 'folder', path: paths.apps, date: `${dates.today} 10:00` },
      { id: '2', name: folders.documents, type: 'folder', path: paths.documents, date: `${dates.yesterday} 15:30` },
      { id: '3', name: folders.projects, type: 'folder', path: paths.projects, date: '10 Apr 09:00' },
      { id: '4', name: folders.downloads, type: 'folder', path: paths.downloads, date: `${dates.today} 11:20` },
      { id: '5', name: folders.games, type: 'folder', path: paths.games, date: `${dates.today} 12:00` },
      { id: '6', name: folders.portfolio, type: 'folder', path: paths.portfolio, date: `${dates.today} 14:00` },

      { id: 'port1', name: `${portfolio.windows.about}.app`, type: 'app', appId: 'about', path: `${paths.portfolio}/${portfolio.windows.about}.app`, date: dates.system },
      { id: 'port2', name: `${portfolio.windows.projects}.app`, type: 'app', appId: 'projects', path: `${paths.portfolio}/${portfolio.windows.projects}.app`, date: dates.system },
      { id: 'port3', name: text.finder.files.resumePdf, type: 'app', appId: 'curriculum', path: `${paths.portfolio}/${text.finder.files.resumePdf}`, date: dates.system },
      { id: 'port4', name: `${portfolio.windows.contact}.app`, type: 'app', appId: 'contact', path: `${paths.portfolio}/${portfolio.windows.contact}.app`, date: dates.system },

      { id: 'game1', name: `${text.appTitles.minesweeper}.app`, type: 'app', appId: 'minesweeper', path: `${paths.games}/${text.appTitles.minesweeper}.app`, date: dates.system },
      { id: 'game2', name: `${text.appTitles.solitaire}.app`, type: 'app', appId: 'solitaire', path: `${paths.games}/${text.appTitles.solitaire}.app`, date: dates.system },
      { id: 'game3', name: `${text.appTitles.pinball}.app`, type: 'app', appId: 'pinball', path: `${paths.games}/${text.appTitles.pinball}.app`, date: dates.system },

      { id: 'app3', name: `${text.appTitles.terminal}.app`, type: 'app', appId: 'terminal', path: `${paths.apps}/${text.appTitles.terminal}.app`, date: dates.system },
      { id: 'app4', name: `${text.appTitles.personalize}.app`, type: 'app', appId: 'personalize', path: `${paths.apps}/${text.appTitles.personalize}.app`, date: dates.system },
      { id: 'app5', name: `${text.appTitles.finder}.app`, type: 'app', appId: 'finder', path: `${paths.apps}/${text.appTitles.finder}.app`, date: dates.system },
      { id: 'app6', name: `${text.appTitles.browser}.app`, type: 'app', appId: 'browser', path: `${paths.apps}/${text.appTitles.browser}.app`, date: dates.system },
      { id: 'app7', name: `${text.appTitles.rito}.app`, type: 'app', appId: 'rito', path: `${paths.apps}/${text.appTitles.rito}.app`, date: dates.system },

      { id: 'doc2', name: text.finder.files.notes, type: 'file', path: `${paths.documents}/${text.finder.files.notes}`, size: '12 KB', date: `${dates.today} 09:15` },
      { id: 'proj2', name: 'E-commerce', type: 'folder', path: `${paths.projects}/E-commerce`, date: '05 Apr 14:20' },
      { id: 'proj2-1', name: 'index.html', type: 'file', path: `${paths.projects}/E-commerce/index.html`, size: '5 KB', date: '05 Apr 14:20' },
      { id: 'proj2-2', name: 'style.css', type: 'file', path: `${paths.projects}/E-commerce/style.css`, size: '15 KB', date: '05 Apr 14:20' },
      { id: 'dl1', name: 'foto_perfil.png', type: 'file', path: `${paths.downloads}/foto_perfil.png`, size: '1.2 MB', date: `${dates.today} 11:20` },
    ];

    const sidebarItems = [
      { label: folders.portfolio, icon: User, path: paths.portfolio },
      { label: folders.apps, icon: Monitor, path: paths.apps },
      { label: folders.documents, icon: FileText, path: paths.documents },
      { label: folders.downloads, icon: Download, path: paths.downloads },
      { label: folders.projects, icon: FolderGit2, path: paths.projects },
      { label: folders.games, icon: Gamepad2, path: paths.games },
    ];

    return { files, sidebarItems, paths };
  }, [locale, text, portfolio]);

  const [currentPath, setCurrentPath] = useState(finderData.paths.documents);
  const [history, setHistory] = useState<string[]>([finderData.paths.documents]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPath(finderData.paths.documents);
    setHistory([finderData.paths.documents]);
    setHistoryIndex(0);
    setSelectedId(null);
  }, [finderData.paths.documents]);

  const navigateTo = (path: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(path);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(path);
    setSelectedId(null);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1]);
      setSelectedId(null);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1]);
      setSelectedId(null);
    }
  };

  const handleDoubleClick = (file: FileItem) => {
    if (file.type === 'folder') {
      navigateTo(file.path);
    } else if (file.type === 'app' && file.appId) {
      openWindow(file.appId);
    } else if (file.type === 'file' && file.name.endsWith('.txt')) {
      openWindow('rito');
    } else {
      addToast(`${text.finder.defaultOpenToast} ${file.name}`, 'info');
    }
  };

  const getFilesInPath = (path: string) => {
    return finderData.files.filter((f) => {
      const parentPath = f.path.substring(0, f.path.lastIndexOf('/')) || '/';
      return parentPath === path;
    });
  };

  const currentFiles = getFilesInPath(currentPath);

  return (
    <div className="flex h-full bg-transparent text-gray-900 dark:text-gray-100 select-none">
      <div className="w-48 bg-black/5 dark:bg-white/5 border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col">
        <div className="p-4 pt-6">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-2">{text.finder.favorites}</h3>
          <nav className="space-y-0.5">
            {finderData.sidebarItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigateTo(item.path)}
                className={cn(
                  'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium transition-colors',
                  currentPath.startsWith(item.path)
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                <item.icon className={cn('w-4 h-4', currentPath.startsWith(item.path) ? 'text-white' : 'text-blue-500')} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button
                onClick={goBack}
                disabled={historyIndex === 0}
                className="p-1.5 rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goForward}
                disabled={historyIndex === history.length - 1}
                className="p-1.5 rounded-md text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <h2 className="text-sm font-semibold truncate max-w-[200px]">{currentPath.split('/').pop() || text.finder.root}</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-1.5 rounded-md transition-colors',
                  viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                )}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-1.5 rounded-md transition-colors',
                  viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={text.finder.searchPlaceholder}
                className="w-48 pl-8 pr-3 py-1.5 text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4" onClick={() => setSelectedId(null)}>
          {currentFiles.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <Folder className="w-16 h-16 mb-4 opacity-20" />
              <p>{text.finder.emptyFolder}</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="flex flex-wrap gap-4">
              {currentFiles.map((file) => (
                <button
                  key={file.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(file.id);
                  }}
                  onDoubleClick={() => handleDoubleClick(file)}
                  className={cn(
                    'flex flex-col items-center gap-2 p-3 rounded-lg w-28 transition-colors',
                    selectedId === file.id ? 'bg-blue-100 dark:bg-blue-900/50' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  {getIconForFile(file, 'w-12 h-12')}
                  <span className="text-xs text-center break-words w-full line-clamp-2">{file.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="min-w-full">
              <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-500 uppercase">
                <div className="col-span-6">{text.finder.name}</div>
                <div className="col-span-3">{text.finder.modifiedDate}</div>
                <div className="col-span-3">{text.finder.size}</div>
              </div>
              <div className="py-2">
                {currentFiles.map((file) => (
                  <button
                    key={file.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(file.id);
                    }}
                    onDoubleClick={() => handleDoubleClick(file)}
                    className={cn(
                      'w-full grid grid-cols-12 gap-4 px-4 py-2 items-center text-sm transition-colors text-left',
                      selectedId === file.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                  >
                    <div className="col-span-6 flex items-center gap-3">
                      {getIconForFile(file, 'w-5 h-5')}
                      <span className="truncate">{file.name}</span>
                    </div>
                    <div className={cn('col-span-3 truncate', selectedId === file.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400')}>
                      {file.date || '--'}
                    </div>
                    <div className={cn('col-span-3 truncate', selectedId === file.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400')}>
                      {file.size || '--'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="h-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex items-center px-4 text-xs text-gray-500">
          {currentFiles.length} item{currentFiles.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}
