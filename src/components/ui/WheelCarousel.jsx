"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CircleHelp,
  Code2,
  Compass,
  Database,
  Globe2,
  Layers3,
  LayoutGrid,
  TestTube,
  Wrench,
} from "lucide-react";
import {
  SiAngular,
  SiBootstrap,
  SiCss,
  SiEclipseide,
  SiElectron,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHcl,
  SiHtml5,
  SiJenkins,
  SiJira,
  SiJavascript,
  SiJquery,
  SiMocha,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiRedux,
  SiSelenium,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import skillsData from "@/data/skills.json";

const FALLBACK_ACCENT = "#818cf8";

const SKILL_ICONS = {
  "simple-icons:angular": SiAngular,
  "simple-icons:bootstrap": SiBootstrap,
  "simple-icons:css3": SiCss,
  "simple-icons:eclipseide": SiEclipseide,
  "simple-icons:electron": SiElectron,
  "simple-icons:express": SiExpress,
  "simple-icons:figma": SiFigma,
  "simple-icons:firebase": SiFirebase,
  "simple-icons:git": SiGit,
  "simple-icons:github": SiGithub,
  "simple-icons:hcl": SiHcl,
  "simple-icons:html5": SiHtml5,
  "simple-icons:jenkins": SiJenkins,
  "simple-icons:jira": SiJira,
  "simple-icons:javascript": SiJavascript,
  "simple-icons:jquery": SiJquery,
  "simple-icons:mocha": SiMocha,
  "simple-icons:mongodb": SiMongodb,
  "simple-icons:mysql": SiMysql,
  "simple-icons:nextdotjs": SiNextdotjs,
  "simple-icons:nodedotjs": SiNodedotjs,
  "simple-icons:python": SiPython,
  "simple-icons:react": SiReact,
  "simple-icons:redux": SiRedux,
  "simple-icons:selenium": SiSelenium,
  "simple-icons:sqlite": SiSqlite,
  "simple-icons:tailwindcss": SiTailwindcss,
  "simple-icons:typescript": SiTypescript,
  "mdi:code-braces": Code2,
  "mdi:compass-outline": Compass,
  "mdi:database-outline": Database,
  "mdi:layers-outline": Layers3,
  "mdi:test-tube": TestTube,
  "mdi:tools": Wrench,
  "mdi:view-grid-outline": LayoutGrid,
  "mdi:web": Globe2,
};

/*
 * Viewport tier, tracked in state so the wheel geometry updates on
 * resize/rotation and matches between server and client renders.
 * Breakpoints mirror Tailwind: sm 640, md 768, lg 1024.
 */
function useViewportTier() {
  const [tier, setTier] = useState("lg");

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;

      setTier(
        width < 640
          ? "xs"
          : width < 768
            ? "sm"
            : width < 1024
              ? "md"
              : "lg"
      );
    };

    update();

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return tier;
}

export default function WheelCarousel({
  items = skillsData,
  radius = 230,
  spacing = 14,
  visibleItems = 4,
  autoPlay = true,
  autoPlayMs = 2600,
  resumeDelay = 4000,
  onSelectionChange,
}) {
  const reduceMotion = useReducedMotion();
  const tier = useViewportTier();

  /*
   * Wheel geometry per device size.
   *
   * A smaller radius needs a LARGER angle between items,
   * otherwise neighbouring pills overlap. Each row below keeps
   * the vertical gap between items (radius x sin(spacing)) at
   * roughly 44-50px, which fits the pill height at that size.
   *
   * Desktop keeps the props you pass in.
   */
  const wheelConfig = {
    xs: { radius: 120, spacing: 19, visible: 3 },
    sm: { radius: 170, spacing: 16, visible: 4 },
    md: { radius: 195, spacing: 15, visible: 4 },
    lg: { radius, spacing, visible: visibleItems },
  }[tier];

  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(true);

  const sectionRef = useRef(null);
  const wheelRef = useRef(null);
  const drag = useRef(null);
  const suppressClickUntil = useRef(0);
  const lastWheelAt = useRef(0);
  const resumeTimer = useRef(null);

  const itemCount = items.length;

  const wrapIndex = (index) =>
    ((index % itemCount) + itemCount) % itemCount;

  const selectedIndex = itemCount
    ? wrapIndex(Math.round(rotation))
    : 0;

  const selectedSkill = items[selectedIndex];
  const accent = selectedSkill?.color || FALLBACK_ACCENT;

  const playing =
    autoPlay &&
    !reduceMotion &&
    inView &&
    !hovered &&
    !userPaused &&
    !dragging &&
    itemCount > 1;

  const getOffset = (index) => {
    let offset = index - rotation;

    while (offset > itemCount / 2) offset -= itemCount;
    while (offset < -itemCount / 2) offset += itemCount;

    return offset;
  };

  const selectIndex = (index) => {
    setRotation(wrapIndex(index));
  };

  useEffect(() => {
    if (selectedSkill) {
      onSelectionChange?.(selectedSkill);
    }
  }, [onSelectionChange, selectedSkill]);

  const pauseForUser = useCallback(() => {
    setUserPaused(true);

    clearTimeout(resumeTimer.current);

    resumeTimer.current = setTimeout(() => {
      setUserPaused(false);
    }, resumeDelay);
  }, [resumeDelay]);

  useEffect(() => {
    return () => clearTimeout(resumeTimer.current);
  }, []);

  // Autoplay
  useEffect(() => {
    if (!playing) return;

    const id = setInterval(() => {
      setRotation(
        (current) => (Math.round(current) + 1) % itemCount
      );
    }, autoPlayMs);

    return () => clearInterval(id);
  }, [playing, autoPlayMs, itemCount]);

  // Intersection observer
  useEffect(() => {
    const el = sectionRef.current;

    if (!el || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      {
        threshold: 0.2,
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Wheel interaction
  useEffect(() => {
    const el = wheelRef.current;

    if (!el || !itemCount) return;

    const onWheel = (event) => {
      const delta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;

      if (!delta) return;

      event.preventDefault();
      pauseForUser();

      const now = Date.now();

      if (now - lastWheelAt.current < 140) return;

      lastWheelAt.current = now;

      const step = delta > 0 ? 1 : -1;

      setRotation(
        (current) =>
          (((Math.round(current) + step) % itemCount) +
            itemCount) %
          itemCount
      );
    };

    el.addEventListener("wheel", onWheel, {
      passive: false,
    });

    return () => {
      el.removeEventListener("wheel", onWheel);
    };
  }, [itemCount, pauseForUser]);

  // Pointer drag
  const handlePointerDown = (event) => {
    if (!event.isPrimary || event.button !== 0) return;

    pauseForUser();

    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startRotation: rotation,
      moved: false,
    };

    suppressClickUntil.current = 0;

    setDragging(true);

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (
      !drag.current ||
      drag.current.pointerId !== event.pointerId
    ) {
      return;
    }

    const deltaX =
      event.clientX - drag.current.startX;

    const deltaY =
      event.clientY - drag.current.startY;

    const distance =
      Math.abs(deltaY) >= Math.abs(deltaX)
        ? deltaY
        : deltaX;

    if (Math.abs(distance) > 6) {
      drag.current.moved = true;
    }

    if (!drag.current.moved) return;

    /*
     * Drag sensitivity follows the item gap on screen, so one
     * item of finger travel always moves the wheel one item,
     * whatever the device size.
     */
    const pxPerItem = Math.max(
      wheelConfig.radius *
        Math.sin((wheelConfig.spacing * Math.PI) / 180),
      30
    );

    setRotation(
      drag.current.startRotation - distance / pxPerItem
    );
  };

  const handlePointerUp = (event) => {
    if (
      !drag.current ||
      drag.current.pointerId !== event.pointerId
    ) {
      return;
    }

    if (drag.current.moved) {
      suppressClickUntil.current = Date.now() + 150;
    }

    drag.current = null;

    setDragging(false);

    setRotation((current) =>
      wrapIndex(Math.round(current))
    );

    pauseForUser();

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      );
    }
  };

  const handleKeyDown = (event) => {
    const keys = [
      "ArrowDown",
      "ArrowRight",
      "ArrowUp",
      "ArrowLeft",
      "Home",
      "End",
    ];

    if (!keys.includes(event.key)) return;

    event.preventDefault();

    pauseForUser();

    if (
      event.key === "ArrowDown" ||
      event.key === "ArrowRight"
    ) {
      selectIndex(selectedIndex + 1);
    }

    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowLeft"
    ) {
      selectIndex(selectedIndex - 1);
    }

    if (event.key === "Home") {
      selectIndex(0);
    }

    if (event.key === "End") {
      selectIndex(itemCount - 1);
    }
  };

  if (!itemCount) return null;

  const SelectedIcon =
    SKILL_ICONS[selectedSkill.icon] || CircleHelp;

  return (
    <section
      ref={sectionRef}
      aria-label="Skills"
      className="
        relative flex min-h-0 w-full flex-col
        items-center justify-center
        overflow-hidden bg-transparent
        px-2 py-6

        sm:min-h-150 sm:px-6 sm:py-10
        md:min-h-140 md:px-8
        lg:min-h-175 lg:px-6 lg:py-12
      "
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") {
          setHovered(true);
        }
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") {
          setHovered(false);
        }
      }}
    >
      {/* Background ambient light: fades out top and bottom so it never hard-clips */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)",
          maskImage:
            "linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)",
        }}
      >
        {/* Main glow, centred behind the image */}
        <div
          className="
            absolute left-[24%] top-1/2
            h-72 w-72
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            transition-colors duration-700

            sm:left-[27%] sm:h-112 sm:w-112
            md:left-[25%] md:h-128 md:w-128
            lg:left-[27%] lg:h-160 lg:w-160
          "
          style={{
            backgroundColor: accent,
            opacity: 0.26,
            WebkitMaskImage:
              "radial-gradient(circle, black 0%, rgba(0,0,0,0.45) 40%, transparent 70%)",
            maskImage:
              "radial-gradient(circle, black 0%, rgba(0,0,0,0.45) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* Main content */}
      <div
        className="
          relative z-10 grid w-full max-w-6xl
          grid-cols-[0.8fr_1.2fr] items-center

          gap-1
          sm:grid-cols-[0.9fr_1.1fr]
          sm:gap-6

          md:grid-cols-2
          md:gap-6

          lg:grid-cols-[1.05fr_0.95fr]
          lg:gap-8
        "
      >
        {/* Selected skill */}
        <div
          className="
            relative flex min-w-0 flex-col
            items-center justify-center
            text-center
          "
        >
          {/* Responsive center image container */}
          <div
            className="
              relative flex h-30 w-30
              items-center justify-center

              sm:h-44 sm:w-44
              md:h-64 md:w-64
              lg:h-88 lg:w-88
            "
          >
            {/* Progress ring */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              className="
                absolute inset-0 z-10
                h-full w-full
                -rotate-90
              "
            >
              <AnimatePresence initial={false}>
                {playing && (
                  <motion.circle
                    key={`${selectedIndex}-ring`}
                    cx="50"
                    cy="50"
                    r="49.2"
                    fill="none"
                    stroke={accent}
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{
                      pathLength: 0,
                      opacity: 0,
                    }}
                    animate={{
                      pathLength: 1,
                      opacity: 0.9,
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: 0.15,
                      },
                    }}
                    transition={{
                      duration: autoPlayMs / 1000,
                      ease: "linear",
                    }}
                  />
                )}
              </AnimatePresence>
            </svg>

            {/* Selected icon */}
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              <motion.div
                key={selectedSkill.name}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        scale: 0.88,
                        filter: "blur(5px)",
                      }
                }
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        scale: 0.94,
                        filter: "blur(4px)",
                      }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  relative z-10
                  flex items-center justify-center
                "
              >
                <SelectedIcon
                  aria-hidden="true"
                  className="
                    h-16 w-16

                    sm:h-24 sm:w-24
                    md:h-32 md:w-32
                    lg:h-56 lg:w-56
                  "
                  color={
                    selectedSkill.color ||
                    "currentColor"
                  }
                  style={{
                    filter: `drop-shadow(
                      0 10px 24px ${accent}55
                    )`,
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Selected skill information */}
          <motion.div
            key={`label-${selectedSkill.name}`}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 8,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.35,
              delay: 0.05,
            }}
            className="
              mt-2 flex max-w-sm
              flex-col items-center

              sm:mt-4
              lg:mt-7
            "
            aria-live="polite"
          >
            {selectedSkill.category && (
              <span
                className="
                  rounded-full border
                  px-2 py-0.5
                  text-[10px] font-medium

                  sm:px-3 sm:py-1 sm:text-sm
                  lg:text-xs
                "
                style={{
                  borderColor: `${accent}55`,
                  backgroundColor: `${accent}14`,
                  color: `${accent}`,
                  boxShadow: `0 0 18px ${accent}12`,
                }}
              >
                {selectedSkill.category}
              </span>
            )}

            {/* Gradient line */}
            <span
              aria-hidden="true"
              className="
                relative mt-2
                block h-0.5 w-16

                sm:mt-4 sm:w-28
                lg:mt-5 lg:w-32
              "
              style={{
                background: `linear-gradient(
                  90deg,
                  transparent 0%,
                  ${accent}20 15%,
                  ${accent}60 30%,
                  ${accent} 50%,
                  ${accent}60 70%,
                  ${accent}20 85%,
                  transparent 100%
                )`,
                boxShadow: `0 0 12px ${accent}55`,
              }}
            />
          </motion.div>
        </div>

        {/* Wheel */}
        <div
          className="
            flex w-full min-w-0 flex-col
            items-center
            md:items-stretch
          "
        >
          <div
            ref={wheelRef}
            aria-label="Choose a skill"
            role="listbox"
            tabIndex={0}
            className={`
              relative
              h-64 w-full
              touch-none overflow-hidden
              rounded-2xl outline-none
              focus-visible:ring-2
              focus-visible:ring-foreground/30

              sm:h-84
              md:h-96
              lg:h-125

              ${
                dragging
                  ? "cursor-grabbing"
                  : "cursor-grab"
              }
            `}
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
              maskImage:
                "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
            }}
            onPointerCancel={handlePointerUp}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onKeyDown={handleKeyDown}
          >
            {/* Wheel center indicator */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute left-[12%]
                top-1/2 z-20
                h-8 w-px
                -translate-y-1/2
                opacity-70

                sm:left-[8%]
                sm:h-12

                md:h-14

                lg:left-[8%]
                lg:h-16
              "
              style={{
                background: `linear-gradient(
                  to bottom,
                  transparent,
                  ${accent}50 15%,
                  ${accent} 50%,
                  ${accent}50 85%,
                  transparent
                )`,
                boxShadow: `0 0 12px ${accent}66`,
              }}
            />

            {items.map((item, index) => {
              const offset = getOffset(index);

              if (
                Math.abs(offset) > wheelConfig.visible
              ) {
                return null;
              }

              const angle = offset * wheelConfig.spacing;
              const radians =
                (angle * Math.PI) / 180;

              const x =
                -wheelConfig.radius *
                (1 - Math.cos(radians));

              const y =
                wheelConfig.radius *
                Math.sin(radians);

              const distance = Math.min(
                Math.abs(offset) / wheelConfig.visible,
                1
              );

              const opacity = Math.cos(
                (distance * Math.PI) / 2
              );

              const scale =
                1 -
                Math.min(
                  Math.abs(offset) * 0.045,
                  0.35
                );

              const selected =
                index === selectedIndex;

              const ItemIcon =
                SKILL_ICONS[item.icon] ||
                CircleHelp;

              const itemAccent =
                item.color || FALLBACK_ACCENT;

              return (
                <button
                  key={item.name}
                  type="button"
                  role="option"
                  tabIndex={-1}
                  aria-selected={selected}
                  aria-label={`Select ${item.name}`}
                  onClick={() => {
                    if (
                      Date.now() <
                      suppressClickUntil.current
                    ) {
                      return;
                    }

                    selectIndex(index);
                  }}
                  className="
                    absolute
                    left-[12%]
                    top-1/2
                    origin-left
                    whitespace-nowrap
                    text-left
                    outline-none

                    sm:left-[8%]
                  "
                  style={{
                    opacity: selected
                      ? 1
                      : opacity * 0.85,
                    transform: `
                      translate(${x}px, ${y}px)
                      translateY(-50%)
                      rotate(${angle}deg)
                      scale(${scale})
                    `,
                    transition:
                      dragging || reduceMotion
                        ? "none"
                        : "transform 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 400ms ease",
                  }}
                >
                  <motion.span
                    whileHover={
                      reduceMotion || selected
                        ? undefined
                        : {
                            x: 5,
                          }
                    }
                    whileTap={
                      reduceMotion
                        ? undefined
                        : {
                            scale: 0.97,
                          }
                    }
                    className={`
                      relative
                      ml-1
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      px-3
                      py-1.5
                      text-[13px]
                      transition-colors
                      duration-300

                      sm:ml-3
                      sm:gap-2.5
                      sm:px-4
                      sm:py-2.5
                      sm:text-base

                      md:gap-2.5
                      md:px-4
                      md:py-2.5
                      md:text-base

                      lg:ml-5
                      lg:gap-3
                      lg:px-5
                      lg:py-3
                      lg:text-[clamp(1.05rem,2.6vw,1.5rem)]

                      ${
                        selected
                          ? "font-semibold text-foreground"
                          : "border-transparent font-medium text-muted-foreground hover:text-foreground"
                      }
                    `}
                    style={
                      selected
                        ? {
                            borderColor: `${itemAccent}66`,
                            backgroundColor: `${itemAccent}18`,
                            boxShadow: `
                              0 0 28px -6px ${itemAccent}88,
                              inset 0 0 18px ${itemAccent}08
                            `,
                          }
                        : undefined
                    }
                  >
                    <ItemIcon
                      aria-hidden="true"
                      className="
                        h-4 w-4 shrink-0

                        sm:h-5 sm:w-5
                        md:h-5 md:w-5
                        lg:h-7 lg:w-7
                      "
                      color={
                        selected
                          ? item.color ||
                            "currentColor"
                          : "currentColor"
                      }
                      style={{
                        opacity: selected ? 1 : 0.6,
                      }}
                    />

                    {item.name}
                  </motion.span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}