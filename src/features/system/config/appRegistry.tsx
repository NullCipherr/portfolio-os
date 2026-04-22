/**
 * features/system/config/appRegistry.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React from 'react';
import {
  Activity,
  Bomb,
  FileText,
  FileText as FileTextIcon,
  Folder,
  FolderGit2,
  Globe,
  Image as ImageIcon,
  Mail,
  Music,
  Rocket,
  Settings,
  Spade,
  Terminal as TerminalIcon,
  User,
} from 'lucide-react';
import { AppConfig, AppId, WindowState } from '@/shared/types';
import { About } from '@/features/portfolio/components/About';
import { Projects } from '@/features/portfolio/components/Projects';
import { Contact } from '@/features/portfolio/components/Contact';
import { Curriculum } from '@/features/portfolio/components/Curriculum';
import { getPortfolioContent } from '@/features/portfolio/config/portfolioContent';
import { Browser } from '@/features/tools/components/Browser';
import { Finder } from '@/features/tools/components/Finder';
import { Personalize } from '@/features/tools/components/Personalize';
import { TerminalApp } from '@/features/tools/components/Terminal';
import { WebIframe } from '@/features/tools/components/WebIframe';
import { Rito } from '@/features/tools/components/Rito';
import { MusicPlayer } from '@/features/media/components/MusicPlayer';
import { Gallery } from '@/features/media/components/Gallery';
import { TaskManager } from '@/features/system/components/TaskManager';
import { useSettings } from '@/features/system/contexts/SettingsContext';
import { MESSAGES } from '@/shared/i18n/messages';

interface RenderAppContentParams {
  appId: AppId;
  apps: AppConfig[];
  windows: WindowState[];
  openWindow: (appId: AppId) => void;
  closeWindow: (appId: AppId) => void;
}

const DEFAULT_WINDOW_SIZE = { width: 860, height: 640 } as const;

export function useAppRegistry() {
  const { locale } = useSettings();
  const content = getPortfolioContent(locale);
  const text = MESSAGES[locale];

  const portfolioApps: AppConfig[] = [
    { id: 'about', title: content.windows.about, icon: User, defaultSize: DEFAULT_WINDOW_SIZE },
    { id: 'projects', title: content.windows.projects, icon: FolderGit2, defaultSize: DEFAULT_WINDOW_SIZE },
    { id: 'contact', title: content.windows.contact, icon: Mail, defaultSize: DEFAULT_WINDOW_SIZE },
    { id: 'curriculum', title: content.windows.curriculum, icon: FileText, defaultSize: DEFAULT_WINDOW_SIZE },
  ];

  const toolApps: AppConfig[] = [
    { id: 'browser', title: text.appTitles.browser, icon: Globe, defaultSize: DEFAULT_WINDOW_SIZE },
    { id: 'finder', title: text.appTitles.finder, icon: Folder, defaultSize: DEFAULT_WINDOW_SIZE },
    { id: 'personalize', title: text.appTitles.personalize, icon: Settings, defaultSize: DEFAULT_WINDOW_SIZE },
    { id: 'terminal', title: text.appTitles.terminal, icon: TerminalIcon, defaultSize: DEFAULT_WINDOW_SIZE },
    { id: 'rito', title: text.appTitles.rito, icon: FileTextIcon, defaultSize: DEFAULT_WINDOW_SIZE },
  ];

  const gameApps: AppConfig[] = [
    { id: 'minesweeper', title: text.appTitles.minesweeper, icon: Bomb, defaultSize: DEFAULT_WINDOW_SIZE, hideShortcut: true },
    { id: 'solitaire', title: text.appTitles.solitaire, icon: Spade, defaultSize: DEFAULT_WINDOW_SIZE, hideShortcut: true },
    { id: 'pinball', title: text.appTitles.pinball, icon: Rocket, defaultSize: DEFAULT_WINDOW_SIZE, hideShortcut: true },
  ];

  const mediaApps: AppConfig[] = [
    { id: 'music', title: text.appTitles.music, icon: Music, defaultSize: DEFAULT_WINDOW_SIZE },
    { id: 'gallery', title: text.appTitles.gallery, icon: ImageIcon, defaultSize: DEFAULT_WINDOW_SIZE },
  ];

  const systemApps: AppConfig[] = [
    { id: 'taskmanager', title: text.appTitles.taskmanager, icon: Activity, defaultSize: DEFAULT_WINDOW_SIZE },
  ];

  const apps = [...portfolioApps, ...toolApps, ...gameApps, ...mediaApps, ...systemApps];

  const renderAppContent = ({ appId, windows, openWindow, closeWindow }: RenderAppContentParams): React.ReactNode => {
    switch (appId) {
      case 'about':
        return <About />;
      case 'projects':
        return <Projects openWindow={openWindow} />;
      case 'contact':
        return <Contact />;
      case 'curriculum':
        return <Curriculum />;
      case 'browser':
        return <Browser />;
      case 'finder':
        return <Finder openWindow={openWindow} />;
      case 'personalize':
        return <Personalize />;
      case 'terminal':
        return <TerminalApp openWindow={openWindow} />;
      case 'minesweeper':
        return <WebIframe src="https://9893.github.io/minesweeper/" title={text.appTitles.minesweeper} />;
      case 'solitaire':
        return <WebIframe src="https://pascalhms.github.io/js-solitaire/" title={text.appTitles.solitaire} />;
      case 'pinball':
        return <WebIframe src="https://alula.github.io/SpaceCadetPinball/" title={text.appTitles.pinball} />;
      case 'music':
        return <MusicPlayer />;
      case 'gallery':
        return <Gallery />;
      case 'taskmanager':
        return <TaskManager windows={windows} apps={apps} onCloseWindow={closeWindow} />;
      case 'rito':
        return <Rito />;
      default:
        return null;
    }
  };

  return { apps, renderAppContent };
}
