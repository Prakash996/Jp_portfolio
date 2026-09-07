"use client";

import { useState } from "react";
import { motion } from "motion/react";
import DiaTextReveal from "@/components/ui/DiaTextReveal";
import ActionModal from "@/components/ui/ActionModal";

export default function IntroSection({ personDetails }) {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => {
    setActiveModal(null);
  };

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

    // Later:
    // Send `data` to your API / email service here.

    event.currentTarget.reset();
  };

  return (
    <>
      <section className="flex flex-col lg:col-span-8">
        <div className="group max-w-4xl">

          {/* Availability */}
          <motion.div
            className="
              mb-6 flex w-fit items-center gap-3
              rounded-full
              border border-emerald-400/20
              bg-emerald-400/6
              px-4 py-2
              text-[10px] font-semibold uppercase
              tracking-[0.2em]
              text-emerald-300/90
            "
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="
                  absolute inline-flex h-full w-full
                  animate-ping rounded-full
                  bg-emerald-400 opacity-60
                "
              />

              <span
                className="
                  relative inline-flex h-2 w-2
                  rounded-full bg-emerald-400
                  shadow-[0_0_10px_rgba(52,211,153,0.9)]
                "
              />
            </span>

            <span>
              Open to Senior Frontend & Software Engineer Roles
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="
              mb-8
              text-4xl font-bold
              leading-[0.98]
              tracking-[-0.04em]
              md:text-6xl
              lg:text-7xl
            "
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
          >
            <span className="text-white/95">
              I’m{" "}
            </span>

            <span className="text-white">
              {personDetails.name}
            </span>

            <span className="text-white/95">,</span>

            <br />

            <span
              className="
                bg-linear-to-r
                from-emerald-300
                via-emerald-400
                to-emerald-500
                bg-clip-text
                text-transparent
              "
            >
              {personDetails.title}
            </span>

            <br />

            <span className="text-white/80">
              {personDetails.location}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.div
            className="
              relative max-w-3xl
              border-l border-emerald-400/20
              pl-5
              text-base leading-7
              text-white/55
              md:text-lg md:leading-8
            "
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
          >
            <span
              className="
                absolute -left-px top-0
                h-12 w-px
                bg-linear-to-b
                from-emerald-400
                to-transparent
              "
            />

            <DiaTextReveal
              text={personDetails.description}
            />
          </motion.div>

          {/* Actions */}
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
            }}
          >
            {/* View Work */}
            <button
              type="button"
              onClick={() => setActiveModal("work")}
              className="
                group/btn inline-flex items-center gap-2
                rounded-full
                bg-emerald-400
                px-5 py-3
                text-sm font-semibold
                text-black
                shadow-[0_0_30px_rgba(52,211,153,0.15)]
                transition-all duration-300
                hover:-translate-y-1
                hover:bg-emerald-300
                hover:shadow-[0_0_35px_rgba(52,211,153,0.3)]
              "
            >
              <span>View my work</span>

              <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                →
              </span>
            </button>

            {/* Let's Talk */}
            <button
              type="button"
              onClick={() => setActiveModal("contact")}
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-white/10
                bg-white/3
                px-5 py-3
                text-sm font-medium
                text-white/70
                backdrop-blur-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:border-emerald-400/30
                hover:bg-emerald-400/6
                hover:text-emerald-300
              "
            >
              Let's talk
            </button>
          </motion.div>
        </div>
      </section>

      {/* =========================
          VIEW WORK MODAL
      ========================== */}

      <ActionModal
        open={activeModal === "work"}
        onClose={closeModal}
        title="Work in progress"
        description="I'm currently preparing my projects showcase."
      >
        <div className="py-6 text-center">

          <motion.div
            className="
              mx-auto mb-6 flex h-16 w-16
              items-center justify-center
              rounded-2xl
              border border-emerald-400/20
              bg-emerald-400/10
              text-3xl
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
            🚧
          </motion.div>

          <h3 className="text-lg font-semibold text-white">
            Projects are coming soon
          </h3>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/50">
            I'm polishing the projects section right now.
            Check back soon to see my latest work.
          </p>

          <button
            type="button"
            onClick={closeModal}
            className="
              mt-6 rounded-full
              bg-emerald-400
              px-5 py-2.5
              text-sm font-semibold
              text-black
              transition
              hover:bg-emerald-300
            "
          >
            Got it
          </button>
        </div>
      </ActionModal>

      {/* =========================
          CONTACT MODAL
      ========================== */}

      <ActionModal
        open={activeModal === "contact"}
        onClose={closeModal}
        title="Let's work together"
        description="Tell me a little about your project or opportunity."
      >
        <form
          onSubmit={handleContactSubmit}
          className="space-y-4"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-xs font-medium text-white/60"
            >
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="
                w-full rounded-xl
                border border-white/10
                bg-white/3
                px-4 py-3
                text-sm text-white
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
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-medium text-white/60"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="
                w-full rounded-xl
                border border-white/10
                bg-white/3
                px-4 py-3
                text-sm text-white
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
            <label
              htmlFor="subject"
              className="mb-2 block text-xs font-medium text-white/60"
            >
              Subject
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Project / Opportunity"
              className="
                w-full rounded-xl
                border border-white/10
                bg-white/3
                px-4 py-3
                text-sm text-white
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
            <label
              htmlFor="message"
              className="mb-2 block text-xs font-medium text-white/60"
            >
              Message
            </label>

            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell me about your project..."
              className="
                w-full resize-none rounded-xl
                border border-white/10
                bg-white/3
                px-4 py-3
                text-sm text-white
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

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full rounded-xl
              bg-emerald-400
              px-5 py-3
              text-sm font-semibold
              text-black
              transition-all
              hover:bg-emerald-300
              hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]
            "
          >
            Send message →
          </button>
        </form>
      </ActionModal>
    </>
  );
}
