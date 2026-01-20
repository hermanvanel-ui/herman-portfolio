import Hero from '@/components/introduction/Hero';
import CurrentStatus from '@/components/introduction/CurrentStatus';
import Timeline from '@/components/about/Timeline';
import Projects from '@/components/portfolio/Projects';
import Skills from '@/components/portfolio/Skills';
import Vision from '@/components/about/Vision';
import Demo from '@/components/contact/Demo';
import Footer from '@/components/shared/Footer';

export default function IntroductionPage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <CurrentStatus />
      <Timeline />
      <Projects />
      <Skills />
      <Vision />
      <Demo />
      <Footer />
    </main>
  );
}
