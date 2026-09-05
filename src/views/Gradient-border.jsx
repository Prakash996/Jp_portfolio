"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function GradientBorder({
  children,
  className = "",
  animate = true,
  duration = 5,
}) {

  const gradient = "bg-linear-to-r from-emerald-500/0 via-teal-200 to-purple-700/0";

  return (
    <div className="relative">
      {/* Soft glow */}
      <motion.div
        className={cn(
          "absolute -inset-px rounded-2xl",
          gradient,
          "blur-xs opacity-40"
        )}
        animate={
          animate
            ? {
                backgroundPosition: [
                  "0% 50%",
                  "100% 50%",
                  "0% 50%",
                ],
              }
            : undefined
        }
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 100%",
        }}
      />

      {/* Soft sharp border */}
      <motion.div
        className={cn(
          "relative rounded-2xl p-px",
          gradient,
          className
        )}
        animate={
          animate
            ? {
                backgroundPosition: [
                  "0% 50%",
                  "100% 50%",
                  "0% 50%",
                ],
              }
            : undefined
        }
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 100%",
        }}
      >
        <div className="rounded-[15px] bg-[#111111]">
          {children}
        </div>
      </motion.div>
    </div>
  );
}