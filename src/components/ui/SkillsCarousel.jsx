"use client"

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"

import {
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiFigma,
  SiMongodb,
  SiFirebase,
  SiPython,
} from "react-icons/si"

import "@/css/SkillsCarousel.css"

/* =========================================================
   CSS ICON
   ========================================================= */

const CssIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M3 2h18l-1.64 18.35L12 22l-7.36-1.65L3 2Z"
      fill="#1572B6"
    />

    <path
      d="m12 20.25 5.95-1.33L19.27 3.5H12v16.75Z"
      fill="#33A9DC"
    />

    <path
      d="M7.1 5.75h9.8l-.25 2.25H9.6l.17 2.25h6.63l-.54 5.93L12 17.2l-3.85-1.02-.25-2.43h2.25l.13 1.27 1.72.46 1.73-.46.18-2.52H7.54L7.1 5.75Z"
      fill="#fff"
    />
  </svg>
)

/* =========================================================
   SKILLS
   ========================================================= */

const DEFAULT_SKILLS = [
  {
    name: "HTML5",
    icon: SiHtml5,
    color: "#E34F26",
  },
  {
    name: "CSS3",
    icon: CssIcon,
    color: "#1572B6",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "#F7DF1E",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
  },
  {
    name: "React",
    icon: SiReact,
    color: "#61DAFB",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#FFFFFF",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#06B6D4",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "#339933",
  },
  {
    name: "Git",
    icon: SiGit,
    color: "#F05032",
  },
  {
    name: "GitHub",
    icon: SiGithub,
    color: "#FFFFFF",
  },
  {
    name: "Figma",
    icon: SiFigma,
    color: "#F24E1E",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "#47A248",
  },
  {
    name: "Firebase",
    icon: SiFirebase,
    color: "#FFCA28",
  },
  {
    name: "Python",
    icon: SiPython,
    color: "#3776AB",
  },
]

/* =========================================================
   3D CIRCULAR GEOMETRY
   ========================================================= */

const ROTATION = 42
const DEPTH = 250
const SCALE_STEP = 0.1
const OPACITY_STEP = 0.2
const MAX_VISIBLE = 3

function coverflowStyle(offset) {
  const abs = Math.abs(offset)
  const direction = Math.sign(offset)
  const clamped = Math.min(abs, MAX_VISIBLE)

  const angle = Math.min(abs, 3) * 27
  const angleRad = (angle * Math.PI) / 180

  const radius = 430

  const translateX =
    offset === 0
      ? 0
      : Math.sin(angleRad) * radius * direction

  const translateZ =
    offset === 0
      ? 70
      : (Math.cos(angleRad) - 1) * DEPTH * clamped

  const rotateY =
    offset === 0
      ? 0
      : -direction * Math.min(abs, 2) * ROTATION

  const translateY =
    offset === 0
      ? 0
      : Math.min(abs, 3) * 7

  const scale = Math.max(
    0.62,
    1 - clamped * SCALE_STEP
  )

  const opacity =
    abs > MAX_VISIBLE
      ? 0
      : Math.max(
          0,
          1 - abs * OPACITY_STEP
        )

  return {
    transform: `
      translateX(-50%)
      translateY(calc(-50% + ${translateY}px))
      translateX(${translateX}px)
      translateZ(${translateZ}px)
      rotateY(${rotateY}deg)
      scale(${scale})
    `,
    opacity,
    zIndex: 1000 - Math.round(abs * 20),
    pointerEvents:
      abs > MAX_VISIBLE ? "none" : "auto",
    filter: `
      brightness(${Math.max(
        0.52,
        1 - abs * 0.13
      )})
      saturate(${Math.max(
        0.55,
        1 - abs * 0.1
      )})
    `,
  }
}

/* =========================================================
   CARD
   ========================================================= */

const CoverflowCard = memo(
  function CoverflowCard({
    skill,
    offset,
    isActive,
    onSelect,
  }) {
    const Icon = skill.icon

    return (
      <button
        type="button"
        onClick={onSelect}
        aria-label={skill.name}
        aria-current={
          isActive ? "true" : undefined
        }
        tabIndex={isActive ? 0 : -1}
        className="skills-coverflow-card"
        style={coverflowStyle(offset)}
      >
        {/* Glow */}

        <span
          aria-hidden="true"
          className="skills-card-glow"
          style={{
            background: skill.color,
            opacity: isActive ? 0.45 : 0.05,
          }}
        />

        {/* Main card */}

        <span
          className="skills-card-main"
          style={{
            background: isActive
              ? "rgba(255,255,255,0.075)"
              : "rgba(255,255,255,0.018)",

            border: isActive
              ? "1px solid rgba(255,255,255,0.15)"
              : "1px solid rgba(255,255,255,0.045)",

            boxShadow: isActive
              ? `
                0 35px 90px rgba(0,0,0,0.55),
                0 0 55px ${skill.color}30,
                inset 0 1px 0 rgba(255,255,255,0.10)
              `
              : `
                0 20px 50px rgba(0,0,0,0.25),
                inset 0 1px 0 rgba(255,255,255,0.025)
              `,
          }}
        >
          {/* Inner border */}

          <span
            aria-hidden="true"
            className="skills-card-inner-border"
            style={{
              borderColor: isActive
                ? `${skill.color}22`
                : "rgba(255,255,255,0.025)",
            }}
          />

          {/* Icon */}

          <Icon
            className="skills-card-icon"
            style={
              isActive
                ? {
                    opacity: 1,
                    filter: `
                      drop-shadow(
                        0 0 12px ${skill.color}99
                      )
                      drop-shadow(
                        0 0 30px ${skill.color}44
                      )
                    `,
                  }
                : {
                    opacity: 0.42,
                    filter: "grayscale(1)",
                  }
            }
          />
        </span>

        {/* Reflection */}

        <span
          aria-hidden="true"
          className="skills-card-reflection"
          style={{
            background: `
              radial-gradient(
                circle at 50% 0%,
                ${skill.color}44,
                transparent 70%
              )
            `,
          }}
        />

        {/* Label */}

        <span
          className="skills-card-label"
          style={{
            color:
              skill.color === "#FFFFFF"
                ? "rgba(255,255,255,0.95)"
                : skill.color,

            opacity: isActive ? 1 : 0,

            transform: isActive
              ? "translateY(0)"
              : "translateY(6px)",
          }}
        >
          {skill.name}
        </span>
      </button>
    )
  }
)

/* =========================================================
   MAIN
   ========================================================= */

export default function SkillsCoverflow({
  skills = DEFAULT_SKILLS,
  initialIndex = 0,
  autoPlay = true,
  autoPlayInterval = 3000,
}) {
  const validSkills = useMemo(() => {
    const filtered = skills.filter(
      (skill) =>
        skill &&
        typeof skill.name === "string" &&
        typeof skill.icon === "function"
    )

    return filtered.length
      ? filtered
      : DEFAULT_SKILLS
  }, [skills])

  const count = validSkills.length

  const [active, setActive] = useState(() => {
    const index = Number(initialIndex) || 0

    return Math.max(
      0,
      Math.min(count - 1, index)
    )
  })

  const [paused, setPaused] = useState(false)

  /* =====================================================
     NAVIGATION
     ===================================================== */

  const goNext = useCallback(() => {
    setActive((current) =>
      current >= count - 1 ? 0 : current + 1
    )
  }, [count])

  const goPrevious = useCallback(() => {
    setActive((current) =>
      current <= 0 ? count - 1 : current - 1
    )
  }, [count])

  const goTo = useCallback(
    (index) => {
      setActive(
        Math.max(
          0,
          Math.min(count - 1, index)
        )
      )
    },
    [count]
  )

  /* =====================================================
     PAUSE / RESUME
     ===================================================== */

  const pause = useCallback(() => {
    setPaused(true)
  }, [])

  const resume = useCallback(() => {
    setPaused(false)
  }, [])

  /* =====================================================
     AUTOPLAY
     ===================================================== */

  useEffect(() => {
    if (
      !autoPlay ||
      paused ||
      count <= 1
    ) {
      return
    }

    if (
      typeof window !== "undefined" &&
      window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return
    }

    const timer = window.setInterval(
      goNext,
      Math.max(1000, autoPlayInterval)
    )

    return () => {
      window.clearInterval(timer)
    }
  }, [
    autoPlay,
    paused,
    count,
    autoPlayInterval,
    goNext,
  ])

  /* =====================================================
     KEYBOARD
     ===================================================== */

  const rootRef = useRef(null)

  useEffect(() => {
    const element = rootRef.current

    if (!element) return

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        pause()
        goPrevious()
      }

      if (event.key === "ArrowRight") {
        event.preventDefault()
        pause()
        goNext()
      }
    }

    element.addEventListener(
      "keydown",
      handleKeyDown
    )

    return () => {
      element.removeEventListener(
        "keydown",
        handleKeyDown
      )
    }
  }, [
    pause,
    goNext,
    goPrevious,
  ])

  /* =====================================================
     DRAG / SWIPE
     ===================================================== */

  const dragState = useRef({
    startX: 0,
    active: false,
  })

  const onPointerDown = (event) => {
    pause()

    dragState.current = {
      startX: event.clientX,
      active: true,
    }
  }

  const onPointerUp = (event) => {
    if (!dragState.current.active) {
      return
    }

    const dx =
      event.clientX -
      dragState.current.startX

    dragState.current.active = false

    if (Math.abs(dx) > 45) {
      if (dx < 0) {
        goNext()
      } else {
        goPrevious()
      }
    }
  }

  /* =====================================================
     RENDER
     ===================================================== */

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      role="listbox"
      aria-label="Technical skills 3D circular carousel"
      className="skills-coverflow-root"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={(event) => {
        onPointerUp(event)
        resume()
      }}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      {/* Ambient light */}

      <div
        aria-hidden="true"
        className="skills-coverflow-ambient"
      />

      {/* 3D Stage */}

      <div className="skills-coverflow-stage">
        {validSkills.map((skill, index) => {
          const offset = index - active

          return (
            <CoverflowCard
              key={skill.name}
              skill={skill}
              offset={offset}
              isActive={offset === 0}
              onSelect={() => {
                pause()
                goTo(index)
              }}
            />
          )
        })}
      </div>

      {/* Controls */}

      <div className="skills-coverflow-controls">
        {/* Previous */}

        <button
          type="button"
          onClick={() => {
            pause()
            goPrevious()
          }}
          aria-label="Previous skill"
          className="skills-coverflow-nav"
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            className="skills-coverflow-nav-icon"
            aria-hidden="true"
          >
            <path
              d="M15 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Dots */}

        <div className="skills-coverflow-dots">
          {validSkills.map((skill, index) => (
            <button
              key={skill.name}
              type="button"
              onClick={() => {
                pause()
                goTo(index)
              }}
              aria-label={`Go to ${skill.name}`}
              aria-current={
                index === active
                  ? "true"
                  : undefined
              }
              className="skills-coverflow-dot"
              style={{
                width:
                  index === active ? 30 : 7,

                background:
                  index === active
                    ? skill.color === "#FFFFFF"
                      ? "rgba(255,255,255,0.9)"
                      : skill.color
                    : "rgba(255,255,255,0.2)",

                boxShadow:
                  index === active
                    ? `0 0 14px ${skill.color}88`
                    : "none",
              }}
            />
          ))}
        </div>

        {/* Next */}

        <button
          type="button"
          onClick={() => {
            pause()
            goNext()
          }}
          aria-label="Next skill"
          className="skills-coverflow-nav"
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            className="skills-coverflow-nav-icon"
            aria-hidden="true"
          >
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
