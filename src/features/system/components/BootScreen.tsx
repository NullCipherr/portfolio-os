/**
 * features/system/components/BootScreen.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Command } from 'lucide-react';

interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  useEffect(() => {
    const duration = 2000; // 2 seconds boot time

    // Just run a timer, we handle the animation via framer-motion directly
    const timer = setTimeout(() => {
      onComplete();
    }, duration + 400);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black text-white"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex flex-col items-center gap-16 w-full max-w-xs"
      >
        <Command className="w-16 h-16 text-white/90" strokeWidth={1} />
        
        <div className="w-40 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white/80 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
