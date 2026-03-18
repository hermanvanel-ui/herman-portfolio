import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navigation from '@/components/shared/Navigation';
import MatrixRain from '@/components/effects/MatrixRain';
import ScrollReveal from '@/components/effects/ScrollReveal';
import HoloTilt from '@/components/effects/HoloTilt';
import type { Metadata } from 'next';

const locales = ['fr', 'en', 'it', 'es'];

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    fr: 'Herman Vanel - Construire le futur',
    en: 'Herman Vanel - Building the Future',
    it: 'Herman Vanel - Costruire il futuro',
    es: 'Herman Vanel - Construir el futuro'
  };

  const descriptions: Record<string, string> = {
    fr: 'Portfolio futuriste - Automatisation, systèmes, et vision technologique',
    en: 'Futuristic portfolio - Automation, systems, and technological vision',
    it: 'Portfolio futuristico - Automazione, sistemi e visione tecnologica',
    es: 'Portafolio futurista - Automatización, sistemas y visión tecnológica'
  };

  return {
    title: titles[locale] || titles.fr,
    description: descriptions[locale] || descriptions.fr,
    keywords: ['développeur', 'automatisation', 'IA', 'systèmes', 'n8n', 'bots'],
  };
}

export default async function LocaleLayout({
  children,
  params
}: Props) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <MatrixRain />
          <div className="scanlines" />
          <Navigation locale={locale} />
          {children}
          <ScrollReveal />
          <HoloTilt />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
