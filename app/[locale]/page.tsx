import Hero from '@/components/introduction/Hero';
import CurrentStatus from '@/components/introduction/CurrentStatus';
import Projects from '@/components/portfolio/Projects';
import Skills from '@/components/portfolio/Skills';
import Timeline from '@/components/about/Timeline';
import Vision from '@/components/about/Vision';
import Demo from '@/components/contact/Demo';
import Footer from '@/components/shared/Footer';

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <CurrentStatus />
      <Projects />
      <Skills />
      <Timeline />
      <Vision />
      <Demo />
      <Footer />
    </main>
  );
}
