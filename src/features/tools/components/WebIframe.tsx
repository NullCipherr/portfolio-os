/**
 * features/tools/components/WebIframe.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

export function WebIframe({ src, title }: { src: string, title?: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full bg-gray-900 select-none">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gray-900 z-10">
          <Loader2 className="w-8 h-8 animate-spin mb-4 text-blue-500" />
          <p>Carregando {title}...</p>
        </div>
      )}
      <iframe 
        src={src} 
        className="w-full h-full border-none" 
        onLoad={() => setIsLoading(false)}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        title={title}
      />
    </div>
  );
}
