"use client";

const projects = [
  {
    title: "Trading algorithmique",
    subtitle: "La porte d'entrée vers les systèmes",
    description: "Le trading n'est pas une fin en soi, c'est un déclencheur. C'est là que j'ai découvert la rigueur des systèmes, la logique des algorithmes, et la puissance de l'automatisation.",
    tags: ["Python", "Algorithmes", "Analyse de données", "Discipline"],
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30",
  },
  {
    title: "Automatisations intelligentes",
    subtitle: "Des flux de travail qui travaillent pour moi",
    description: "J'utilise n8n pour créer des automatisations complexes : génération d'images par IA, traitement de données, intégrations multi-plateformes. Des systèmes qui tournent 24/7.",
    tags: ["n8n", "IA", "APIs", "Webhooks"],
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    title: "Bots & assistants autonomes",
    subtitle: "Des agents qui agissent",
    description: "Des bots qui répondent, analysent, décident. Des systèmes autonomes qui comprennent le contexte et exécutent des tâches sans intervention humaine.",
    tags: ["Bots", "Automatisation", "IA conversationnelle", "Systèmes autonomes"],
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-20 px-6 md:px-12 relative">
      <div className="max-w-6xl mx-auto">
        {/* Titre de section */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-300">
            Ce que je construis
          </h2>
          <p className="text-gray-400 text-lg">
            Des projets concrets qui démontrent ma vision
          </p>
        </div>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`
                bg-gradient-to-br ${project.color}
                backdrop-blur-sm
                border ${project.borderColor}
                rounded-2xl p-6
                hover:scale-105 transition-all duration-300
                hover:shadow-2xl hover:shadow-blue-500/20
                animate-slide-up
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-2xl font-bold mb-2 text-white">
                {project.title}
              </h3>
              <p className="text-cyan-300 text-sm font-medium mb-4">
                {project.subtitle}
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
