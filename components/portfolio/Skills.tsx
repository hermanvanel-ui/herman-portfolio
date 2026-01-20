"use client";

import { useTranslations } from 'next-intl';

interface Skill {
  icon: string;
  title: string;
  description: string;
}

export default function Skills() {
  const t = useTranslations('skills');
  const skills = t.raw('items') as Skill[];

  return (
    <section id="skills" className="min-h-screen py-20 px-6 md:px-12 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Titre de section */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-300">
            {t('title')}
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Grille de compétences */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
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
              <div className="text-4xl mb-4">{skill.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {skill.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>

        {/* Section synthèse */}
        <div className="mt-16 p-8 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4 text-cyan-300">{t('origin.title')}</h3>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              {t('origin.paragraph1')}
            </p>
            <p>
              {t('origin.paragraph2')}
            </p>
            <p className="text-center text-lg pt-4">
              <span className="text-cyan-300 font-semibold">{t('origin.paragraph3')}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
