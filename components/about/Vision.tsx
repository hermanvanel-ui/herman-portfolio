"use client";

import { useTranslations } from 'next-intl';

export default function Vision() {
  const t = useTranslations('vision');
  const goals = t.raw('goals') as string[];

  return (
    <section id="vision" className="min-h-screen py-20 px-6 md:px-12 flex items-center">
      <div className="max-w-5xl mx-auto">
        {/* Titre de section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-300">
            {t('title')}
          </h2>
        </div>

        {/* Contenu de la vision */}
        <div className="space-y-8 text-lg md:text-xl text-gray-300 leading-relaxed">
          <p className="animate-slide-up">
            {t('intro1')}<span className="text-white font-semibold">{t('intro1Bold')}</span>
          </p>

          <p className="animate-slide-up animation-delay-200">
            {t('intro2')}
          </p>

          <p className="animate-slide-up animation-delay-400">
            {t('intro3')}<span className="text-cyan-300 font-semibold">{t('intro3Bold')}</span>{t('intro3End')}
          </p>

          <div className="my-12 p-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl animate-slide-up animation-delay-600">
            <p className="text-xl md:text-2xl text-cyan-300 font-semibold mb-4">
              {t('myVision')}
            </p>
            <ul className="space-y-4 text-gray-300">
              {goals.map((goal, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-cyan-400 text-2xl">→</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-center text-2xl text-white font-semibold animate-slide-up animation-delay-800">
            {t('conclusion1')}<br />
            <span className="text-cyan-300">{t('conclusion2')}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
