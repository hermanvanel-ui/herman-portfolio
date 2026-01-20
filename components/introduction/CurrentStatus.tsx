"use client";

import { useTranslations } from 'next-intl';

export default function CurrentStatus() {
  const t = useTranslations('currentStatus');

  return (
    <section id="current" className="min-h-screen flex items-center py-20 px-6 md:px-12 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent">
      <div className="max-w-5xl mx-auto">
        {/* Titre de section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-300 animate-slide-up">
            {t('title')}
          </h2>
          <p className="text-gray-400 text-lg animate-slide-up animation-delay-200">
            {t('subtitle')}
          </p>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Formation académique */}
          <div className="p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl hover:border-cyan-500/50 transition-all animate-slide-up animation-delay-300">
            <div className="text-4xl mb-4">{t('academic.emoji')}</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('academic.title')}
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              {t('academic.description')}
            </p>
            <div className="flex flex-wrap gap-2">
              {(t.raw('academic.tags') as string[]).map((tag: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm border border-cyan-500/30">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Constructions personnelles */}
          <div className="p-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl hover:border-purple-500/50 transition-all animate-slide-up animation-delay-400">
            <div className="text-4xl mb-4">{t('builder.emoji')}</div>
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('builder.title')}
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              {t('builder.description')}
            </p>
            <div className="flex flex-wrap gap-2">
              {(t.raw('builder.tags') as string[]).map((tag: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full text-sm border border-purple-500/30">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pourquoi ce site */}
        <div className="p-8 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/40 rounded-2xl animate-slide-up animation-delay-500">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            {t('whyThisSite.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">{t('whyThisSite.living.emoji')}</div>
              <h4 className="text-lg font-semibold text-cyan-300 mb-2">{t('whyThisSite.living.title')}</h4>
              <p className="text-gray-400 text-sm">{t('whyThisSite.living.description')}</p>
            </div>
            <div>
              <div className="text-3xl mb-2">{t('whyThisSite.testable.emoji')}</div>
              <h4 className="text-lg font-semibold text-cyan-300 mb-2">{t('whyThisSite.testable.title')}</h4>
              <p className="text-gray-400 text-sm">{t('whyThisSite.testable.description')}</p>
            </div>
            <div>
              <div className="text-3xl mb-2">{t('whyThisSite.vision.emoji')}</div>
              <h4 className="text-lg font-semibold text-cyan-300 mb-2">{t('whyThisSite.vision.title')}</h4>
              <p className="text-gray-400 text-sm">{t('whyThisSite.vision.description')}</p>
            </div>
          </div>
        </div>

        {/* Citation / Résumé */}
        <div className="mt-12 text-center animate-slide-up animation-delay-600">
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            <span className="text-white font-semibold">{t('summary.part1')}</span>{t('summary.part1Suffix')}
            <br />
            <span className="text-cyan-300 font-semibold">{t('summary.part2')}</span>{t('summary.part2Suffix')}
            <br />
            <span className="text-purple-300 font-semibold">{t('summary.part3')}</span>{t('summary.part3Suffix')}
          </p>
        </div>
      </div>
    </section>
  );
}
