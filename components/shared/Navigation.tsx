"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  locale: string;
}

export default function Navigation({ locale }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: "_accueil", href: `/${locale}` },
    { label: "_projets", href: `/${locale}/portfolio` },
    { label: "_à propos", href: `/${locale}/about` },
    { label: "_contact", href: `/${locale}/contact` },
  ];

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}`;
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] px-8 transition-all duration-400 ${
        scrolled || mobileOpen
          ? "bg-[rgba(5,5,16,.92)] backdrop-blur-[20px] border-b border-[rgba(0,240,255,.1)]"
          : ""
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[70px]">
        <Link href={`/${locale}`} className="no-underline">
          <div className="font-extrabold text-base tracking-[3px] uppercase" style={{ fontFamily: "var(--font-display)" }}>
            <span className="text-[var(--cyan)]" style={{ textShadow: "0 0 20px rgba(0,240,255,.5)" }}>
              HERMAN
            </span>
            <span className="text-[var(--green)]">.</span>
            <span className="text-[var(--cyan)]">DEV</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex list-none gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`no-underline text-xs tracking-[2px] uppercase transition-all duration-300 relative group ${
                  isActive(item.href) ? "text-[var(--cyan)]" : "text-[var(--text-dim)] hover:text-[var(--cyan)]"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan)] transition-all duration-300 ${
                  isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-px bg-[var(--cyan)] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
          <span className={`block w-6 h-px bg-[var(--cyan)] transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-[var(--cyan)] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden pb-6 px-4">
          <ul className="list-none flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`no-underline text-sm tracking-[2px] uppercase transition-all duration-300 ${
                    isActive(item.href) ? "text-[var(--cyan)]" : "text-[var(--text-dim)]"
                  }`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
