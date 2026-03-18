"use client";

import { useState, useEffect } from "react";

interface NavigationProps {
  locale: string;
}

const navItems = [
  { label: "_accueil", href: "#hero" },
  { label: "_aujourd'hui", href: "#current" },
  { label: "_projets", href: "#projects" },
  { label: "_parcours", href: "#timeline" },
  { label: "_vision", href: "#vision" },
  { label: "_demo", href: "#demo" },
];

export default function Navigation({ locale }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] px-8 transition-all duration-400 ${
        scrolled
          ? "bg-[rgba(5,5,16,.92)] backdrop-blur-[20px] border-b border-[rgba(0,240,255,.1)]"
          : ""
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[70px]">
        <div className="font-[var(--font-display)] font-extrabold text-base tracking-[3px] uppercase" style={{ fontFamily: "var(--font-display)" }}>
          <span className="text-[var(--cyan)]" style={{ textShadow: "0 0 20px rgba(0,240,255,.5)" }}>
            HERMAN
          </span>
          <span className="text-[var(--green)]">.</span>
          <span className="text-[var(--cyan)]">DEV</span>
        </div>
        <ul className="hidden md:flex list-none gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-[var(--text-dim)] no-underline text-xs tracking-[2px] uppercase transition-all duration-300 relative hover:text-[var(--cyan)] group"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan)] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
