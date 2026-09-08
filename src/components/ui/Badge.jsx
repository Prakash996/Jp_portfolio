import { motion } from "motion/react";

export default function Badge({ text = "Work in Progress" }) {
  return (
    <motion.div
      className="
        mb-6
        flex
        w-fit
        items-center
        gap-3
        rounded-full
        border border-emerald-400/20
        bg-emerald-400/6
        px-4
        py-2
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.2em]
        text-emerald-300/90
      "
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span
          className="
            absolute
            inline-flex
            h-full
            w-full
            animate-ping
            rounded-full
            bg-emerald-400
            opacity-60
          "
        />

        <span
          className="
            relative
            inline-flex
            h-2
            w-2
            rounded-full
            bg-emerald-400
            shadow-[0_0_10px_rgba(52,211,153,0.9)]
          "
        />
      </span>

      <span>{text}</span>
    </motion.div>
  );
}
