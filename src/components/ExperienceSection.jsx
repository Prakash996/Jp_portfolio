"use client";

import { useCallback, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCalendar,
  FiMapPin,
} from "react-icons/fi";
import "@/css/ExperienceCards.css";
import { experiences } from "@/data/personDetails.json";
import TextReveal from "./ui/TextReveal";

const EASE = [0.22, 1, 0.36, 1];

const SPRING = {
  stiffness: 220,
  damping: 30,
  mass: 0.2,
};

export default function ExperienceSection() {
  const timelineRef = useRef(null);

  const [isTimelineHovered, setIsTimelineHovered] = useState(false);

  const mouseY = useMotionValue(0);

  const smoothMouseY = useSpring(mouseY, SPRING);

  const handleMouseMove = useCallback(
    (event) => {
      const element = timelineRef.current;

      if (!element) return;

      const rect = element.getBoundingClientRect();

      const y = event.clientY - rect.top;

      mouseY.set(
        Math.max(
          0,
          Math.min(rect.height, y)
        )
      );
    },
    [mouseY]
  );

  const handleMouseEnter = useCallback(() => {
    setIsTimelineHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsTimelineHovered(false);
  }, []);

  return (
    <section
      id="experience"
      className="experience-section mx-auto max-w-6xl"
    >
      <ExperienceHeader />

      <div
        ref={timelineRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="
          experience-timeline
          relative
          isolate
          mb-20!
        "
      >
        <TimelineBase />

        <TimelineHighlight
          mouseY={smoothMouseY}
          visible={isTimelineHovered}
        />

        <div className="relative z-10 space-y-16 md:space-y-24">
          {experiences.map((experience, index) => (
            <ExperienceItem
              key={`${experience.id}-${experience.company}-${experience.period}`}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   HEADER
   ========================================================================== */

function ExperienceHeader() {
  return (
    <motion.header
      initial={{
        opacity: 0,
        y: 14,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.35,
      }}
      transition={{
        duration: 0.55,
        ease: EASE,
      }}
      className="experience-header mb-12"
    >
      <div className="flex items-center gap-2">
        <FiBriefcase
          size={18}
          className="experience-icon"
          aria-hidden="true"
        />

        <span
          className="
            experience-label
            text-xs
            font-medium
            uppercase
            tracking-[0.2em]
          "
        >
          Experience
        </span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <h2
          id="experience-heading"
          className="
            experience-title
            text-2xl
            font-semibold
            tracking-tight
            sm:text-3xl
          "
        >
          Professional Journey
        </h2>

        <span
          className="
            experience-count
            font-mono
            text-[10px]
            tracking-widest
          "
          aria-label={`${experiences.length} experiences`}
        >
          / {String(experiences.length).padStart(2, "0")}
        </span>
      </div>

      <p
        className="
          experience-description
          mt-3
          max-w-2xl
          text-sm
          leading-6
        "
      >
        A timeline of my professional experience, engineering
        responsibilities, and career growth.
      </p>
    </motion.header>
  );
}

/* ==========================================================================
   TIMELINE BASE
   ========================================================================== */

function TimelineBase() {
  return (
    <>
      {/* Desktop */}

      <div
        aria-hidden="true"
        className="
          timeline-base
          pointer-events-none
          absolute
          inset-y-0
          left-1/2
          z-0
          hidden
          w-[2px]
          -translate-x-1/2
          bg-zinc-700
          md:block
        "
      />

      {/* Mobile */}

      <div
        aria-hidden="true"
        className="
          timeline-base
          pointer-events-none
          absolute
          inset-y-0
          left-4.25
          z-0
          w-[2px]
          bg-zinc-700
          md:hidden
        "
      />
    </>
  );
}

/* ==========================================================================
   TIMELINE HIGHLIGHT / MOUSE BEAM
   ========================================================================== */

function TimelineHighlight({ mouseY, visible }) {
  return (
    <>
      {/* ------------------------------------------------------------------
         DESKTOP GLOW
         ------------------------------------------------------------------ */}

      <motion.div
        aria-hidden="true"
        style={{
          top: mouseY,
          opacity: visible ? 0.35 : 0,
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          z-[40]
          hidden
          h-28
          w-5
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-emerald-400
          blur-lg
          md:block
        "
      />

      {/* ------------------------------------------------------------------
         DESKTOP BEAM
         ------------------------------------------------------------------ */}

      <motion.div
        aria-hidden="true"
        style={{
          top: mouseY,
          opacity: visible ? 1 : 0,
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          z-[50]
          hidden
          h-24
          w-[2px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-emerald-300
          shadow-[0_0_8px_rgba(52,211,153,0.9)]
          md:block
        "
      />

      {/* ------------------------------------------------------------------
         MOBILE GLOW
         ------------------------------------------------------------------ */}

      <motion.div
        aria-hidden="true"
        style={{
          top: mouseY,
          opacity: visible ? 0.35 : 0,
        }}
        className="
          pointer-events-none
          absolute
          left-4.25
          z-[40]
          h-24
          w-5
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-emerald-400
          blur-lg
          md:hidden
        "
      />

      {/* ------------------------------------------------------------------
         MOBILE BEAM
         ------------------------------------------------------------------ */}

      <motion.div
        aria-hidden="true"
        style={{
          top: mouseY,
          opacity: visible ? 1 : 0,
        }}
        className="
          pointer-events-none
          absolute
          left-4.25
          z-[50]
          h-20
          w-[2px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-emerald-300
          shadow-[0_0_8px_rgba(52,211,153,0.9)]
          md:hidden
        "
      />
    </>
  );
}

/* ==========================================================================
   EXPERIENCE ITEM
   ========================================================================== */

function ExperienceItem({ experience, index }) {
  const itemRef = useRef(null);

  const isInView = useInView(itemRef, {
    once: true,
    amount: 0.25,
  });

  const isLeft = index % 2 === 0;

  const itemId = `experience-${experience.id}`;

  return (
    <div
      ref={itemRef}
      id={`${itemId}-item`}
      className="
        experience-item
        relative
        md:grid
        md:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)]
        md:items-start
      "
    >
      {/* ------------------------------------------------------------------
         LEFT
         ------------------------------------------------------------------ */}

      {isLeft ? (
        <div className="md:col-start-1 md:row-start-1">
          <ExperienceCard
            id={`${itemId}-card`}
            experience={experience}
            active={isInView}
            direction="left"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="
            hidden
            md:col-start-1
            md:row-start-1
            md:block
          "
        />
      )}

      {/* ------------------------------------------------------------------
         NODE
         ------------------------------------------------------------------ */}

      <div
        className="
          experience-node-wrapper
          absolute
          left-4.25
          top-7
          z-[60]
          -translate-x-1/2

          md:static
          md:col-start-2
          md:row-start-1
          md:flex
          md:h-8
          md:w-16
          md:items-start
          md:justify-center
          md:translate-x-0
          md:pt-8
        "
      >
        <TimelineNode
          id={`${itemId}-node`}
          active={isInView}
          number={experience.id}
        />
      </div>

      {/* ------------------------------------------------------------------
         RIGHT
         ------------------------------------------------------------------ */}

      {!isLeft ? (
        <div className="md:col-start-3 md:row-start-1">
          <ExperienceCard
            id={`${itemId}-card`}
            experience={experience}
            active={isInView}
            direction="right"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="
            hidden
            md:col-start-3
            md:row-start-1
            md:block
          "
        />
      )}

      {/* ------------------------------------------------------------------
         CONNECTOR
         ------------------------------------------------------------------ */}

      <TimelineConnector
        id={`${itemId}-connector`}
        side={isLeft ? "left" : "right"}
        active={isInView}
      />
    </div>
  );
}

/* ==========================================================================
   CONNECTOR
   ========================================================================== */

function TimelineConnector({
  id,
  side,
  active,
}) {
  return (
    <motion.div
      id={id}
      aria-hidden="true"
      initial={{
        opacity: 0,
        scaleX: 0,
      }}
      animate={{
        opacity: active ? 1 : 0,
        scaleX: active ? 1 : 0,
      }}
      transition={{
        duration: 0.4,
        ease: EASE,
      }}
      style={{
        transformOrigin:
          side === "left"
            ? "right center"
            : "left center",
      }}
      className={`
        timeline-connector
        timeline-connector--${side}
        pointer-events-none
        absolute
        top-12
        z-20
        hidden
        h-px
        w-8
        md:block
      `}
    />
  );
}

/* ==========================================================================
   NODE
   ========================================================================== */

function TimelineNode({
  id,
  active,
  number,
}) {
  return (
    <div
      id={id}
      className="
        timeline-node
        relative
        flex
        h-8
        w-8
        items-center
        justify-center
      "
    >
      {/* Node glow */}

      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: active ? 0.35 : 0,
          scale: active ? 1 : 0.65,
        }}
        transition={{
          duration: 0.3,
          ease: EASE,
        }}
        className="
          timeline-node-glow
          absolute
          inset-1
          rounded-full
          bg-emerald-400
          blur-md
        "
      />

      {/* Node ring */}

      <motion.div
        initial={false}
        animate={{
          borderColor: active
            ? "rgba(52,211,153,0.85)"
            : "rgba(63,63,70,0.9)",

          backgroundColor: active
            ? "rgba(16,185,129,0.06)"
            : "rgba(9,11,10,0.95)",

          boxShadow: active
            ? "0 0 20px rgba(52,211,153,0.12)"
            : "none",
        }}
        transition={{
          duration: 0.3,
          ease: EASE,
        }}
        className="
          timeline-node-ring
          relative
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          border
        "
      >
        {/* Dot */}

        <motion.span
          initial={false}
          animate={{
            scale: active ? 1 : 0.7,

            backgroundColor: active
              ? "#34d399"
              : "#52525b",

            boxShadow: active
              ? "0 0 10px rgba(52,211,153,0.75)"
              : "none",
          }}
          transition={{
            duration: 0.3,
            ease: EASE,
          }}
          className="
            timeline-node-dot
            h-2
            w-2
            rounded-full
          "
        />
      </motion.div>

      <span
        aria-hidden="true"
        className="
          absolute
          left-9
          hidden
          font-mono
          text-[9px]
          md:hidden
        "
      >
        {number}
      </span>
    </div>
  );
}

/* ==========================================================================
   EXPERIENCE CARD
   ========================================================================== */

function ExperienceCard({
  id,
  experience,
  active,
  direction,
}) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,

    offset: [
      "start 88%",
      "center 50%",
      "end 12%",
    ],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.42, 0.82, 1, 0.82, 0.42]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.985, 1, 0.985]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [12, 0, -12]
  );

  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.05, 0.3, 0.55, 0.3, 0.05]
  );

  const borderOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0.12, 0.22, 0.35, 0.22, 0.12]
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: direction === "left"
          ? -32
          : 32,
      }}
      animate={{
        opacity: active ? 1 : 0,
        x: active
          ? 0
          : direction === "left"
            ? -32
            : 32,
      }}
      transition={{
        duration: 0.55,
        ease: EASE,
      }}
    >
      <motion.article
        ref={cardRef}
        id={id}
        aria-labelledby={`${id}-title`}
        style={{
          opacity,
          scale,
          y,
        }}
        className="
          experience-card
          group
          relative
          ml-12
          overflow-hidden
          rounded-3xl
          border
          border-emerald-400/20
          bg-[#080b0a]
          px-6
          py-7
          shadow-[0_20px_70px_rgba(0,0,0,0.45)]
          transition-[border-color,box-shadow]
          duration-500
          hover:border-emerald-400/40
          hover:shadow-[0_25px_90px_rgba(16,185,129,0.12)]
          sm:px-7
          md:ml-0
          md:min-h-87.5
          md:px-8
          md:py-8
        "
      >
        {/* Border */}

        <motion.div
          aria-hidden="true"
          style={{
            opacity: borderOpacity,
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-3xl
            border
            border-emerald-400
          "
        />

        {/* Glow */}

        <motion.div
          aria-hidden="true"
          style={{
            opacity: glowOpacity,
          }}
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-56
            w-56
            rounded-full
            bg-emerald-400/15
            blur-[80px]
          "
        />

        {/* Background */}

        <motion.div
          aria-hidden="true"
          style={{
            opacity: glowOpacity,
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_12%_0%,rgba(16,185,129,0.18),transparent_35%),radial-gradient(circle_at_100%_100%,rgba(5,150,105,0.1),transparent_45%)]
          "
        />

        {/* Noise */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.025]
            bg-[radial-gradient(#fff_0.6px,transparent_0.6px)]
            bg-size-[5px_5px]
          "
        />

        {/* Background number */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-3
            -top-8
            select-none
            text-[145px]
            font-black
            leading-none
            tracking-[-0.12em]
            text-emerald-400/5.5
            transition-colors
            duration-500
            group-hover:text-emerald-400/[0.09]
            md:text-[175px]
          "
        >
          {String(experience.id).padStart(2, "0")}
        </div>

        {/* Top accent */}

        <motion.div
          aria-hidden="true"
          style={{
            opacity: glowOpacity,
          }}
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-emerald-400/70
            to-transparent
          "
        />

        {/* Content */}

        <div className="relative z-10">
          <CardHeader
            id={id}
            experience={experience}
          />

          <div
            aria-hidden="true"
            className="
              my-6
              h-px
              bg-gradient-to-r
              from-emerald-400/20
              via-white/[0.07]
              to-transparent
            "
          />

          <TextReveal
            text={experience.description}
          />

          {experience.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {experience.tags.map((tag) => (
                <span
                  key={tag}
                  className="
                    rounded-full
                    border
                    border-emerald-400/10
                    bg-emerald-400/[0.035]
                    px-3
                    py-1.5
                    font-mono
                    text-[9px]
                    font-medium
                    uppercase
                    tracking-[0.08em]
                    text-emerald-300/70
                    transition-all
                    duration-300
                    hover:border-emerald-400/30
                    hover:bg-emerald-400/[0.08]
                    hover:text-emerald-300
                  "
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <CardFooter
            experience={experience}
          />
        </div>

        {/* Bottom accent */}

        <motion.div
          aria-hidden="true"
          style={{
            opacity: glowOpacity,
          }}
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            h-px
            w-full
            bg-gradient-to-r
            from-transparent
            via-emerald-400/80
            to-transparent
          "
        />

        <motion.div
          aria-hidden="true"
          style={{
            opacity: glowOpacity,
          }}
          className="
            pointer-events-none
            absolute
            -bottom-24
            -left-24
            h-48
            w-48
            rounded-full
            bg-emerald-500/10
            blur-[70px]
          "
        />
      </motion.article>
    </motion.div>
  );
}

/* ==========================================================================
   CARD HEADER
   ========================================================================== */

function CardHeader({
  id,
  experience,
}) {
  return (
    <header
      className="
        flex
        flex-col
        gap-5
        sm:flex-row
        sm:items-start
        sm:justify-between
      "
    >
      <div className="min-w-0">
        <span
          className="
            mb-4
            block
            font-mono
            text-[9px]
            font-bold
            uppercase
            tracking-[0.2em]
            text-emerald-400
          "
        >
          // Experience & Background
        </span>

        {experience.current && (
          <div className="mb-3 flex items-center gap-2">
            <span
              aria-hidden="true"
              className="
                h-1.5
                w-1.5
                animate-pulse
                rounded-full
                bg-emerald-400
                shadow-[0_0_10px_rgba(52,211,153,0.8)]
              "
            />

            <span
              className="
                font-mono
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-emerald-300
              "
            >
              Current Role
            </span>
          </div>
        )}

        <h3
          id={`${id}-title`}
          className="
            max-w-[90%]
            text-xl
            font-extrabold
            leading-tight
            tracking-[-0.02em]
            text-white
            transition-colors
            duration-300
            group-hover:text-emerald-50
            sm:text-2xl
          "
        >
          {experience.title}
        </h3>

        <p
          className="
            mt-2
            font-mono
            text-xs
            font-medium
            tracking-wide
            text-white/55
            sm:text-sm
          "
        >
          {experience.company}
        </p>
      </div>

      <div
        className="
          flex
          shrink-0
          items-center
          gap-2
          self-start
          rounded-full
          border
          border-white/[0.08]
          bg-white/[0.025]
          px-3
          py-1.5
          font-mono
          text-[10px]
          text-white/45
          transition-all
          duration-300
          group-hover:border-emerald-400/20
          group-hover:text-emerald-300
        "
      >
        <FiCalendar
          size={12}
          className="text-emerald-400/70"
          aria-hidden="true"
        />

        <span className="whitespace-nowrap">
          {experience.period}
        </span>
      </div>
    </header>
  );
}

/* ==========================================================================
   CARD FOOTER
   ========================================================================== */

function CardFooter({ experience }) {
  return (
    <footer
      className="
        mt-7
        flex
        items-center
        justify-between
        border-t
        border-white/[0.07]
        pt-4
      "
    >
      <div className="flex items-center gap-2">
        <FiMapPin
          size={13}
          className="text-emerald-400/70"
          aria-hidden="true"
        />

        <span
          className="
            font-mono
            text-[9px]
            uppercase
            tracking-[0.18em]
            text-white/35
          "
        >
          {experience.location}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span
          className="
            hidden
            font-mono
            text-[9px]
            uppercase
            tracking-[0.15em]
            text-white/20
            transition-colors
            group-hover:text-emerald-400/50
            sm:block
          "
        >
          Explore
        </span>

        <div
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/2.5
            transition-all
            duration-300
            group-hover:border-emerald-400/30
            group-hover:bg-emerald-400/10
          "
        >
          <FiArrowUpRight
            size={13}
            className="
              text-white/40
              transition-all
              duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
              group-hover:text-emerald-300
            "
            aria-hidden="true"
          />
        </div>
      </div>
    </footer>
  );
}
