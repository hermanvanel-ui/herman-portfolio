"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  {
    title: "Mes projets",
    desc: "Trading algo, automatisations n8n, bots IA — ce que je construis au quotidien.",
    href: "/portfolio",
    accent: "var(--cyan)",
    num: "01",
  },
  {
    title: "Mon parcours",
    desc: "De l'animation au trading, du BUT TC aux systèmes autonomes — chaque étape a compté.",
    href: "/about",
    accent: "var(--purple)",
    num: "02",
  },
  {
    title: "Contact & Demo",
    desc: "Testez mon automatisation en direct et échangeons sur vos projets.",
    href: "/contact",
    accent: "var(--green)",
    num: "03",
  },
];

export default function HomeNav() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "fr";

  return (
    <section className="section-base">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-16 reveal">
          <div className="section-label">// explorer</div>
          <h2 className="section-title">
            Découvrir{" "}
            <span style={{ color: "var(--cyan)", textShadow: "0 0 20px rgba(0,240,255,.3)" }}>
              mon univers
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((s, i) => (
            <Link
              key={i}
              href={`/${locale}${s.href}`}
              className={`holo-card reveal reveal-delay-${i + 1} block no-underline group transition-all duration-500 hover:scale-[1.02]`}
            >
              <div className="corner corner-tl" />
              <div className="corner corner-tr" />
              <div className="corner corner-bl" />
              <div className="corner corner-br" />
              <div
                className="absolute top-4 right-6 font-black opacity-15"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "3rem",
                  color: s.accent,
                  lineHeight: 1,
                }}
              >
                {s.num}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  color: "#fff",
                  marginBottom: ".75rem",
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  color: "var(--text-mid)",
                  fontSize: ".9rem",
                  lineHeight: 1.7,
                  fontWeight: 400,
                  marginBottom: "1.5rem",
                }}
              >
                {s.desc}
              </p>
              <div
                className="flex items-center gap-2 group-hover:gap-4 transition-all duration-300"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: ".75rem",
                  color: s.accent,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                }}
              >
                <span>Explorer</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
