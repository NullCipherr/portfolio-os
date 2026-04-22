/**
 * features/tools/components/Rito.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { useState } from 'react';
import { Type, Download, Trash2, Minus, Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useSettings } from '@/features/system/contexts/SettingsContext';

const DEFAULT_TEXT = `O Manifesto Minimalista.

O design não é sobre como se parece. É sobre como funciona.

Em um mundo de distrações infinitas, a clareza é o maior ativo. O espaço em branco respira. O contraste guia a atenção. O movimento denota propósito. Um sistema bem estruturado não necessita de manuais; ele fala o idioma da intuição.

Este é o Rito.
Um leitor essencial focado na experiência de leitura e escrita. Sem distrações. Apenas as palavras.

"Menos, porém melhor."
— Dieter Rams
`;

export function Rito() {
  const [content, setContent] = useState(DEFAULT_TEXT);
  const [font, setFont] = useState<'sans' | 'serif' | 'mono'>('sans');
  const [fontSize, setFontSize] = useState(17);
  const [toolbarVisible, setToolbarVisible] = useState(true);

  // We auto-hide toolbar initially after 2 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => setToolbarVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Documento_Rito.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm("Isso apagará todo o texto. Tem certeza?")) {
      setContent('');
    }
  };

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const chars = content.length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  return (
    <div 
      className="flex flex-col h-full bg-[#f8f9fa] dark:bg-[#121212] transition-colors duration-300 relative group"
      onMouseMove={() => setToolbarVisible(true)}
      onMouseLeave={() => setToolbarVisible(false)}
    >
      {/* Super minimal floating toolbar */}
      <div 
        className={cn(
          "absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white/90 dark:bg-black/90 backdrop-blur-md border border-black/5 dark:border-white/10 px-3 py-1.5 rounded-[8px] shadow-sm transition-all duration-500 z-10",
          toolbarVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <button onClick={() => setFont('sans')} className={cn("p-1.5 rounded-[6px] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", font === 'sans' ? "text-blue-500" : "text-gray-500")} title="Sans Serif">
          <Type className="w-4 h-4 font-sans" />
        </button>
        <button onClick={() => setFont('serif')} className={cn("p-1.5 rounded-[6px] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", font === 'serif' ? "text-blue-500" : "text-gray-500")} title="Serif">
          <Type className="w-4 h-4" style={{ fontFamily: 'serif' }} />
        </button>
        <button onClick={() => setFont('mono')} className={cn("p-1.5 rounded-[6px] hover:bg-black/5 dark:hover:bg-white/10 transition-colors", font === 'mono' ? "text-blue-500" : "text-gray-500")} title="Monospace">
          <Type className="w-4 h-4 font-mono" />
        </button>
        
        <div className="w-[1px] h-4 bg-black/10 dark:bg-white/10 mx-1" />
        
        <button onClick={() => setFontSize(Math.max(12, fontSize - 1))} className="p-1.5 rounded-[6px] hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-500" title="Diminuir texto">
          <Minus className="w-4 h-4" />
        </button>
        <div className="text-[11px] text-gray-500 font-mono w-6 text-center select-none">{fontSize}</div>
        <button onClick={() => setFontSize(Math.min(32, fontSize + 1))} className="p-1.5 rounded-[6px] hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-500" title="Aumentar texto">
          <Plus className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-4 bg-black/10 dark:bg-white/10 mx-1" />

        <button onClick={handleDownload} className="p-1.5 rounded-[6px] hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-500 hover:text-blue-500" title="Salvar .txt">
          <Download className="w-4 h-4" />
        </button>
        <button onClick={handleClear} className="p-1.5 rounded-[6px] hover:bg-red-500/10 dark:hover:bg-red-500/20 transition-colors text-gray-500 hover:text-red-500" title="Limpar tudo">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto custom-scrollbar px-8 py-16 sm:px-16 md:px-24">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          spellCheck={false}
          style={{ fontSize: `${fontSize}px` }}
          className={cn(
            "w-full h-full min-h-screen bg-transparent border-none resize-none focus:outline-none focus:ring-0 leading-relaxed",
            font === 'sans' ? "font-sans" : font === 'serif' ? "font-serif tracking-wide" : "font-mono tracking-tight",
            "text-gray-800 dark:text-gray-200 placeholder-gray-400/50"
          )}
          placeholder="Escreva algo brilhante..."
        />
      </div>

      {/* Floating subtly at bottom corner */}
      <div 
        className={cn(
          "absolute bottom-4 right-6 text-[10px] font-mono tracking-wider transition-opacity duration-500 pointer-events-none",
          toolbarVisible ? "opacity-40" : "opacity-0"
        )}
      >
        <span className="text-gray-800 dark:text-gray-200">
          {words} PALAVRAS • {readTime} MIN LEITURA
        </span>
      </div>
    </div>
  );
}
