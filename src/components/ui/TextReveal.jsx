import { motion } from "motion/react";

export default function TextReveal({
  text,
  className = "",
}) {
  const characters = [...text];

  return (
    <p
      className={`max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base ${className}`}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.025,
            delay: index * 0.025,
          }}
        >
          {char}
        </motion.span>
      ))}

      <motion.span
        className="ml-0.5 inline-block text-emerald-400"
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        _
      </motion.span>
    </p>
  );
}

