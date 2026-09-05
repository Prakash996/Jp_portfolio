"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { FiArrowUpRight, FiBriefcase, FiCalendar, FiMapPin } from "react-icons/fi";
import "@/css/ExperienceCards.css";

/* ================================================================
   EXPERIENCE DATA
   ================================================================ */

const experiences = [
  {
    id: "01",
    title: "Software Engineer II",
    company: "HCLTech (HCLSoftware)",
    period: "May 2021 — Present",
    description:
      "Spearheaded 15+ UI refactoring initiatives across the Volt Iris platform, modernizing workspace layout structures, dynamic dropdown components, and interactive modal dialogs. Optimized desktop packaging, resolved client-side DOM performance lags, and stabilized 2,500+ E2E automated test cases across CI/CD release pipelines.",
    tags: ["UI Refactoring", "E2E Testing", "CI/CD"],
    location: "India",
    current: true,
  },
  {
    id: "02",
    title: "Software Engineer — Data Integration",
    company: "HCLTech",
    period: "May 2020 — May 2021",
    description:
      "Managed and optimized continuous data synchronization pipelines connecting semi-structured HCL Domino environments with relational SQL databases. Configured SAP Remote Function Calls (RFC) and background LotusScript agents to ensure data integrity and operational stability.",
    tags: ["Data Integration", "SAP RFC", "HCL Domino"],
    location: "India",
    current: false,
  },
  {
    id: "03",
    title: "Web Development Intern",
    company: "Ficuslot Innovation Pvt. Ltd.",
    period: "June 2019 — Oct 2019",
    description:
      "Designed and implemented responsive, single-page UI layouts, interactive search components, and client-facing web forms using HTML5, CSS3, JavaScript, and Bootstrap. Resolved cross-browser visual defects using developer tools.",
    tags: ["HTML5 / CSS3", "JavaScript", "Bootstrap"],
    location: "India",
    current: false,
  },
];

/* ================================================================
   EXPERIENCE SECTION
   ================================================================ */

export default function ExperienceSection() {
  const timelineRef = useRef(null);
  const mouseY = useMotionValue(0);

  const smoothMouseY = useSpring(mouseY, {
    stiffness: 260,
    damping: 32,
    mass: 0.15,
  });

  const handleMouseMove = (event) => {
    const rect = timelineRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseY.set(event.clientY - rect.top);
  };

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="experience-section w-full min-w-0"
    >
      <motion.header
        id="experience-header"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="experience-header mb-12"
      >
        <div className="flex items-center gap-2">
          <FiBriefcase size={18} className="experience-icon" />
          <span className="experience-label text-xs font-medium uppercase tracking-[0.2em]">
            Experience
          </span>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <h2 id="experience-heading" className="experience-title text-2xl font-semibold tracking-tight sm:text-3xl">Professional Journey</h2>
          <span className="experience-count font-mono text-[10px] tracking-widest hidden">/ 03</span>
        </div>

        <p className="experience-description mt-3 max-w-2xl text-sm leading-6">
          A timeline of my professional experience, engineering responsibilities,
          and career growth.
        </p>
      </motion.header>

      <div id="experience-timeline" ref={timelineRef} onMouseMove={handleMouseMove} className="experience-timeline relative">
        <TimelineBase />
        <TimelineMouseHighlight smoothMouseY={smoothMouseY} />
        <div id="experience-items" className="space-y-16 md:space-y-24">
          {experiences.map((experience, index) => (
            <ExperienceItem key={`${experience.company}-${experience.period}`} experience={experience} index={index}/>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   TIMELINE BASE
   ================================================================ */

function TimelineBase() {
  return (
    <>
      <div id="timeline-base-desktop" aria-hidden="true" className="timeline-base absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 md:block"/>
      <div id="timeline-base-mobile" aria-hidden="true" className="timeline-base absolute inset-y-0 left-4.25 w-px md:hidden"/>
    </>
  );
}

/* ================================================================
   MOUSE HIGHLIGHT
   ================================================================ */

function TimelineMouseHighlight({ smoothMouseY }) {
  return (
    <>
      <motion.div id="timeline-mouse-highlight-desktop" aria-hidden="true" style={{ top: smoothMouseY }} className="timeline-highlight absolute left-1/2 z-20 hidden h-24 w-px -translate-x-1/2 -translate-y-1/2 md:block"/>
      <motion.div id="timeline-mouse-highlight-mobile" aria-hidden="true" style={{ top: smoothMouseY }} className="timeline-highlight timeline-highlight--mobile absolute left-4.25 z-20 h-20 w-px -translate-x-1/2 -translate-y-1/2 md:hidden"/>
    </>
  );
}

/* ================================================================
   EXPERIENCE ITEM
   ================================================================ */

function ExperienceItem({ experience, index }) {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, {
    once: false,
    amount: 0.3,
  });

  const isLeft = index % 2 === 0;

  return (
    <div id={`experience-item-${experience.id}`} ref={itemRef} className="experience-item relative md:grid md:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)] md:items-start">
      {isLeft ? (
        <div className="md:col-start-1 md:row-start-1">
          <ExperienceCard experience={experience} active={isInView} direction="left"/>
        </div>
      ) : (
        <div aria-hidden="true" className="hidden md:col-start-1 md:row-start-1 md:block"/>
      )}

      <div className="experience-node-wrapper absolute left-[17px] top-7 z-30 -translate-x-1/2 md:static md:col-start-2 md:row-start-1 md:flex md:h-8 md:w-16 md:items-start md:justify-center md:translate-x-0 md:pt-8">
        <TimelineNode id={`experience-node-${experience.id}`} active={isInView} number={experience.id}/>
      </div>

      {!isLeft ? (
        <div className="md:col-start-3 md:row-start-1">
          <ExperienceCard experience={experience} active={isInView} direction="right"/>
        </div>
      ) : (
        <div aria-hidden="true" className="hidden md:col-start-3 md:row-start-1 md:block"/>
      )}

      <TimelineConnector side="left" active={isInView} visible={isLeft} id={`experience-connector-left-${experience.id}`}/>

      <TimelineConnector side="right" active={isInView} visible={!isLeft} id={`experience-connector-right-${experience.id}`}/>
    </div>
  );
}

/* ================================================================
   TIMELINE CONNECTOR
   ================================================================ */

function TimelineConnector({ side, active, visible, id }) {
  if (!visible) return null;

  return (
    <motion.div
      id={id}
      aria-hidden="true"
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{
        opacity: active ? 1 : 0.2,
        scaleX: active ? 1 : 0,
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`timeline-connector timeline-connector--${side} absolute top-12 z-10 hidden h-px w-8 md:block`}
    />
  );
}

/* ================================================================
   TIMELINE NODE
   ================================================================ */

function TimelineNode({ id, active, number }) {
  return (
    <div id={id} className="timeline-node relative flex h-8 w-8 items-center justify-center">
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: active ? 0.45 : 0,
          scale: active ? 1 : 0.5,
        }}
        transition={{ duration: 0.35 }}
        className="timeline-node-glow absolute inset-1 rounded-full blur-md"
      />

      <motion.div
        initial={false}
        animate={{
          borderColor: active
            ? "rgba(52,211,153,0.85)"
            : "rgba(63,63,70,0.9)",
        }}
        transition={{ duration: 0.3 }}
        className="timeline-node-ring relative flex h-7 w-7 items-center justify-center rounded-full border"
      >
        <motion.span
          initial={false}
          animate={{
            scale: active ? 1 : 0.7,
            backgroundColor: active ? "#34d399" : "#52525b",
          }}
          transition={{ duration: 0.3 }}
          className="timeline-node-dot h-2 w-2 rounded-full"
        />
      </motion.div>

      <span aria-hidden="true" className="timeline-node-number absolute left-9 hidden font-mono text-[9px] md:hidden">
        {number}
      </span>
    </div>
  );
}

/* ================================================================
   EXPERIENCE CARD
   ================================================================ */

function ExperienceCard({ experience, active, direction }) {
  return (
    <motion.article
      id={`experience-card-${experience.id}`}
      initial={false}
      animate={{
        opacity: active ? 1 : 0.38,
        x: active ? 0 : direction === "left" ? -12 : 12,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      className="experience-card group relative ml-12 overflow-hidden border p-5 sm:p-6 md:ml-0 md:min-h-67.5 md:p-7"
    >
      <div aria-hidden="true" className="experience-card-accent absolute inset-x-0 top-0 h-px"/>

      <div aria-hidden="true" className="experience-card-glow pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"/>

      <div className="relative z-10">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            {experience.current && (
              <div className="experience-current mb-3 flex items-center gap-2">
                <span aria-hidden="true" className="experience-current-dot h-1.5 w-1.5 animate-pulse rounded-full"/>
                <span className="experience-label text-[9px] font-medium uppercase tracking-[0.18em]">Current role</span>
              </div>
            )}

            <h3 className="experience-role text-base font-semibold leading-6 sm:text-lg">
              {experience.title}
            </h3>

            <p className="experience-company mt-1.5 text-sm transition-colors">
              {experience.company}
            </p>
          </div>

          <div className="experience-period flex shrink-0 items-center gap-2 text-[12px] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <FiCalendar size={14} className="experience-icon" />
            <span className="experience-text whitespace-nowrap">
              {experience.period}
            </span>
          </div>
        </header>

        <div className="experience-divider my-5 h-px" />

        <p className="experience-description text-sm leading-6 transition-colors duration-300">
          {experience.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span key={tag} className="experience-tag border px-2.5 py-1.5 text-[10px] transition-colors duration-300">
              {tag}
            </span>
          ))}
        </div>

        <footer className="experience-card-footer mt-6 flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-2">
            <FiMapPin size={14} className="experience-icon" />
            <span className="experience-text text-[12px] uppercase tracking-[0.18em]">
              {experience.location}
            </span>
          </div>

          <FiArrowUpRight size={15} className="experience-icon transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
        </footer>
      </div>
    </motion.article>
  );
}
