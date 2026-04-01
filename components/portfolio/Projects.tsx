"use client";

const projects = [
  {
    title: "Expert Advisor MT5",
    sub: "Trading automatisé Forex & Gold",
    desc: "Je développe un bot de trading en MQL5 qui passe des ordres sur le Forex et le XAUUSD via MetaTrader 5. J'analyse les données de marché, je code des stratégies, je backteste, je corrige, je recommence. C'est encore en phase de développement, pas de résultats miraculeux à annoncer. Mais c'est comme ça que j'ai appris à raisonner en systèmes.",
    detail: "Le trading m'a appris quelque chose que les cours ne m'ont pas appris : la discipline. Quand ton argent est en jeu, tu ne codes pas n'importe comment. Tu testes, tu documentes, tu gères le risque. C'est ma porte d'entrée dans la programmation.",
    tags: ["MQL5", "Python", "MT5", "Forex", "XAUUSD"],
    num: "01",
    accent: "#ff6b35",
    glow: "rgba(255,107,53,.15)",
  },
  {
    title: "Workflows n8n",
    sub: "Automatisations qui tournent 24/7",
    desc: "J'utilise n8n pour connecter des services entre eux et automatiser des tâches : un workflow qui capte des ordres de trading sur Telegram et les relaye vers MT5, un générateur de planning pour Metricool qui crée du contenu social media automatiquement, des intégrations multi-plateformes avec webhooks.",
    detail: "L'idée c'est simple : si je fais la même chose plus de deux fois, je l'automatise. J'ai commencé par des trucs basiques (trier des mails, envoyer des notifs) et maintenant je connecte des APIs d'IA à des workflows complets.",
    tags: ["n8n", "Webhooks", "APIs", "Telegram", "Metricool"],
    num: "02",
    accent: "var(--cyan)",
    glow: "rgba(0,240,255,.1)",
  },
  {
    title: "Async Agency",
    sub: "Agence d'automatisation & agents IA",
    desc: "Avec mon associé, on monte Async Agency. L'idée : proposer deux types de services aux entreprises. Des automatisations simples pour les tâches répétitives (mails, tri de données, notifications). Et des agents IA autonomes, capables d'exécuter plusieurs actions à la suite à partir d'une seule demande.",
    detail: "On développe les solutions soit en code pur (Python, JavaScript, APIs), soit en no-code avec n8n selon le besoin du client. Le site de l'agence est mon premier vrai projet web. C'est aussi pour ça que ce portfolio existe : prouver que je sais faire.",
    tags: ["Agents IA", "Python", "JavaScript", "n8n", "No-code"],
    num: "03",
    accent: "var(--purple)",
    glow: "rgba(180,74,255,.1)",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-base">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-16 reveal">
          <div className="section-label">// projets</div>
          <h2 className="section-title">Ce que je <span style={{ color: "var(--cyan)", textShadow: "0 0 20px rgba(0,240,255,.3)" }}>construis</span></h2>
          <p className="mt-4" style={{ color: "var(--text-mid)", fontSize: "1.05rem", lineHeight: 1.7, fontWeight: 400, maxWidth: "700px" }}>
            Pas de projets scolaires ici. Ce sont des trucs que je fais parce que j&apos;en ai
            envie, le soir, le week-end, entre deux cours. Certains marchent, d&apos;autres pas encore.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={i} className={`project-card reveal reveal-delay-${i + 1} relative p-8 border border-[rgba(255,255,255,.05)] overflow-hidden transition-all duration-500 cursor-crosshair`}
              style={{ background: "var(--surface)", ["--card-accent" as string]: p.accent, ["--card-glow" as string]: p.glow }}>
              <div className="absolute top-4 right-6 font-black opacity-15" style={{ fontFamily: "var(--font-display)", fontSize: "3rem", color: p.accent, lineHeight: 1 }}>{p.num}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, letterSpacing: "1px", color: "#fff", marginBottom: ".5rem" }}>{p.title}</h3>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: ".7rem", color: p.accent, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "1rem" }}>{p.sub}</div>
              <p style={{ color: "var(--text-mid)", fontSize: ".9rem", lineHeight: 1.7, marginBottom: "1rem", fontWeight: 400 }}>{p.desc}</p>
              <p style={{ color: "var(--text-dim)", fontSize: ".85rem", lineHeight: 1.7, marginBottom: "1.25rem", fontWeight: 400, fontStyle: "italic" }}>{p.detail}</p>
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
