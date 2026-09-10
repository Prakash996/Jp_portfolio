"use client";

import { motion } from "motion/react";
import {
  ArrowDownRight,
  Code2,
  MapPin,
  Sparkles,
} from "lucide-react";
import TextReveal from "@/components/ui/TextReveal";
import Badge from "@/components/ui/Badge";

export default function IntroSection({ personDetails }) {
  return (
    <section
      className="
        relative
        flex
        min-h-130
        flex-col
        justify-center
        overflow-hidden
        font-mono
        lg:col-span-8
        pl-1
      "
      aria-labelledby="intro-heading"
    >


      {/* ================================================== */}
      {/* Content                                             */}
      {/* ================================================== */}

      <div className="relative z-10 max-w-4xl">
        {/* ================================================== */}
        {/* Status / Availability                              */}
        {/* ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          <Badge text="Open to Senior Frontend & Software Engineer Roles" />
        </motion.div>

        {/* ================================================== */}
        {/* Terminal Accent                                    */}
        {/* ================================================== */}

        <motion.div
          className="
            mb-5
            flex
            items-center
            gap-2
            text-[10px]
            uppercase
            tracking-[0.22em]
            text-emerald-400/50
          "
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
        >
          <Code2 size={13} strokeWidth={1.6} />

          <span>developer.portfolio</span>

          <span className="text-white/15">
            /
          </span>

          <span className="text-white/30">
            introduction
          </span>
        </motion.div>

        {/* ================================================== */}
        {/* Heading                                             */}
        {/* ================================================== */}

        <motion.h1
          id="intro-heading"
          className="
            relative
            mb-8
            font-mono
            text-4xl
            font-bold
            leading-[0.95]
            tracking-[-0.055em]
            md:text-6xl
            lg:text-7xl
          "
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Decorative accent */}

          <span
            aria-hidden="true"
            className="
              absolute
              -left-5
              top-1
              hidden
              h-16
              w-px
              bg-linear-to-b
              from-emerald-400
              to-transparent
              md:block
            "
          />

          <span className="text-white/90">
            I’m{" "}
          </span>

          <span className="relative text-white">
            {personDetails.name}

            <span
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                -z-10
                bg-emerald-400/10
                blur-2xl
              "
            />
          </span>

          <span className="text-emerald-400/70">
            ,
          </span>

          <br />

          <span
            className="
              bg-linear-to-r
              from-emerald-300
              via-emerald-400
              to-cyan-400
              bg-clip-text
              text-transparent
              drop-shadow-[0_0_25px_rgba(52,211,153,0.12)]
            "
          >
            {personDetails.title}
          </span>
          <br />
          <span className="text-white/70">
            Based in{" "}
              <MapPin
                className="
                  inline-block
                  h-6 w-auto md:h-8 md:w-8 lg:h-12 lg:w-12
                  relative -top-0.5 -left-2 md:-top-0.75 lg:-top-1
                  mx-1
                  text-[#00D9A5]
                  drop-shadow-[0_0_6px_rgba(0,215,150,0.05)]
                "
                strokeWidth={1.6}
              />

            <span className="whitespace-nowrap">
              <span className="text-white/80">{personDetails.location}</span>
            </span>
          </span>
        </motion.h1>

        {/* ================================================== */}
        {/* Description                                        */}
        {/* ================================================== */}

        <motion.div
          className="
            relative
            max-w-3xl
            pl-5
            ml-5
            font-mono
            text-base
            leading-7
            text-white/55
            md:text-lg
            md:leading-8
          "
          initial={{
            opacity: 0,
            x: -20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.4,
            ease: "easeOut",
          }}
        >
          <span
            aria-hidden="true"
            className="
              absolute
              -left-px
              top-0
              h-full
              w-px
              bg-linear-to-b
              from-emerald-400
              via-emerald-400/30
              to-transparent
            "
          />

          <span
            aria-hidden="true"
            className="
              absolute
              -left-0.75
              top-0
              h-16
              w-1.25
              rounded-full
              bg-emerald-400/40
              blur-sm
            "
          />

          <TextReveal
            text={personDetails.description}
          />
        </motion.div>

        {/* ================================================== */}
        {/* Developer Status                                   */}
        {/* ================================================== */}

        <motion.div
          className="
            mt-8
            flex
            flex-wrap
            items-center
            gap-x-5
            gap-y-3
            text-[10px]
            uppercase
            tracking-[0.18em]
          "
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.55,
          }}
        >
          <div className="flex items-center gap-2 text-emerald-400/70">
            <span className="relative flex h-2 w-2">
              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  bg-emerald-400
                  opacity-50
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
                  shadow-[0_0_10px_rgba(52,211,153,0.8)]
                "
              />
            </span>

            Available for opportunities
          </div>

          <span className="text-white/10">
            •
          </span>

          <div className="flex items-center gap-2 text-white/30">
            <Sparkles
              size={12}
              strokeWidth={1.5}
            />

            Building digital experiences
          </div>
        </motion.div>

        {/* ================================================== */}
        {/* Scroll Hint                                         */}
        {/* ================================================== */}

        <motion.div
          className="
            mt-10
            flex
            items-center
            gap-2
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-white/20
          "
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
            delay: 0.8,
          }}
        >
          <span>
            Explore
          </span>

          <ArrowDownRight
            size={14}
            strokeWidth={1.5}
            className="text-emerald-400/50"
          />
        </motion.div>
      </div>
    </section>
  );
}
