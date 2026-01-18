"use client";

export default function CurrentStatus() {
  return (
    <section id="current" className="min-h-screen flex items-center py-20 px-6 md:px-12 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent">
      <div className="max-w-5xl mx-auto">
        {/* Titre de section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-300 animate-slide-up">
            Où j&apos;en suis aujourd&apos;hui
          </h2>
          <p className="text-gray-400 text-lg animate-slide-up animation-delay-200">
            Une vision claire de ma situation actuelle
          </p>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Formation académique */}
          <div className="p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl hover:border-cyan-500/50 transition-all animate-slide-up animation-delay-300">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Étudiant en BUT TC
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Actuellement en <span className="text-cyan-300 font-semibold">3e année de BUT Techniques de Commercialisation</span>,
              en alternance. Cette formation me donne une vision structurée du business, une compréhension du marché et des compétences stratégiques.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm border border-cyan-500/30">
                Vision business
              </span>
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm border border-cyan-500/30">
                Analyse stratégique
              </span>
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm border border-cyan-500/30">
                Marketing
              </span>
            </div>
          </div>

          {/* Constructions personnelles */}
          <div className="p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl hover:border-purple-500/50 transition-all animate-slide-up animation-delay-400">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Constructeur de systèmes
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              En parallèle, je construis. <span className="text-purple-300 font-semibold">Trading depuis 3 ans</span> pour comprendre
              les systèmes et la rigueur. <span className="text-purple-300 font-semibold">Automatisation et bots</span> pour créer
              des outils qui fonctionnent de manière autonome.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full text-sm border border-purple-500/30">
                Automatisation
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full text-sm border border-purple-500/30">
                Trading algo
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full text-sm border border-purple-500/30">
                Systèmes IA
              </span>
            </div>
          </div>
        </div>

        {/* Pourquoi ce site */}
        <div className="p-8 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/40 rounded-2xl animate-slide-up animation-delay-500">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            Pourquoi ce site remplace un CV classique
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">📄→💻</div>
              <h4 className="text-lg font-semibold text-cyan-300 mb-2">Vivant</h4>
              <p className="text-gray-400 text-sm">
                Un CV papier est figé. Ce site évolue, s'enrichit, démontre ma capacité à créer.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🔬</div>
              <h4 className="text-lg font-semibold text-cyan-300 mb-2">Testable</h4>
              <p className="text-gray-400 text-sm">
                Vous ne me croyez pas sur les automatisations ? Testez-les directement sur ce site.
              </p>
            </div>
            <div>
              <div className="text-3xl mb-2">🚀</div>
              <h4 className="text-lg font-semibold text-cyan-300 mb-2">Vision</h4>
              <p className="text-gray-400 text-sm">
                Je ne cherche pas un poste, je construis mon futur. Ce site en est la preuve.
              </p>
            </div>
          </div>
        </div>

        {/* Citation / Résumé */}
        <div className="mt-12 text-center animate-slide-up animation-delay-600">
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            <span className="text-white font-semibold">Ma formation académique</span> me donne la structure business.
            <br />
            <span className="text-cyan-300 font-semibold">Mes projets personnels</span> me donnent la maîtrise technique.
            <br />
            <span className="text-purple-300 font-semibold">Ensemble</span>, ils me préparent à créer des systèmes qui ont du sens.
          </p>
        </div>
      </div>
    </section>
  );
}
