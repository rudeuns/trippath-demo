import Header from '@/components/home/header';
import HeroSection from '@/components/home/hero-section';
import FeatureSection from '@/components/home/feature-section';
import Footer from '@/components/home/footer';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Header />
      <HeroSection />
      <FeatureSection />
      <Footer />
    </div>
  );
}
