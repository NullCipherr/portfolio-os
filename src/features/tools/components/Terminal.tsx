/**
 * features/tools/components/Terminal.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { useState, useRef, useEffect } from 'react';
import { AppId } from '@/shared/types';
import { useSettings } from '@/features/system/contexts/SettingsContext';
import { MESSAGES } from '@/shared/i18n/messages';
import { cn } from '@/shared/lib/utils';

interface TerminalProps {
  openWindow: (id: AppId) => void;
}

interface HistoryItem {
  id: number;
  type: 'input' | 'output' | 'error';
  content: string;
}

type TerminalTheme = 'cmd' | 'powershell' | 'bash';

const TERMINAL_THEME_PRESETS: Record<
  TerminalTheme,
  {
    label: string;
    rootClassName: string;
    headerClassName: string;
    headerTitleClassName: string;
    promptClassName: string;
    inputLineClassName: string;
    caretClassName: string;
    promptPrefix: (user: string) => string;
    promptSeparator: string;
  }
> = {
  cmd: {
    label: 'CMD',
    rootClassName:
      'bg-[#0a0d10] text-zinc-200 selection:bg-emerald-400/30 selection:text-emerald-100',
    headerClassName: 'border-emerald-500/20 bg-[#0f1419]',
    headerTitleClassName: 'text-emerald-400/90',
    promptClassName: 'text-emerald-400',
    inputLineClassName: 'text-emerald-300',
    caretClassName: 'caret-emerald-400',
    promptPrefix: (user) => `C:\\Users\\${user}`,
    promptSeparator: '>',
  },
  powershell: {
    label: 'PowerShell',
    rootClassName:
      'bg-[#09111b] text-slate-100 selection:bg-sky-400/30 selection:text-sky-100',
    headerClassName: 'border-sky-500/20 bg-[#0f1824]',
    headerTitleClassName: 'text-sky-400/90',
    promptClassName: 'text-sky-400',
    inputLineClassName: 'text-sky-300',
    caretClassName: 'caret-sky-400',
    promptPrefix: (user) => `PS C:\\Users\\${user}`,
    promptSeparator: '>',
  },
  bash: {
    label: 'Bash',
    rootClassName:
      'bg-[#0b1112] text-zinc-200 selection:bg-lime-400/30 selection:text-lime-100',
    headerClassName: 'border-lime-500/20 bg-[#0f1616]',
    headerTitleClassName: 'text-lime-400/90',
    promptClassName: 'text-lime-400',
    inputLineClassName: 'text-lime-300',
    caretClassName: 'caret-lime-400',
    promptPrefix: (user) => `${user.toLowerCase()}@portfolio:~`,
    promptSeparator: '$',
  },
};

export function TerminalApp({ openWindow }: TerminalProps) {
  const { locale } = useSettings();
  const text = MESSAGES[locale].terminal;

  const [history, setHistory] = useState<HistoryItem[]>([{ id: 0, type: 'output', content: text.banner }]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyCursor, setHistoryCursor] = useState<number | null>(null);
  const [theme, setTheme] = useState<TerminalTheme>('cmd');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory([{ id: Date.now(), type: 'output', content: text.banner }]);
    setInput('');
    setCommandHistory([]);
    setHistoryCursor(null);
  }, [locale, text.banner]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [history]);

  const addHistory = (content: string, type: 'input' | 'output' | 'error' = 'output') => {
    setHistory((prev) => [...prev, { id: Date.now() + Math.random(), type, content }]);
  };

  const buildHelpText = () => {
    const cmd = text.commandDescriptions;
    return `${text.commandsTitle}
  help, commands  - ${cmd.help}
  cls, clear      - ${cmd.clear}
  dir, ls, nav    - ${cmd.list}
  ver             - ${cmd.version}
  whoami          - ${cmd.whoami}
  whereami        - ${cmd.whereami}
  contact, email  - ${cmd.contact}
  github          - ${cmd.github}
  linkedin        - ${cmd.linkedin}
  open <window>   - ${cmd.open}
  go, cd <section>- ${cmd.go}
  pdf             - ${cmd.pdf}
  [window_name]   - ${cmd.shortcut}`;
  };

  const activeTheme = TERMINAL_THEME_PRESETS[theme];
  const promptPath = activeTheme.promptPrefix(text.userPrompt);
  const promptWithSeparator = `${promptPath}${activeTheme.promptSeparator}`;

  const executeCommand = (rawCommand: string) => {
    const cmd = rawCommand.trim();

    if (!cmd) {
      addHistory(`${promptWithSeparator} `, 'input');
      return;
    }

    addHistory(`${promptWithSeparator} ${cmd}`, 'input');

    const args = cmd.toLowerCase().split(' ');
    const baseCmd = args[0];
    const validApps: AppId[] = ['about', 'projects', 'contact', 'personalize', 'terminal'];

    switch (baseCmd) {
      case 'help':
      case 'commands':
        addHistory(buildHelpText());
        break;
      case 'cls':
      case 'clear':
        setHistory([]);
        break;
      case 'dir':
      case 'ls':
      case 'sections':
      case 'nav':
        addHistory(text.dirOutput);
        break;
      case 'ver':
        addHistory(text.versionText);
        break;
      case 'whoami':
        addHistory(text.whoami);
        break;
      case 'whereami':
        addHistory(text.whereami);
        break;
      case 'github':
        window.open('https://github.com/NullCipherr', '_blank');
        addHistory(text.openingGithub);
        break;
      case 'linkedin':
        window.open('https://linkedin.com', '_blank');
        addHistory(text.openingLinkedin);
        break;
      case 'pdf':
        window.open('/curriculo.pdf', '_blank');
        addHistory(text.openingPdf);
        break;
      case 'contact':
      case 'email':
        openWindow('contact');
        addHistory(text.openingContact);
        break;
      case 'home':
        addHistory(text.returningHome);
        addHistory(text.banner);
        break;
      case 'open':
      case 'go':
      case 'cd':
        if (args[1]) {
          const target = args[1] as AppId;
          if (validApps.includes(target)) {
            openWindow(target);
            addHistory(`${text.navigatingTo} ${target}...`);
          } else {
            addHistory(`${text.pathNotFound} ${target}`, 'error');
          }
        } else {
          addHistory(`${text.usagePrefix} ${baseCmd} <window_name>`);
        }
        break;
      case 'about':
      case 'projects':
      case 'personalize':
      case 'terminal':
        openWindow(baseCmd as AppId);
        addHistory(`${text.openingApp} ${baseCmd}...`);
        break;
      default:
        addHistory(`'${baseCmd}' ${text.commandNotRecognizedStart}\n${text.commandNotRecognizedEnd}`, 'error');
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const command = input;
    const trimmed = command.trim();

    if (trimmed) {
      setCommandHistory((prev) => [trimmed, ...prev.filter((item) => item !== trimmed)]);
    }

    setInput('');
    setHistoryCursor(null);
    executeCommand(command);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHistoryCursor((prev) => {
        if (commandHistory.length === 0) return null;
        const nextIndex = prev === null ? 0 : Math.min(prev + 1, commandHistory.length - 1);
        setInput(commandHistory[nextIndex]);
        return nextIndex;
      });
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHistoryCursor((prev) => {
        if (prev === null) return null;
        const nextIndex = prev - 1;
        if (nextIndex < 0) {
          setInput('');
          return null;
        }
        setInput(commandHistory[nextIndex]);
        return nextIndex;
      });
    }
  };

  const historyItemClass = (type: HistoryItem['type']) => {
    if (type === 'error') return 'text-red-400';
    if (type === 'input') return activeTheme.inputLineClassName;
    return 'text-zinc-200';
  };

  return (
    <section
      className={cn(
        'h-full w-full overflow-y-auto font-mono text-[13px] leading-6 antialiased cursor-text',
        activeTheme.rootClassName
      )}
      onClick={() => inputRef.current?.focus()}
      aria-label="Terminal"
    >
      <div className={cn('border-b px-4 py-2', activeTheme.headerClassName)}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className={cn('text-[11px] uppercase tracking-[0.08em]', activeTheme.headerTitleClassName)}>
              Portfolio Terminal
            </p>
            <p className="text-[11px] text-zinc-500">{promptPath}</p>
          </div>

          <div className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-black/20 p-1">
            {(Object.keys(TERMINAL_THEME_PRESETS) as TerminalTheme[]).map((themeId) => {
              const themePreset = TERMINAL_THEME_PRESETS[themeId];
              return (
                <button
                  key={themeId}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTheme(themeId);
                  }}
                  className={cn(
                    'rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide transition-colors',
                    theme === themeId
                      ? 'bg-white/20 text-white'
                      : 'text-zinc-400 hover:bg-white/10 hover:text-zinc-100'
                  )}
                  aria-label={`Trocar para tema ${themePreset.label}`}
                >
                  {themePreset.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="p-4">
        {history.map((item) => (
          <div key={item.id} className={cn('whitespace-pre-wrap', historyItemClass(item.type))}>
            {item.content}
          </div>
        ))}

        <form onSubmit={handleCommand} className="mt-1 flex items-center gap-2">
          <span className={activeTheme.promptClassName}>{promptPath}</span>
          <span className="text-zinc-400">{activeTheme.promptSeparator}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className={cn('min-w-0 flex-1 bg-transparent text-zinc-100 outline-none border-none', activeTheme.caretClassName)}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            aria-label="Command input"
          />
        </form>
        <div ref={bottomRef} />
      </div>
    </section>
  );
}
