"use client";

const learnings = [
  { icon: "⚙️", title: "Pensée systémique", desc: "Comprendre comment les pièces s'assemblent. Du trading aux workflows, tout est un système." },
  { icon: "🔄", title: "Automatisation", desc: "Transformer des processus manuels en systèmes autonomes. n8n, APIs, webhooks." },
  { icon: "🧠", title: "IA & Machine Learning", desc: "Exploiter l'intelligence artificielle pour résoudre des problèmes concrets et créer des agents." },
  { icon: "💻", title: "Développement Web", desc: "Next.js, TypeScript, React, Tailwind. Des interfaces modernes et performantes." },
  { icon: "📊", title: "Analyse de données", desc: "Python, algorithmes, trading. Transformer des données en décisions." },
  { icon: "🚀", title: "Esprit builder", desc: "Apprendre en construisant. Chaque projet est une expérimentation." },
];

export default function Skills() {
  return (
    <section id="skills" className="section-base">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-16 reveal">
          <div className="section-label">// compétences</div>
          <h2 className="section-title">Ce que j&apos;ai <span style={{ color: "var(--cyan)", textShadow: "0 0 20px rgba(0,240,255,.3)" }}>appris</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learnings.map((l, i) => (
            <div key={i} className={`holo-card reveal reveal-delay-${Math.min(i + 1, 4)}`}>
              <div className="corner corner-tl" /><div className="corner corner-tr" /><div className="corner corner-bl" /><div className="corner corner-br" />
              <div className="text-3xl mb-4">{l.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: ".95rem", fontWeight: 600, letterSpacing: "1px", color: "#fff", marginBottom: ".75rem" }}>{l.title}</h3>
              <p style={{ color: "var(--text-mid)", fontSize: ".9rem", lineHeight: 1.7, fontWeight: 400 }}>{l.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
