import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
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
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  /*
   * ------------------------------------------------------------
   * Social Links
   * ------------------------------------------------------------
   */

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/jp-prakash996/",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.34V8.98h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.3ZM5.32 7.42a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.54 20.45H7.1V8.98H3.54v11.47ZM22.22 0H1.78C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.78 24h20.44c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "https://github.com/Prakash996/Jp_portfolio",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .3Z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/prakash_jakkula/",
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
          <circle
            cx="17.5"
            cy="6.5"
            r="1"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <div className="lg:col-span-4">
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
            <aside
              className={`relative flex h-fit w-full flex-col items-center overflow-hidden rounded-3xl border border-zinc-800 bg-[#111111] p-6 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)] ${
                isLoading ? "pointer-events-none" : ""
              }`}
            >
              {isLoading ? (
                <div
                  role="status"
                  aria-label="Loading profile card"
                  className="flex w-full flex-col items-center animate-pulse"
                >
                  <div className="mb-6 aspect-square w-full rounded-2xl bg-[#1d1d1f]" />

                  <div className="mb-6 h-7 w-28 rounded-full bg-[#1d1d1f]" />

                  <div className="mb-6 h-9 w-3/4 rounded bg-[#1d1d1f]" />

                  <div className="mb-8 flex gap-3">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="h-10 w-10 rounded-xl bg-[#1d1d1f]"
                      />
                    ))}
                  </div>

                  <div className="grid w-full grid-cols-2 gap-3">
                    <div className="h-10 rounded-xl bg-[#1d1d1f]" />
                    <div className="h-10 rounded-xl bg-[#1d1d1f]" />
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-2xl bg-black">
                    <img
                      src={personImage}
                      alt={personDetails.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <button
                    id="availabilityStatus"
                    type="button"
                    className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-600 bg-zinc-900 px-3 py-1.5 transition-all hover:border-emerald-500"
                  >
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />

                    <span className="border-l border-zinc-600 pl-2 text-xs font-medium text-zinc-300">
                      Open to work
                    </span>
                  </button>

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
                        type="button"
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
                </>
              )}

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
    </>
  );
}