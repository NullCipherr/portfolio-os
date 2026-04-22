/**
 * features/system/components/Window.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { useRef } from 'react';
import { motion, useDragControls } from 'motion/react';
import { Minus, Square, X } from 'lucide-react';
import { WindowState, AppConfig } from '@/shared/types';
import { cn } from '@/shared/lib/utils';
import { useSettings, LIGHT_SURFACE_CLASSES, DARK_SURFACE_CLASSES } from '@/features/system/contexts/SettingsContext';

interface WindowProps {
  windowState: WindowState;
  appConfig: AppConfig;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onSnap: (pos: 'left' | 'right' | null) => void;
  onFocus: () => void;
  onPositionChange: (pos: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
  children: React.ReactNode;
}

export function Window({
  windowState,
  appConfig,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onSnap,
  onFocus,
  onPositionChange,
  onSizeChange,
  children,
}: WindowProps) {
  const dragControls = useDragControls();
  const windowRef = useRef<HTMLDivElement>(null);
  const { lightSurface, darkSurface } = useSettings();

  if (windowState.isMinimized) return null;

  let targetX: number | string = windowState.position.x;
  let targetY: number | string = windowState.position.y;
  let targetWidth: number | string = windowState.size.width;
  let targetHeight: number | string = windowState.size.height;

  if (windowState.isMaximized) {
    targetX = 0;
    targetY = 0;
    targetWidth = '100vw';
    targetHeight = 'calc(100vh - 48px)';
  } else if (windowState.snapPosition === 'left') {
    targetX = 0;
    targetY = 0;
    targetWidth = '50vw';
    targetHeight = 'calc(100vh - 48px)';
  } else if (windowState.snapPosition === 'right') {
    targetX = '50vw';
    targetY = 0;
    targetWidth = '50vw';
    targetHeight = 'calc(100vh - 48px)';
  }

  const handleResizePointerDown = (e: React.PointerEvent, direction: string) => {
    e.stopPropagation();
    if (windowState.isMaximized || windowState.snapPosition) return;
    
    // Focus window when starting resize
    onFocus();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = windowState.size.width;
    const startHeight = windowState.size.height;
    const startPosX = windowState.position.x;
    const startPosY = windowState.position.y;

    const minWidth = 300;
    const minHeight = 200;

    const handlePointerMove = (moveEv: PointerEvent) => {
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startPosX;
      let newY = startPosY;

      const deltaX = moveEv.clientX - startX;
      const deltaY = moveEv.clientY - startY;

      if (direction.includes('e')) {
        newWidth = Math.max(minWidth, startWidth + deltaX);
      }
      if (direction.includes('s')) {
        newHeight = Math.max(minHeight, startHeight + deltaY);
      }
      if (direction.includes('w')) {
        const potentialWidth = startWidth - deltaX;
        if (potentialWidth >= minWidth) {
          newWidth = potentialWidth;
          newX = startPosX + deltaX;
        } else {
          newWidth = minWidth;
          newX = startPosX + (startWidth - minWidth);
        }
      }
      if (direction.includes('n')) {
        const potentialHeight = startHeight - deltaY;
        if (potentialHeight >= minHeight) {
          newHeight = potentialHeight;
          newY = startPosY + deltaY;
        } else {
          newHeight = minHeight;
          newY = startPosY + (startHeight - minHeight);
        }
      }

      onSizeChange({ width: newWidth, height: newHeight });
      if (newX !== startPosX || newY !== startPosY) {
        onPositionChange({ x: newX, y: newY });
      }
    };

    const handlePointerUp = () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  };

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: targetX,
        y: targetY,
        width: targetWidth,
        height: targetHeight,
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      drag={true}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        const threshold = 20;
        const isTop = info.point.y < threshold;
        const isLeft = info.point.x < threshold;
        const isRight = info.point.x > window.innerWidth - threshold;

        if (isTop) {
          if (!windowState.isMaximized) onMaximize();
          if (windowState.snapPosition) onSnap(null);
        } else if (isLeft) {
          onSnap('left');
        } else if (isRight) {
          onSnap('right');
        } else {
          let newX = windowState.position.x + info.offset.x;
          let newY = windowState.position.y + info.offset.y;
          
          if (windowState.snapPosition || windowState.isMaximized) {
            newX = info.point.x - (windowState.size.width / 2);
            newY = info.point.y - 20;
            if (windowState.snapPosition) onSnap(null);
            if (windowState.isMaximized) onMaximize();
          }
          
          onPositionChange({ x: newX, y: newY });
        }
      }}
      onPointerDown={onFocus}
      style={{ 
        zIndex: windowState.zIndex,
        willChange: "transform, width, height"
      }}
      className={cn(
        "absolute flex flex-col overflow-hidden backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-2xl rounded-xl",
        LIGHT_SURFACE_CLASSES[lightSurface],
        DARK_SURFACE_CLASSES[darkSurface],
        isActive ? "ring-1 ring-black/5 dark:ring-white/10" : "opacity-95"
      )}
    >
      {/* Resize Handles */}
      {!windowState.isMaximized && !windowState.snapPosition && (
        <>
          <div className="absolute top-0 left-0 right-0 h-1.5 cursor-n-resize z-50" onPointerDown={(e) => handleResizePointerDown(e, 'n')} />
          <div className="absolute bottom-0 left-0 right-0 h-1.5 cursor-s-resize z-50" onPointerDown={(e) => handleResizePointerDown(e, 's')} />
          <div className="absolute top-0 bottom-0 left-0 w-1.5 cursor-w-resize z-50" onPointerDown={(e) => handleResizePointerDown(e, 'w')} />
          <div className="absolute top-0 bottom-0 right-0 w-1.5 cursor-e-resize z-50" onPointerDown={(e) => handleResizePointerDown(e, 'e')} />
          
          <div className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize z-50" onPointerDown={(e) => handleResizePointerDown(e, 'nw')} />
          <div className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize z-50" onPointerDown={(e) => handleResizePointerDown(e, 'ne')} />
          <div className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize z-50" onPointerDown={(e) => handleResizePointerDown(e, 'sw')} />
          <div className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize z-50" onPointerDown={(e) => handleResizePointerDown(e, 'se')} />
        </>
      )}

      {/* Titlebar */}
      <div
        className="flex items-center justify-between px-4 py-2 bg-white/50 dark:bg-gray-800/50 border-b border-black/5 dark:border-white/5 select-none touch-none"
        onPointerDown={(e) => dragControls.start(e)}
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-2">
          <appConfig.icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{appConfig.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors"
          >
            <Square className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-red-500 hover:text-white rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-transparent">
        {children}
      </div>
    </motion.div>
  );
}
