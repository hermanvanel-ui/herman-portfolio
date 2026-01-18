"use client";

export default function Vision() {
  return (
    <section id="vision" className="min-h-screen py-20 px-6 md:px-12 flex items-center">
      <div className="max-w-5xl mx-auto">
        {/* Titre de section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-300">
            Ce que je veux construire demain
          </h2>
        </div>

        {/* Contenu de la vision */}
        <div className="space-y-8 text-lg md:text-xl text-gray-300 leading-relaxed">
          <p className="animate-slide-up">
            Je ne construis pas pour construire. <span className="text-white font-semibold">Je construis pour être libre.</span>
          </p>

          <p className="animate-slide-up animation-delay-200">
            Libre de choisir mes projets. Libre de travailler sur ce qui a du sens. Libre d&apos;expérimenter sans limites.
          </p>

          <p className="animate-slide-up animation-delay-400">
            La technologie n&apos;est pas une fin — c&apos;est un <span className="text-cyan-300 font-semibold">levier</span>. Un moyen de créer des systèmes qui fonctionnent, qui durent, qui servent.
          </p>

          <div className="my-12 p-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl animate-slide-up animation-delay-600">
            <p className="text-xl md:text-2xl text-cyan-300 font-semibold mb-4">
              Ma vision ?
            </p>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 text-2xl">→</span>
                <span>Créer des systèmes d&apos;automatisation qui simplifient le quotidien</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 text-2xl">→</span>
                <span>Exploiter l&apos;IA pour résoudre des problèmes concrets</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 text-2xl">→</span>
                <span>Construire des outils qui donnent du pouvoir aux autres</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400 text-2xl">→</span>
                <span>Rester curieux, apprendre en continu, expérimenter sans cesse</span>
              </li>
            </ul>
          </div>

          <p className="text-center text-2xl text-white font-semibold animate-slide-up animation-delay-800">
            Je ne suis pas en train de chercher un travail.<br />
            <span className="text-cyan-300">Je suis en train de construire mon futur.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
