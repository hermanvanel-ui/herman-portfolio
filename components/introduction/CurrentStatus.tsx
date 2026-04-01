"use client";

export default function CurrentStatus() {
  return (
    <section id="current" className="section-base">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-16 reveal">
          <div className="section-label">// aujourd&apos;hui</div>
          <h2 className="section-title">Deux vies <span style={{ color: "var(--cyan)", textShadow: "0 0 20px rgba(0,240,255,.3)" }}>en parallèle</span></h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="holo-card reveal reveal-delay-1">
            <div className="corner corner-tl" /><div className="corner corner-tr" /><div className="corner corner-bl" /><div className="corner corner-br" />
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, letterSpacing: "1px", color: "#fff", marginBottom: "1rem" }}>Le jour : commerce & terrain</h3>
            <p style={{ color: "var(--text-mid)", fontSize: "1rem", lineHeight: 1.8, fontWeight: 400 }}>
              Je suis en 3e année de BUT Techniques de Commercialisation à l&apos;IUT de Nice.
              Mon alternance, c&apos;est chez <span style={{ color: "var(--cyan-bright)", fontWeight: 600 }}>PAAL</span>, une
              entreprise de menuiserie aluminium à Contes. Assistant marketing et commercial :
              prospection téléphonique, développement marketing, gestion des réseaux sociaux.
            </p>
            <p style={{ color: "var(--text-mid)", fontSize: ".95rem", lineHeight: 1.8, fontWeight: 400, marginTop: "1rem" }}>
              Ça m&apos;a appris à parler à des gens, à vendre, à comprendre comment une boîte
              fonctionne de l&apos;intérieur. C&apos;est pas du code, mais c&apos;est la base pour
              monter un business.
            </p>
          </div>

          <div className="holo-card reveal reveal-delay-2">
            <div className="corner corner-tl" /><div className="corner corner-tr" /><div className="corner corner-bl" /><div className="corner corner-br" />
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, letterSpacing: "1px", color: "#fff", marginBottom: "1rem" }}>Le soir : code & automatisation</h3>
            <p style={{ color: "var(--text-mid)", fontSize: "1rem", lineHeight: 1.8, fontWeight: 400 }}>
              En parallèle, je développe un <span style={{ color: "var(--purple-bright)", fontWeight: 600 }}>Expert Advisor en MQL5</span> pour
              trader le Forex et le Gold sur MT5. Je monte des workflows n8n pour automatiser tout
              ce qui peut l&apos;être. Et avec un associé, on construit <span style={{ color: "var(--purple-bright)", fontWeight: 600 }}>Async Agency</span>,
              une agence d&apos;automatisation et d&apos;agents IA pour entreprises.
            </p>
            <p style={{ color: "var(--text-mid)", fontSize: ".95rem", lineHeight: 1.8, fontWeight: 400, marginTop: "1rem" }}>
              Personne ne m&apos;a demandé d&apos;apprendre Python, JavaScript ou MQL5.
              Je l&apos;ai fait parce que j&apos;avais des problèmes à résoudre.
            </p>
          </div>
        </div>

        <div className="reveal reveal-delay-3 p-10 border border-[rgba(0,240,255,.15)] relative" style={{ background: "linear-gradient(135deg, rgba(0,240,255,.04), rgba(180,74,255,.04))" }}>
          <div className="absolute -top-px left-[20%] right-[20%] h-px" style={{ background: "linear-gradient(90deg, transparent, var(--cyan), var(--purple), transparent)" }} />
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", letterSpacing: "2px", color: "#fff", textAlign: "center", marginBottom: "2rem" }}>POURQUOI CE SITE ET PAS UN CV</h3>
          <p style={{ color: "var(--text-mid)", fontSize: "1rem", lineHeight: 1.9, fontWeight: 400, textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            Un CV tient sur une page et dit que je suis &quot;motivé et autonome&quot;. Tout le monde
            écrit ça. Ce site, c&apos;est différent : le code source est sur GitHub, la démo
            d&apos;automatisation fonctionne, et vous pouvez juger par vous-même si je sais
            coder ou pas. Je préfère montrer que raconter.
          </p>
        </div>
      </div>
    </section>
  );
}
