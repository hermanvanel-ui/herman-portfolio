import Projects from '@/components/portfolio/Projects';
import Skills from '@/components/portfolio/Skills';

export default function PortfolioPage() {
  return (
    <main className="overflow-x-hidden pt-[70px]">
      <Projects />
      <Skills />
    </main>
  );
}
