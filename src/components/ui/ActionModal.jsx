"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

export default function ActionModal({
  id,
  open,
  onClose,
  title,
  description,
  children,
}) {
  // Prevent background page scrolling
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // Don't render portal during SSR
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          id={id}
          className="fixed inset-0 z-9999 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${id}-title`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Full-page backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="
              relative z-10
              w-full max-w-lg
              overflow-hidden
              rounded-3xl
              border border-emerald-400/20
              bg-zinc-950
              shadow-[0_0_100px_rgba(16,185,129,0.15)]
            "
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
          >
            {/* Emerald glow */}
            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-64
                w-64
                rounded-full
                bg-emerald-400/10
                blur-3xl
              "
            />

            {/* Header */}
            <div className="relative flex items-start justify-between border-b border-white/10 p-6">
              <div className="pr-8">
                <h2
                  id={`${id}-title`}
                  className="text-xl font-semibold text-white"
                >
                  {title}
                </h2>

                {description && (
                  <p className="mt-2 text-sm leading-6 text-white/50">
                    {description}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="
                  shrink-0
                  rounded-full
                  p-2
                  text-white/40
                  transition
                  hover:bg-white/5
                  hover:text-white
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="relative p-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
