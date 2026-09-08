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

  // Header
  showCloseButton = true,

  // Footer buttons
  showCancelButton = false,
  showConfirmButton = false,

  cancelText = "Cancel",
  confirmText = "Confirm",

  onCancel,
  onConfirm,
}) {
  // ------------------------------------------------------------
  // Prevent background page scrolling
  // ------------------------------------------------------------

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // ------------------------------------------------------------
  // Don't render portal during SSR
  // ------------------------------------------------------------

  if (typeof document === "undefined") {
    return null;
  }

  const hasActions = showCancelButton || showConfirmButton;

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
          {/* -------------------------------------------------- */}
          {/* Backdrop                                            */}
          {/* -------------------------------------------------- */}

          <motion.div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* -------------------------------------------------- */}
          {/* Modal                                               */}
          {/* -------------------------------------------------- */}

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
            {/* ------------------------------------------------ */}
            {/* Emerald Glow                                      */}
            {/* ------------------------------------------------ */}

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

            {/* ------------------------------------------------ */}
            {/* Header                                            */}
            {/* ------------------------------------------------ */}

            <div className="relative flex items-start justify-between border-b border-white/10 p-6">
              <div className={showCloseButton ? "pr-8" : ""}>
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

              {showCloseButton && (
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
              )}
            </div>

            {/* ------------------------------------------------ */}
            {/* Content                                           */}
            {/* ------------------------------------------------ */}

            <div className="relative p-6">
              {children}
            </div>

            {/* ------------------------------------------------ */}
            {/* Footer                                            */}
            {/* ------------------------------------------------ */}

            {hasActions && (
              <div
                className="
                  relative
                  flex
                  items-center
                  justify-center
                  gap-3
                  border-t
                  border-white/10
                  bg-white/2
                  p-4
                "
              >
                {/* Cancel Button */}
                {showCancelButton && (
                  <button
                    type="button"
                    onClick={onCancel ?? onClose}
                    className="
                      flex-1
                      rounded-xl
                      border border-zinc-800
                      bg-zinc-900
                      px-5
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                      transition
                      hover:border-zinc-700
                      hover:bg-zinc-800
                    "
                  >
                    {cancelText}
                  </button>
                )}

                {/* Confirm Button */}
                {showConfirmButton && (
                  <button
                    type="button"
                    onClick={onConfirm}
                    className="flex-1 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400"
                  >
                    {confirmText}
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
