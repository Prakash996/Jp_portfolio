import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
    { name: "Resume", href: "#resume" },
  ];

  return (
    <>
      {/* Menu Button */}
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        className="fixed right-6 top-6 z-[60] flex h-[50px] w-[50px] items-center justify-center rounded-full bg-slate-800/90 shadow-lg shadow-black/20 ring-0 ring-white/20 backdrop-blur-md transition-all duration-300 hover:ring-8 focus:outline-none focus:ring-4"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <span className="relative block h-5 w-6">
          {/* Top Line */}
          <span
            className={`absolute left-0 top-1/2 h-[2px] w-6 rounded-full bg-white transition-all duration-300 ${
              menuOpen
                ? "translate-y-0 rotate-45"
                : "-translate-y-[7px] rotate-0"
            }`}
          />

          {/* Middle Line */}
          <span
            className={`absolute left-0 top-1/2 h-[2px] w-6 rounded-full bg-white transition-all duration-200 ${
              menuOpen
                ? "scale-x-0 opacity-0"
                : "-translate-y-1/2 scale-x-100 opacity-100"
            }`}
          />

          {/* Bottom Line */}
          <span
            className={`absolute left-0 top-1/2 h-[2px] w-6 rounded-full bg-white transition-all duration-300 ${
              menuOpen
                ? "translate-y-0 -rotate-45"
                : "translate-y-[5px] rotate-0"
            }`}
          />
        </span>
      </button>

      {/* Menu Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-xl transition-all duration-500 ${
          menuOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        {/* Navigation */}
        <nav
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl"
          aria-label="Main navigation"
        >
          <ul className="space-y-2">
            {links.map((link, index) => (
              <li
                key={link.name}
                className={`transition-all duration-500 ${
                  menuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: menuOpen
                    ? `${index * 70}ms`
                    : "0ms",
                }}
              >
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between border-b border-white/10 py-4 text-4xl font-bold tracking-tight text-white transition-colors hover:text-orange-400 md:text-6xl"
                >
                  <span>{link.name}</span>

                  <span className="translate-x-0 text-2xl font-normal text-white/30 transition-all duration-300 group-hover:translate-x-2 group-hover:text-orange-400 md:text-3xl">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}