/**
 * shared/types/index.ts
 * Portfolio OS module with a specific architectural responsibility.
 */
import React from 'react';

export type AppId = 'about' | 'projects' | 'contact' | 'curriculum' | 'personalize' | 'terminal' | 'finder' | 'browser' | 'minesweeper' | 'solitaire' | 'pinball' | 'music' | 'gallery' | 'taskmanager' | 'rito';

export interface AppConfig {
  id: AppId;
  title: string;
  icon: React.ElementType;
  defaultSize?: { width: number; height: number };
  defaultPosition?: { x: number; y: number };
  hideShortcut?: boolean;
}

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  snapPosition?: 'left' | 'right' | null;
}
