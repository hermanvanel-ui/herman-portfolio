"use client";

import { useEffect, useRef } from "react";

const events = [
  {
    period: "Les racines",
    year: "2005",
    title: "Né en Éthiopie, adopté à 2 ans",
    desc: "Je suis né en Éthiopie. J'ai été adopté à l'âge de 2 ans et j'ai grandi en France, dans le sud. C'est le point de départ de tout.",
    skills: [],
    side: "right" as const,
    highlight: false,
    future: false,
  },
  {
    period: "La danse",
    year: "~2011 → aujourd'hui",
    title: "15 ans de breakdance",
    desc: "J'ai commencé le break vers 6 ans. Ça fait 15 ans que je pratique. Depuis 5-6 ans, j'enseigne. J'ai donné des cours dans une école de danse à Menton pendant un an, et aujourd'hui j'enseigne à Nice avec mon professeur. Créer des spectacles, gérer un groupe, transmettre une technique : c'est là que j'ai appris le leadership.",
    skills: ["Discipline", "Transmission", "Créativité"],
    side: "left" as const,
    highlight: false,
    future: false,
  },
  {
    period: "Premières expériences",
    year: "2020 — 2022",
    title: "Animation, bénévolat, industrie",
    desc: "Animateur au collège Nazareth auprès d'enfants. Bénévole en épicerie solidaire (caisse, stock, accueil). Stage d'immersion chez MEI Industries pour découvrir la production et la conception industrielle. J'ai aussi passé mon BAFA avec la qualification surveillant de baignade.",
    skills: ["BAFA", "Terrain", "Adaptabilité"],
    side: "right" as const,
    highlight: false,
    future: false,
  },
  {
    period: "Formation actuelle",
    year: "2022 — 2025",
    title: "BUT TC à l'IUT de Nice + alternance chez PAAL",
    desc: "Trois ans de formation en Techniques de Commercialisation. Mon alternance chez PAAL (menuiserie aluminium, Contes) : prospection téléphonique, marketing, gestion des réseaux sociaux. C'est la partie commerce et business de mon profil. C'est aussi pendant cette période que j'ai commencé le trading et la programmation, seul, en dehors des cours.",
    skills: ["Marketing", "Prospection", "Réseaux sociaux"],
    side: "left" as const,
    highlight: true,
    future: false,
  },
  {
    period: "En parallèle",
    year: "2022 — 2025",
    title: "Trading algo, n8n, Async Agency",
    desc: "Trading sur Forex et Gold (XAUUSD), développement d'un Expert Advisor en MQL5, premiers workflows n8n, premiers agents IA. Lancement d'Async Agency avec un associé. Tout ça en parallèle de la formation et de l'alternance.",
    skills: ["MQL5", "Python", "n8n", "JavaScript"],
    side: "right" as const,
    highlight: true,
    future: false,
  },
  {
    period: "Prochain objectif",
    year: "2025 — 2027",
    title: "Epitech, spécialisation IA",
    desc: "Je vise Epitech pour approfondir l'IA et le développement. Ce portfolio fait partie de ma candidature. L'objectif : avoir les compétences techniques pour faire tourner Async Agency et vivre de mes projets.",
    skills: ["IA", "Développement", "Epitech"],
    side: "left" as const,
    highlight: false,
    future: true,
  },
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
          <h2 className="section-title">D&apos;où je <span style={{ color: "var(--cyan)", textShadow: "0 0 20px rgba(0,240,255,.3)" }}>viens</span></h2>
          <p className="mt-4" style={{ color: "var(--text-mid)", fontSize: "1.05rem", lineHeight: 1.7, fontWeight: 400, maxWidth: "700px" }}>
            Mon parcours n&apos;est pas linéaire. Animation, break dance, commerce, trading, code.
            Ça a l&apos;air décousu, mais chaque étape m&apos;a apporté quelque chose que la suivante
            a utilisé.
          </p>
        </div>

        <div className="relative max-w-[900px] mx-auto">
          <div className="absolute left-1/2 w-[2px] h-full -translate-x-1/2 md:block hidden">
            <div ref={progressRef} className="w-full h-0 transition-[height] duration-[2s] ease-out" style={{ background: "linear-gradient(to bottom, var(--cyan), var(--purple), var(--pink))", boxShadow: "0 0 15px rgba(0,240,255,.3)" }} />
          </div>

          {events.map((ev, i) => (
            <div key={i} className={`flex items-start mb-12 relative reveal reveal-delay-${Math.min(i + 1, 4)} ${ev.side === "left" ? "md:flex-row-reverse" : ""}`}>
              <div className={`absolute left-1/2 -translate-x-1/2 z-[2] rounded-full hidden md:block transition-all duration-300 ${ev.highlight ? "w-5 h-5 shadow-[0_0_20px_var(--cyan)]" : "w-4 h-4 border-2"}`}
                style={{
                  top: "1.5rem",
                  background: ev.highlight ? "var(--cyan)" : "var(--bg)",
                  borderColor: ev.future ? "var(--purple)" : ev.highlight ? "transparent" : "var(--cyan)",
                }}
              />

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
                {ev.skills.length > 0 && (
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
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
