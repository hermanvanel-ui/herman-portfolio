"use client";

export default function CurrentStatus() {
  return (
    <section id="current" className="section-base">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-16 reveal">
          <div className="section-label">// situation actuelle</div>
          <h2 className="section-title">Où j&apos;en suis <span style={{ color: "var(--cyan)", textShadow: "0 0 20px rgba(0,240,255,.3)" }}>aujourd&apos;hui</span></h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="holo-card reveal reveal-delay-1">
            <div className="corner corner-tl" /><div className="corner corner-tr" /><div className="corner corner-bl" /><div className="corner corner-br" />
            <div className="text-4xl mb-4">🎓</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, letterSpacing: "1px", color: "#fff", marginBottom: "1rem" }}>Étudiant en BUT TC</h3>
            <p style={{ color: "var(--text-mid)", fontSize: "1rem", lineHeight: 1.8, fontWeight: 400 }}>
              Actuellement en <span style={{ color: "var(--cyan-bright)", fontWeight: 600 }}>3e année de BUT Techniques de Commercialisation</span>, en alternance. Vision structurée du business, compréhension du marché et compétences stratégiques.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="status-tag tag-cyan">Vision business</span>
              <span className="status-tag tag-cyan">Analyse stratégique</span>
              <span className="status-tag tag-cyan">Marketing</span>
            </div>
          </div>

          <div className="holo-card reveal reveal-delay-2">
            <div className="corner corner-tl" /><div className="corner corner-tr" /><div className="corner corner-bl" /><div className="corner corner-br" />
            <div className="text-4xl mb-4">🤖</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, letterSpacing: "1px", color: "#fff", marginBottom: "1rem" }}>Constructeur de systèmes</h3>
            <p style={{ color: "var(--text-mid)", fontSize: "1rem", lineHeight: 1.8, fontWeight: 400 }}>
              En parallèle, je construis. <span style={{ color: "var(--purple-bright)", fontWeight: 600 }}>Trading depuis 3 ans</span> pour la rigueur. <span style={{ color: "var(--purple-bright)", fontWeight: 600 }}>Automatisation et bots</span> pour créer des outils autonomes.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="status-tag tag-purple">Automatisation</span>
              <span className="status-tag tag-purple">Trading algo</span>
              <span className="status-tag tag-purple">Systèmes IA</span>
            </div>
          </div>
        </div>

        <div className="reveal reveal-delay-3 p-10 border border-[rgba(0,240,255,.15)] relative mb-12" style={{ background: "linear-gradient(135deg, rgba(0,240,255,.04), rgba(180,74,255,.04))" }}>
          <div className="absolute -top-px left-[20%] right-[20%] h-px" style={{ background: "linear-gradient(90deg, transparent, var(--cyan), var(--purple), transparent)" }} />
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", letterSpacing: "2px", color: "#fff", textAlign: "center", marginBottom: "2rem" }}>POURQUOI CE SITE REMPLACE UN CV</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl mb-3">📄→💻</div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: ".8rem", color: "var(--cyan)", letterSpacing: "1px", marginBottom: ".5rem" }}>VIVANT</h4>
              <p style={{ color: "var(--text-mid)", fontSize: ".85rem", lineHeight: 1.6, fontWeight: 400 }}>Un CV papier est figé. Ce site évolue et démontre ma capacité à créer.</p>
            </div>
            <div>
              <div className="text-2xl mb-3">🔬</div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: ".8rem", color: "var(--cyan)", letterSpacing: "1px", marginBottom: ".5rem" }}>TESTABLE</h4>
              <p style={{ color: "var(--text-mid)", fontSize: ".85rem", lineHeight: 1.6, fontWeight: 400 }}>Vous ne me croyez pas ? Testez mes automatisations directement ici.</p>
            </div>
            <div>
              <div className="text-2xl mb-3">🚀</div>
              <h4 style={{ fontFamily: "var(--font-display)", fontSize: ".8rem", color: "var(--cyan)", letterSpacing: "1px", marginBottom: ".5rem" }}>VISION</h4>
              <p style={{ color: "var(--text-mid)", fontSize: ".85rem", lineHeight: 1.6, fontWeight: 400 }}>Je ne cherche pas un poste. Je construis mon futur. Ce site en est la preuve.</p>
            </div>
          </div>
        </div>

        <div className="reveal reveal-delay-4 text-center text-lg leading-relaxed" style={{ color: "var(--text-mid)", fontWeight: 400, lineHeight: 2.2 }}>
          <span style={{ color: "#fff", fontWeight: 600 }}>Ma formation académique</span> me donne la structure business.<br />
          <span style={{ color: "var(--cyan)", fontWeight: 600 }}>Mes projets personnels</span> me donnent la maîtrise technique.<br />
          <span style={{ color: "#fff", fontWeight: 600 }}>Ensemble</span>, ils me préparent à créer des systèmes qui comptent.
        </div>
      </div>
    </section>
  );
}
