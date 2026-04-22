/**
 * features/tools/components/Terminal.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { useState, useRef, useEffect } from 'react';
import { AppId } from '@/shared/types';
import { useSettings } from '@/features/system/contexts/SettingsContext';
import { MESSAGES } from '@/shared/i18n/messages';

interface TerminalProps {
  openWindow: (id: AppId) => void;
}

interface HistoryItem {
  id: number;
  type: 'input' | 'output' | 'error';
  content: string;
}

export function TerminalApp({ openWindow }: TerminalProps) {
  const { locale } = useSettings();
  const text = MESSAGES[locale].terminal;

  const [history, setHistory] = useState<HistoryItem[]>([{ id: 0, type: 'output', content: text.banner }]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHistory([{ id: Date.now(), type: 'output', content: text.banner }]);
  }, [locale, text.banner]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    scrollToBottom();
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

  const promptPath = `C:\\Users\\${text.userPrompt}`;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    setInput('');

    if (!cmd) {
      addHistory(`${promptPath}> `, 'input');
      return;
    }

    addHistory(`${promptPath}> ${cmd}`, 'input');

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
        window.open('https://github.com', '_blank');
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
        addHistory(`'${baseCmd}' ${text.commandNotRecognizedStart}
${text.commandNotRecognizedEnd}`, 'error');
    }
  };

  return (
    <div
      className="h-full w-full bg-[#0C0C0C] text-[#CCCCCC] font-mono p-4 overflow-y-auto text-sm cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((item) => (
        <div key={item.id} className={`whitespace-pre-wrap mb-1 ${item.type === 'error' ? 'text-red-400' : ''}`}>
          {item.content}
        </div>
      ))}
      <form onSubmit={handleCommand} className="flex items-center mt-1">
        <span className="mr-2">{promptPath}&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none border-none text-[#CCCCCC] font-mono"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
}
