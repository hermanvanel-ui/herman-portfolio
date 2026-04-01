import Hero from '@/components/introduction/Hero';
import CurrentStatus from '@/components/introduction/CurrentStatus';
import HomeNav from '@/components/introduction/HomeNav';

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <CurrentStatus />
      <HomeNav />
    </main>
  );
}
