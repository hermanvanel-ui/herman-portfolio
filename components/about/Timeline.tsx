"use client";

import { useEffect, useRef } from "react";

const events = [
  { period: "Premières expériences", year: "2018-2020", title: "🎮 Animateur & Assistant", desc: "Animateur en centre de loisirs, assistant professeur de hip-hop. Premières responsabilités et contact humain.", skills: ["Communication", "Responsabilité", "Créativité"], side: "right" as const, highlight: false, future: false },
  { period: "Immersions pro", year: "2020-2022", title: "🏭 Stages & Bénévolat", desc: "Stages en industrie, bénévolat associatif. Découverte du monde professionnel et du travail d'équipe.", skills: ["Terrain", "Organisation", "Adaptabilité"], side: "left" as const, highlight: false, future: false },
  { period: "Formation actuelle", year: "2022-2025", title: "📚 BUT Techniques de Commercialisation", desc: "Alternance : vision business, analyse de marché, stratégie commerciale. Compétences transversales essentielles.", skills: ["Vision business", "Marché", "Stratégie"], side: "right" as const, highlight: true, future: false },
  { period: "Constructions perso", year: "2022-2025", title: "🤖 Trading & Automatisation", desc: "Trading algo depuis 3 ans. Développement de bots et workflows automatisés en parallèle de la formation.", skills: ["Systèmes", "Automatisation", "Rigueur"], side: "left" as const, highlight: true, future: false },
  { period: "Projection", year: "2025-2027", title: "🚀 Master IA & Développement", desc: "Master orienté intelligence artificielle et développement pour approfondir mes compétences techniques.", skills: ["IA", "Dev avancé", "Innovation"], side: "right" as const, highlight: false, future: true },
];

export default function Timeline() {
  const progressRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && progressRef.current) {
            progressRef.current.style.height = "100%";
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="section-base">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-16 reveal">
          <div className="section-label">// parcours</div>
          <h2 className="section-title">Chaque étape m&apos;a <span style={{ color: "var(--cyan)", textShadow: "0 0 20px rgba(0,240,255,.3)" }}>préparé</span></h2>
        </div>

        <div className="relative max-w-[900px] mx-auto">
          {/* Line */}
          <div className="absolute left-1/2 w-[2px] h-full -translate-x-1/2 md:block hidden">
            <div ref={progressRef} className="w-full h-0 transition-[height] duration-[2s] ease-out" style={{ background: "linear-gradient(to bottom, var(--cyan), var(--purple), var(--pink))", boxShadow: "0 0 15px rgba(0,240,255,.3)" }} />
          </div>

          {events.map((ev, i) => (
            <div key={i} className={`flex items-start mb-12 relative reveal reveal-delay-${Math.min(i + 1, 4)} ${ev.side === "left" ? "md:flex-row-reverse" : ""}`}>
              {/* Node */}
              <div className={`absolute left-1/2 -translate-x-1/2 z-[2] rounded-full hidden md:block transition-all duration-300 ${ev.highlight ? "w-5 h-5 shadow-[0_0_20px_var(--cyan)]" : "w-4 h-4 border-2"}`}
                style={{
                  top: "1.5rem",
                  background: ev.highlight ? "var(--cyan)" : ev.future ? "var(--bg)" : "var(--bg)",
                  borderColor: ev.future ? "var(--purple)" : ev.highlight ? "transparent" : "var(--cyan)",
                }}
              />

              {/* Content */}
              <div className={`md:w-[calc(50%-40px)] w-full p-6 transition-all duration-500 hover:border-[rgba(0,240,255,.3)] hover:shadow-[0_0_30px_rgba(0,240,255,.05)]`}
                style={{
                  background: ev.highlight ? "linear-gradient(135deg, rgba(0,240,255,.08), rgba(59,130,246,.08))" : ev.future ? "linear-gradient(135deg, rgba(180,74,255,.04), rgba(236,72,153,.04))" : "var(--surface)",
                  border: `1px solid ${ev.highlight ? "rgba(0,240,255,.3)" : ev.future ? "rgba(180,74,255,.2)" : "rgba(0,240,255,.1)"}`,
                  boxShadow: ev.highlight ? "0 0 20px rgba(0,240,255,.05)" : "none",
                }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: ".65rem", color: ev.future ? "var(--purple)" : "var(--cyan)", letterSpacing: "2px", textTransform: "uppercase" }}>{ev.period}</span>
                <span style={{ color: "var(--text-faint)", margin: "0 .5rem" }}>·</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: ".65rem", color: "var(--text-faint)" }}>{ev.year}</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: ".95rem", fontWeight: 600, letterSpacing: "1px", color: "#fff", margin: ".5rem 0" }}>{ev.title}</h3>
                <p style={{ color: "var(--text-mid)", fontSize: ".85rem", lineHeight: 1.7, fontWeight: 400, marginBottom: ".75rem" }}>{ev.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {ev.skills.map((s, j) => (
                    <span key={j} className="status-tag" style={{
                      fontFamily: "var(--font-mono)", fontSize: ".6rem", letterSpacing: "1px", textTransform: "uppercase",
                      border: `1px solid ${ev.future ? "rgba(180,74,255,.2)" : "rgba(0,240,255,.2)"}`,
                      color: ev.future ? "var(--purple)" : "var(--cyan)",
                      background: ev.future ? "rgba(180,74,255,.05)" : "rgba(0,240,255,.05)",
                    }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
