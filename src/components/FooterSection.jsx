import React from "react";

const Footer = () => {
  const exploreLinks = ["Home", "About", "Projects", "Contact"];

  return (
    <footer className="relative isolate w-full overflow-hidden bg-[#020908] text-white">

      {/* =========================================================
          TOP BORDER
      ========================================================= */}
      <div className="absolute left-0 right-0 top-0 z-30 h-px bg-[#10B981]/70 shadow-[0_0_14px_rgba(16,185,129,0.5)]" />

      {/* =========================================================
          BACKGROUND DOT GRID
      ========================================================= */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(16,185,129,0.38) 1px, transparent 1px)",
          backgroundSize: "7px 7px",
        }}
      />

      {/* =========================================================
          CENTER GLOW
      ========================================================= */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-0
          h-[350px]
          w-[75vw]
          max-w-[900px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#10B981]/[0.025]
          blur-[120px]
        "
      />

      {/* =========================================================
          DECORATIVE TECH LINES
      ========================================================= */}
      <div className="pointer-events-none absolute left-[-10%] top-[65%] z-0 h-px w-[45%] rotate-[25deg] bg-gradient-to-r from-transparent via-[#10B981]/10 to-[#10B981]/30" />

      <div className="pointer-events-none absolute right-[-10%] top-[58%] z-0 h-px w-[45%] rotate-[-32deg] bg-gradient-to-l from-transparent via-[#10B981]/10 to-[#10B981]/30" />

      <div className="pointer-events-none absolute bottom-[8%] left-[10%] z-0 h-px w-[35%] rotate-[-20deg] bg-gradient-to-r from-transparent via-[#10B981]/10 to-transparent" />

      {/* =========================================================
          DECORATIVE DOTS
      ========================================================= */}
      <span className="absolute left-[7%] top-[20%] z-0 h-1 w-1 rounded-full bg-[#10B981]/70 shadow-[0_0_8px_#10B981]" />

      <span className="absolute left-[17%] bottom-[20%] z-0 h-1 w-1 rounded-full bg-[#34D399]/50" />

      <span className="absolute right-[12%] top-[18%] z-0 h-1 w-1 rounded-full bg-[#10B981]/60 shadow-[0_0_8px_#10B981]" />

      <span className="absolute right-[22%] bottom-[23%] z-0 h-1 w-1 rounded-full bg-[#34D399]/50" />

      <span className="absolute right-[7%] bottom-[12%] z-0 h-1 w-1 rounded-full bg-[#10B981]/40" />

      {/* =========================================================
          TECH NODE
      ========================================================= */}
      <div className="pointer-events-none absolute right-[18%] top-[48%] z-0 hidden md:block">
        <div className="absolute -inset-3 rounded-full border border-[#10B981]/15" />
        <div className="absolute -inset-1.5 rounded-full border border-[#10B981]/25" />

        <div className="h-2 w-2 rounded-full bg-[#10B981] shadow-[0_0_15px_#10B981]" />
      </div>

      {/* =========================================================
          RESPONSIVE THANK YOU
          
          Mobile:
          Thank
          You

          sm+:
          Thank You
      ========================================================= */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-[1]
          flex
          items-center
          justify-center
          overflow-hidden
          px-4
        "
      >
        <h2
          className="
            select-none
            text-center
            font-black
            uppercase
            leading-[0.8]
            tracking-[-0.08em]
            text-[#10B981]/[0.045]

            text-[clamp(4rem,20vw,15rem)]
          "
        >
          <span className="block sm:inline">
            Thank
          </span>

          <span className="block sm:ml-[0.2em] sm:inline">
            You
          </span>
        </h2>
      </div>

      {/* =========================================================
          MAIN FOOTER CONTENT
      ========================================================= */}
      <div
        className="
          relative
          z-10
          mx-auto
          max-w-6xl
          px-6
          pb-8
          pt-20
          sm:px-8
          sm:pb-10
          sm:pt-24
        "
      >

        {/* =======================================================
            FOOTER GRID
        ======================================================= */}
        <div className="grid grid-cols-1 gap-12 sm:gap-14 md:grid-cols-2 lg:grid-cols-4">

          {/* =====================================================
              BRAND
          ===================================================== */}
          <div className="lg:col-span-2">

            {/* Label */}
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-[#10B981]">
                //
              </span>

              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#10B981]">
                Let's Connect
              </span>
            </div>

            {/* Brand */}
            <h3 className="text-2xl font-bold tracking-tight text-[#F0FDF4] sm:text-3xl">
              YourBrand
              <span className="text-[#10B981]">.</span>
            </h3>

            {/* Description */}
            <p className="mt-5 max-w-[460px] text-sm leading-7 text-[#7C8985]">
              Creating meaningful digital experiences with thoughtful design,
              modern technology, and a little bit of creativity.
            </p>

            {/* Availability */}
            <div className="mt-7 flex items-center gap-3">

              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981]/40" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
              </span>

              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#64756F]">
                Available for opportunities
              </span>

            </div>
          </div>

          {/* =====================================================
              EXPLORE
          ===================================================== */}
          <div>

            <h4 className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#10B981]">
              Explore
            </h4>

            <ul className="space-y-4">
              {exploreLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="
                      inline-block
                      text-sm
                      text-[#7C8985]
                      transition-all
                      duration-200
                      hover:translate-x-1
                      hover:text-[#10B981]
                    "
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

          </div>

          {/* =====================================================
              GET IN TOUCH
          ===================================================== */}
          <div>

            <h4 className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#10B981]">
              Get In Touch
            </h4>

            <div className="space-y-2 text-sm text-[#7C8985]">

              <a
                href="mailto:hello@yourbrand.com"
                className="block transition-colors hover:text-[#10B981]"
              >
                hello@yourbrand.com
              </a>

              <a
                href="tel:+919876543210"
                className="block transition-colors hover:text-[#10B981]"
              >
                +91 98765 43210
              </a>

            </div>

            {/* Social Links */}
            <div className="mt-6 flex flex-wrap gap-5">

              <a
                href="#"
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-wider
                  text-[#64756F]
                  transition-colors
                  hover:text-[#10B981]
                "
              >
                Instagram
              </a>

              <a
                href="#"
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-wider
                  text-[#64756F]
                  transition-colors
                  hover:text-[#10B981]
                "
              >
                LinkedIn
              </a>

              <a
                href="#"
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-wider
                  text-[#64756F]
                  transition-colors
                  hover:text-[#10B981]
                "
              >
                GitHub
              </a>

            </div>
          </div>
        </div>

        {/* =======================================================
            DIVIDER
        ======================================================= */}
        <div className="relative z-10 mt-14 border-t border-[#10B981]/10 sm:mt-16" />

        {/* =======================================================
            BOTTOM BAR
        ======================================================= */}
        <div
          className="
            relative
            z-10
            flex
            flex-col
            gap-4
            pt-6
            font-mono
            text-[9px]
            uppercase
            tracking-[0.12em]
            text-[#53615D]
            sm:text-[10px]
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <p>
            © 2026 YourBrand. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="transition-colors hover:text-[#10B981]"
            >
              Privacy
            </a>

            <a
              href="#"
              className="transition-colors hover:text-[#10B981]"
            >
              Terms
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM EMERALD LINE
      ========================================================= */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-px bg-gradient-to-r from-transparent via-[#10B981]/40 to-transparent" />

    </footer>
  );
};

export default Footer;
