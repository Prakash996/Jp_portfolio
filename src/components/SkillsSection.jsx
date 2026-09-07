"use client";

import { motion } from "motion/react";

import ExperienceGlobe from "@/components/ui/GlobeExperience";
import "@/css/SkillsSection.css";

function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="skills-section relative overflow-hidden"
    >
      {/* =====================================================
          Background Atmosphere
          ===================================================== */}

      <div
        aria-hidden="true"
        className="skills-section__atmosphere pointer-events-none absolute rounded-full"
      />

      {/* =====================================================
          Background Grid
          ===================================================== */}

      <div
        aria-hidden="true"
        className="skills-section__grid pointer-events-none absolute inset-0"
      />

      <div className="skills-section__inner relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* ===================================================
            Clipping wrapper

            Header, globe, and carousel now share one
            overflow-hidden container so the marquee can't bleed
            past the card's rounded corner. This wrapper is
            intentionally invisible (no border/background of its
            own) - the existing outer card already supplies those,
            and giving this one its own would double them up.
            =================================================== */}

        <div
          className="skills-section__content relative overflow-hidden rounded-[inherit]"
        >
          {/* =================================================
              Header + Globe
              ================================================= */}

          <div
            id="skills-header"
            className="skills-section__header grid grid-cols-1 items-center"
          >
            {/* ===============================================
                Header
                =============================================== */}
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              id="skills-intro"
              className="skills-section__intro max-w-2xl"
            >
              {/* Eyebrow */}
              <div
                className="
                  mb-2.5
                  flex
                  items-center
                  gap-3
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-emerald-400/70
                "
              >
                <span className="h-px w-7 bg-emerald-400/60" />

                Technical expertise
              </div>

              {/* Heading */}
              <h2
                id="skills-heading"
                className="skills-section__title text-3xl
                  font-bold
                  tracking-tight
                  sm:text-4xl
                  lg:text-5xl
                  bg-linear-to-r
                  from-emerald-300
                  via-teal-300
                  to-cyan-300
                  bg-clip-text
                  text-transparent"
              >
                Tech stack
              </h2>

              {/* Description */}
              <p
                className="skills-section__description
                  pt-8
                  max-w-xl
                  text-xs
                  leading-5
                  text-white/45
                  sm:text-sm
                  sm:leading-6
                "
              >
                A collection of technologies I use to build
                scalable interfaces, desktop applications, and
                high-performance frontend experiences.
              </p>
            </motion.div>
            {/* ===============================================
                Experience Globe
                =============================================== */}

            <div id="skills-globe" className="skills-section__globe relative flex items-center justify-center">
              <ExperienceGlobe />
            </div>
          </div>

          {/* =================================================
              Skills Carousel
              ================================================= */}

          <div id="skills-carousel" className="skills-section__carousel relative w-full">
            {/* <SkillsCarousel
              skills={skills}
              speed={35}
              direction="left"
              pauseOnHover={true}
              showTitle={true}
              title="Skills & Technologies"
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
