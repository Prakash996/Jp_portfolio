"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { House, FolderKanban, Sparkles, Mail, FileText } from "lucide-react";
import { setActiveSection } from "@/store/appSlice";

export default function Header() {
  const dispatch = useDispatch();
  const [showDock, setShowDock] = useState(false);
  const activeLink = useSelector((state) => state.app.activeSection);

  const links = [
    { name: "Home", href: "#home", icon: House },
    { name: "Projects", href: "#projects", icon: FolderKanban },
    { name: "Skills", href: "#skills", icon: Sparkles },
    { name: "Contact", href: "#contact", icon: Mail },
    { name: "Resume", href: "#resume", icon: FileText },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowDock(window.scrollY > 120);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (name) => {
    dispatch(setActiveSection(name));
  };

  return (
    <header className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${showDock ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"}`}>
      <nav aria-label="Main navigation" className="relative flex items-center gap-1 rounded-2xl border border-emerald-300/15 bg-[#071512]/75 p-1.5 shadow-[0_16px_50px_rgba(0,0,0,0.5),0_0_35px_rgba(16,185,129,0.08)] backdrop-blur-2xl backdrop-saturate-150">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute -left-10 top-0 h-px w-24 animate-[dockGlow_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-300/[0.06] via-transparent to-transparent" />
        </div>

        {links.map((link, index) => {
          const Icon = link.icon;
          const isActive = activeLink === link.name;

          return (
            <a
              key={link.name}
              href={link.href}
              onClick={() => handleNavigation(link.name)}
              aria-label={link.name}
              className={`group relative z-10 flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 sm:h-10 sm:w-10 ${isActive ? "bg-emerald-400 text-[#03100c] shadow-[0_0_20px_rgba(52,211,153,0.25)]" : "text-white/40 hover:bg-emerald-400/[0.08] hover:text-emerald-300"}`}
              style={{ transitionDelay: `${index * 25}ms` }}
            >
              <Icon size={15} strokeWidth={isActive ? 2.5 : 1.8} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105" />

              <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 translate-y-1 scale-90 whitespace-nowrap rounded-lg border border-emerald-300/15 bg-[#071512]/95 px-2.5 py-1.5 text-[10px] font-medium text-emerald-200 opacity-0 shadow-[0_8px_25px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-200 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                {link.name}
                <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-emerald-300/15 bg-[#071512]/95" />
              </span>

              {isActive && (
                <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,1)]" />
              )}
            </a>
          );
        })}

        <div className="mx-0.5 h-5 w-px bg-emerald-300/10" />

        <a
          href="#contact"
          onClick={() => handleNavigation("Contact")}
          aria-label="Let's talk"
          className="group relative z-10 flex h-9 w-9 items-center justify-center rounded-xl text-emerald-300 transition-all duration-300 hover:bg-emerald-400/[0.08] hover:text-emerald-200 sm:h-10 sm:w-10"
        >
          <Mail size={15} strokeWidth={1.8} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105" />

          <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 translate-y-1 scale-90 whitespace-nowrap rounded-lg border border-emerald-300/15 bg-[#071512]/95 px-2.5 py-1.5 text-[10px] font-medium text-emerald-200 opacity-0 shadow-[0_8px_25px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-200 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
            Let's talk
            <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-emerald-300/15 bg-[#071512]/95" />
          </span>
        </a>
      </nav>

      <div className="pointer-events-none absolute -bottom-3 left-1/2 h-5 w-3/4 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-xl" />
    </header>
  );
}
