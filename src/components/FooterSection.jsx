import React from "react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#020908] text-white">

      {/* =========================================================
          TOP BORDER
      ========================================================= */}
      <div className="absolute left-0 right-0 top-0 z-30 h-[1px] bg-[#10B981]/70 shadow-[0_0_12px_rgba(16,185,129,0.45)]" />

      {/* =========================================================
          BACKGROUND GRID
      ========================================================= */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(16,185,129,0.35) 1px, transparent 1px)
          `,
          backgroundSize: "7px 7px",
        }}
      />

      {/* =========================================================
          LARGE BACKGROUND GLOW
      ========================================================= */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#10B981]/[0.025] blur-[120px]" />

      {/* =========================================================
          TECHNICAL BACKGROUND LINES
      ========================================================= */}

      {/* Left diagonal */}
      <div className="pointer-events-none absolute left-[-5%] top-[65%] h-px w-[45%] rotate-[25deg] bg-gradient-to-r from-transparent via-[#10B981]/10 to-[#10B981]/30" />

      {/* Right diagonal */}
      <div className="pointer-events-none absolute right-[-5%] top-[58%] h-px w-[45%] rotate-[-32deg] bg-gradient-to-l from-transparent via-[#10B981]/10 to-[#10B981]/30" />

      {/* Bottom diagonal */}
      <div className="pointer-events-none absolute bottom-[5%] left-[15%] h-px w-[35%] rotate-[-20deg] bg-gradient-to-r from-transparent via-[#10B981]/10 to-transparent" />

      {/* =========================================================
          BACKGROUND NODES
      ========================================================= */}

      <span className="absolute left-[7%] top-[20%] h-[4px] w-[4px] rounded-full bg-[#10B981]/70 shadow-[0_0_8px_#10B981]" />

      <span className="absolute left-[17%] top-[72%] h-[3px] w-[3px] rounded-full bg-[#34D399]/60" />

      <span className="absolute right-[12%] top-[18%] h-[4px] w-[4px] rounded-full bg-[#10B981]/60 shadow-[0_0_8px_#10B981]" />

      <span className="absolute right-[22%] bottom-[23%] h-[3px] w-[3px] rounded-full bg-[#34D399]/50" />

      <span className="absolute right-[7%] bottom-[12%] h-[4px] w-[4px] rounded-full bg-[#10B981]/40" />

      {/* =========================================================
          CENTER NODE
      ========================================================= */}
      <div className="pointer-events-none absolute right-[18%] top-[48%]">
        <div className="absolute -inset-3 rounded-full border border-[#10B981]/20" />
        <div className="absolute -inset-1.5 rounded-full border border-[#10B981]/30" />
        <div className="h-2 w-2 rounded-full bg-[#10B981] shadow-[0_0_15px_#10B981]" />
      </div>

      {/* =========================================================
          MAIN FOOTER
      ========================================================= */}
      <div className="relative z-10 mx-auto max-w-6xl px-8 pb-8 pt-20">

        {/* =======================================================
            CENTER THANK YOU
        ======================================================= */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <h2
            className="
              select-none
              whitespace-nowrap
              text-[16vw]
              font-black
              uppercase
              leading-none
              tracking-[-0.09em]
              text-[#10B981]/[0.045]
            "
          >
            Thank You
          </h2>
        </div>

        {/* =======================================================
            CONTENT
        ======================================================= */}
        <div className="relative z-10 grid gap-14 md:grid-cols-2 lg:grid-cols-4">

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

            {/* Logo */}
            <h3 className="text-3xl font-bold tracking-tight text-[#F0FDF4]">
              YourBrand
              <span className="text-[#10B981]">.</span>
            </h3>

            {/* Description */}
            <p className="mt-5 max-w-[460px] text-sm leading-7 text-[#7C8985]">
              Creating meaningful digital experiences with thoughtful design,
              modern technology, and a little bit of creativity.
            </p>

            {/* Status */}
            <div className="mt-7 flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981]/50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
              </span>

              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#64756F]">
                Available for opportunities
              </span>
            </div>
          </div>

          {/* =====================================================
              EXPLORE
          ===================================================== */}
          <div>
            <h4 className="mb-6 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#10B981]">
              Explore
            </h4>

            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-sm text-[#7C8985] transition-all duration-200 hover:pl-1 hover:text-[#10B981]"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-[#7C8985] transition-all duration-200 hover:pl-1 hover:text-[#10B981]"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-[#7C8985] transition-all duration-200 hover:pl-1 hover:text-[#10B981]"
                >
                  Projects
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-sm text-[#7C8985] transition-all duration-200 hover:pl-1 hover:text-[#10B981]"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* =====================================================
              GET IN TOUCH
          ===================================================== */}
          <div>
            <h4 className="mb-6 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#10B981]">
              Get In Touch
            </h4>

            <div className="space-y-2 text-sm text-[#7C8985]">
              <p className="transition-colors hover:text-[#10B981]">
                hello@yourbrand.com
              </p>

              <p className="transition-colors hover:text-[#10B981]">
                +91 98765 43210
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-5">
              <a
                href="#"
                className="font-mono text-[10px] uppercase tracking-wider text-[#64756F] transition-colors hover:text-[#10B981]"
              >
                Instagram
              </a>

              <a
                href="#"
                className="font-mono text-[10px] uppercase tracking-wider text-[#64756F] transition-colors hover:text-[#10B981]"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* =======================================================
            DIVIDER
        ======================================================= */}
        <div className="relative z-10 mt-16 border-t border-[#10B981]/10" />

        {/* =======================================================
            BOTTOM BAR
        ======================================================= */}
        <div className="relative z-10 flex flex-col gap-4 pt-6 text-[10px] font-mono uppercase tracking-[0.12em] text-[#53615D] md:flex-row md:items-center md:justify-between">

          <p>
            © 2026 YourBrand. All rights reserved.
          </p>

          <div className="flex gap-7">
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
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#10B981]/40 to-transparent" />
    </footer>
  );
};

export default Footer;
