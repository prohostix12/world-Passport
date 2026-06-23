import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Process from '@/components/Process';
import Universities from '@/components/Universities';
import Footer from '@/components/Footer';
import AOSInit from '@/components/AOSInit';

export default function Home() {
  return (
    <main className="bg-white text-gray-900">
      <AOSInit />
      <Navbar />
      <Hero />
      <Stats />
      <Process />
      <Universities />
      <Footer />
    </main>
  );
}
