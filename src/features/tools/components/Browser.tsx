/**
 * features/tools/components/Browser.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Home, Globe } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useToast } from '@/features/system/contexts/ToastContext';
import { consumePendingPortfolioBrowserUrl, PORTFOLIO_BROWSER_EVENT } from '@/shared/lib/browserNavigation';

const DEFAULT_URL = 'https://example.com/';
const FRAME_BLOCKED_DOMAINS = [
  'github.com',
  'youtube.com',
  'youtu.be',
  'linkedin.com',
  'x.com',
  'twitter.com',
  'facebook.com',
  'instagram.com',
  'web.whatsapp.com',
  'docs.google.com',
  'drive.google.com',
];

export function Browser() {
  const { addToast } = useToast();
  const [urlInput, setUrlInput] = useState('example.com');
  const [currentSrc, setCurrentSrc] = useState('');
  const [history, setHistory] = useState<string[]>([DEFAULT_URL]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Delay loading the iframe by slightly more than the window animation duration
    // to prevent the iframe main-thread block from stuttering the animation.
    const timer = setTimeout(() => {
      const pending = consumePendingPortfolioBrowserUrl();
      const initialUrl = pending || DEFAULT_URL;
      setCurrentSrc(initialUrl);
      try {
        const urlObj = new URL(initialUrl);
        setUrlInput(urlObj.hostname + urlObj.pathname + urlObj.search);
      } catch {
        setUrlInput(initialUrl);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const formatUrl = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      // Se tiver ponto e não tiver espaço, assumimos que é uma URL
      if (trimmed.includes('.') && !trimmed.includes(' ')) {
        return `https://${trimmed}`;
      } else {
        // Busca com engine mais permissiva em iframe
        return `https://www.bing.com/search?q=${encodeURIComponent(trimmed)}`;
      }
    }
    return trimmed;
  };

  const isLikelyFrameBlocked = (url: string) => {
    try {
      const { hostname } = new URL(url);
      return FRAME_BLOCKED_DOMAINS.some(
        (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
      );
    } catch {
      return false;
    }
  };

  const navigateTo = (newUrl: string) => {
    if (!newUrl) return;
    
    setIsLoading(true);
    const formattedUrl = formatUrl(newUrl);

    if (isLikelyFrameBlocked(formattedUrl)) {
      window.open(formattedUrl, '_blank', 'noopener,noreferrer');
      addToast('Este site bloqueia visualização em iframe. Aberto em nova aba.', 'info');
      setIsLoading(false);
      return;
    }
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(formattedUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentSrc(formattedUrl);
    
    try {
        const urlObj = new URL(formattedUrl);
        setUrlInput(urlObj.hostname + urlObj.pathname + urlObj.search);
    } catch {
        setUrlInput(formattedUrl);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigateTo(urlInput);
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setIsLoading(true);
      setHistoryIndex(historyIndex - 1);
      setCurrentSrc(history[historyIndex - 1]);
      try {
        const urlObj = new URL(history[historyIndex - 1]);
        setUrlInput(urlObj.hostname + urlObj.pathname + urlObj.search);
      } catch {
         // do nothing
      }
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setIsLoading(true);
      setHistoryIndex(historyIndex + 1);
      setCurrentSrc(history[historyIndex + 1]);
      try {
        const urlObj = new URL(history[historyIndex + 1]);
        setUrlInput(urlObj.hostname + urlObj.pathname + urlObj.search);
      } catch {
         // do nothing
      }
    }
  };

  const reload = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      const src = currentSrc;
      setCurrentSrc('');
      // Força a remontagem do iframe para recarregar
      setTimeout(() => setCurrentSrc(src), 50);
    }
  };

  const goHome = () => {
    navigateTo('example.com');
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<{ url?: string }>;
      const targetUrl = custom.detail?.url;
      if (!targetUrl) return;
      navigateTo(targetUrl);
    };

    window.addEventListener(PORTFOLIO_BROWSER_EVENT, handler);
    return () => window.removeEventListener(PORTFOLIO_BROWSER_EVENT, handler);
  }, [history, historyIndex, urlInput]);

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 select-none">
      {/* Toolbar */}
      <div className="h-14 flex items-center gap-2 px-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-1">
          <button 
            onClick={goBack} 
            disabled={historyIndex === 0} 
            className="p-1.5 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={goForward} 
            disabled={historyIndex === history.length - 1} 
            className="p-1.5 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <button 
            onClick={reload} 
            className="p-1.5 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <RotateCw className={cn("w-[18px] h-[18px]", isLoading && "animate-spin text-blue-500")} />
          </button>
          <button 
            onClick={goHome} 
            className="p-1.5 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ml-1"
          >
            <Home className="w-[18px] h-[18px]" />
          </button>
        </div>
        
        {/* Address Bar */}
        <div className="flex-1 max-w-2xl mx-auto flex items-center bg-gray-100 dark:bg-gray-900 rounded-full border border-gray-200 dark:border-gray-700 px-4 py-1.5 focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500 transition-all max-h-9">
          <Globe className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
          <input 
            type="text" 
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-sm text-gray-900 dark:text-white focus:outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400"
            placeholder="Pesquisar no Google ou digitar URL..."
            spellCheck={false}
          />
        </div>
        
        {/* Informative block for generic users */}
        <div 
          className="ml-auto flex items-center text-[10px] text-gray-400 hover:text-gray-600 cursor-help transition-colors"
          onClick={() => addToast('Alguns sites (como youtube.com) bloqueiam exibição em iframes por segurança.', 'info')}
        >
          <span className="hidden sm:inline">Info iframe</span>
        </div>
      </div>

      {/* Browser Content */}
      <div className="flex-1 relative bg-white dark:bg-gray-950 overflow-hidden">
        {currentSrc && (
          <iframe
            ref={iframeRef}
            src={currentSrc}
            className="w-full h-full border-none bg-white"
            title="Browser"
            onLoad={handleIframeLoad}
          />
        )}
      </div>
    </div>
  );
}
