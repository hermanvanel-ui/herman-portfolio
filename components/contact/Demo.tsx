"use client";

import { useState } from "react";

export default function Demo() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // TODO: Connecter au webhook n8n
      // Pour l'instant, simulation
      await new Promise(resolve => setTimeout(resolve, 2000));

      setResult("🚀 Automatisation en cours de connexion. Le webhook n8n sera bientôt actif ici.");

      // Code pour la vraie connexion (à décommenter quand le webhook est prêt) :
      /*
      const response = await fetch('/api/automation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setResult(data.imageUrl || data.message);
      */
    } catch (err) {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="demo" className="min-h-screen py-20 px-6 md:px-12 flex items-center bg-gradient-to-b from-blue-950/10 to-purple-950/10">
      <div className="max-w-4xl mx-auto w-full">
        {/* Titre de section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-300 animate-glow">
            Testez mon automatisation
          </h2>
          <p className="text-gray-400 text-lg">
            Une démonstration concrète de mes compétences
          </p>
        </div>

        {/* Explication */}
        <div className="mb-8 p-6 bg-white/5 border border-cyan-500/30 rounded-xl">
          <h3 className="text-xl font-semibold mb-3 text-white">Comment ça marche ?</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            Ce formulaire est connecté à un <span className="text-cyan-300 font-semibold">workflow n8n automatisé</span> qui :
          </p>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Reçoit votre description via webhook</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Envoie la demande à une API d&apos;IA (ex: DALL-E ou Stable Diffusion)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Génère une image et vous la retourne</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400">•</span>
              <span>Fonctionne 24/7 sans intervention manuelle</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-gray-500 italic">
            Cette démo illustre ma capacité à créer des systèmes automatisés complets.
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="prompt" className="block text-lg font-medium text-gray-300 mb-3">
              Décrivez une image à générer :
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex : Un robot futuriste dans une ville cyberpunk au coucher de soleil"
              className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 min-h-[120px] resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 disabled:shadow-none"
          >
            {isLoading ? "Génération en cours..." : "🚀 Lancer l'automatisation"}
          </button>
        </form>

        {/* Résultat */}
        {result && (
          <div className="mt-8 p-6 bg-green-500/10 border border-green-500/30 rounded-xl animate-slide-up">
            <p className="text-green-300">{result}</p>
          </div>
        )}

        {/* Erreur */}
        {error && (
          <div className="mt-8 p-6 bg-red-500/10 border border-red-500/30 rounded-xl animate-slide-up">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Note technique */}
        <div className="mt-12 p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl">
          <h4 className="text-lg font-semibold text-purple-300 mb-3">💡 Architecture technique</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            Cette fonctionnalité est prête à être connectée à un workflow n8n. Elle démontre ma capacité à intégrer des APIs, gérer des webhooks, et créer des interfaces utilisateur réactives. Le code est structuré pour être facilement extensible et maintenable.
          </p>
        </div>
      </div>
    </section>
  );
}
