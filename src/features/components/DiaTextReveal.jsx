import { motion } from "motion/react";

export default function DiaTextReveal({
  text,
  className = "",
}) {
  const words = text.split(" ");

  return (
    <p className={`max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base ${className}`}>
        {words.map((word, index) => (
            <motion.span
                key={`${word}-${index}`}
                initial={{opacity: 0, y: 8, filter: "blur(6px)"}}
                whileInView={{opacity: 1, y: 0, filter: "blur(0px)"}}
                viewport={{once: true, amount: 0.3}}
                transition={{duration: 0.6, delay: index * 0.018, ease: [0.22, 1, 0.36, 1]}}
                className="inline-block will-change-transform">
                {word}
                {index < words.length - 1 && "\u00A0"}
            </motion.span>
        ))}
    </p>
  );
}
