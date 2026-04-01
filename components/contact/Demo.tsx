"use client";

import { useState } from "react";

export default function Demo() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setIsLoading(true);
    setResult(null);
    await new Promise((r) => setTimeout(r, 2000));
    setResult("Webhook n8n en cours de connexion. Cette démo sera bientôt fonctionnelle.");
    setIsLoading(false);
  };

  return (
    <section id="demo" className="section-base" style={{ background: "linear-gradient(180deg, var(--bg), rgba(5,5,25,1))" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-16 reveal">
          <div className="section-label" style={{ color: "var(--green)" }}>// demo</div>
          <h2 className="section-title">Tester <span style={{ color: "var(--cyan)", textShadow: "0 0 20px rgba(0,240,255,.3)" }}>en vrai</span></h2>
          <p className="mt-4" style={{ color: "var(--text-mid)", fontSize: "1.05rem", lineHeight: 1.7, fontWeight: 400, maxWidth: "700px" }}>
            Dire que je sais automatiser, c&apos;est facile. Le prouver, c&apos;est mieux.
            Ce formulaire est connecté à un workflow n8n qui tourne sur mon serveur.
          </p>
        </div>

        <div className="max-w-[700px] mx-auto">
          <div className="reveal reveal-delay-1 p-6 border border-[rgba(0,255,65,.1)] mb-8" style={{ background: "rgba(0,255,65,.02)" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: ".9rem", color: "#fff", letterSpacing: "1px", marginBottom: ".75rem" }}>Ce qui se passe quand vous cliquez</h3>
            <p style={{ color: "var(--text-mid)", fontSize: ".9rem", lineHeight: 1.8, fontWeight: 400 }}>
              Votre texte part en webhook vers mon instance n8n. Le workflow récupère
              la demande, l&apos;envoie à une API d&apos;IA pour générer une image,
              et vous renvoie le résultat. Pas de magie, juste des APIs qui se parlent
              et un workflow qui orchestre le tout. C&apos;est exactement le type de
              système que je construis pour Async Agency.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="reveal reveal-delay-2">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Décrivez une image (ex : un robot qui code dans un café à Nice)"
              required
              className="w-full p-5 min-h-[120px] resize-none outline-none transition-all duration-300 focus:border-[var(--cyan)] focus:shadow-[0_0_20px_rgba(0,240,255,.08),inset_0_0_20px_rgba(0,240,255,.02)]"
              style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(0,240,255,.15)", color: "var(--text)", fontFamily: "var(--font-body)", fontSize: "1rem", fontWeight: 400 }}
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="block w-full mt-4 p-4 uppercase tracking-[3px] transition-all duration-400 relative overflow-hidden group disabled:opacity-50"
              style={{ background: "transparent", color: "var(--cyan)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: ".85rem", border: "1px solid var(--cyan)", cursor: "pointer" }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: "linear-gradient(135deg, var(--cyan), var(--purple))", zIndex: -1 }} />
              <span className="group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,.5)]">
                {isLoading ? "EN COURS..." : "LANCER"}
              </span>
            </button>
          </form>

          {result && (
            <div className="mt-4 p-4 border border-[rgba(0,255,65,.2)]" style={{ background: "rgba(0,255,65,.04)" }}>
              <p style={{ color: "var(--green)", fontFamily: "var(--font-mono)", fontSize: ".85rem" }}>&gt; {result}_</p>
            </div>
          )}

          <div className="reveal reveal-delay-3 mt-8 p-6 border border-[rgba(180,74,255,.15)]" style={{ background: "rgba(180,74,255,.03)" }}>
            <h4 style={{ fontFamily: "var(--font-mono)", fontSize: ".8rem", color: "var(--purple)", letterSpacing: "1px", marginBottom: ".5rem" }}>// sous le capot</h4>
            <p style={{ color: "var(--text-mid)", fontSize: ".85rem", lineHeight: 1.7, fontWeight: 400 }}>
              Webhook n8n → traitement de la requête → appel API (DALL-E ou Stable Diffusion) → renvoi du résultat.
              Le code de ce site est sur <a href="https://github.com/hermanvanel-ui/herman-portfolio" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyan)", textDecoration: "underline" }}>GitHub</a>.
              Vous pouvez vérifier.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
