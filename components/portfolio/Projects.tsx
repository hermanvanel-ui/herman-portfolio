"use client";

const projects = [
  { title: "Trading algorithmique", sub: "La porte d'entrée vers les systèmes", desc: "C'est là que j'ai découvert la rigueur des systèmes, la logique des algorithmes, et la puissance de l'automatisation.", tags: ["Python", "Algorithmes", "Data"], num: "01", accent: "#ff6b35", glow: "rgba(255,107,53,.15)" },
  { title: "Automatisations intelligentes", sub: "Workflows qui travaillent pour moi", desc: "Workflows n8n complexes : génération d'images IA, traitement de données, intégrations multi-plateformes. Systèmes 24/7.", tags: ["n8n", "IA", "APIs", "Webhooks"], num: "02", accent: "var(--cyan)", glow: "rgba(0,240,255,.1)" },
  { title: "Bots & assistants autonomes", sub: "Des agents qui agissent", desc: "Des bots qui répondent, analysent, décident. Systèmes autonomes qui comprennent le contexte et exécutent sans intervention.", tags: ["Bots", "IA conversationnelle", "Autonomie"], num: "03", accent: "var(--purple)", glow: "rgba(180,74,255,.1)" },
];

export default function Projects() {
  return (
    <section id="projects" className="section-base">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-16 reveal">
          <div className="section-label">// portfolio</div>
          <h2 className="section-title">Ce que je <span style={{ color: "var(--cyan)", textShadow: "0 0 20px rgba(0,240,255,.3)" }}>construis</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={i} className={`project-card reveal reveal-delay-${i + 1} relative p-8 border border-[rgba(255,255,255,.05)] overflow-hidden transition-all duration-500 cursor-crosshair`}
              style={{ background: "var(--surface)", ["--card-accent" as string]: p.accent, ["--card-glow" as string]: p.glow }}>
              <div className="absolute top-4 right-6 font-black opacity-15" style={{ fontFamily: "var(--font-display)", fontSize: "3rem", color: p.accent, lineHeight: 1 }}>{p.num}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, letterSpacing: "1px", color: "#fff", marginBottom: ".5rem" }}>{p.title}</h3>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: ".7rem", color: p.accent, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>{p.sub}</div>
              <p style={{ color: "var(--text-mid)", fontSize: ".9rem", lineHeight: 1.7, marginBottom: "1.25rem", fontWeight: 400 }}>{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag, j) => (
                  <span key={j} className="status-tag" style={{ borderColor: `color-mix(in srgb, ${p.accent} 30%, transparent)`, color: p.accent, background: `color-mix(in srgb, ${p.accent} 8%, transparent)` }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
