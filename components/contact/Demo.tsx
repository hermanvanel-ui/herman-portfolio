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
    setResult("Automatisation en cours de connexion. Le webhook n8n sera bientôt actif ici.");
    setIsLoading(false);
  };

  return (
    <section id="demo" className="section-base" style={{ background: "linear-gradient(180deg, var(--bg), rgba(5,5,25,1))" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-16 reveal">
          <div className="section-label" style={{ color: "var(--green)" }}>// live demo</div>
          <h2 className="section-title">Testez mon <span style={{ color: "var(--cyan)", textShadow: "0 0 20px rgba(0,240,255,.3)" }}>automatisation</span></h2>
        </div>

        <div className="max-w-[700px] mx-auto">
          <div className="reveal reveal-delay-1 p-6 border border-[rgba(0,255,65,.1)] mb-8" style={{ background: "rgba(0,255,65,.02)" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: ".9rem", color: "#fff", letterSpacing: "1px", marginBottom: ".75rem" }}>Comment ça marche ?</h3>
            <p style={{ color: "var(--text-mid)", fontSize: ".9rem", marginBottom: ".75rem", fontWeight: 400 }}>
              Ce formulaire est connecté à un <span style={{ color: "var(--green)", fontWeight: 600 }}>workflow n8n automatisé</span> qui :
            </p>
            <ul className="space-y-1">
              {["Reçoit votre description via webhook", "Envoie la demande à une API d'IA (DALL-E / Stable Diffusion)", "Génère une image et vous la retourne", "Fonctionne 24/7 sans intervention manuelle"].map((s, i) => (
                <li key={i} className="flex items-center gap-3" style={{ color: "var(--text-mid)", fontSize: ".85rem", fontWeight: 400, padding: ".4rem 0" }}>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--green)", fontSize: ".7rem" }}>&gt;</span>{s}
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="reveal reveal-delay-2">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex : Un robot futuriste dans une ville cyberpunk au coucher de soleil"
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
                {isLoading ? "PROCESSING..." : "▶  LANCER L'AUTOMATISATION"}
              </span>
            </button>
          </form>

          {result && (
            <div className="mt-4 p-4 border border-[rgba(0,255,65,.2)]" style={{ background: "rgba(0,255,65,.04)" }}>
              <p style={{ color: "var(--green)", fontFamily: "var(--font-mono)", fontSize: ".85rem" }}>&gt; {result}_</p>
            </div>
          )}

          <div className="reveal reveal-delay-3 mt-8 p-6 border border-[rgba(180,74,255,.15)]" style={{ background: "rgba(180,74,255,.03)" }}>
            <h4 style={{ fontFamily: "var(--font-mono)", fontSize: ".8rem", color: "var(--purple)", letterSpacing: "1px", marginBottom: ".5rem" }}>// Architecture technique</h4>
            <p style={{ color: "var(--text-mid)", fontSize: ".8rem", lineHeight: 1.7, fontWeight: 400 }}>
              Cette fonctionnalité est prête à être connectée à un workflow n8n. Intégration APIs, webhooks, et interfaces réactives. Code structuré, extensible et maintenable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
