"use client";

import { motion } from "motion/react";
import "@/css/SkillsSection.css";
import LayerComposition from "./ui/LayerComposition";
import TextReveal from "@/components/ui/TextReveal"
import Badge from "./ui/Badge";

function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="skills-section relative overflow-hidden font-mono"
    >
      {/* Ambient emerald glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-130
          w-130
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-emerald-500/[0.035]
          blur-[120px]
        "
      />

      {/* Background grid */}
      <div
        aria-hidden="true"
        className="skills-section__grid pointer-events-none absolute inset-0"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden bg-transparent">
          {/* Top glow line */}
          <div
            aria-hidden="true"
            className="
              absolute
              inset-x-0
              top-0
              h-px
              bg-linear-to-r
              from-transparent
              via-emerald-400/20
              to-transparent
            "
          />

          <div className="relative grid min-h-170 lg:grid-cols-2">
            {/* =================================================
                LEFT — CONTENT
            ================================================= */}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                z-10
                flex
                flex-col
                justify-center
                px-6
                py-16
                sm:px-10
                lg:px-14
              "
            >             
              <Badge text="Technical expertise"/>
              {/* Heading */}
              <h2
                id="skills-heading"
                className="
                  max-w-xl
                  text-4xl
                  font-bold
                  leading-[1.05]
                  tracking-[-0.04em]
                  text-white
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                Building with
                <span
                  className="
                    block
                    font-mono
                    bg-clip-text
                    text-transparent
                    [-webkit-background-clip:text]
                    [-webkit-text-fill-color:transparent]
                    drop-shadow-[0_0_25px_rgba(52,211,153,0.12)]
                  "
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #6EE7B7 0%, #34D399 35%, #06B6D4 70%, #3B82F6 100%)",
                  }}
                >
                  modern technology.
                </span>
              </h2>

              {/* Description */}
              <TextReveal text="A curated stack of technologies I use to build scalable interfaces, desktop applications, and high-performance frontend experiences."/>

              {/* Divider */}
              <div
                className="
                  my-9
                  h-px
                  w-full
                  max-w-md
                  bg-linear-to-r
                  from-emerald-400/20
                  via-white/6
                  to-transparent
                "
              />

              {/* Stats */}
              <div className="grid max-w-md grid-cols-3 gap-3">
                <Stat value="06+" label="Years exp." />
                <Stat value="29" label="Technologies" />
                <Stat value="∞" label="Projects" />
              </div>

              {/* Status */}
              <div
                className="
                  mt-10
                  flex
                  items-center
                  gap-3
                  text-[9px]
                  uppercase
                  tracking-[0.22em]
                  text-white/25
                "
              >
                <span className="h-px w-8 bg-emerald-400/30" />

                Stack status

                <span className="text-emerald-400/70">
                  Operational
                </span>
              </div>
            </motion.div>

            {/* =================================================
                RIGHT — CENTERED GLOBE
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                flex
                min-h-125
                items-center
                justify-center
                lg:min-h-170
              "
            >
              {/* Globe atmosphere */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-115
                  w-115
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-emerald-500/[0.035]
                  blur-[90px]
                "
              />

              {/* Globe — perfectly centered */}
              <div
                className="
                  relative
                  z-10
                  flex
                  w-full
                  items-center
                  justify-center
                "
              >
                {/* <ExperienceGlobe /> */}
                <LayerComposition/>
              </div>

              {/* Technical crosshair */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-1/2
                  h-8
                  w-8
                  -translate-x-1/2
                  -translate-y-1/2
                  opacity-20
                "
              >
                <span className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-emerald-400" />
                <span className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-emerald-400" />
                <span className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-emerald-400" />
                <span className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-emerald-400" />
              </div>
            </motion.div>
          </div>

          {/* Bottom system bar */}
          <div
            className="
              flex
              h-9
              items-center
              justify-between
              border-t
              border-emerald-400/6
              px-5
              text-[8px]
              uppercase
              tracking-[0.25em]
              text-white/20
              sm:px-8
            "
          >
            <span>SYS // TECHNOLOGY_MATRIX</span>

            <span className="text-emerald-400/40">
              ONLINE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div
      className="
        group
        rounded-xl
        border
        border-white/6
        bg-white/1.5
        px-4
        py-4
        transition-colors
        duration-300
        hover:border-emerald-400/20
        hover:bg-emerald-400/2.5
      "
    >
      <div className="text-lg font-semibold tracking-tight text-emerald-400">
        {value}
      </div>

      <div
        className="
          mt-1
          text-[8px]
          uppercase
          tracking-[0.16em]
          text-white/30
        "
      >
        {label}
      </div>
    </div>
  );
}

export default SkillsSection;
