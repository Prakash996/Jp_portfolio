import {mobile} from '@/data/personDetails.json'

const Footer = () => {
  const exploreLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Resume", href: "#resume" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer
      className="
        relative isolate w-full overflow-hidden
        bg-[#020908] text-white
      "
    >
      {/* Top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-emerald-500/60" />

      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(16,185,129,0.8) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* Soft emerald glow */}
      <div
        className="
          pointer-events-none absolute
          left-1/2 top-1/2
          h-80 w-150
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-emerald-500/[0.035]
          blur-[120px]
        "
      />

      {/* Decorative glow dots */}
      <span className="absolute left-[8%] top-[25%] h-1 w-1 rounded-full bg-emerald-400/60 shadow-[0_0_10px_#10B981]" />
      <span className="absolute right-[10%] top-[30%] h-1 w-1 rounded-full bg-emerald-400/50" />
      <span className="absolute right-[20%] bottom-[20%] h-1 w-1 rounded-full bg-emerald-400/40" />

      {/* Large background text */}
      <div
        className="
          pointer-events-none absolute inset-0
          flex items-center justify-center
          overflow-hidden
        "
      >
        <span
          className="
            select-none whitespace-nowrap
            text-[clamp(5rem,17vw,14rem)]
            font-black uppercase
            leading-none tracking-[-0.09em]
            text-emerald-500/[0.035]
          "
        >
          Thank You
        </span>
      </div>

      {/* Main content */}
      <div
        className="
          relative z-10 mx-auto max-w-6xl
          px-5 py-14
          sm:px-8 sm:py-16
          lg:px-10 lg:py-20
        "
      >
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <span className="font-mono text-xs text-emerald-500">
                //
              </span>

              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-500">
                Let's Connect
              </span>
            </div>

            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-500">
              Frontend developer focus on building clean, responsive and user-friendly web application.
            </p>

            {/* Availability */}
            <div className="mt-6 inline-flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
              </span>

              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">
                Open to opportunities
              </span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500">
              Explore
            </h4>

            <nav>
              <ul className="space-y-3">
                {exploreLinks.map((item) => (
                  <li key={item.name}>
                    <span
                      className="
                        group inline-flex items-center gap-2
                        text-sm text-zinc-500
                        transition-all duration-200
                        hover:text-emerald-400
                      "
                    >
                      <span
                        className="
                          h-px w-0
                          bg-emerald-500
                          transition-all duration-200
                          group-hover:w-3
                        "
                      />
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500">
              Get In Touch
            </h4>

            <div className="space-y-3">
              <a
                href="mailto:jakkula28@gmail.com"
                className="
                  block break-all text-sm text-zinc-500
                  transition-colors
                  hover:text-emerald-400
                "
              >
                jakkula28@gmail.com
              </a>

              <a
                href={`tel: ${mobile}`}
                className="
                  block text-sm text-zinc-500
                  transition-colors
                  hover:text-emerald-400
                "
              >
                {mobile}
              </a>
            </div>

            {/* Socials */}
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {["GitHub", "LinkedIn", "Instagram"].map((social) => (
                <span
                  key={social}
                  className="
                    font-mono text-[9px]
                    uppercase tracking-[0.12em]
                    text-zinc-600
                    transition-colors
                    hover:text-emerald-400
                  "
                >
                  {social}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px bg-emerald-500/10 sm:mt-14" />

        {/* Bottom */}
        <div
          className="
            flex flex-col gap-4
            pt-5
            font-mono text-[9px]
            uppercase tracking-[0.1em]
            text-zinc-700
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <p>© 2026. All rights reserved.</p>

          <div className="flex gap-5">
              Built with <span className="text-emerald-500">React, Tailwind</span>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className="
          absolute bottom-0 left-0 right-0 h-px
          bg-linear-to-r
          from-transparent
          via-emerald-500/40
          to-transparent
        "
      />
    </footer>
  );
};

export default Footer;
