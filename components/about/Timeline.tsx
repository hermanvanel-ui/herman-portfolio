"use client";

import { useTranslations } from 'next-intl';

interface TimelineEvent {
  period: string;
  year: string;
  title: string;
  description: string;
  icon: string;
  skills: string[];
  highlight?: boolean;
  future?: boolean;
}

export default function Timeline() {
  const t = useTranslations('timeline');
  const events = t.raw('events') as TimelineEvent[];

  return (
    <section id="timeline" className="min-h-screen py-20 px-6 md:px-12">
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

        {/* Timeline */}
        <div className="relative">
          {/* Ligne verticale centrale (desktop) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-500/50 via-blue-500/50 to-purple-500/50" />

          {/* Events */}
          <div className="space-y-12">
            {events.map((event, index) => {
              const isLeft = index % 2 === 0;
              const animationDelay = index * 150;
              const isHighlight = index === 2 || index === 3;
              const isFuture = index === 4;

              return (
                <div
                  key={index}
                  className={`
                    relative flex items-center gap-8
                    ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}
                    animate-slide-up
                  `}
                  style={{ animationDelay: `${animationDelay}ms` }}
                >
                  {/* Contenu */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <div
                      className={`
                        p-6 rounded-2xl border
                        ${isHighlight
                          ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/50'
                          : isFuture
                          ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30'
                          : 'bg-white/5 border-cyan-500/20'
                        }
                        hover:scale-105 transition-all duration-300
                        ${isHighlight ? 'shadow-lg shadow-cyan-500/20' : ''}
                      `}
                    >
                      {/* Header */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2 justify-start md:justify-start">
                          {isLeft ? (
                            <>
                              <span className="text-sm text-cyan-400 font-medium">{event.period}</span>
                              <span className="text-gray-500">•</span>
                              <span className="text-sm text-gray-400">{event.year}</span>
                            </>
                          ) : (
                            <div className="md:flex md:flex-row-reverse md:w-full">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-400">{event.year}</span>
                                <span className="text-gray-500">•</span>
                                <span className="text-sm text-cyan-400 font-medium">{event.period}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                          {event.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed mb-4 text-left">
                        {event.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 justify-start">
                        {event.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className={`
                              px-3 py-1 rounded-full text-xs font-medium
                              ${isHighlight
                                ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-500/50'
                                : isFuture
                                ? 'bg-purple-500/20 text-purple-200 border border-purple-500/30'
                                : 'bg-white/10 text-gray-300 border border-white/20'
                              }
                            `}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Icône centrale */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 items-center justify-center">
                    <div
                      className={`
                        w-16 h-16 rounded-full flex items-center justify-center text-2xl
                        ${isHighlight
                          ? 'bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/50'
                          : isFuture
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30'
                          : 'bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-cyan-500/30'
                        }
                      `}
                    >
                      {event.icon}
                    </div>
                  </div>

                  {/* Icône mobile */}
                  <div className="md:hidden flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl bg-gradient-to-br from-cyan-500 to-blue-500">
                    {event.icon}
                  </div>

                  {/* Spacer pour desktop */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Note de cohérence */}
        <div className="mt-16 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl text-center">
          <p className="text-gray-300 leading-relaxed">
            {t('coherence').split(t('academicBold'))[0]}
            <span className="text-white font-semibold">{t('academicBold')}</span>
            {t('coherence').split(t('academicBold'))[1]?.split(t('personalBold'))[0]}
            <span className="text-cyan-300 font-semibold">{t('personalBold')}</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
