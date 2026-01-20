"use client";

import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden">
      {/* Effet de grille futuriste en arrière-plan */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center z-10 animate-fade-in">
        {/* Titre principal */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 animate-slide-up">
          {t('title')}
        </h1>

        {/* Sous-titre / Phrase fondatrice */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-slide-up animation-delay-200">
          {t('subtitle')}
        </p>

        {/* Présentation courte */}
        <div className="max-w-3xl mx-auto space-y-4 text-gray-400 text-lg md:text-xl animate-slide-up animation-delay-400">
          <p>{t('intro1')}</p>
          <p>{t('intro2')}</p>
          <p className="text-cyan-300 font-medium">{t('intro3')}</p>
        </div>

        {/* Flèche scroll down */}
        <div className="mt-16 animate-bounce">
          <a href="#projects" className="inline-block text-blue-400 hover:text-blue-300 transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
