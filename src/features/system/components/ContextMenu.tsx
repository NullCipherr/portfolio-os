/**
 * features/system/components/ContextMenu.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useSettings, LIGHT_SURFACE_CLASSES, DARK_SURFACE_CLASSES } from '@/features/system/contexts/SettingsContext';

export interface ContextMenuItem {
  label?: string;
  icon?: React.ElementType;
  action?: () => void;
  divider?: boolean;
  submenu?: ContextMenuItem[];
  checked?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

export function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { lightSurface, darkSurface } = useSettings();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Ensure menu stays within viewport
  const style: React.CSSProperties = {
    top: Math.min(y, window.innerHeight - (items.length * 32) - 20),
    left: Math.min(x, window.innerWidth - 250),
  };

  return (
    <div
      ref={menuRef}
      style={style}
      className={cn(
        "fixed z-[200] w-64 p-1.5 backdrop-blur-3xl border border-black/10 dark:border-white/10 shadow-2xl rounded-xl text-sm text-gray-800 dark:text-gray-200",
        LIGHT_SURFACE_CLASSES[lightSurface],
        DARK_SURFACE_CLASSES[darkSurface]
      )}
      onContextMenu={(e) => e.preventDefault()}
    >
      {items.map((item, idx) => (
        item.divider ? (
          <div key={idx} className="h-px bg-black/10 dark:bg-white/10 my-1 mx-2" />
        ) : (
          <React.Fragment key={idx}>
            <ContextMenuItemComponent item={item} onClose={onClose} />
          </React.Fragment>
        )
      ))}
    </div>
  );
}

function ContextMenuItemComponent({ item, onClose }: { item: ContextMenuItem, onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const { lightSurface, darkSurface } = useSettings();

  return (
    <div
      ref={itemRef}
      className="relative px-3 py-1.5 mx-0.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 cursor-default flex items-center justify-between group text-[13.5px]"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={(e) => {
        if (item.action) {
          e.stopPropagation();
          item.action();
          onClose();
        }
      }}
    >
      <div className="flex items-center gap-3">
        {item.icon ? (
          <item.icon className="w-4 h-4 text-gray-600 dark:text-gray-300" strokeWidth={1.5} />
        ) : (
          <span className="w-4 flex justify-center text-gray-600 dark:text-gray-300">
            {item.checked && "✓"}
          </span>
        )}
        <span>{item.label}</span>
      </div>
      {item.submenu && <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />}

      {item.submenu && isOpen && (
        <div className={cn(
          "absolute top-0 left-full ml-1 w-56 p-1.5 backdrop-blur-3xl border border-black/10 dark:border-white/10 shadow-2xl rounded-xl text-[13.5px] text-gray-800 dark:text-gray-200",
          LIGHT_SURFACE_CLASSES[lightSurface],
          DARK_SURFACE_CLASSES[darkSurface]
        )}>
          {item.submenu.map((subItem, idx) => (
            subItem.divider ? (
              <div key={idx} className="h-px bg-black/10 dark:bg-white/10 my-1 mx-2" />
            ) : (
              <div
                key={idx}
                className="px-3 py-1.5 mx-0.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 cursor-default flex items-center gap-3"
                onClick={(e) => {
                  e.stopPropagation();
                  if (subItem.action) subItem.action();
                  onClose();
                }}
              >
                {subItem.icon ? (
                  <subItem.icon className="w-4 h-4 text-gray-600 dark:text-gray-300" strokeWidth={1.5} />
                ) : (
                  <span className="w-4 flex justify-center text-gray-600 dark:text-gray-300">
                    {subItem.checked && "✓"}
                  </span>
                )}
                <span>{subItem.label}</span>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}
