"use client";

const learnings = [
  {
    icon: "⚙️",
    title: "Logique système",
    description: "Comprendre comment les pièces s'assemblent. Penser en flux, en processus, en architecture.",
  },
  {
    icon: "🤖",
    title: "Automatisation",
    description: "n8n, webhooks, APIs. Créer des systèmes qui tournent sans supervision humaine constante.",
  },
  {
    icon: "🧠",
    title: "Intelligence artificielle",
    description: "Intégrer l'IA dans des workflows concrets. GPT, génération d'images, analyse de données.",
  },
  {
    icon: "🎯",
    title: "Discipline & rigueur",
    description: "Le trading m'a appris la patience, l'analyse méthodique et la gestion du risque.",
  },
  {
    icon: "💡",
    title: "Autonomie",
    description: "Apprendre par soi-même. Chercher, tester, échouer, itérer, réussir.",
  },
  {
    icon: "🎓",
    title: "Transmission",
    description: "Professeur et coach de break dance pendant des années. J'ai appris à enseigner, motiver et guider.",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen py-20 px-6 md:px-12 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Titre de section */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-300">
            Ce que j&apos;ai appris en construisant
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Mes compétences ne viennent pas seulement de cours — elles viennent de projets réels, d&apos;erreurs corrigées, et d&apos;expériences variées.
          </p>
        </div>

        {/* Grille de compétences */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learnings.map((learning, index) => (
            <div
              key={index}
              className="
                bg-white/5 backdrop-blur-sm
                border border-cyan-500/20
                rounded-xl p-6
                hover:bg-white/10 hover:border-cyan-500/40
                transition-all duration-300
                animate-slide-up
              "
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="text-4xl mb-4">{learning.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {learning.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {learning.description}
              </p>
            </div>
          ))}
        </div>

        {/* Section synthèse */}
        <div className="mt-16 p-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4 text-cyan-300">D&apos;où viennent ces compétences ?</h3>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Ces compétences ne sortent pas de nulle part. Elles sont le fruit d&apos;un parcours qui combine
              <span className="text-white font-semibold"> formation académique</span> (BUT TC en alternance),
              <span className="text-cyan-300 font-semibold"> expériences terrain</span> (animation, hip-hop, immersions professionnelles),
              et <span className="text-purple-300 font-semibold">constructions personnelles</span> (trading, automatisation, bots).
            </p>
            <p>
              J&apos;ai appris que la <span className="text-cyan-300">pédagogie</span> et le <span className="text-cyan-300">leadership</span> acquis
              en enseignant sont tout aussi importants que la <span className="text-white font-semibold">maîtrise technique</span>.
              L&apos;un sans l&apos;autre est incomplet.
            </p>
            <p className="text-center text-lg pt-4">
              <span className="text-cyan-300 font-semibold">→ Voir mon parcours détaillé dans la section chronologique ci-dessus</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
