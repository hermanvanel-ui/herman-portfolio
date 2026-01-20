"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavigationProps {
  locale: string;
}

export default function Navigation({ locale }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('nav');

  const navItems = [
    { labelKey: "home", href: "/" },
    { labelKey: "portfolio", href: "/portfolio" },
    { labelKey: "about", href: "/about" },
    { labelKey: "contact", href: "/contact", highlight: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Nom */}
        <Link
          href={`/${locale}`}
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all"
        >
          Herman Vanel
        </Link>

        {/* Navigation desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className={`
                transition-all duration-300
                ${
                  item.highlight
                    ? "px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/50"
                    : "text-gray-300 hover:text-cyan-300"
                }
              `}
            >
              {t(item.labelKey)}
            </Link>
          ))}

          {/* Language Switcher */}
          <LanguageSwitcher currentLocale={locale} />
        </div>

        {/* Bouton menu mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-gray-300 hover:text-cyan-300 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-cyan-500/20">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  block py-2 transition-all
                  ${
                    item.highlight
                      ? "px-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-center"
                      : "text-gray-300 hover:text-cyan-300"
                  }
                `}
              >
                {t(item.labelKey)}
              </Link>
            ))}

            {/* Language Switcher Mobile */}
            <div className="pt-4 border-t border-cyan-500/20">
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
