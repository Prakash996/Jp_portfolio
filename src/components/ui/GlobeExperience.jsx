"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import {
  memo,
  useEffect,
  useRef,
  useState,
} from "react";

import "@/css/ExperienceGlobe.css";

const EASE_OUT = [0.16, 1, 0.3, 1];

export default function ExperienceGlobe() {
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    amount: 0.45,
    once: false,
  });
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = isInView && !prefersReducedMotion;

  const count = useMotionValue(0);

  const [displayCount, setDisplayCount] = useState(0);

  useMotionValueEvent(count, "change", (latest) => {
    setDisplayCount(Math.round(latest));
  });

  useEffect(() => {
    const controls = animate(count, isInView ? 6 : 0, {
      duration: isInView ? 4.2 : 1.5,
      ease: isInView ? EASE_OUT : [0.4, 0, 1, 1],
      onComplete: () => {
        if (isInView) {
          setDisplayCount(6);
        } else {
          setDisplayCount(0);
        }
      },
    });

    return () => controls.stop();
  }, [count, isInView]);

  return (
    <section
      id="experience-globe"
      ref={sectionRef}
      aria-label="Professional experience overview"
      className="experience-globe"
    >
      <GlobeAtmosphere shouldAnimate={shouldAnimate} />
      <GlobeSphere />

      <GlobeCounter
        count={displayCount}
        showPlus={isInView && displayCount === 6}
        isInView={isInView}
        shouldAnimate={shouldAnimate}
      />

      <WorldwideStatus shouldAnimate={shouldAnimate} />
    </section>
  );
}

const GlobeAtmosphere = memo(function GlobeAtmosphere({ shouldAnimate = false } = {}) {
  return (
    <div
      id="experience-globe-atmosphere"
      aria-hidden="true"
      className="experience-globe-atmosphere"
    >
      <motion.div
        id="experience-globe-emerald-glow"
        className="experience-globe-glow experience-globe-glow--emerald"
        animate={shouldAnimate ? {
          scale: [0.96, 1.04, 0.96],
          opacity: [0.3, 0.48, 0.3],
        } : false}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        id="experience-globe-purple-glow"
        className="experience-globe-glow experience-globe-glow--purple"
        animate={shouldAnimate ? {
          x: [-4, 5, -4],
          y: [3, -4, 3],
          opacity: [0.1, 0.22, 0.1],
        } : false}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        id="experience-globe-orange-glow"
        className="experience-globe-glow experience-globe-glow--orange"
        animate={shouldAnimate ? {
          x: [4, -5, 4],
          y: [-3, 5, -3],
          opacity: [0.06, 0.16, 0.06],
        } : false}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
});

function GlobeSphere() {
  return (
    <div
      id="experience-globe-sphere"
      aria-hidden="true"
      className="experience-globe-sphere"
    >
      <div
        id="experience-globe-surface"
        className="experience-globe-surface"
      >
        <div
          id="experience-globe-rim"
          className="experience-globe-rim"
        />

        <GlobeGrid />
        <GlobeDataPoints />
      </div>

      <div
        id="experience-globe-secondary-ring"
        className="experience-globe-secondary-ring"
      >
        <span
          id="experience-globe-secondary-vertical"
          className="experience-globe-secondary-ring__vertical"
        />

        <span
          id="experience-globe-secondary-horizontal"
          className="experience-globe-secondary-ring__horizontal"
        />
      </div>
    </div>
  );
}

const GlobeGrid = memo(function GlobeGrid() {
  return (
    <motion.div
      id="experience-globe-grid"
      className="experience-globe-grid"
      animate={{ rotate: 360 }}
      transition={{
        duration: 48,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <span
        id="globe-longitude-1"
        className="globe-line globe-line--longitude-1"
      />

      <span
        id="globe-longitude-2"
        className="globe-line globe-line--longitude-2"
      />

      <span
        id="globe-longitude-3"
        className="globe-line globe-line--longitude-3"
      />

      <span
        id="globe-latitude-1"
        className="globe-line globe-line--latitude-1"
      />

      <span
        id="globe-latitude-2"
        className="globe-line globe-line--latitude-2"
      />

      <span
        id="globe-latitude-purple"
        className="globe-line globe-line--latitude-purple"
      />

      <span
        id="globe-latitude-orange"
        className="globe-line globe-line--latitude-orange"
      />

      <span
        id="globe-equator"
        className="globe-equator"
      />
    </motion.div>
  );
});

const GlobeDataPoints = memo(function GlobeDataPoints() {
  return (
    <div
      id="experience-globe-data-points"
      className="experience-globe-data-points"
    >
      <motion.span
        id="experience-globe-point-emerald"
        className="globe-point globe-point--emerald"
        animate={{
          opacity: [0.25, 0.9, 0.25],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.span
        id="experience-globe-point-purple"
        className="globe-point globe-point--purple"
        animate={{
          opacity: [0.15, 0.65, 0.15],
          scale: [0.8, 1.15, 0.8],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.span
        id="experience-globe-point-orange"
        className="globe-point globe-point--orange"
        animate={{
          opacity: [0.1, 0.55, 0.1],
          scale: [0.8, 1.1, 0.8],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
});

const GlobeCounter = memo(function GlobeCounter({
  count,
  showPlus,
  isInView,
  shouldAnimate,
}) {
  return (
    <div
      id="experience-globe-counter"
      className="experience-globe-counter"
    >
      <motion.div
        id="experience-globe-count-wrapper"
        className="experience-globe-count-wrapper"
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={shouldAnimate ? {
          opacity: isInView ? 1 : 0.3,
          y: isInView ? 0 : 4,
        } : false}
        transition={{
          duration: 0.7,
          ease: EASE_OUT,
        }}
      >
        <span
          id="experience-globe-count"
          className="experience-globe-count"
        >
          {count}
        </span>

        <motion.span
          id="experience-globe-plus"
          className="experience-globe-plus"
          initial={false}
          animate={shouldAnimate ? {
            opacity: showPlus ? 1 : 0,
            scale: showPlus ? 1 : 0.8,
          } : false}
          transition={{
            duration: 0.45,
            ease: EASE_OUT,
          }}
        >
          +
        </motion.span>
      </motion.div>

      <motion.div
        id="experience-globe-label"
        className="experience-globe-label"
        initial={{
          opacity: 0,
          y: 5,
        }}
        animate={shouldAnimate ? {
          opacity: isInView ? 1 : 0.3,
          y: isInView ? 0 : 3,
        } : false}
        transition={{
          duration: 0.6,
          delay: 0.2,
          ease: EASE_OUT,
        }}
      >
        <span />
        <span>Years of experience</span>
        <span />
      </motion.div>
    </div>
  );
});

const WorldwideStatus = memo(function WorldwideStatus({ shouldAnimate = false } = {}) {
  return (
    <motion.div
      id="experience-globe-status"
      className="experience-globe-status"
      animate={shouldAnimate ? {
        opacity: [0.35, 0.65, 0.35],
      } : { opacity: 0.2 }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <span
        id="experience-globe-status-indicator"
        className="experience-globe-status__indicator"
      >
        <span id="experience-globe-status-dot" />
      </span>

      <span id="experience-globe-status-label">
        Worldwide
      </span>
    </motion.div>
  );
});
