import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  configureStore,
  createSlice,
} from "@reduxjs/toolkit";

import {
  Provider,
  useDispatch,
  useSelector,
} from "react-redux";

import "@/css/LayerComposition.css";

/* ================================================================== */
/* CONSTANTS                                                          */
/* ================================================================== */

const DEFAULT_COLOR = "#34D399";

const DEFAULT_LAYERS = [
  {
    title: "CODE",
    color: "#34D399",
  },
  {
    title: "DEV",
    color: "#10B981",
  },
  {
    title: "BUILD",
    color: "#059669",
  },
  {
    title: "UI",
    color: "#6EE7B7",
  },
];

/* ================================================================== */
/* REDUX                                                              */
/* ================================================================== */

const layerSlice = createSlice({
  name: "layers",

  initialState: {
    active: 0,
  },

  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
    },

    nextLayer: (state, action) => {
      const count = action.payload;

      if (count > 0) {
        state.active = (state.active + 1) % count;
      }
    },
  },
});

const {
  setActive,
  nextLayer,
} = layerSlice.actions;

const layerStore = configureStore({
  reducer: {
    layers: layerSlice.reducer,
  },
});

/* ================================================================== */
/* HELPERS                                                            */
/* ================================================================== */

function colorMix(
  color,
  percentage,
  fallback = "transparent"
) {
  return `color-mix(
    in srgb,
    ${color} ${percentage}%,
    ${fallback}
  )`;
}

function getLayerState(
  isActive,
  hovered
) {
  return {
    scale: isActive
      ? 1.045
      : hovered
        ? 1.035
        : 1,

    opacity: isActive
      ? 1
      : hovered
        ? 0.9
        : 0.58,
  };
}

function getLayerColors(
  color,
  isActive,
  hovered
) {
  return {
    cardBase: colorMix(
      color,
      isActive
        ? 15
        : hovered
          ? 11
          : 7,
      "#03130E"
    ),

    cardMid: colorMix(
      color,
      isActive
        ? 9
        : hovered
          ? 7
          : 4,
      "#020B08"
    ),

    cardDark: colorMix(
      color,
      isActive ? 5 : 2,
      "#010604"
    ),

    borderStrong: colorMix(
      color,
      isActive ? 72 : 48,
      "white"
    ),

    borderSoft: colorMix(
      color,
      hovered ? 42 : 25
    ),

    glowStrong: colorMix(
      color,
      isActive ? 34 : 22
    ),

    glowSoft: colorMix(
      color,
      hovered ? 20 : 9
    ),

    textGlow: colorMix(
      color,
      isActive ? 55 : 38
    ),
  };
}

/* ================================================================== */
/* LAYER                                                              */
/* ================================================================== */

const Layer = memo(function Layer({
  layer,
  index,
  offset,
  closedOffset,
  open,
  openOrder,
  stagger,
  duration,
  size,
  tilt,
  idle,
  reducedMotion,
  labels,
  layerCount,
}) {
  const dispatch = useDispatch();

  const isActive = useSelector(
    (state) =>
      state.layers.active === index
  );

  const [hovered, setHovered] =
    useState(false);

  const color =
    layer.color || DEFAULT_COLOR;

  /* ---------------------------------------------------------------- */
  /* EVENTS                                                           */
  /* ---------------------------------------------------------------- */

  const selectLayer = useCallback(() => {
    dispatch(setActive(index));
  }, [dispatch, index]);

  const handlePointerEnter =
    useCallback(() => {
      setHovered(true);
    }, []);

  const handlePointerLeave =
    useCallback(() => {
      setHovered(false);
    }, []);

  const handleFocus =
    useCallback(() => {
      setHovered(true);
    }, []);

  const handleBlur =
    useCallback(() => {
      setHovered(false);
    }, []);

  const handleKeyDown =
    useCallback(
      (event) => {
        const { key } = event;

        if (
          key === "Enter" ||
          key === " "
        ) {
          event.preventDefault();

          dispatch(
            setActive(index)
          );

          return;
        }

        if (layerCount <= 1) {
          return;
        }

        if (key === "ArrowDown") {
          event.preventDefault();

          dispatch(
            setActive(
              (index + 1) %
                layerCount
            )
          );

          return;
        }

        if (key === "ArrowUp") {
          event.preventDefault();

          dispatch(
            setActive(
              (index -
                1 +
                layerCount) %
                layerCount
            )
          );
        }
      },
      [
        dispatch,
        index,
        layerCount,
      ]
    );

  /* ---------------------------------------------------------------- */
  /* VISUAL STATE                                                     */
  /* ---------------------------------------------------------------- */

  const {
    scale,
    opacity,
  } = getLayerState(
    isActive,
    hovered
  );

  const zIndex =
    layerCount - index + 10;

  const delay = open
    ? openOrder * stagger
    : 0;

  /* ---------------------------------------------------------------- */
  /* COLORS                                                           */
  /* ---------------------------------------------------------------- */

  const {
    cardBase,
    cardMid,
    cardDark,
    borderStrong,
    borderSoft,
    glowStrong,
    glowSoft,
    textGlow,
  } = getLayerColors(
    color,
    isActive,
    hovered
  );

  const contentVisible =
    isActive || hovered;

  const gridOpacity = isActive
    ? 0.85
    : hovered
      ? 0.72
      : 0.55;

  const gridAlpha = isActive
    ? ".18"
    : hovered
      ? ".13"
      : ".08";

  /* ---------------------------------------------------------------- */
  /* RENDER                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div
      className="lc-layer-wrapper"
      style={{
        transform: `translate3d(
          0,
          ${open ? offset : closedOffset}px,
          0
        )`,

        transition: `
          transform
          ${duration}s
          cubic-bezier(.16,1,.3,1)
          ${delay}s
        `,

        zIndex,
      }}
    >
      <div
        className="lc-layer-target"
        role="button"
        tabIndex={0}
        aria-label={`Select ${layer.title}`}
        aria-pressed={isActive}
        onClick={selectLayer}
        onPointerEnter={
          handlePointerEnter
        }
        onPointerLeave={
          handlePointerLeave
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        style={{
          width: `${size}%`,

          transform: `
            translate3d(
              -50%,
              -50%,
              0
            )
            scale(${scale})
          `,
        }}
      >
        <div
          className="lc-float"
          style={{
            animation:
              idle &&
              !reducedMotion
                ? `
                  lcFloat
                  ${4 + index * 0.5}s
                  ease-in-out
                  ${index * 0.2}s
                  infinite
                `
                : "none",
          }}
        >
          <div
            className="lc-card"
            style={{
              opacity,

              background: `
                linear-gradient(
                  135deg,
                  ${cardBase},
                  ${cardMid} 48%,
                  ${cardDark}
                ) padding-box,

                linear-gradient(
                  135deg,
                  ${borderStrong},
                  ${color} 34%,
                  rgba(52,211,153,.18) 68%,
                  transparent 100%
                ) border-box
              `,

              transform: `
                rotateX(${tilt}deg)
                rotateZ(45deg)
                translateZ(
                  ${isActive ? 10 : 0}px
                )
              `,

              boxShadow:
                isActive
                  ? `
                    0 26px 65px
                      rgba(0,0,0,.62),

                    0 0 22px
                      ${glowStrong},

                    0 0 55px
                      ${glowSoft},

                    inset 0 1px 0
                      ${borderStrong},

                    inset 0 0 28px
                      rgba(16,185,129,.08)
                  `
                  : hovered
                    ? `
                      0 22px 52px
                        rgba(0,0,0,.55),

                      0 0 18px
                        ${glowSoft},

                      inset 0 1px 0
                        ${borderSoft}
                    `
                    : `
                      0 18px 42px
                        rgba(0,0,0,.48),

                      0 0 9px
                        ${glowSoft},

                      inset 0 1px 0
                        rgba(52,211,153,.16)
                    `,
            }}
          >
            {/* GRID */}

            <div
              className="lc-grid"
              style={{
                opacity:
                  gridOpacity,

                backgroundImage: `
                  linear-gradient(
                    rgba(
                      52,211,153,
                      ${gridAlpha}
                    ) 1px,
                    transparent 1px
                  ),

                  linear-gradient(
                    90deg,
                    rgba(
                      52,211,153,
                      ${gridAlpha}
                    ) 1px,
                    transparent 1px
                  )
                `,
              }}
            />

            {/* VIGNETTE */}

            <div
              className="lc-card-vignette"
              aria-hidden="true"
            />

            {/* COLOR WASH */}

            <div
              className="lc-color-wash"
              aria-hidden="true"
            />

            {/* CENTER GLOW */}

            <div
              className="lc-center-glow"
              aria-hidden="true"
              style={{
                background: `
                  radial-gradient(
                    circle,
                    rgba(
                      52,211,153,
                      ${
                        isActive
                          ? ".18"
                          : hovered
                            ? ".11"
                            : ".055"
                      }
                    ),
                    transparent 68%
                  )
                `,
              }}
            />

            {/* TOP EDGE */}

            <div
              className="lc-top-edge"
              aria-hidden="true"
              style={{
                background: `
                  linear-gradient(
                    90deg,
                    transparent,
                    ${colorMix(
                      color,
                      isActive
                        ? 100
                        : hovered
                          ? 70
                          : 38
                    )},
                    transparent
                  )
                `,

                boxShadow:
                  isActive
                    ? `0 0 8px ${color}`
                    : "none",
              }}
            />

            {/* TEXT */}

            <div
              className="
                lc-card-content
                font-mono
              "
              style={{
                opacity:
                  contentVisible
                    ? 1
                    : 0,

                visibility:
                  contentVisible
                    ? "visible"
                    : "hidden",
              }}
            >
              <div className="lc-card-content-inner">
                <div
                  className="
                    lc-title
                    font-mono
                  "
                  style={{
                    color:
                      "#FFFFFF",

                    textShadow:
                      isActive
                        ? `
                          0 1px 2px
                            rgba(0,0,0,.95),

                          0 0 9px
                            ${color},

                          0 0 24px
                            ${textGlow}
                        `
                        : `
                          0 1px 2px
                            rgba(0,0,0,.95),

                          0 0 7px
                            ${color},

                          0 0 15px
                            ${textGlow}
                        `,
                  }}
                >
                  {layer.title}
                </div>

                <div
                  className="lc-accent"
                  style={{
                    background: `
                      linear-gradient(
                        90deg,
                        transparent,
                        ${color},
                        rgba(167,243,208,.9),
                        ${color},
                        transparent
                      )
                    `,

                    boxShadow: `
                      0 0 8px
                        ${color},

                      0 0 16px
                        ${glowStrong}
                    `,
                  }}
                />
              </div>
            </div>

            {/* BOTTOM EDGE */}

            <div
              className="lc-bottom-edge"
              style={{
                background: `
                  linear-gradient(
                    90deg,
                    transparent,
                    ${colorMix(
                      color,
                      isActive
                        ? 45
                        : hovered
                          ? 30
                          : 15
                    )},
                    transparent
                  )
                `,
              }}
            />

            {/* SHIMMER */}

            {isActive &&
              !reducedMotion && (
                <div
                  className="lc-shimmer"
                  aria-hidden="true"
                />
              )}
          </div>

          {/* OPTIONAL LABEL */}

          {labels &&
            isActive && (
              <div
                className="
                  lc-label
                  font-mono
                "
                style={{
                  color:
                    "#FFFFFF",

                  textShadow:
                    `0 0 10px ${color}`,
                }}
              >
                {layer.title}
              </div>
            )}
        </div>
      </div>
    </div>
  );
});

/* ================================================================== */
/* LAYER STACK                                                        */
/* ================================================================== */

const LayerStack = memo(
  function LayerStack({
    layers,
    size,
    spacing,
    tilt,
    duration,
    stagger,
    open,
    openFrom,
    idle,
    reducedMotion,
    labels,
  }) {
    const geometry = useMemo(() => {
      const count =
        layers.length;

      const center =
        (count - 1) / 2;

      const closedOffset =
        openFrom === "bottom"
          ? center * spacing
          : openFrom === "top"
            ? -center * spacing
            : 0;

      return layers.map(
        (_, index) => {
          const offset =
            (index - center) *
            spacing;

          let openOrder;

          if (
            openFrom === "bottom"
          ) {
            openOrder =
              count - 1 - index;
          } else if (
            openFrom === "top"
          ) {
            openOrder = index;
          } else {
            openOrder =
              Math.abs(
                index - center
              );
          }

          return {
            offset,
            closedOffset,
            openOrder,
          };
        }
      );
    }, [
      layers,
      spacing,
      openFrom,
    ]);

    return (
      <div className="lc-stack">
        {layers.map(
          (layer, index) => {
            const {
              offset,
              closedOffset,
              openOrder,
            } = geometry[index];

            return (
              <Layer
                key={`${layer.title}-${index}`}
                layer={layer}
                index={index}
                offset={offset}
                closedOffset={
                  closedOffset
                }
                open={open}
                openOrder={
                  openOrder
                }
                stagger={stagger}
                duration={duration}
                size={size}
                tilt={tilt}
                idle={idle}
                reducedMotion={
                  reducedMotion
                }
                labels={labels}
                layerCount={
                  layers.length
                }
              />
            );
          }
        )}
      </div>
    );
  }
);

/* ================================================================== */
/* PROGRESS BUTTON                                                    */
/* ================================================================== */

const ProgressButton = memo(
  function ProgressButton({
    index,
    title,
    color,
  }) {
    const dispatch =
      useDispatch();

    const active =
      useSelector(
        (state) =>
          state.layers.active ===
          index
      );

    const handleClick =
      useCallback(() => {
        dispatch(
          setActive(index)
        );
      }, [
        dispatch,
        index,
      ]);

    return (
      <button
        type="button"
        role="tab"
        aria-label={`Show ${title}`}
        aria-selected={active}
        onClick={handleClick}
        className="
          lc-progress-button
        "
        style={{
          width:
            active ? 27 : 5,

          background:
            active
              ? `
                linear-gradient(
                  90deg,
                  ${color},
                  #A7F3D0
                )
              `
              : colorMix(
                  color,
                  28
                ),

          boxShadow:
            active
              ? `
                0 0 9px
                  ${color},

                0 0 17px
                  rgba(
                    52,211,153,.3
                  )
              `
              : "none",
        }}
      />
    );
  }
);

/* ================================================================== */
/* MAIN COMPONENT                                                     */
/* ================================================================== */

function LayerCompositionInner({
  layers = DEFAULT_LAYERS,

  size = 68,
  spacing = 70,
  tilt = 55,

  duration = 0.75,
  stagger = 0.08,

  autoTransition = true,
  transitionInterval = 2600,

  openFrom = "bottom",
  once = false,

  idle = true,
  glow = 0.3,
  labels = false,
}) {
  const wrapRef =
    useRef(null);

  const dispatch =
    useDispatch();

  const active =
    useSelector(
      (state) =>
        state.layers.active
    );

  const [open, setOpen] =
    useState(false);

  const [
    reducedMotion,
    setReducedMotion,
  ] = useState(false);

  const activeLayer =
    layers[active] ||
    layers[0];

  /* ---------------------------------------------------------------- */
  /* REDUCED MOTION                                                   */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const media =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      );

    const update = () => {
      setReducedMotion(
        media.matches
      );
    };

    update();

    media.addEventListener?.(
      "change",
      update
    );

    return () => {
      media.removeEventListener?.(
        "change",
        update
      );
    };
  }, []);

  /* ---------------------------------------------------------------- */
  /* INTERSECTION                                                     */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const element =
      wrapRef.current;

    if (!element) {
      return undefined;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting
          ) {
            setOpen(true);
          } else if (!once) {
            setOpen(false);
          }
        },
        {
          threshold: 0.15,
        }
      );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once]);

  /* ---------------------------------------------------------------- */
  /* AUTO TRANSITION                                                  */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (
      !autoTransition ||
      reducedMotion ||
      !open ||
      layers.length <= 1
    ) {
      return undefined;
    }

    const timer =
      window.setInterval(
        () => {
          dispatch(
            nextLayer(
              layers.length
            )
          );
        },
        transitionInterval
      );

    return () => {
      window.clearInterval(
        timer
      );
    };
  }, [
    autoTransition,
    reducedMotion,
    open,
    transitionInterval,
    layers.length,
    dispatch,
  ]);

  /* ---------------------------------------------------------------- */
  /* VALID ACTIVE INDEX                                               */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (
      active >= layers.length
    ) {
      dispatch(
        setActive(
          Math.max(
            0,
            layers.length - 1
          )
        )
      );
    }
  }, [
    active,
    layers.length,
    dispatch,
  ]);

  if (!layers.length) {
    return null;
  }

  const activeColor =
    activeLayer?.color ||
    DEFAULT_COLOR;

  return (
    <div
      ref={wrapRef}
      className="lc-composition"
    >
      {/* BACKGROUND GLOW */}

      {glow > 0 && (
        <div
          className="
            lc-background-glow
          "
          style={{
            opacity:
              open
                ? glow
                : glow * 0.35,

            animation:
              idle &&
              !reducedMotion
                ? "lcPulse 5s ease-in-out infinite"
                : "none",
          }}
        />
      )}

      {/* INNER LIGHT */}

      <div
        className="
          lc-inner-light
        "
      />

      {/* CENTER GUIDE */}

      <div
        className="
          lc-center-guide
        "
        style={{
          opacity:
            open ? 1 : 0,
        }}
      />

      {/* ACTIVE STATUS */}

      <div
        className="
          lc-active-status
        "
      >
        <span
          className="
            lc-status-dot
          "
          style={{
            background:
              activeColor,

            boxShadow:
              `0 0 10px ${activeColor}`,
          }}
        />

        ACTIVE /{" "}
        {activeLayer?.title}
      </div>

      {/* STACK */}

      <LayerStack
        layers={layers}
        size={size}
        spacing={spacing}
        tilt={tilt}
        duration={duration}
        stagger={stagger}
        open={open}
        openFrom={openFrom}
        idle={idle}
        reducedMotion={
          reducedMotion
        }
        labels={labels}
      />

      {/* HINT */}

      <div
        className={`
          lc-hint
          ${open ? "is-visible" : ""}
        `}
      >
        <span>
          HOVER TO EXPLORE
        </span>

        <span
          className="
            lc-hint-divider
          "
        />

        <span>
          CLICK TO SELECT
        </span>
      </div>

      {/* PROGRESS */}

      <div
        className="
          lc-status
        "
        role="tablist"
        aria-label="Layer selection"
      >
        {layers.map(
          (layer, index) => (
            <ProgressButton
              key={index}
              index={index}
              title={layer.title}
              color={
                layer.color ||
                DEFAULT_COLOR
              }
            />
          )
        )}
      </div>

      {/* COUNTER */}

      <div
        className="
          lc-counter
        "
      >
        {String(
          active + 1
        ).padStart(2, "0")}

        {" / "}

        {String(
          layers.length
        ).padStart(2, "0")}
      </div>
    </div>
  );
}

/* ================================================================== */
/* PUBLIC COMPONENT                                                   */
/* ================================================================== */

export default function LayerComposition(
  props
) {
  return (
    <Provider
      store={layerStore}
    >
      <LayerCompositionInner
        {...props}
      />
    </Provider>
  );
}

/* ================================================================== */
/* DEMO / HERO                                                        */
/* ================================================================== */

export function LayerCompositionDemo() {
  return (
    <section
      className="
        relative
        min-h-[680px]
        w-full
        overflow-hidden
        bg-[#010604]
        text-white
      "
    >
      {/* BACKGROUND GRID */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.07]
          bg-[linear-gradient(rgba(52,211,153,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,.22)_1px,transparent_1px)]
          bg-size-[44px_44px]
          mask-[radial-gradient(circle_at_center,black_0%,black_35%,transparent_74%)]
        "
      />

      {/* RADIAL */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(ellipse_at_50%_45%,rgba(16,185,129,.06),transparent_52%)]
        "
      />

      {/* VIGNETTE */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,.62)_100%)]
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          min-h-170
          w-full
          max-w-295
          grid-cols-1
          items-center
          gap-8
          px-6
          py-16
          md:grid-cols-[minmax(0,0.9fr)_minmax(520px,1.1fr)]
          md:gap-4
          md:px-10
          lg:px-12
        "
      >
        {/* LEFT CONTENT */}

        <div
          className="
            relative
            z-20
            flex
            max-w-125
            flex-col
            justify-center
            md:pb-2
          "
        >
          {/* EYEBROW */}

          <div
            className="
              mb-5
              flex
              items-center
              gap-2
              font-mono
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.24em]
              text-emerald-300/70
            "
          >
            <span
              className="
                h-1.25
                w-1.25
                rounded-full
                bg-emerald-400
                shadow-[0_0_9px_rgba(52,211,153,.9)]
              "
            />

            Technical Expertise
          </div>

          {/* HEADING */}

          <h1
            className="
              max-w-130
              font-mono
              text-[42px]
              font-bold
              leading-[0.94]
              tracking-[-0.075em]
              text-white
              sm:text-[50px]
              lg:text-[58px]
            "
          >
            Building with
            <br />

            <span
              className="
                text-emerald-400
                drop-shadow-[0_0_18px_rgba(52,211,153,.3)]
              "
            >
              modern
              <br />
              technology
            </span>.
          </h1>

          {/* DESCRIPTION */}
          <span
            aria-hidden="true"
            className="
              absolute
              -left-px
              top-0
              h-full
              w-px
              bg-linear-to-b
              from-emerald-400
              via-emerald-400/30
              to-transparent
            "
          />
            <p
              className="
                mt-5
                max-w-110
                font-mono
                text-[10px]
                leading-[1.7]
                tracking-[0.015em]
                text-emerald-50/45
              "
            >
              A curated stack of
              technologies I use to
              build scalable
              interfaces, desktop
              applications, and
              high-performance
              frontend experiences.
            </p>
          {/* STATS */}

          <div
            className="
              mt-8
              grid
              max-w-105
              grid-cols-3
              gap-2
            "
          >
            {[
              ["06+", "Years Exp."],
              ["29", "Technologies"],
              ["∞", "Projects"],
            ].map(
              ([value, label]) => (
                <div
                  key={label}
                  className="
                    rounded-md
                    border
                    border-emerald-400/10
                    bg-emerald-950/20
                    px-3
                    py-3
                  "
                >
                  <div
                    className="
                      font-mono
                      text-sm
                      font-bold
                      text-emerald-400
                    "
                  >
                    {value}
                  </div>

                  <div
                    className="
                      mt-1
                      font-mono
                      text-[6px]
                      uppercase
                      tracking-[0.14em]
                      text-emerald-100/30
                    "
                  >
                    {label}
                  </div>
                </div>
              )
            )}
          </div>

          {/* STATUS */}

          <div
            className="
              mt-6
              flex
              items-center
              gap-3
              font-mono
              text-[6px]
              uppercase
              tracking-[0.2em]
              text-emerald-100/25
            "
          >
            <span>
              Stack Status
            </span>

            <span
              className="
                h-px
                w-8
                bg-emerald-400/15
              "
            />

            <span
              className="
                text-emerald-400/70
              "
            >
              Operational
            </span>
          </div>
        </div>

        {/* RIGHT COMPOSITION */}

        <div
          className="
            relative
            flex
            min-h-[520px]
            w-full
            items-center
            justify-center
            md:min-h-[620px]
            md:justify-end
            lg:justify-center
          "
        >
          <div
            className="
              relative
              h-[540px]
              w-full
              max-w-[580px]
              md:h-[600px]
            "
          >
            <LayerComposition
              size={68}
              spacing={70}
              tilt={55}
              duration={0.75}
              stagger={0.08}
              autoTransition
              transitionInterval={2600}
              openFrom="bottom"
              once={false}
              idle
              glow={0.3}
              labels={false}
            />
          </div>
        </div>
      </div>

      {/* TOP LABEL */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-5
          z-30
          hidden
          -translate-x-1/2
          items-center
          gap-2
          whitespace-nowrap
          font-mono
          text-[7px]
          font-semibold
          uppercase
          tracking-[0.22em]
          text-emerald-200/25
          md:flex
        "
      >
        <span>
          Explore
        </span>

        <span
          className="
            text-emerald-400/60
          "
        >
          ↗
        </span>
      </div>

      {/* BOTTOM LABEL */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-3
          left-1/2
          z-30
          -translate-x-1/2
          whitespace-nowrap
          font-mono
          text-[6px]
          font-semibold
          uppercase
          tracking-[0.2em]
          text-emerald-100/15
        "
      >
        SYSTEM / 04
      </div>

      {/* DECORATIVE LINE */}

      <div
        className="
          pointer-events-none
          absolute
          bottom-3
          left-1/2
          hidden
          h-px
          w-[84%]
          -translate-x-1/2
          bg-emerald-400/10
          md:block
        "
      />
    </section>
  );
}
