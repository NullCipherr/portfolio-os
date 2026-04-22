/**
 * features/system/components/Desktop.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AppConfig } from '@/shared/types';
import { cn } from '@/shared/lib/utils';
import { GlassColor } from '@/features/system/contexts/SettingsContext';

interface DesktopProps {
  apps: AppConfig[];
  onOpenApp: (id: AppConfig['id']) => void;
  onContextMenu: (e: React.MouseEvent) => void;
  iconSize: 'small' | 'medium' | 'large';
  sortBy: 'default' | 'name';
  isRefreshing: boolean;
  iconLayout: 'grid' | 'free';
  iconPositions: Record<string, { x: number; y: number }>;
  onIconPositionChange: (id: string, delta: { x: number; y: number }) => void;
  glassColor: GlassColor;
}

export function Desktop({ 
  apps, 
  onOpenApp, 
  onContextMenu, 
  iconSize, 
  sortBy, 
  isRefreshing,
  iconLayout,
  iconPositions,
  onIconPositionChange,
  glassColor
}: DesktopProps) {
  const sortedApps = [...apps].filter(a => !a.hideShortcut).sort((a, b) => {
    if (sortBy === 'name') return a.title.localeCompare(b.title);
    return 0;
  });

  const sizeClasses = {
    small: 'w-10 h-10',
    medium: 'w-14 h-14',
    large: 'w-16 h-16'
  };

  const iconSizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-7 h-7',
    large: 'w-8 h-8'
  };

  const glassColorClasses = {
    white: 'bg-white/10 border-white/20',
    blue: 'bg-blue-500/30 border-blue-400/40',
    purple: 'bg-purple-500/30 border-purple-400/40',
    green: 'bg-green-500/30 border-green-400/40',
    rose: 'bg-rose-500/30 border-rose-400/40',
    amber: 'bg-amber-500/30 border-amber-400/40',
    red: 'bg-red-500/30 border-red-400/40',
    orange: 'bg-orange-500/30 border-orange-400/40',
    yellow: 'bg-yellow-500/30 border-yellow-400/40',
    emerald: 'bg-emerald-500/30 border-emerald-400/40',
    teal: 'bg-teal-500/30 border-teal-400/40',
    cyan: 'bg-cyan-500/30 border-cyan-400/40',
    sky: 'bg-sky-500/30 border-sky-400/40',
    indigo: 'bg-indigo-500/30 border-indigo-400/40',
    fuchsia: 'bg-fuchsia-500/30 border-fuchsia-400/40',
    pink: 'bg-pink-500/30 border-pink-400/40',
  };

  const [selectionBox, setSelectionBox] = useState<{ startX: number; startY: number; currentX: number; currentY: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).id === "desktop-bg" || e.target === e.currentTarget) {
      if (e.button !== 0) return;
      setSelectionBox({
        startX: e.clientX,
        startY: e.clientY,
        currentX: e.clientX,
        currentY: e.clientY
      });
    }
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (selectionBox) {
        setSelectionBox(prev => prev ? { ...prev, currentX: e.clientX, currentY: e.clientY } : null);
      }
    };

    const handlePointerUp = () => {
      setSelectionBox(null);
    };

    if (selectionBox) {
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
      return () => {
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [selectionBox]);

  let selectionStyle = {};
  if (selectionBox) {
    const left = Math.min(selectionBox.startX, selectionBox.currentX);
    const top = Math.min(selectionBox.startY, selectionBox.currentY);
    const width = Math.abs(selectionBox.currentX - selectionBox.startX);
    const height = Math.abs(selectionBox.currentY - selectionBox.startY);
    selectionStyle = { left, top, width, height };
  }

  return (
    <div 
      id="desktop-bg"
      className="absolute inset-0 p-4 z-0 overflow-hidden"
      onContextMenu={onContextMenu}
      onPointerDown={handlePointerDown}
    >
      {selectionBox && (
        <div 
          className="fixed z-50 bg-blue-500/20 border border-blue-500/50"
          style={selectionStyle}
        />
      )}
      <div id="desktop-bg" className="h-full flex flex-col flex-wrap content-start gap-2">
        {!isRefreshing && sortedApps.map((app) => (
          <motion.button
            layout
            key={app.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              x: iconLayout === 'free' ? (iconPositions[app.id]?.x || 0) : 0,
              y: iconLayout === 'free' ? (iconPositions[app.id]?.y || 0) : 0,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, opacity: { duration: 0.2 } }}
            onClick={() => onOpenApp(app.id)}
            className="group flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-white/10 transition-colors focus:outline-none focus:bg-white/20 w-24"
            style={{ willChange: "transform" }}
            drag={iconLayout === 'free'}
            dragMomentum={false}
            onDragEnd={(e, info) => {
              if (iconLayout === 'free') {
                onIconPositionChange(app.id, { x: info.offset.x, y: info.offset.y });
              }
            }}
          >
            <div className={cn(
              "flex items-center justify-center backdrop-blur-md rounded-2xl border shadow-lg group-hover:scale-105 transition-transform",
              sizeClasses[iconSize],
              glassColorClasses[glassColor]
            )}>
              <app.icon className={cn("text-white drop-shadow-md", iconSizeClasses[iconSize])} />
            </div>
            <span className="text-xs font-medium text-white drop-shadow-md text-center w-full break-words leading-tight">
              {app.title}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

