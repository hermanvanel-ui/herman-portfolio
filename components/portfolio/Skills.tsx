"use client";

const tools = [
  { name: "Python", level: "Intermédiaire", context: "Scripts, automatisations, analyse de données" },
  { name: "JavaScript", level: "Intermédiaire", context: "Web, intégrations API, bots" },
  { name: "MQL5", level: "En apprentissage", context: "Expert Advisors sur MetaTrader 5" },
  { name: "n8n", level: "Avancé", context: "Workflows automatisés, webhooks, intégrations" },
  { name: "APIs REST", level: "Intermédiaire", context: "OpenAI, Telegram, Metricool, trading" },
  { name: "Next.js / React", level: "En apprentissage", context: "Ce site est construit avec" },
];

const soft = [
  { trait: "Persévérant", why: "15 ans de breakdance. On n'apprend pas un headspin en une semaine." },
  { trait: "Autonome", why: "Personne ne m'a dit d'apprendre Python. J'avais un bot à coder, j'ai appris." },
  { trait: "Leader naturel", why: "Délégué de classe pendant des années. Prof de break depuis 5 ans." },
  { trait: "Adaptable", why: "De l'animation enfants à la prospection B2B en passant par le trading algo." },
];

export default function Skills() {
  return (
    <section id="skills" className="section-base">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-16 reveal">
          <div className="section-label">// outils & compétences</div>
          <h2 className="section-title">Ce avec quoi je <span style={{ color: "var(--cyan)", textShadow: "0 0 20px rgba(0,240,255,.3)" }}>travaille</span></h2>
          <p className="mt-4" style={{ color: "var(--text-mid)", fontSize: "1.05rem", lineHeight: 1.7, fontWeight: 400, maxWidth: "700px" }}>
            Je ne suis pas développeur senior. Je suis quelqu&apos;un qui apprend vite et
            qui n&apos;a pas peur de casser des trucs pour comprendre comment ils marchent.
          </p>
        </div>

        {/* Outils techniques */}
        <div className="mb-16">
          <h3 className="reveal" style={{ fontFamily: "var(--font-display)", fontSize: ".85rem", letterSpacing: "2px", color: "var(--cyan)", marginBottom: "1.5rem" }}>TECHNIQUE</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((t, i) => (
              <div key={i} className={`reveal reveal-delay-${Math.min(i + 1, 4)} p-5 border border-[rgba(0,240,255,.08)] transition-all duration-300 hover:border-[rgba(0,240,255,.2)]`} style={{ background: "var(--surface)" }}>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ fontFamily: "var(--font-display)", fontSize: ".85rem", fontWeight: 600, color: "#fff" }}>{t.name}</span>
                  <span className="status-tag tag-cyan">{t.level}</span>
                </div>
                <p style={{ color: "var(--text-dim)", fontSize: ".8rem", lineHeight: 1.6, fontWeight: 400 }}>{t.context}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Soft skills avec preuves */}
        <div>
          <h3 className="reveal" style={{ fontFamily: "var(--font-display)", fontSize: ".85rem", letterSpacing: "2px", color: "var(--purple)", marginBottom: "1.5rem" }}>CE QUE LE CODE N&apos;APPREND PAS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {soft.map((s, i) => (
              <div key={i} className={`reveal reveal-delay-${Math.min(i + 1, 4)} p-5 border border-[rgba(180,74,255,.08)] transition-all duration-300 hover:border-[rgba(180,74,255,.2)]`} style={{ background: "var(--surface)" }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: ".85rem", fontWeight: 600, color: "#fff" }}>{s.trait}</span>
                <p style={{ color: "var(--text-dim)", fontSize: ".85rem", lineHeight: 1.6, fontWeight: 400, marginTop: ".5rem" }}>{s.why}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
