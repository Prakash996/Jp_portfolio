import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import personImage from "@/assets/images/person.png";

export default function ProfileCard({ personDetails }) {
  const [isLoading, setIsLoading] = useState(true);

  const cardRef = useRef(null);

  /*
   * ------------------------------------------------------------
   * Comet Card Motion
   * ------------------------------------------------------------
   */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 150,
    damping: 15,
    mass: 0.5,
  });

  const springY = useSpring(mouseY, {
    stiffness: 150,
    damping: 15,
    mass: 0.5,
  });

  const rotateX = useTransform(
    springY,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );

  const rotateY = useTransform(
    springX,
    [-0.5, 0.5],
    ["-17.5deg", "17.5deg"]
  );

  const translateX = useTransform(
    springX,
    [-0.5, 0.5],
    ["-20px", "20px"]
  );

  const translateY = useTransform(
    springY,
    [-0.5, 0.5],
    ["20px", "-20px"]
  );

  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  const glareBackground = useMotionTemplate`
    radial-gradient(
      circle at ${glareX}% ${glareY}%,
      rgba(255, 255, 255, 0.9) 10%,
      rgba(255, 255, 255, 0.45) 25%,
      rgba(255, 255, 255, 0) 70%
    )
  `;

  const handleMouseMove = (event) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const xPercent = x / rect.width - 0.5;
    const yPercent = y / rect.height - 0.5;

    mouseX.set(xPercent);
    mouseY.set(yPercent);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  /*
   * ------------------------------------------------------------
   * Loading
   * ------------------------------------------------------------
   */

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  /*
   * ------------------------------------------------------------
   * Social Links
   * ------------------------------------------------------------
   */

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com/",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "https://twitter.com/",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
        >
          <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.37l7.24-8.27L2.8 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.9h1.73L8.26 4h-1.8L17.8 19.9Z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://youtube.com/",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
        >
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.9V8.1l6.5 3.9-6.5 3.9Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="lg:col-span-4">
      {/* Perspective container */}
      <div
        className="w-full"
        style={{
          perspective: "1200px",
        }}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            translateX,
            translateY,
            transformStyle: "preserve-3d",
          }}
          initial={{
            scale: 1,
          }}
          whileHover={{
            scale: 1.025,
            transition: {
              duration: 0.2,
            },
          }}
          className="relative"
        >
          {/* ------------------------------------------------ */}
          {/* Main Profile Card                                */}
          {/* ------------------------------------------------ */}

          <aside
            className={`relative flex h-fit w-full flex-col items-center overflow-hidden rounded-3xl border border-zinc-800 bg-[#111111] p-6 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)] ${
              isLoading ? "pointer-events-none" : ""
            }`}
          >
            {isLoading ? (
              /* ------------------------------------------------ */
              /* Loading State                                    */
              /* ------------------------------------------------ */

              <div className="flex w-full flex-col items-center animate-pulse">
                <div className="mb-6 aspect-square w-full rounded-2xl bg-zinc-800" />

                <div className="mb-6 h-7 w-28 rounded-full bg-zinc-800" />

                <div className="mb-6 h-9 w-3/4 rounded bg-zinc-800" />

                <div className="mb-8 flex gap-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-10 w-10 rounded-xl bg-zinc-800"
                    />
                  ))}
                </div>

                <div className="grid w-full grid-cols-2 gap-3">
                  <div className="h-10 rounded-xl bg-zinc-800" />
                  <div className="h-10 rounded-xl bg-zinc-800" />
                </div>
              </div>
            ) : (
              <>
                {/* ------------------------------------------------ */}
                {/* Profile Image                                    */}
                {/* ------------------------------------------------ */}

                <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-2xl bg-black">
                  <img
                    src={personImage}
                    alt={personDetails.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* ------------------------------------------------ */}
                {/* Availability                                     */}
                {/* ------------------------------------------------ */}

                <button
                  id="availabilityStatus"
                  type="button"
                  className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-600 bg-zinc-900 px-3 py-1.5 transition-all hover:border-emerald-500"
                >
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />

                  <span className="text-xs font-medium text-zinc-300">
                    Open to work
                  </span>
                </button>

                {/* ------------------------------------------------ */}
                {/* Signature                                        */}
                {/* ------------------------------------------------ */}

                <h2 className="my-4 select-none text-3xl font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]">
                  {`< ${personDetails.name} />`}
                </h2>

                {/* ------------------------------------------------ */}
                {/* Social Links                                    */}
                {/* ------------------------------------------------ */}

                <div className="mb-6 flex items-center justify-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>

                {/* ------------------------------------------------ */}
                {/* Buttons                                          */}
                {/* ------------------------------------------------ */}

                <div className="grid w-full grid-cols-2 gap-3">
                  {/* Download CV */}
                  <a
                    href="/"
                    className="flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-xs font-semibold text-white transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 3v12" />
                      <path d="m7 10 5 5 5-5" />
                      <path d="M5 21h14" />
                    </svg>

                    <span>Download CV</span>
                  </a>

                  {/* Contact Me */}
                  <a
                    href="/"
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-xs font-semibold text-black transition-all duration-200 hover:bg-emerald-400"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m22 2-7 20-4-9-9-4Z" />
                      <path d="M22 2 11 13" />
                    </svg>

                    <span>Contact Me</span>
                  </a>
                </div>
              </>
            )}

            {/* -------------------------------------------------- */}
            {/* Comet Glare                                       */}
            {/* -------------------------------------------------- */}

            {!isLoading && (
              <motion.div
                className="pointer-events-none absolute inset-0 z-50 rounded-3xl mix-blend-overlay"
                style={{
                  background: glareBackground,
                  opacity: 0.45,
                }}
              />
            )}
          </aside>
        </motion.div>
      </div>
    </div>
  );
}
