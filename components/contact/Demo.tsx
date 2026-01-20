"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';

export default function Demo() {
  const t = useTranslations('demo');
  const steps = t.raw('howItWorks.steps') as string[];

  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult(t('form.successMessage'));
    } catch {
      setError(t('form.errorMessage'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="demo" className="min-h-screen py-20 px-6 md:px-12 flex items-center bg-gradient-to-b from-blue-950/10 to-purple-950/10">
      <div className="max-w-4xl mx-auto w-full">
        {/* Titre de section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-300 animate-glow">
            {t('title')}
          </h2>
          <p className="text-gray-400 text-lg">
            {t('subtitle')}
          </p>
        </div>

        {/* Explication */}
        <div className="mb-8 p-6 bg-white/5 border border-cyan-500/30 rounded-xl">
          <h3 className="text-xl font-semibold mb-3 text-white">{t('howItWorks.title')}</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            {t('howItWorks.intro')}<span className="text-cyan-300 font-semibold">{t('howItWorks.introBold')}</span>{t('howItWorks.introEnd')}
          </p>
          <ul className="space-y-2 text-gray-400">
            {steps.map((step, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-500 italic">
            {t('howItWorks.note')}
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="prompt" className="block text-lg font-medium text-gray-300 mb-3">
              {t('form.label')}
            </label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t('form.placeholder')}
              className="w-full px-4 py-3 bg-white/10 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 min-h-[120px] resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 disabled:shadow-none"
          >
            {isLoading ? t('form.buttonLoading') : t('form.buttonIdle')}
          </button>
        </form>

        {/* Résultat */}
        {result && (
          <div className="mt-8 p-6 bg-green-500/10 border border-green-500/30 rounded-xl animate-slide-up">
            <p className="text-green-300">{result}</p>
          </div>
        )}

        {/* Erreur */}
        {error && (
          <div className="mt-8 p-6 bg-red-500/10 border border-red-500/30 rounded-xl animate-slide-up">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        {/* Note technique */}
        <div className="mt-12 p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl">
          <h4 className="text-lg font-semibold text-purple-300 mb-3">{t('technical.title')}</h4>
          <p className="text-gray-400 text-sm leading-relaxed">
            {t('technical.description')}
          </p>
        </div>
      </div>
    </section>
  );
}
