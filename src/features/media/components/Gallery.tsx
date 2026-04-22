/**
 * features/media/components/Gallery.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useSettings } from '@/features/system/contexts/SettingsContext';
import { MESSAGES } from '@/shared/i18n/messages';

const PHOTOS = [
  { id: 1, src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80", title: "Coding Session", category: "Workspace" },
  { id: 2, src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80", title: "Setup", category: "Hardware" },
  { id: 3, src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80", title: "Team Connect", category: "Life" },
  { id: 4, src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80", title: "Coffee & Code", category: "Workspace" },
  { id: 5, src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80", title: "Matrix", category: "Abstract" },
  { id: 6, src: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=80", title: "Server Room", category: "Tech" },
  { id: 7, src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80", title: "Matrix Binary", category: "Abstract" },
  { id: 8, src: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80", title: "Html Code", category: "Code" },
];

export function Gallery() {
  const { locale } = useSettings();
  const text = MESSAGES[locale];
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedPhoto = PHOTOS.find(p => p.id === selectedId);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 text-black dark:text-white relative">
      {/* Header */}
      <div className="p-6 pb-2 sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl z-20 border-b border-gray-100 dark:border-zinc-900">
        <h1 className="text-3xl font-bold tracking-tight">{text.gallery.title}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Conceitos, workspaces e projetos</p>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {PHOTOS.map((photo) => (
            <motion.div
              layoutId={`photo-container-${photo.id}`}
              key={photo.id}
              onClick={() => setSelectedId(photo.id)}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-gray-100 dark:bg-zinc-900 shadow-sm hover:shadow-xl transition-shadow"
            >
              <motion.img
                layoutId={`photo-${photo.id}`}
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <h3 className="text-white font-medium">{photo.title}</h3>
                  <p className="text-white/70 text-xs">{photo.category}</p>
                </div>
                <ZoomIn className="w-5 h-5 text-white/50 ml-auto mb-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Zoom view */}
      <AnimatePresence>
        {selectedId && selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-2xl pointer-events-auto"
              onClick={() => setSelectedId(null)}
            />
            
            <motion.div
              layoutId={`photo-container-${selectedPhoto.id}`}
              className="relative z-10 w-full max-w-4xl p-4 md:p-12 pointer-events-auto flex flex-col items-center"
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-0 right-0 md:top-4 md:right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <motion.img
                layoutId={`photo-${selectedPhoto.id}`}
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl"
              />
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
              >
                <h2 className="text-2xl font-bold text-white">{selectedPhoto.title}</h2>
                <p className="text-white/60 mt-1">{selectedPhoto.category}</p>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
