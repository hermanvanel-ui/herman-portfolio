import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navigation from '@/components/shared/Navigation';
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

  // Metadata per locale - will be enhanced later with translations
  const titles: Record<string, string> = {
    fr: 'Herman Vanel - Construire le futur',
    en: 'Herman Vanel - Building the Future',
    it: 'Herman Vanel - Costruire il futuro',
    es: 'Herman Vanel - Construir el futuro'
  };

  const descriptions: Record<string, string> = {
    fr: 'Portfolio futuriste d\'Herman Vanel - Automatisation, systèmes, et vision technologique',
    en: 'Herman Vanel\'s futuristic portfolio - Automation, systems, and technological vision',
    it: 'Portfolio futuristico di Herman Vanel - Automazione, sistemi e visione tecnologica',
    es: 'Portafolio futurista de Herman Vanel - Automatización, sistemas y visión tecnológica'
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

  // Ensure that the incoming `locale` is valid
  if (!locales.includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navigation locale={locale} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
