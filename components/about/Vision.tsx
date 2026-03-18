"use client";

export default function Vision() {
  const goals = [
    "Créer des systèmes d'automatisation qui simplifient le quotidien",
    "Exploiter l'IA pour résoudre des problèmes concrets",
    "Construire des outils qui donnent du pouvoir aux autres",
    "Rester curieux, apprendre en continu, expérimenter sans cesse",
  ];

  return (
    <section id="vision" className="section-base">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-16 reveal">
          <div className="section-label">// objectifs</div>
          <h2 className="section-title">Ce que je veux construire <span style={{ color: "var(--cyan)", textShadow: "0 0 20px rgba(0,240,255,.3)" }}>demain</span></h2>
        </div>

        <div className="reveal reveal-delay-1">
          <p className="max-w-[750px] mx-auto text-center text-xl leading-relaxed" style={{ color: "var(--text-mid)", fontWeight: 400 }}>
            Je ne construis pas pour construire. <span style={{ color: "#fff", fontWeight: 600 }}>Je construis pour être libre.</span>
          </p>
          <p className="max-w-[750px] mx-auto text-center text-xl leading-relaxed mt-6" style={{ color: "var(--text-mid)", fontWeight: 400 }}>
            Libre de choisir mes projets. Libre de travailler sur ce qui a du sens. Libre d&apos;expérimenter sans limites.
          </p>
          <p className="max-w-[750px] mx-auto text-center text-xl leading-relaxed mt-6" style={{ color: "var(--text-mid)", fontWeight: 400 }}>
            La technologie n&apos;est pas une fin — c&apos;est un <span style={{ color: "var(--cyan)", fontWeight: 500, textShadow: "0 0 10px rgba(0,240,255,.2)" }}>levier</span>. Un moyen de créer des systèmes qui fonctionnent, qui durent, qui servent.
          </p>
        </div>

        <div className="reveal reveal-delay-2 max-w-[750px] mx-auto mt-12 p-10 border border-[rgba(0,240,255,.15)] relative" style={{ background: "linear-gradient(135deg, rgba(0,240,255,.03), rgba(180,74,255,.03))" }}>
          <span className="absolute top-4 right-6" style={{ fontFamily: "var(--font-mono)", fontSize: ".7rem", color: "var(--text-faint)", letterSpacing: "2px" }}>//</span>
          <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--cyan)", letterSpacing: "2px", marginBottom: "1.5rem" }}>MA VISION</h4>
          <ul className="space-y-4">
            {goals.map((g, i) => (
              <li key={i} className="flex items-start gap-4 text-lg" style={{ color: "var(--text)", fontWeight: 300, lineHeight: 1.7 }}>
                <span style={{ color: "var(--green)", fontFamily: "var(--font-mono)", fontSize: "1rem", flexShrink: 0, marginTop: "2px" }}>&gt;</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal reveal-delay-3 text-center mt-16" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 700, letterSpacing: "2px", color: "#fff", lineHeight: 2 }}>
          Je ne cherche pas un travail.<br />
          <span style={{ color: "var(--cyan)", textShadow: "0 0 25px rgba(0,240,255,.4)" }}>Je construis mon futur.</span>
        </div>
      </div>
    </section>
  );
}
