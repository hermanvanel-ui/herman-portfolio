"use client";

import { useTranslations } from 'next-intl';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

const projectStyles = [
  { color: "from-orange-500/20 to-red-500/20", borderColor: "border-orange-500/30" },
  { color: "from-blue-500/20 to-cyan-500/20", borderColor: "border-blue-500/30" },
  { color: "from-purple-500/20 to-pink-500/20", borderColor: "border-purple-500/30" },
];

export default function Projects() {
  const t = useTranslations('projects');
  const projects = t.raw('items') as Project[];

  return (
    <section id="projects" className="min-h-screen py-20 px-6 md:px-12 relative">
      <div className="max-w-6xl mx-auto">
        {/* Titre de section */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-300">
            {t('title')}
          </h2>
          <p className="text-gray-400 text-lg">
            {t('subtitle')}
          </p>
        </div>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const style = projectStyles[index % projectStyles.length];
            return (
              <div
                key={index}
                className={`
                  bg-gradient-to-br ${style.color}
                  backdrop-blur-sm
                  border ${style.borderColor}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
