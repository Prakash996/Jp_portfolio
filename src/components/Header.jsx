"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import {
  House,
  FolderKanban,
  Sparkles,
  BriefcaseBusiness,
  FileText,
  Construction,
  MessageCircle,
} from "lucide-react";
import { setActiveSection } from "@/store/appSlice";
import ActionModal from "@/components/ui/ActionModal";
import Resume from "./ui/Resume";

export default function Header() {
  const dispatch = useDispatch();

  const activeSection = useSelector(
    (state) => state.app.activeSection
  );

  const [showDock, setShowDock] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  /*
   * ------------------------------------------------------------
   * Navigation
   * ------------------------------------------------------------
   */

  const links = [
    {
      name: "Home",
      href: "#home",
      icon: House,
      type: "section",
    },
    {
      name: "Skills",
      href: "#skills",
      icon: Sparkles,
      type: "section",
    },
    {
      name: "Experience",
      href: "#experience",
      icon: BriefcaseBusiness,
      type: "section",
    },
    {
      name: "Projects",
      icon: FolderKanban,
      type: "modal",
      modal: "projects",
    },
    {
      name: "Resume",
      icon: FileText,
      type: "modal",
      modal: "resume",
    },
  ];

  /*
   * ------------------------------------------------------------
   * Show / Hide Dock
   * ------------------------------------------------------------
   */

  useEffect(() => {
    const sections = [
      { id: "home", name: "Home" },
      { id: "skills", name: "Skills" },
      { id: "experience", name: "Experience" },
    ];

    let frameId = null;
    let currentSection = null;

    const handleScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = null;

        const shouldShowDock = window.scrollY > 120;

        setShowDock((visible) => (
          visible === shouldShowDock
            ? visible
            : shouldShowDock
        ));

        const marker = window.innerHeight * 0.35;
        let visibleSection = sections[0].name;

        sections.forEach((section) => {
          const element = document.getElementById(section.id);

          if (element && element.getBoundingClientRect().top <= marker) {
            visibleSection = section.name;
          }
        });

        if (visibleSection !== currentSection) {
          currentSection = visibleSection;
          dispatch(setActiveSection(visibleSection));
        }
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [dispatch]);

  /*
   * ------------------------------------------------------------
   * Navigation Handler
   * ------------------------------------------------------------
   */

  const handleNavigation = (link) => {
    if (link.type === "modal") {
      setActiveModal(link.modal);
      dispatch(setActiveSection(link.name));
      return;
    }

    dispatch(setActiveSection(link.name));

    if (link.href) {
      document.querySelector(link.href)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  /*
   * ------------------------------------------------------------
   * Let's Talk
   * ------------------------------------------------------------
   */

  const handleLetsTalk = () => {
    setActiveModal("contact");
    dispatch(setActiveSection("Let's talk"));
  };

  /*
   * ------------------------------------------------------------
   * Close Modal
   * ------------------------------------------------------------
   */

  const closeModal = () => {
    setActiveModal(null);
  };

  /*
   * ------------------------------------------------------------
   * Contact Submit
   * ------------------------------------------------------------
   */

  const handleContactSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    console.log("Contact form:", data);

    // TODO:
    // Send `data` to your API / email service.

    event.currentTarget.reset();
    closeModal();
  };

  /*
   * ------------------------------------------------------------
   * Render
   * ------------------------------------------------------------
   */

  return (
    <>
      {/* ====================================================== */}
      {/* Navigation Dock                                       */}
      {/* ====================================================== */}

      <header
        className={`
          fixed
          bottom-5
          left-1/2
          z-50
          -translate-x-1/2
          transition-all
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            showDock
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-8 opacity-0"
          }
        `}
      >
        <nav
          aria-label="Main navigation"
          className="
            relative
            flex
            items-center
            gap-1
            rounded-2xl
            border
            border-emerald-300/15
            bg-[#071512]/75
            p-1.5
            shadow-[0_16px_50px_rgba(0,0,0,0.5),0_0_35px_rgba(16,185,129,0.08)]
            backdrop-blur-2xl
            backdrop-saturate-150
          "
        >
          {/* Dock glow */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <div
              className="
                absolute
                -left-10
                top-0
                h-px
                w-24
                animate-[dockGlow_3s_ease-in-out_infinite]
                bg-linear-to-r
                from-transparent
                via-emerald-400/70
                to-transparent
              "
            />

            <div
              className="
                absolute
                inset-x-0
                top-0
                h-px
                bg-linear-to-r
                from-transparent
                via-emerald-300/20
                to-transparent
              "
            />

            <div
              className="
                absolute
                inset-0
                bg-linear-to-b
                from-emerald-300/6
                via-transparent
                to-transparent
              "
            />
          </div>

          {/* -------------------------------------------------- */}
          {/* Navigation Links                                   */}
          {/* -------------------------------------------------- */}

          {links.map((link, index) => {
            const Icon = link.icon;

            const isActive =
              link.type === "modal"
                ? activeModal === link.modal
                : activeSection === link.name;

            /*
             * --------------------------------------------------
             * Modal Navigation Button
             * --------------------------------------------------
             */

            if (link.type === "modal") {
              return (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => handleNavigation(link)}
                  aria-label={link.name}
                  aria-pressed={isActive}
                  className={`
                    group
                    relative
                    z-10
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    transition-all
                    duration-300
                    sm:h-10
                    sm:w-10
                    ${
                      isActive
                        ? "bg-emerald-400 text-[#03100c] shadow-[0_0_20px_rgba(52,211,153,0.25)]"
                        : "text-white/40 hover:bg-emerald-400/[0.08] hover:text-emerald-300"
                    }
                  `}
                  style={{
                    transitionDelay: `${index * 25}ms`,
                  }}
                >
                  <Icon
                    size={15}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className="
                      transition-transform
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:scale-105
                    "
                  />

                  <span
                    className="
                      pointer-events-none
                      absolute
                      -top-10
                      left-1/2
                      -translate-x-1/2
                      translate-y-1
                      scale-90
                      whitespace-nowrap
                      rounded-lg
                      border
                      border-emerald-300/15
                      bg-[#071512]/95
                      px-2.5
                      py-1.5
                      text-[10px]
                      font-medium
                      text-emerald-200
                      opacity-0
                      shadow-[0_8px_25px_rgba(0,0,0,0.35)]
                      backdrop-blur-xl
                      transition-all
                      duration-200
                      group-hover:translate-y-0
                      group-hover:scale-100
                      group-hover:opacity-100
                    "
                  >
                    {link.name}

                    <span
                      className="
                        absolute
                        -bottom-1
                        left-1/2
                        h-2
                        w-2
                        -translate-x-1/2
                        rotate-45
                        border-b
                        border-r
                        border-emerald-300/15
                        bg-[#071512]/95
                      "
                    />
                  </span>

                  {isActive && (
                    <span
                      className="
                        absolute
                        -bottom-1
                        h-1
                        w-1
                        rounded-full
                        bg-emerald-300
                        shadow-[0_0_8px_rgba(52,211,153,1)]
                      "
                    />
                  )}
                </button>
              );
            }

            /*
             * --------------------------------------------------
             * Section Navigation Link
             * --------------------------------------------------
             */

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => handleNavigation(link)}
                aria-label={link.name}
                aria-current={isActive ? "page" : undefined}
                className={`
                  group
                  relative
                  z-10
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  transition-all
                  duration-300
                  sm:h-10
                  sm:w-10
                  ${
                    isActive
                      ? "bg-emerald-400 text-[#03100c] shadow-[0_0_20px_rgba(52,211,153,0.25)]"
                      : "text-white/40 hover:bg-emerald-400/[0.08] hover:text-emerald-300"
                  }
                `}
                style={{
                  transitionDelay: `${index * 25}ms`,
                }}
              >
                <Icon
                  size={15}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:scale-105
                  "
                />

                <span
                  className="
                    pointer-events-none
                    absolute
                    -top-10
                    left-1/2
                    -translate-x-1/2
                    translate-y-1
                    scale-90
                    whitespace-nowrap
                    rounded-lg
                    border
                    border-emerald-300/15
                    bg-[#071512]/95
                    px-2.5
                    py-1.5
                    text-[10px]
                    font-medium
                    text-emerald-200
                    opacity-0
                    shadow-[0_8px_25px_rgba(0,0,0,0.35)]
                    backdrop-blur-xl
                    transition-all
                    duration-200
                    group-hover:translate-y-0
                    group-hover:scale-100
                    group-hover:opacity-100
                  "
                >
                  {link.name}

                  <span
                    className="
                      absolute
                      -bottom-1
                      left-1/2
                      h-2
                      w-2
                      -translate-x-1/2
                      rotate-45
                      border-b
                      border-r
                      border-emerald-300/15
                      bg-[#071512]/95
                    "
                  />
                </span>

                {isActive && (
                  <span
                    className="
                      absolute
                      -bottom-1
                      h-1
                      w-1
                      rounded-full
                      bg-emerald-300
                      shadow-[0_0_8px_rgba(52,211,153,1)]
                    "
                  />
                )}
              </a>
            );
          })}

          {/* Divider */}

          <div className="mx-0.5 h-5 w-px bg-emerald-300/10" />

          {/* -------------------------------------------------- */}
          {/* Let's Talk                                         */}
          {/* -------------------------------------------------- */}

          {(() => {
            const isActive = activeModal === "contact";

            return (
              <button
                type="button"
                onClick={handleLetsTalk}
                aria-label="Let's talk"
                aria-pressed={isActive}
                className={`
                  group
                  relative
                  z-10
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  transition-all
                  duration-300
                  sm:h-10
                  sm:w-10
                  ${
                    isActive
                      ? "bg-emerald-400 text-[#03100c] shadow-[0_0_20px_rgba(52,211,153,0.25)]"
                      : "text-emerald-300 hover:bg-emerald-400/[0.08] hover:text-emerald-200"
                  }
                `}
              >
                <MessageCircle
                  size={15}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:scale-105
                  "
                />

                <span
                  className="
                    pointer-events-none
                    absolute
                    -top-10
                    left-1/2
                    -translate-x-1/2
                    translate-y-1
                    scale-90
                    whitespace-nowrap
                    rounded-lg
                    border
                    border-emerald-300/15
                    bg-[#071512]/95
                    px-2.5
                    py-1.5
                    text-[10px]
                    font-medium
                    text-emerald-200
                    opacity-0
                    shadow-[0_8px_25px_rgba(0,0,0,0.35)]
                    backdrop-blur-xl
                    transition-all
                    duration-200
                    group-hover:translate-y-0
                    group-hover:scale-100
                    group-hover:opacity-100
                  "
                >
                  Let's talk

                  <span
                    className="
                      absolute
                      -bottom-1
                      left-1/2
                      h-2
                      w-2
                      -translate-x-1/2
                      rotate-45
                      border-b
                      border-r
                      border-emerald-300/15
                      bg-[#071512]/95
                    "
                  />
                </span>

                {isActive && (
                  <span
                    className="
                      absolute
                      -bottom-1
                      h-1
                      w-1
                      rounded-full
                      bg-emerald-300
                      shadow-[0_0_8px_rgba(52,211,153,1)]
                    "
                  />
                )}
              </button>
            );
          })()}
        </nav>

        <div
          className="
            pointer-events-none
            absolute
            -bottom-3
            left-1/2
            h-5
            w-3/4
            -translate-x-1/2
            rounded-full
            bg-emerald-400/10
            blur-xl
          "
        />
      </header>

      {/* ====================================================== */}
      {/* Projects Modal                                         */}
      {/* ====================================================== */}

      <ActionModal
        id="projects-modal"
        open={activeModal === "projects"}
        onClose={closeModal}
        title="Projects"
        description="I'm currently preparing my projects showcase."
        showConfirmButton
        confirmText="Got it"
        onConfirm={closeModal}
      >
        <div className="py-2 text-center">
          <motion.div
            className="
              mx-auto mb-6
              flex h-16 w-16
              items-center justify-center
              rounded-2xl
              border border-emerald-400/20
              bg-emerald-400/10
              text-emerald-400
            "
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Construction size={32} strokeWidth={1.7} />
          </motion.div>

          <h3 className="text-lg font-semibold text-white">
            Projects are coming soon
          </h3>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/50">
            I'm polishing the projects section right now.
            Check back soon to see my latest work.
          </p>
        </div>
      </ActionModal>

      {/* ====================================================== */}
      {/* Resume Modal                                           */}
      {/* ====================================================== */}

      <ActionModal
        id="resume-modal"
        open={activeModal === "resume"}
        onClose={closeModal}
        title="Resume"
        description="My resume is being prepared."
        showConfirmButton
        confirmText="Got it"
        onConfirm={closeModal}
      >
        <Resume/>
        {/* <div className="py-2 text-center">
          <motion.div
            className="
              mx-auto mb-6
              flex h-16 w-16
              items-center justify-center
              rounded-2xl
              border border-emerald-400/20
              bg-emerald-400/10
              text-emerald-400
            "
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FileText size={32} strokeWidth={1.7} />
          </motion.div>

          <h3 className="text-lg font-semibold text-white">
            Resume is coming soon
          </h3>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/50">
            I'm currently updating my resume. It will be
            available here soon.
          </p>
        </div> */}
      </ActionModal>

      {/* ====================================================== */}
      {/* Let's Talk Modal                                       */}
      {/* ====================================================== */}

      <ActionModal
        id="contact-modal"
        open={activeModal === "contact"}
        onClose={closeModal}
        title="Let's talk"
        description="I'd love to hear from you."
        showConfirmButton
        showCancelButton
        confirmText="Send message"
        onConfirm={() => {
          document
            .getElementById("contact-form")
            ?.requestSubmit();
        }}
      >
        <div className="py-2">
          <motion.div
            className="
              mx-auto mb-6
              flex h-16 w-16
              items-center justify-center
              rounded-2xl
              border border-emerald-400/20
              bg-emerald-400/10
              text-emerald-400
            "
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <MessageCircle size={32} strokeWidth={1.7} />
          </motion.div>
          <div className="flex justify-end">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />Sample • Work in Progress</span>
          </div>
          <form
            id="contact-form"
            onSubmit={handleContactSubmit}
            className="space-y-4"
          >
            {/* Name */}

            <div>
              <label htmlFor="name" className="mb-2 block text-xs font-medium text-white/60">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="
                  w-full
                  rounded-xl
                  border border-white/10
                  bg-white/3
                  px-4 py-3
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-white/25
                  transition
                  focus:border-emerald-400/50
                  focus:bg-emerald-400/3
                  focus:ring-1
                  focus:ring-emerald-400/20
                "
              />
            </div>

            {/* Email */}

            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-medium text-white/60">Email</label>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="
                  w-full
                  rounded-xl
                  border border-white/10
                  bg-white/3
                  px-4 py-3
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-white/25
                  transition
                  focus:border-emerald-400/50
                  focus:bg-emerald-400/3
                  focus:ring-1
                  focus:ring-emerald-400/20
                "
              />
            </div>

            {/* Mobile */}
            <div>
              <label htmlFor="mobile" className="mb-2 block text-xs font-medium text-white/60">Mobile</label>
              <input
                id="mobile"
                name="mobile"
                type="text"
                placeholder="Project / Opportunity"
                className="
                  w-full
                  rounded-xl
                  border border-white/10
                  bg-white/3
                  px-4 py-3
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-white/25
                  transition
                  focus:border-emerald-400/50
                  focus:bg-emerald-400/3
                  focus:ring-1
                  focus:ring-emerald-400/20
                "
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="mb-2 block text-xs font-medium text-white/60">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Project / Opportunity"
                className="
                  w-full
                  rounded-xl
                  border border-white/10
                  bg-white/3
                  px-4 py-3
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-white/25
                  transition
                  focus:border-emerald-400/50
                  focus:bg-emerald-400/3
                  focus:ring-1
                  focus:ring-emerald-400/20
                "
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="mb-2 block text-xs font-medium text-white/60">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project..."
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border border-white/10
                  bg-white/3
                  px-4 py-3
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-white/25
                  transition
                  focus:border-emerald-400/50
                  focus:bg-emerald-400/3
                  focus:ring-1
                  focus:ring-emerald-400/20
                "
              />
            </div>
          </form>
        </div>
      </ActionModal>
    </>
  );
}
