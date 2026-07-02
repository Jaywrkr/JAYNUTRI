"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { GLOSSARY } from "@/lib/glossary";

export default function GlossaryPanel() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time mount flag to gate document.body portal, not derivable during SSR
    setMounted(true);
  }, []);

  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Cerrar glosario"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative glass-card w-full sm:max-w-md rounded-t-[28px] sm:rounded-[28px] p-5 sm:p-6 max-h-[80vh] overflow-y-auto"
            style={{ background: "var(--surface)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Glosario</h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="grid place-items-center h-8 w-8 rounded-full text-sm"
                style={{ background: "var(--surface-muted)" }}
              >
                ✕
              </button>
            </div>
            <dl className="space-y-4">
              {GLOSSARY.map((g) => (
                <div key={g.term}>
                  <dt className="font-semibold text-sm">
                    {g.term}{" "}
                    <span className="font-normal" style={{ color: "var(--text-muted)" }}>
                      · {g.short}
                    </span>
                  </dt>
                  <dd className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
                    {g.full}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir glosario de términos"
        className="grid place-items-center h-9 w-9 rounded-xl text-sm font-semibold shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{ background: "var(--surface-muted)", outlineColor: "var(--macro-protein)" }}
      >
        ?
      </button>
      {mounted && createPortal(modal, document.body)}
    </>
  );
}
