"use client";

export default function Vision() {
  return (
    <section id="vision" className="section-base">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-16 reveal">
          <div className="section-label">// la suite</div>
          <h2 className="section-title">Où je <span style={{ color: "var(--cyan)", textShadow: "0 0 20px rgba(0,240,255,.3)" }}>vais</span></h2>
        </div>

        <div className="reveal reveal-delay-1 max-w-[750px] mx-auto">
          <p style={{ color: "var(--text-mid)", fontSize: "1.15rem", lineHeight: 1.9, fontWeight: 400 }}>
            Mon BUT TC se termine en 2025. La suite, c&apos;est <span style={{ color: "#fff", fontWeight: 600 }}>Epitech</span>,
            avec une spécialisation en intelligence artificielle. Je veux les compétences
            techniques qui me manquent encore pour construire ce que j&apos;ai en tête.
          </p>

          <p style={{ color: "var(--text-mid)", fontSize: "1.15rem", lineHeight: 1.9, fontWeight: 400, marginTop: "1.5rem" }}>
            En parallèle, je continue de développer <span style={{ color: "var(--cyan)", fontWeight: 500 }}>Async Agency</span> avec
            mon associé. On propose déjà des automatisations et des agents IA aux
            entreprises. L&apos;objectif à 5 ans : en vivre. Freelance, entrepreneur, ou
            les deux. Je ne sais pas encore quelle forme ça prendra exactement, et
            c&apos;est pas grave.
          </p>

          <p style={{ color: "var(--text-mid)", fontSize: "1.15rem", lineHeight: 1.9, fontWeight: 400, marginTop: "1.5rem" }}>
            Ce qui me motive, c&apos;est pas d&apos;avoir un titre sur une carte de visite.
            C&apos;est de pouvoir choisir sur quoi je travaille. De résoudre des vrais
            problèmes avec du code et de l&apos;automatisation. De construire des trucs
            qui tournent sans moi.
          </p>
        </div>

        <div className="reveal reveal-delay-2 max-w-[750px] mx-auto mt-12 p-10 border border-[rgba(0,240,255,.15)] relative" style={{ background: "linear-gradient(135deg, rgba(0,240,255,.03), rgba(180,74,255,.03))" }}>
          <span className="absolute top-4 right-6" style={{ fontFamily: "var(--font-mono)", fontSize: ".7rem", color: "var(--text-faint)", letterSpacing: "2px" }}>//</span>
          <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--cyan)", letterSpacing: "2px", marginBottom: "1.5rem" }}>CONCRÈTEMENT</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-4" style={{ color: "var(--text)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.7 }}>
              <span style={{ color: "var(--green)", fontFamily: "var(--font-mono)", fontSize: "1rem", flexShrink: 0, marginTop: "2px" }}>&gt;</span>
              <span>Intégrer Epitech en spécialisation IA (2025)</span>
            </div>
            <div className="flex items-start gap-4" style={{ color: "var(--text)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.7 }}>
              <span style={{ color: "var(--green)", fontFamily: "var(--font-mono)", fontSize: "1rem", flexShrink: 0, marginTop: "2px" }}>&gt;</span>
              <span>Développer Async Agency jusqu&apos;à en vivre</span>
            </div>
            <div className="flex items-start gap-4" style={{ color: "var(--text)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.7 }}>
              <span style={{ color: "var(--green)", fontFamily: "var(--font-mono)", fontSize: "1rem", flexShrink: 0, marginTop: "2px" }}>&gt;</span>
              <span>Devenir freelance ou entrepreneur dans l&apos;automatisation IA</span>
            </div>
            <div className="flex items-start gap-4" style={{ color: "var(--text)", fontSize: "1rem", fontWeight: 300, lineHeight: 1.7 }}>
              <span style={{ color: "var(--green)", fontFamily: "var(--font-mono)", fontSize: "1rem", flexShrink: 0, marginTop: "2px" }}>&gt;</span>
              <span>Continuer à apprendre en construisant, pas en regardant des tutos</span>
            </div>
          </div>
        </div>

        <div className="reveal reveal-delay-3 text-center mt-16" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", fontWeight: 700, letterSpacing: "2px", color: "#fff", lineHeight: 2 }}>
          Je ne cherche pas un poste.<br />
          <span style={{ color: "var(--cyan)", textShadow: "0 0 25px rgba(0,240,255,.4)" }}>Je construis ce qui va me permettre de ne plus en chercher.</span>
        </div>
      </div>
    </section>
  );
}
