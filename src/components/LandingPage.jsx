import { useCallback, useEffect, useRef, useState } from "react";
import personImage from "@/assets/images/person.png";
import landingData from "@/data/LandingData.json";
import "@/css/Landing.css";

const {
  personal,
  loadingSteps,
  starCount,
  commonTextClassName,
  loader,
  spirals,
  circleLabels,
  particles,
} = landingData;

/* =========================================================
   STAR FIELD
========================================================= */

const pseudoRandom = (value) => {
  const result = Math.sin(value * 12.9898) * 43758.5453;
  return result - Math.floor(result);
};

const STAR_FIELD = Array.from({ length: starCount }, (_, index) => {
  const seed = index + 1;

  return {
    id: index,
    left: `${pseudoRandom(seed) * 100}%`,
    top: `${pseudoRandom(seed + 11) * 100}%`,
    size: `${pseudoRandom(seed + 23) * 1.6 + 0.5}px`,
    opacity: pseudoRandom(seed + 37) * 0.55 + 0.15,
    delay: `${pseudoRandom(seed + 47) * 8}s`,
    duration: `${pseudoRandom(seed + 59) * 5 + 5}s`,
  };
});

/* =========================================================
   CREATE SPIRAL PATH
========================================================= */

function createSpiralPath({
  turns = 3.8,
  startRadius = 47,
  endRadius = 5,
  points = 260,
  rotation = -Math.PI / 2,
}) {
  const result = [];

  for (let i = 0; i <= points; i += 1) {
    const progress = i / points;
    const angle = rotation + progress * Math.PI * 2 * turns;
    const radius = startRadius + (endRadius - startRadius) * progress;
    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;

    result.push(
      `${i === 0 ? "M" : "L"} ${x.toFixed(3)} ${y.toFixed(3)}`
    );
  }

  return result.join(" ");
}

/* =========================================================
   PREBUILD SPIRALS
========================================================= */

const spiralPaths = spirals.map((spiral) => ({
  ...spiral,
  path: createSpiralPath({
    turns: spiral.turns,
    startRadius: spiral.radius,
    endRadius: spiral.end,
  }),
}));

/* =========================================================
   COMPONENT
========================================================= */

export default function LandingPage({
  isReady = false,
  isEntering = false,
  onLoaded,
  onEnter,
  showEnter = true,
}) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(loader.initialProgress);
  const [typedName, setTypedName] = useState("");
  const completionNotified = useRef(false);
  const progressRef = useRef(loader.initialProgress);
  const progressBarRef = useRef(null);
  const progressFillRef = useRef(null);
  const animationFrameRef = useRef(null);
  const typingFrameRef = useRef(null);
  const enterTimeoutRef = useRef(null);
  const mainRef = useRef(null);
  const enterStartedRef = useRef(false);

  const completed =
    isReady || progress >= loader.completedProgress;

  const entering = isEntering;

  const glowDot = <span className="size-2.5 rounded-full bg-[#79f5c4] shadow-[0_0_9px_rgba(121,245,196,0.8)] animate-landing-pulse"/>

  /* =======================================================
     START BUTTON
  ======================================================= */

  const handleCenterEnter = useCallback(() => {
    if (
      !completed ||
      entering ||
      enterStartedRef.current ||
      !showEnter
    ) {
      return;
    }

    enterStartedRef.current = true;

    /*
     * Do NOT manipulate the title DOM here.
     *
     * The title is hidden directly from `entering`,
     * which is derived from `isEntering`.
     *
     * This means that even if React repaints/remounts
     * this component after launch, the title remains hidden
     * as long as isEntering === true.
     */

    mainRef.current?.setAttribute(
      "data-entering",
      "true"
    );

    enterTimeoutRef.current = window.setTimeout(() => {
      onEnter?.();
    }, 900);
  }, [completed, entering, showEnter, onEnter]);

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      if (enterTimeoutRef.current) {
        clearTimeout(enterTimeoutRef.current);
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  /* =======================================================
     TYPEWRITER
  ======================================================= */

  useEffect(() => {
    let cancelled = false;
    const name = personal.name;
    let index = 0;

    const type = () => {
      if (cancelled) {
        return;
      }

      index += 1;
      setTypedName(name.slice(0, index));

      if (index < name.length) {
        typingFrameRef.current = window.setTimeout(type, 85);
      }
    };

    type();

    return () => {
      cancelled = true;

      if (typingFrameRef.current) {
        clearTimeout(typingFrameRef.current);
      }
    };
  }, []);

  /* =======================================================
     SMOOTH PROGRESS
  ======================================================= */

  const animateProgress = useCallback(
    (target, targetStep) => {
      setStep(targetStep);

      const start = progressRef.current;

      if (target <= start) {
        return;
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      const duration =
        target === loader.completedProgress
          ? loader.completedDuration
          : loader.partialDuration;

      const startTime = performance.now();

      const tick = (now) => {
        const elapsed = now - startTime;
        const ratio = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - ratio, 3);
        const value = Math.round(
          start + (target - start) * eased
        );

        progressRef.current = value;

        progressFillRef.current?.style.setProperty(
          "width",
          `${value}%`
        );

        progressBarRef.current?.setAttribute(
          "aria-valuenow",
          String(value)
        );

        if (ratio < 1) {
          animationFrameRef.current =
            requestAnimationFrame(tick);
          return;
        }

        progressRef.current = target;
        setProgress(target);

        if (
          target === loader.completedProgress &&
          !completionNotified.current
        ) {
          completionNotified.current = true;
          onLoaded?.();
        }
      };

      animationFrameRef.current =
        requestAnimationFrame(tick);
    },
    [onLoaded]
  );

  /* =======================================================
     RESOURCE LOADING
  ======================================================= */

  useEffect(() => {
    let cancelled = false;
    let imageReady = false;

    let windowReady =
      document.readyState ===
      "complete";

    const loadingStartedAt =
      performance.now();

    let minimumTimePassed =
      false;

    let resourcesReady = false;
    let minimumTimer = null;

    const finishIfReady = () => {
      if (cancelled) {
        return;
      }

      if (
        resourcesReady &&
        minimumTimePassed
      ) {
        animateProgress(
          loader.completedProgress,
          2
        );
      }
    };

    const update = () => {
      if (cancelled) {
        return;
      }

      if (
        imageReady &&
        windowReady
      ) {
        resourcesReady = true;
        finishIfReady();
      } else if (
        imageReady ||
        windowReady
      ) {
        animateProgress(
          loader.resourceProgress,
          1
        );
      } else {
        animateProgress(
          loader.partialProgress,
          0
        );
      }
    };

    const handleWindowLoad =
      () => {
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
        // Image is still usable.
      }

      if (cancelled) {
        return;
      }

      imageReady = true;
      update();
    };

    image.onerror = () => {
      if (cancelled) {
        return;
      }

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

    const elapsed =
      performance.now() -
      loadingStartedAt;

    const remaining =
      Math.max(
        0,
        loader.minimumLoadingTime -
          elapsed
      );

    minimumTimer =
      window.setTimeout(() => {
        minimumTimePassed = true;
        finishIfReady();
      }, remaining);

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

      if (minimumTimer) {
        clearTimeout(
          minimumTimer
        );
      }

      window.removeEventListener(
        "load",
        handleWindowLoad
      );
    };
  }, [animateProgress]);

  /* =======================================================
     STATUS
  ======================================================= */

  const statusText = entering
    ? "Launching portfolio"
    : completed
      ? "Profile ready"
      : loadingSteps[step];

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main
      ref={mainRef}
      aria-live="polite"
      data-ready={completed}
      data-entering={entering}
      className={[
        "relative isolate flex min-h-screen",
        "flex-col overflow-hidden bg-[#020505] text-[#edf5f1]",
        "transition-[background] duration-900 ease-out",

        "bg-[radial-gradient(circle_at_50%_48%,rgba(20,201,138,0.075),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(87,169,255,0.035),transparent_38%)]",

        entering &&
          "bg-[radial-gradient(circle_at_50%_48%,rgba(20,201,138,0.16),transparent_30%)]",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          z-[-5]
          overflow-hidden
        "
      >
        {STAR_FIELD.map((star) => (
          <span
            key={star.id}
            className="
              absolute block
              rounded-full
              bg-[#d9fff0]
              animate-landing-star-twinkle
            "
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

      {/* =====================================================
          GRID
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          z-[-4]
          opacity-[0.22]

          bg-[linear-gradient(rgba(121,245,196,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(121,245,196,0.018)_1px,transparent_1px)]

          bg-size-[70px_70px]

          mask-[radial-gradient(ellipse_at_center,black_0%,rgba(0,0,0,0.5)_45%,transparent_80%)]
        "
      />

      {/* =====================================================
          AMBIENT
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[48%]
          z-[-3]

          h-130
          w-130

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-[radial-gradient(circle,rgba(20,201,138,0.11),rgba(20,201,138,0.025)_42%,transparent_72%)]

          blur-[20px]

          animate-landing-ambient-pulse
        "
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header
        className="
          absolute
          left-5
          right-5
          top-4.5
          z-5

          flex
          items-center
          justify-between

          min-[601px]:left-8
          min-[601px]:right-8
          min-[601px]:top-5.5
        "
      >
        <div
          className="
            flex
            items-center
            gap-2.25

            text-[8px]
            font-bold
            tracking-[0.16em]
            text-[#7d8c86]

            min-[601px]:text-[12px]
          "
        >
          <span
            aria-hidden="true"
            className="
              grid
              size-6
              place-items-center
              rounded-[7px]

              border
              border-[#79f5c4]/22

              bg-[#14c98a]/[0.035]

              font-mono
              text-[8px]
              text-[#79f5c4]
            "
          >
            &lt;/&gt;
          </span>

          <span>
            {personal.role}
          </span>
        </div>

        <div
          className="
            hidden
            font-mono
            text-[7px]
            tracking-[0.12em]

            min-[601px]:block
          "
        >
          SYS://
          {personal.location.replace(
            /\s+/g,
            "_"
          )}
        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <section
        aria-label="Loading portfolio"
        className="
          flex
          flex-1
          flex-col
          items-center
          justify-center

          px-5
          py-9
          md:py-4
          text-center

          min-[601px]:px-6
        "
      >
        {/* ===================================================
            TITLE

            IMPORTANT:
            The title is hidden using React state/props.

            Therefore a repaint or remount cannot bring it
            back while `isEntering` remains true.
        =================================================== */}

        <div
          data-title
          aria-hidden={entering}
          className={[
            "relative z-2",

            "transition-[opacity,transform,filter]",
            "duration-500",
            "ease-out",

            /*
             * HARD HIDE during launch.
             *
             * `hidden` removes the element from layout.
             * This is intentional here because the user
             * wants the title completely gone during launch.
             */
            entering &&
              "hidden",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div
            className={
              commonTextClassName
            }
          >
            <span className="mx-1.5">
              WELCOME TO
            </span>
          </div>

          <h1
            aria-label={`< ${personal.name} />`}
            className="
              flex
              min-h-9.5
              items-baseline
              justify-center
              whitespace-nowrap

              font-mono
              text-[21px]
              font-semibold
              leading-none
              tracking-[-0.06em]

              text-[#79f5c4]

              animate-landing-symbol-glow

              min-[381px]:min-h-10.5
              min-[381px]:text-[clamp(18px,8.8vw,32px)]

              min-[601px]:min-h-12
              min-[601px]:text-[clamp(32px,6.8vw,48px)]
            "
          >
            <span
              aria-hidden="true"
              className="
                shrink-0
                font-medium

                text-shadow-[0_0_12px_rgba(121,245,196,0.45),0_0_30px_rgba(20,201,138,0.2)]
              "
            >
              &lt;
            </span>

            <span className="font-semibold">
              {typedName}
            </span>

            <span
              aria-hidden="true"
              className="
                ml-px
                inline-block
                w-[0.52em]

                font-normal
                text-[#be9c5e]

                animate-landing-cursor
              "
            >
              _
            </span>

            <span
              aria-hidden="true"
              className="
                ml-0.75
                shrink-0
                font-medium

                text-shadow-[0_0_12px_rgba(121,245,196,0.45),0_0_30px_rgba(20,201,138,0.2)]
              "
            >
              /&gt;
            </span>
          </h1>

          <span
            className={`
              mx-auto
              mt-4.25
              max-w-135

              leading-[1.6]

              min-[381px]:text-[12px]

              min-[601px]:mt-5
              min-[601px]:leading-[1.7]

              ${commonTextClassName}
            `}
          >
            PORTFOLIO
          </span>
        </div>

        {/* ===================================================
            SPIRAL LOADER
        =================================================== */}

        <div
          ref={progressBarRef}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${statusText} — ${progress}%`}
          className="
            relative
            mt-6
            md:mt-4
            grid
            aspect-square
            place-items-center

            w-[min(235px,64vw)]

            min-[381px]:w-52.5
            min-[601px]:w-[clamp(250px,31vw,310px)]
          "
        >
          {/* OUTER GLOW */}

          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-[-18%]

              rounded-full

              bg-[radial-gradient(circle,rgba(20,201,138,0.16),rgba(20,201,138,0.035)_48%,transparent_72%)]

              blur-lg

              animate-landing-glow
            "
          />

          {/* =================================================
              SPIRALS
          ================================================= */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
            "
          >
            <svg
              viewBox="0 0 100 100"
              className="
                h-full
                w-full
                overflow-visible
              "
            >
              <defs>
                <filter
                  id="spiralGlow"
                  x="-80%"
                  y="-80%"
                  width="260%"
                  height="260%"
                >
                  <feGaussianBlur
                    stdDeviation="0.8"
                    result="blur"
                  />

                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter
                  id="spiralStrongGlow"
                  x="-100%"
                  y="-100%"
                  width="300%"
                  height="300%"
                >
                  <feGaussianBlur
                    stdDeviation="1.5"
                    result="blur"
                  />

                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="#79f5c4"
                strokeWidth="0.22"
                strokeOpacity="0.12"
                strokeDasharray="0.7 3"
              />

              <circle
                cx="50"
                cy="50"
                r="28"
                fill="none"
                stroke="#57a9ff"
                strokeWidth="0.18"
                strokeOpacity="0.1"
                strokeDasharray="0.6 3"
              />

              {spiralPaths.map(
                (spiral, index) => (
                  <path
                    key={spiral.id}
                    d={spiral.path}
                    fill="none"
                    stroke={spiral.color}
                    strokeWidth={spiral.width}
                    strokeOpacity={
                      spiral.opacity
                    }
                    strokeLinecap="round"
                    strokeDasharray={
                      spiral.dash
                    }
                    filter={
                      index === 0
                        ? "url(#spiralStrongGlow)"
                        : "url(#spiralGlow)"
                    }
                    className="landing-flow-spiral"
                    style={{
                      animationDuration:
                        `${spiral.duration}s`,
                      animationDelay:
                        spiral.delay,
                    }}
                  />
                )
              )}
            </svg>

            {/* PARTICLES */}

            {particles.map(
              (particle) => (
                <span
                  key={particle.id}
                  className={[
                    "absolute",
                    "rounded-full",
                    particle.position,
                    particle.size,
                    particle.className,
                  ]
                    .join(" ")}
                  style={{
                    backgroundColor:
                      particle.color,

                    boxShadow:
                      particle.shadow
                        .replace(
                          "shadow-[",
                          ""
                        )
                        .replace(
                          "]",
                          ""
                        ),
                  }}
                />
              )
            )}
          </div>

          {/* =================================================
              LABELS
          ================================================= */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0

              font-mono
              text-[5px]
              tracking-[0.18em]
              text-[#45534d]

              min-[601px]:text-[6px]
            "
          >
            {Object.entries(
              circleLabels
            ).map(
              ([key, text]) => {
                const positions = {
                  dev: `
                    absolute
                    left-1/2
                    top-0

                    -translate-x-1/2
                    -translate-y-1
                  `,

                  ui: `
                    absolute
                    right-0
                    top-1/2

                    translate-x-1
                    -translate-y-1/2
                  `,

                  code: `
                    absolute
                    bottom-0
                    left-1/2

                    -translate-x-1/2
                    translate-y-1
                  `,

                  build: `
                    absolute
                    left-0
                    top-1/2

                    -translate-x-1
                    -translate-y-1/2
                  `,
                };

                return (
                  <span
                    key={key}
                    className={
                      positions[key]
                    }
                  >
                    {text}
                  </span>
                );
              }
            )}
          </div>

          {/* =================================================
              CENTER BUTTON
          ================================================= */}

          <div
            role={
              completed &&
              !entering &&
              showEnter
                ? "button"
                : undefined
            }
            tabIndex={
              completed &&
              !entering &&
              showEnter
                ? 0
                : undefined
            }
            aria-label={
              completed &&
              !entering &&
              showEnter
                ? "Start portfolio"
                : undefined
            }
            aria-disabled={
              !completed ||
              entering ||
              !showEnter
            }
            onClick={
              handleCenterEnter
            }
            onKeyDown={(event) => {
              if (
                event.key ===
                  "Enter" ||
                event.key === " "
              ) {
                event.preventDefault();
                handleCenterEnter();
              }
            }}
            className={[
              "relative z-10",

              "flex aspect-square w-[56%]",
              "flex-col items-center justify-center",

              "overflow-hidden rounded-full",

              "border border-[#79d9bb]",

              "bg-[radial-gradient(circle_at_50%_45%,#07100c_0%,#020504_48%,#000_74%)]",

              "font-mono text-[12px]",

              "shadow-[0_0_0_8px_rgba(20,201,138,0.025),0_0_0_1px_rgba(0,0,0,0.8),inset_0_0_30px_rgba(0,0,0,0.95),0_0_40px_rgba(20,201,138,0.06)]",

              "animate-landing-core",

              "min-[601px]:text-[18px]",

              completed &&
                !entering &&
                showEnter &&
                "cursor-pointer",

              completed &&
                !entering &&
                showEnter &&
                "transition-[border-color,box-shadow,transform] duration-300 hover:border-[#79f5c4] hover:shadow-[0_0_0_8px_rgba(20,201,138,0.04),0_0_45px_rgba(20,201,138,0.18),inset_0_0_30px_rgba(0,0,0,0.95)]",

              completed &&
                !entering &&
                showEnter &&
                "active:scale-[0.98]",

              completed &&
                !entering &&
                showEnter &&
                "focus-visible:outline-2 focus-visible:outline-[#79f5c4]/70 focus-visible:outline-offset-4",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span
              aria-hidden="true"
              className="
                absolute
                inset-[13%]
                rounded-full
                border
                border-[#79f5c4]
                animate-landing-core-ring
              "
            />

            <span
              aria-hidden="true"
              className="
                absolute
                h-px
                w-[70%]

                bg-linear-to-r
                from-transparent
                via-[#79f5c4]/10
                to-transparent

                animate-landing-core-scan
              "
            />

            <div
              className="
                relative
                z-2

                flex
                items-center

                tracking-[0.03em]
                text-[#74847c]
              "
            >
              <span
                className="
                  mr-1
                  text-[#79f5c4]
                "
              >
                $
              </span>

              {!completed &&
                !entering && (
                  <span>
                    loading
                  </span>
                )}

              {completed &&
                !entering &&
                showEnter && (
                  <span>
                    start
                  </span>
                )}

              {entering && (
                <span>
                  launching
                </span>
              )}

              <span
                aria-hidden="true"
                className="
                  ml-px
                  text-[#79f5c4]
                  animate-landing-cursor
                "
              >
                _
              </span>
            </div>

            <span
              className="
                relative
                z-2
                mt-2

                text-[10px]
                tracking-[0.24em]
                text-[#8eac9f]
              "
            >
              {entering
                ? "LAUNCHING"
                : completed
                  ? "Click Here"
                  : ""}
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM
      ===================================================== */}

      <div
        className="
          mx-auto
          flex
          w-[calc(100%-40px)]

          flex-col
          items-center

          gap-3.75
          pb-12.5

          min-[601px]:w-[min(520px,calc(100%-40px))]
          min-[601px]:gap-4.5
          min-[601px]:pb-13.5
        "
      >
        <div className="w-full">
          <div
            className="
              relative
              h-0.75
              w-full
              overflow-hidden
              rounded-full
              bg-white/[0.07]
            "
          >
            <span
              ref={progressFillRef}
              style={{
                width: `${progress}%`,
              }}
              className="
                absolute
                left-0
                top-0

                block
                h-full

                rounded-full

                bg-linear-to-r
                from-[#087956]
                via-[#14c98a]
                to-[#79f5c4]

                shadow-[0_0_12px_rgba(20,201,138,0.55)]

                transition-[width]
                duration-200
                linear

                animate-landing-shimmer
              "
            />
          </div>

          <div
            className="
              mt-3

              flex
              items-center
              justify-start

              font-mono
              text-[9px]
              text-[#64736c]
            "
          >
            <span
              className="
                flex
                items-center
                gap-2
                text-2xl
              "
            >
              {glowDot}

              {statusText}

              {completed && (
                <span className="text-[#79f5c4]">
                  {" "}
                  — 100%
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
