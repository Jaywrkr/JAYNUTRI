"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type ToastItem = {
  id: number;
  message: string;
  undo?: () => void;
};

type ToastContextValue = {
  showToast: (message: string, undo?: () => void) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const UNDO_WINDOW_MS = 5000;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, undo?: () => void) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, message, undo }]);
      window.setTimeout(() => dismiss(id), UNDO_WINDOW_MS);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none px-4 w-full max-w-sm">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto glass-card rounded-full px-4 py-2.5 flex items-center gap-3 text-sm shadow-xl w-full justify-between"
            >
              <span>{t.message}</span>
              {t.undo && (
                <button
                  onClick={() => {
                    t.undo?.();
                    dismiss(t.id);
                  }}
                  className="font-semibold shrink-0"
                  style={{ color: "var(--macro-protein)" }}
                >
                  Deshacer
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
