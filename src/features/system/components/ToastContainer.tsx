/**
 * features/system/components/ToastContainer.tsx
 * Portfolio OS module with a specific architectural responsibility.
 */
import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useToast } from '@/features/system/contexts/ToastContext';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className={cn(
              "pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md min-w-[250px]",
              toast.type === 'success' && "bg-green-500/90 border-green-400 text-white",
              toast.type === 'error' && "bg-red-500/90 border-red-400 text-white",
              toast.type === 'info' && "bg-blue-500/90 border-blue-400 text-white"
            )}
          >
            {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
            {toast.type === 'info' && <Info className="w-5 h-5" />}
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
