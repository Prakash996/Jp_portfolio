import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import personImage from "@/assets/images/person.png";

const PERSONAL_DATA = {
  name: "JP PRAKASH",
  role: "FRONTEND DEVELOPER",
  location: "VIJAYAWADA, INDIA",
  eyebrow: "BOOT SEQUENCE",
  title: "Ready to build.",
  description:
    "Frontend engineer, 6+ years. Let's ship something.",
};

const LOADING_STEPS = [
  "Profile",
  "Stack",
  "Experience",
];

const STAR_COUNT = 90;

const STAR_FIELD = Array.from(
  { length: STAR_COUNT },
  (_, index) => {
    const seed = index + 1;

    const pseudoRandom = (value) => {
      const result =
        Math.sin(value * 12.9898) *
        43758.5453;

      return result - Math.floor(result);
    };

    return {
      id: index,
      left: `${pseudoRandom(seed) * 100}%`,
      top: `${pseudoRandom(seed + 11) * 100}%`,
      size: `${
        pseudoRandom(seed + 23) * 1.6 + 0.5
      }px`,
      opacity:
        pseudoRandom(seed + 37) * 0.55 + 0.15,
      delay: `${
        pseudoRandom(seed + 47) * 8
      }s`,
      duration: `${
        pseudoRandom(seed + 59) * 5 + 5
      }s`,
    };
  }
);

export default function LandingPage({
  isReady = false,
  isEntering = false,
  onLoaded,
  onEnter,
  showEnter = true,
}) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(8);

  const completionNotified =
    useRef(false);

  const progressRef = useRef(8);

  const animationFrameRef =
    useRef(null);

  /*
   * Smooth progress animation.
   */
  const animateProgress = useCallback(
    (target, targetStep) => {
      setStep(targetStep);

      const start =
        progressRef.current;

      if (target <= start) return;

      if (animationFrameRef.current) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      const duration =
        target === 100
          ? 450
          : 350;

      const startTime =
        performance.now();

      const tick = (now) => {
        const elapsed =
          now - startTime;

        const ratio = Math.min(
          elapsed / duration,
          1
        );

        /*
         * Smooth ease-out.
         */
        const eased =
          1 -
          Math.pow(
            1 - ratio,
            3
          );

        const value = Math.round(
          start +
            (target - start) *
              eased
        );

        progressRef.current =
          value;

        setProgress(value);

        if (ratio < 1) {
          animationFrameRef.current =
            requestAnimationFrame(
              tick
            );

          return;
        }

        progressRef.current =
          target;

        setProgress(target);

        if (
          target === 100 &&
          !completionNotified.current
        ) {
          completionNotified.current =
            true;

          onLoaded?.();
        }
      };

      animationFrameRef.current =
        requestAnimationFrame(tick);
    },
    [onLoaded]
  );

  /*
   * Resource loading.
   */
  useEffect(() => {
    let cancelled = false;

    let imageReady = false;

    let windowReady =
      document.readyState ===
      "complete";

    const update = () => {
      if (cancelled) return;

      if (
        imageReady &&
        windowReady
      ) {
        animateProgress(100, 2);
      } else if (
        imageReady ||
        windowReady
      ) {
        animateProgress(68, 1);
      } else {
        animateProgress(28, 0);
      }
    };

    const handleWindowLoad = () => {
      windowReady = true;

      update();
    };

    const image = new Image();

    image.onload = async () => {
      try {
        if (image.decode) {
          await image.decode();
        }
      } catch {
        /*
         * Image is still usable.
         */
      }

      if (cancelled) return;

      imageReady = true;

      update();
    };

    image.onerror = () => {
      if (cancelled) return;

      /*
       * Optional image should never
       * block loading.
       */
      imageReady = true;

      update();
    };

    image.src = personImage;

    if (!windowReady) {
      window.addEventListener(
        "load",
        handleWindowLoad,
        {
          once: true,
        }
      );
    }

    update();

    return () => {
      cancelled = true;

      if (
        animationFrameRef.current
      ) {
        cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      window.removeEventListener(
        "load",
        handleWindowLoad
      );
    };
  }, [animateProgress]);

  /*
   * Status text.
   */
  const statusText = isEntering
    ? "Launching portfolio"
    : isReady
      ? "Workspace ready"
      : LOADING_STEPS[step];

  /*
   * Loader geometry.
   */
  const sweepDeg = Math.max(
    8,
    progress * 3.6
  );

  const ringGradient = `
    conic-gradient(
      from -90deg,
      #79f5c4 0deg,
      #14c98a ${Math.max(
        0,
        sweepDeg - 35
      )}deg,
      #59b9ff ${sweepDeg}deg,
      rgba(255,255,255,0.045)
        ${sweepDeg}deg 360deg
    )
  `;

  const completed =
    isReady || progress >= 100;

  return (
    <>
      <main
        className="landing-page"
        aria-live="polite"
        data-entering={isEntering}
        data-ready={completed}
      >
        {/* =====================================================
            BACKGROUND
        ===================================================== */}

        <div
          className="landing-page__space"
          aria-hidden="true"
        >
          {STAR_FIELD.map((star) => (
            <span
              key={star.id}
              className="landing-page__star"
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
                animationDelay:
                  star.delay,
                animationDuration:
                  star.duration,
              }}
            />
          ))}
        </div>

        <div
          className="landing-page__grid"
          aria-hidden="true"
        />

        <div
          className="landing-page__ambient"
          aria-hidden="true"
        />

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="landing-page__header">
          <div className="landing-page__brand">
            <span
              className="landing-page__brand-icon"
              aria-hidden="true"
            >
              &lt;/&gt;
            </span>

            <span>
              {PERSONAL_DATA.name}
            </span>
          </div>

          <div className="landing-page__header-status">
            SYS://
            {PERSONAL_DATA.role.replace(
              /\s+/g,
              "_"
            )}
          </div>
        </header>

        {/* =====================================================
            MAIN
        ===================================================== */}

        <section
          className="landing-page__main"
          aria-label="Loading portfolio"
        >
          {/* ===================================================
              INTRO
          =================================================== */}

          <div
            className="landing-page__intro"
            data-transition={
              completed
                ? "ready"
                : "loading"
            }
          >
            <div className="landing-page__eyebrow">
              <span
                className="landing-page__eyebrow-dot"
                aria-hidden="true"
              />

              <span>
                {PERSONAL_DATA.eyebrow}
              </span>
            </div>

            <h1 className="landing-page__title">
              {PERSONAL_DATA.title}
            </h1>

            <p className="landing-page__description">
              {PERSONAL_DATA.description}
            </p>
          </div>

          {/* ===================================================
              PROGRAMMER GALAXY LOADER
          =================================================== */}

          <div
            className="landing-page__loader"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label={`${statusText} — ${progress}%`}
          >
            {/* Outer glow */}

            <span
              className="landing-page__loader-glow"
              aria-hidden="true"
            />

            {/* Outer orbit */}

            <span
              className="landing-page__orbit landing-page__orbit--outer"
              aria-hidden="true"
            />

            {/* Main progress galaxy */}

            <span
              className="landing-page__loader-ring"
              style={{
                background:
                  ringGradient,
              }}
              aria-hidden="true"
            />

            {/* Inner orbit */}

            <span
              className="landing-page__orbit landing-page__orbit--inner"
              aria-hidden="true"
            />

            {/* Orbiting particles */}

            <span
              className="landing-page__orbit-dot landing-page__orbit-dot--one"
              aria-hidden="true"
            />

            <span
              className="landing-page__orbit-dot landing-page__orbit-dot--two"
              aria-hidden="true"
            />

            <span
              className="landing-page__orbit-dot landing-page__orbit-dot--three"
              aria-hidden="true"
            />

            {/* Orbit labels */}

            <span className="landing-page__orbit-label landing-page__orbit-label--top">
              DEV
            </span>

            <span className="landing-page__orbit-label landing-page__orbit-label--right">
              UI
            </span>

            <span className="landing-page__orbit-label landing-page__orbit-label--bottom">
              CODE
            </span>

            <span className="landing-page__orbit-label landing-page__orbit-label--left">
              BUILD
            </span>

            {/* Center */}

            <div className="landing-page__core">
              <div className="landing-page__core-screen">
                <span className="landing-page__terminal-line">
                  <span className="landing-page__terminal-prompt">
                    $
                  </span>

                  <span>
                    {" "}
                    ready
                  </span>

                  <span className="landing-page__terminal-cursor">
                    _
                  </span>
                </span>
              </div>

              <span className="landing-page__core-status">
                {completed
                  ? "ONLINE"
                  : "LOADING"}
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            BOTTOM AREA
        ===================================================== */}

        <div className="landing-page__bottom">
          {/* Progress */}

          <div className="landing-page__progress">
            <div className="landing-page__progress-track">
              <span
                className="landing-page__progress-fill"
                data-opening={isEntering}
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="landing-page__progress-meta">
              <span className="landing-page__progress-status">
                <span
                  className="landing-page__progress-dot"
                  aria-hidden="true"
                />

                {statusText}

                {completed && (
                  <span className="landing-page__progress-percent">
                    — 100%
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* ===================================================
              CHECKLIST
          =================================================== */}

          <div className="landing-page__steps">
            {LOADING_STEPS.map(
              (item, index) => {
                const active =
                  index <= step;

                const finished =
                  index < step ||
                  completed;

                return (
                  <div
                    key={item}
                    className={`landing-page__step ${
                      active
                        ? "landing-page__step--active"
                        : ""
                    }`}
                  >
                    <span className="landing-page__step-number">
                      {finished
                        ? "✓"
                        : String(
                            index + 1
                          ).padStart(
                            2,
                            "0"
                          )}
                    </span>

                    <span>
                      {item}
                    </span>
                  </div>
                );
              }
            )}
          </div>

          {/* ===================================================
              CTA
          =================================================== */}

          {completed &&
            !isEntering &&
            showEnter && (
              <button
                type="button"
                className="landing-page__enter"
                onClick={onEnter}
              >
                <span>
                  $ enter_portfolio
                </span>

                <span
                  className="landing-page__enter-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>
            )}
        </div>

        {/* =====================================================
            FOOTER
        ===================================================== */}

        <footer className="landing-page__footer">
          <span>
            {PERSONAL_DATA.role}
          </span>

          <span
            className="landing-page__footer-line"
            aria-hidden="true"
          />

          <span>
            {PERSONAL_DATA.location}
          </span>
        </footer>
      </main>

      <style>{`
        /* =====================================================
           TOKENS
        ===================================================== */

        .landing-page {
          --void: #020505;

          --green-100: #b7ffe3;
          --green-300: #79f5c4;
          --green-500: #14c98a;
          --green-700: #087956;
          --green-900: #04291e;

          --blue: #57a9ff;

          --paper: #edf5f1;
          --muted: #71817a;
          --dim: #3c4944;

          position: relative;

          width: 100%;
          min-height: 100vh;
          min-height: 100svh;

          overflow: hidden;
          isolation: isolate;

          display: flex;
          flex-direction: column;

          background:
            radial-gradient(
              circle at 50% 48%,
              rgba(20, 201, 138, 0.075),
              transparent 28%
            ),
            radial-gradient(
              circle at 50% 100%,
              rgba(87, 169, 255, 0.035),
              transparent 38%
            ),
            var(--void);

          color: var(--paper);

          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          transition:
            background 900ms ease;
        }

        .landing-page[data-entering="true"] {
          background:
            radial-gradient(
              circle at 50% 48%,
              rgba(20, 201, 138, 0.16),
              transparent 30%
            ),
            #020505;
        }


        /* =====================================================
           STAR FIELD
        ===================================================== */

        .landing-page__space {
          position: absolute;
          inset: 0;

          z-index: -5;

          pointer-events: none;

          overflow: hidden;
        }

        .landing-page__star {
          position: absolute;

          display: block;

          border-radius: 50%;

          background: #d9fff0;

          animation:
            landing-star-twinkle
            ease-in-out
            infinite;
        }


        /* =====================================================
           GRID
        ===================================================== */

        .landing-page__grid {
          position: absolute;
          inset: 0;

          z-index: -4;

          pointer-events: none;

          opacity: 0.22;

          background-image:
            linear-gradient(
              rgba(121, 245, 196, 0.018)
              1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(121, 245, 196, 0.018)
              1px,
              transparent 1px
            );

          background-size: 70px 70px;

          mask-image:
            radial-gradient(
              ellipse at center,
              black 0%,
              rgba(0,0,0,0.5) 45%,
              transparent 80%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse at center,
              black 0%,
              rgba(0,0,0,0.5) 45%,
              transparent 80%
            );
        }


        /* =====================================================
           AMBIENT LIGHT
        ===================================================== */

        .landing-page__ambient {
          position: absolute;

          width: 520px;
          height: 520px;

          left: 50%;
          top: 48%;

          transform:
            translate(-50%, -50%);

          z-index: -3;

          pointer-events: none;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(20, 201, 138, 0.11),
              rgba(20, 201, 138, 0.025) 42%,
              transparent 72%
            );

          filter: blur(20px);

          animation:
            landing-ambient-pulse
            5s
            ease-in-out
            infinite;
        }


        /* =====================================================
           HEADER
        ===================================================== */

        .landing-page__header {
          position: absolute;

          top: 22px;
          left: 32px;
          right: 32px;

          display: flex;

          align-items: center;
          justify-content: space-between;

          z-index: 5;
        }

        .landing-page__brand {
          display: flex;

          align-items: center;

          gap: 9px;

          color: #7d8c86;

          font-size: 9px;
          font-weight: 700;

          letter-spacing: 0.16em;
        }

        .landing-page__brand-icon {
          display: grid;
          place-items: center;

          width: 24px;
          height: 24px;

          border:
            1px solid
            rgba(121, 245, 196, 0.22);

          border-radius: 7px;

          background:
            rgba(20, 201, 138, 0.035);

          color: var(--green-300);

          font-family:
            "JetBrains Mono",
            ui-monospace,
            monospace;

          font-size: 8px;

          box-shadow:
            inset 0 0 12px
            rgba(20, 201, 138, 0.04);
        }

        .landing-page__header-status {
          color: #34413c;

          font-family:
            "JetBrains Mono",
            ui-monospace,
            monospace;

          font-size: 7px;

          letter-spacing: 0.12em;
        }


        /* =====================================================
           MAIN
        ===================================================== */

        .landing-page__main {
          flex: 1;

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          padding:
            90px
            24px
            30px;

          text-align: center;
        }


        /* =====================================================
           INTRO
        ===================================================== */

        .landing-page__intro {
          position: relative;

          z-index: 2;

          animation:
            landing-fade-in
            0.8s
            ease
            both;

          transition:
            opacity 700ms ease,
            transform 700ms
              cubic-bezier(
                0.16,
                1,
                0.3,
                1
              ),
            filter 700ms ease;
        }

        .landing-page__intro[data-transition="ready"] {
          transform:
            translateY(-3px);

          filter:
            drop-shadow(
              0 0 25px
              rgba(
                121,
                245,
                196,
                0.025
              )
            );
        }

        .landing-page__eyebrow {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 8px;

          margin-bottom: 19px;

          color: #65746e;

          font-family:
            "JetBrains Mono",
            ui-monospace,
            monospace;

          font-size: 8px;
          font-weight: 600;

          letter-spacing: 0.2em;
        }

        .landing-page__eyebrow-dot {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            var(--green-300);

          box-shadow:
            0 0 10px
            rgba(
              121,
              245,
              196,
              0.8
            );

          animation:
            landing-pulse
            1.6s
            ease-in-out
            infinite;
        }

        .landing-page__title {
          max-width: 720px;

          margin: 0;

          font-size:
            clamp(
              48px,
              7vw,
              82px
            );

          line-height: 0.96;

          font-weight: 600;

          letter-spacing:
            -0.065em;
        }

        .landing-page__description {
          max-width: 540px;

          margin:
            20px
            auto
            0;

          color: #66746e;

          font-size: 13px;

          line-height: 1.7;

          letter-spacing:
            -0.01em;
        }


        /* =====================================================
           LOADER
        ===================================================== */

        .landing-page__loader {
          position: relative;

          width:
            clamp(
              250px,
              31vw,
              310px
            );

          aspect-ratio: 1;

          margin-top:
            clamp(
              30px,
              4vw,
              46px
            );

          display: grid;

          place-items: center;

          animation:
            landing-loader-enter
            1.2s
            cubic-bezier(
              0.16,
              1,
              0.3,
              1
            )
            both;
        }


        /* =====================================================
           LOADER GLOW
        ===================================================== */

        .landing-page__loader-glow {
          position: absolute;

          inset: -18%;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(
                20,
                201,
                138,
                0.13
              ),
              rgba(
                20,
                201,
                138,
                0.025
              ) 52%,
              transparent 72%
            );

          filter: blur(10px);

          animation:
            landing-glow
            4s
            ease-in-out
            infinite;
        }


        /* =====================================================
           ORBITS
        ===================================================== */

        .landing-page__orbit {
          position: absolute;

          border-radius: 50%;

          pointer-events: none;
        }

        .landing-page__orbit--outer {
          inset: 2%;

          border:
            1px dashed
            rgba(
              121,
              245,
              196,
              0.09
            );

          animation:
            landing-spin
            30s
            linear
            infinite;
        }

        .landing-page__orbit--inner {
          inset: 15%;

          border:
            1px dashed
            rgba(
              87,
              169,
              255,
              0.1
            );

          animation:
            landing-spin-reverse
            22s
            linear
            infinite;
        }


        /* =====================================================
           PROGRESS RING
        ===================================================== */

        .landing-page__loader-ring {
          position: absolute;

          inset: 6%;

          border-radius: 50%;

          -webkit-mask:
            radial-gradient(
              farthest-side,
              transparent
              calc(100% - 6px),
              #000
              calc(100% - 6px)
            );

          mask:
            radial-gradient(
              farthest-side,
              transparent
              calc(100% - 6px),
              #000
              calc(100% - 6px)
            );

          filter:
            drop-shadow(
              0 0 8px
              rgba(
                20,
                201,
                138,
                0.35
              )
            );

          transition:
            background
            0.7s
            cubic-bezier(
              0.22,
              1,
              0.36,
              1
            );

          animation:
            landing-spin-slow
            18s
            linear
            infinite;
        }

        .landing-page[data-ready="true"]
          .landing-page__loader-ring {
          filter:
            drop-shadow(
              0 0 12px
              rgba(
                121,
                245,
                196,
                0.5
              )
            );
        }


        /* =====================================================
           ORBIT DOTS
        ===================================================== */

        .landing-page__orbit-dot {
          position: absolute;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            var(--green-300);

          box-shadow:
            0 0 8px
            rgba(
              121,
              245,
              196,
              0.9
            );

          z-index: 5;
        }

        .landing-page__orbit-dot--one {
          top: 7%;
          left: 50%;

          animation:
            landing-orbit-dot
            7s
            linear
            infinite;
        }

        .landing-page__orbit-dot--two {
          right: 9%;
          bottom: 28%;

          width: 3px;
          height: 3px;

          background:
            var(--blue);

          box-shadow:
            0 0 8px
            rgba(
              87,
              169,
              255,
              0.8
            );

          animation:
            landing-orbit-dot
            9s
            linear
            infinite
            reverse;
        }

        .landing-page__orbit-dot--three {
          left: 17%;
          bottom: 19%;

          width: 3px;
          height: 3px;

          animation:
            landing-orbit-dot
            11s
            linear
            infinite;
        }


        /* =====================================================
           ORBIT LABELS
        ===================================================== */

        .landing-page__orbit-label {
          position: absolute;

          color: #45534d;

          font-family:
            "JetBrains Mono",
            ui-monospace,
            monospace;

          font-size: 6px;

          letter-spacing: 0.18em;
        }

        .landing-page__orbit-label--top {
          top: 0;
          left: 50%;

          transform:
            translateX(-50%);
        }

        .landing-page__orbit-label--right {
          right: 0;
          top: 50%;

          transform:
            translateY(-50%);
        }

        .landing-page__orbit-label--bottom {
          bottom: 0;
          left: 50%;

          transform:
            translateX(-50%);
        }

        .landing-page__orbit-label--left {
          left: 0;
          top: 50%;

          transform:
            translateY(-50%);
        }


        /* =====================================================
           CORE
        ===================================================== */

        .landing-page__core {
          position: relative;

          width: 56%;
          aspect-ratio: 1;

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 50% 45%,
              #07100c 0%,
              #020504 48%,
              #000 74%
            );

          border:
            1px solid
            rgba(
              121,
              245,
              196,
              0.12
            );

          box-shadow:
            0 0 0 8px
            rgba(
              20,
              201,
              138,
              0.025
            ),

            0 0 0 1px
            rgba(0, 0, 0, 0.8),

            inset 0 0 30px
            rgba(0, 0, 0, 0.95),

            0 0 40px
            rgba(
              20,
              201,
              138,
              0.06
            );

          z-index: 3;

          overflow: hidden;
        }

        .landing-page__core::before {
          content: "";

          position: absolute;

          inset: 13%;

          border-radius: 50%;

          border:
            1px solid
            rgba(
              121,
              245,
              196,
              0.045
            );
        }

        .landing-page__core::after {
          content: "";

          position: absolute;

          width: 70%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                121,
                245,
                196,
                0.1
              ),
              transparent
            );
        }


        /* =====================================================
           TERMINAL
        ===================================================== */

        .landing-page__core-screen {
          position: relative;

          z-index: 2;

          display: flex;

          align-items: center;

          color: #74847c;

          font-family:
            "JetBrains Mono",
            ui-monospace,
            Menlo,
            monospace;

          font-size: 9px;

          letter-spacing: 0.03em;
        }

        .landing-page__terminal-prompt {
          color:
            var(--green-300);

          margin-right: 4px;
        }

        .landing-page__terminal-cursor {
          margin-left: 1px;

          color:
            var(--green-300);

          animation:
            landing-cursor
            1s
            steps(1)
            infinite;
        }

        .landing-page__core-status {
          position: relative;

          z-index: 2;

          margin-top: 8px;

          color: #34443d;

          font-family:
            "JetBrains Mono",
            ui-monospace,
            monospace;

          font-size: 5px;

          letter-spacing: 0.24em;
        }


        /* =====================================================
           BOTTOM
        ===================================================== */

        .landing-page__bottom {
          width:
            min(
              520px,
              calc(100% - 40px)
            );

          margin:
            0 auto;

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 18px;

          padding:
            0 0 54px;
        }


        /* =====================================================
           PROGRESS
        ===================================================== */

        .landing-page__progress {
          width: 100%;
        }

        .landing-page__progress-track {
          position: relative;

          width: 100%;
          height: 3px;

          overflow: hidden;

          border-radius: 999px;

          background:
            rgba(
              255,
              255,
              255,
              0.07
            );
        }

        .landing-page__progress-fill {
          position: absolute;

          left: 0;
          top: 0;

          display: block;

          width: 0;
          height: 100%;

          border-radius: inherit;

          background:
            linear-gradient(
              90deg,
              var(--green-700),
              var(--green-500) 55%,
              var(--green-300)
            );

          box-shadow:
            0 0 12px
            rgba(
              20,
              201,
              138,
              0.55
            );

          transition:
            width
            0.2s
            linear;
        }

        .landing-page__progress-fill[data-opening="true"] {
          animation:
            landing-shimmer
            1.1s
            ease-in-out
            infinite;
        }

        .landing-page__progress-meta {
          display: flex;

          align-items: center;
          justify-content: flex-start;

          margin-top: 11px;

          color: #64736c;

          font-family:
            "JetBrains Mono",
            ui-monospace,
            monospace;

          font-size: 9px;
        }

        .landing-page__progress-status {
          display: flex;

          align-items: center;

          gap: 8px;

          transition:
            color 400ms ease,
            transform 400ms ease;
        }

        .landing-page[data-ready="true"]
          .landing-page__progress-status {
          color:
            var(--green-300);

          transform:
            translateX(2px);
        }

        .landing-page__progress-percent {
          color:
            var(--green-300);
        }

        .landing-page__progress-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            var(--green-300);

          box-shadow:
            0 0 9px
            rgba(
              121,
              245,
              196,
              0.8
            );

          animation:
            landing-pulse
            1.5s
            ease-in-out
            infinite;
        }


        /* =====================================================
           STEPS
        ===================================================== */

        .landing-page__steps {
          width: 100%;

          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 10px;
        }

        .landing-page__step {
          min-width: 0;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 7px;

          color: #39443f;

          font-family:
            "JetBrains Mono",
            ui-monospace,
            monospace;

          font-size: 7px;

          white-space: nowrap;

          transition:
            color
            0.3s
            ease;
        }

        .landing-page__step--active {
          color: #74857d;
        }

        .landing-page__step-number {
          flex:
            0 0 16px;

          width: 16px;
          height: 16px;

          display: grid;

          place-items: center;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          border-radius: 5px;

          color: #4a5751;

          font-size: 6px;

          transition:
            all
            0.3s
            ease;
        }

        .landing-page__step--active
          .landing-page__step-number {
          border-color:
            rgba(
              121,
              245,
              196,
              0.24
            );

          background:
            rgba(
              20,
              201,
              138,
              0.05
            );

          color:
            var(--green-300);
        }


        /* =====================================================
           ENTER BUTTON
        ===================================================== */

        .landing-page__enter {
          width: 100%;
          height: 52px;

          padding:
            0 9px 0 20px;

          display: flex;

          align-items: center;
          justify-content: space-between;

          border:
            1px solid
            rgba(
              121,
              245,
              196,
              0.22
            );

          border-radius: 12px;

          background:
            linear-gradient(
              135deg,
              rgba(
                20,
                201,
                138,
                0.09
              ),
              rgba(
                20,
                201,
                138,
                0.025
              )
            );

          color: #dce9e3;

          font: inherit;

          font-family:
            "JetBrains Mono",
            ui-monospace,
            monospace;

          font-size: 10px;
          font-weight: 600;

          letter-spacing: 0.08em;

          cursor: pointer;

          animation:
            landing-fade-in
            0.5s
            ease
            both;

          transition:
            transform
            0.25s
            ease,
            border-color
            0.25s
            ease,
            background
            0.25s
            ease,
            box-shadow
            0.25s
            ease;
        }

        .landing-page__enter:hover {
          transform:
            translateY(-2px);

          border-color:
            rgba(
              121,
              245,
              196,
              0.45
            );

          background:
            linear-gradient(
              135deg,
              rgba(
                20,
                201,
                138,
                0.15
              ),
              rgba(
                20,
                201,
                138,
                0.04
              )
            );

          box-shadow:
            0 12px 35px
            rgba(0, 0, 0, 0.3),

            0 0 25px
            rgba(
              20,
              201,
              138,
              0.08
            );
        }

        .landing-page__enter:active {
          transform:
            translateY(0);
        }

        .landing-page__enter:focus-visible {
          outline:
            2px solid
            rgba(
              121,
              245,
              196,
              0.7
            );

          outline-offset: 3px;
        }

        .landing-page__enter-arrow {
          width: 34px;
          height: 34px;

          display: grid;

          place-items: center;

          border-radius: 9px;

          background:
            rgba(
              255,
              255,
              255,
              0.06
            );

          color:
            var(--green-300);

          font-size: 15px;

          transition:
            transform
            0.25s
            ease;
        }

        .landing-page__enter:hover
          .landing-page__enter-arrow {
          transform:
            translateX(4px);
        }


        /* =====================================================
           FOOTER
        ===================================================== */

        .landing-page__footer {
          position: absolute;

          left: 32px;
          right: 32px;
          bottom: 22px;

          z-index: 5;

          display: flex;

          align-items: center;

          gap: 12px;

          color: #35413c;

          font-family:
            "JetBrains Mono",
            ui-monospace,
            monospace;

          font-size: 7px;

          letter-spacing: 0.12em;
        }

        .landing-page__footer-line {
          width: 35px;
          height: 1px;

          background:
            rgba(
              255,
              255,
              255,
              0.06
            );
        }


        /* =====================================================
           ENTERING STATE
        ===================================================== */

        .landing-page[data-entering="true"]
          .landing-page__loader {
          animation:
            landing-loader-consume
            900ms
            ease-in
            forwards;
        }

        .landing-page[data-entering="true"]
          .landing-page__intro {
          animation:
            landing-fade-out
            500ms
            ease
            forwards;
        }

        .landing-page[data-entering="true"]
          .landing-page__bottom {
          opacity: 0;

          transition:
            opacity
            0.3s
            ease;
        }


        /* =====================================================
           ANIMATIONS
        ===================================================== */

        @keyframes landing-fade-in {
          from {
            opacity: 0;

            transform:
              translateY(12px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }
        }

        @keyframes landing-fade-out {
          to {
            opacity: 0;

            transform:
              translateY(-8px)
              scale(0.98);

            filter: blur(4px);
          }
        }

        @keyframes landing-loader-enter {
          from {
            opacity: 0;

            transform:
              scale(0.72);
          }

          to {
            opacity: 1;

            transform:
              scale(1);
          }
        }

        @keyframes landing-loader-consume {
          0% {
            opacity: 1;

            transform:
              scale(1);

            filter:
              blur(0);
          }

          45% {
            opacity: 1;

            transform:
              scale(1.08);

            filter:
              blur(0);
          }

          100% {
            opacity: 0;

            transform:
              scale(1.75);

            filter:
              blur(10px);
          }
        }

        @keyframes landing-star-twinkle {
          0%,
          100% {
            transform:
              scale(0.8);

            filter:
              brightness(0.7);
          }

          50% {
            transform:
              scale(1.25);

            filter:
              brightness(1.7);
          }
        }

        @keyframes landing-ambient-pulse {
          0%,
          100% {
            opacity: 0.65;

            transform:
              translate(-50%, -50%)
              scale(0.95);
          }

          50% {
            opacity: 1;

            transform:
              translate(-50%, -50%)
              scale(1.08);
          }
        }

        @keyframes landing-glow {
          0%,
          100% {
            opacity: 0.55;

            transform:
              scale(0.94);
          }

          50% {
            opacity: 1;

            transform:
              scale(1.06);
          }
        }

        @keyframes landing-spin {
          from {
            transform:
              rotate(0deg);
          }

          to {
            transform:
              rotate(360deg);
          }
        }

        @keyframes landing-spin-reverse {
          from {
            transform:
              rotate(360deg);
          }

          to {
            transform:
              rotate(0deg);
          }
        }

        @keyframes landing-spin-slow {
          from {
            transform:
              rotate(0deg);
          }

          to {
            transform:
              rotate(360deg);
          }
        }

        @keyframes landing-orbit-dot {
          from {
            transform:
              rotate(0deg)
              translateX(4px)
              rotate(0deg);
          }

          to {
            transform:
              rotate(360deg)
              translateX(4px)
              rotate(-360deg);
          }
        }

        @keyframes landing-pulse {
          0%,
          100% {
            opacity: 1;

            transform:
              scale(1);
          }

          50% {
            opacity: 0.4;

            transform:
              scale(0.7);
          }
        }

        @keyframes landing-cursor {
          0%,
          45% {
            opacity: 1;
          }

          46%,
          100% {
            opacity: 0;
          }
        }

        @keyframes landing-shimmer {
          0%,
          100% {
            filter:
              brightness(1);
          }

          50% {
            filter:
              brightness(1.45);
          }
        }


        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 800px) {
          .landing-page__header {
            left: 24px;
            right: 24px;
          }

          .landing-page__title {
            font-size:
              clamp(
                44px,
                8vw,
                64px
              );
          }

          .landing-page__loader {
            width:
              clamp(
                230px,
                42vw,
                290px
              );
          }

          .landing-page__bottom {
            width:
              min(
                480px,
                calc(100% - 40px)
              );
          }
        }


        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 600px) {
          .landing-page__header {
            top: 18px;

            left: 20px;
            right: 20px;
          }

          .landing-page__brand {
            font-size: 8px;
          }

          .landing-page__header-status {
            display: none;
          }

          .landing-page__main {
            padding:
              76px
              20px
              20px;
          }

          .landing-page__eyebrow {
            margin-bottom: 16px;

            font-size: 7px;
          }

          .landing-page__title {
            font-size:
              clamp(
                40px,
                12vw,
                56px
              );

            line-height: 0.98;
          }

          .landing-page__description {
            margin-top: 17px;

            font-size: 12px;

            line-height: 1.6;
          }

          .landing-page__loader {
            width:
              min(
                235px,
                64vw
              );

            margin-top: 28px;
          }

          .landing-page__bottom {
            width:
              calc(100% - 40px);

            padding-bottom: 50px;

            gap: 15px;
          }

          .landing-page__steps {
            grid-template-columns:
              repeat(3, 1fr);

            gap: 6px;
          }

          .landing-page__step {
            justify-content: center;

            font-size: 7px;
          }

          .landing-page__step-number {
            flex-basis: 15px;

            width: 15px;
            height: 15px;
          }

          .landing-page__enter {
            height: 50px;
          }

          .landing-page__footer {
            left: 20px;
            right: 20px;
            bottom: 17px;

            font-size: 6px;
          }
        }


        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 380px) {
          .landing-page__title {
            font-size: 36px;
          }

          .landing-page__description {
            font-size: 11px;
          }

          .landing-page__loader {
            width: 210px;
          }

          .landing-page__orbit-label {
            font-size: 5px;
          }

          .landing-page__core-screen {
            font-size: 8px;
          }

          .landing-page__steps {
            gap: 3px;
          }

          .landing-page__step {
            font-size: 6px;
            gap: 4px;
          }
        }


        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {
          .landing-page *,
          .landing-page *::before,
          .landing-page *::after {
            animation:
              none !important;

            transition:
              none !important;
          }
        }
      `}</style>
    </>
  );
}
