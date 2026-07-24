import FeaturedBooks from '@/components/homepage/FeaturedBooks';
import Hero from '@/components/homepage/Hero';
import HowItWorks from '@/components/homepage/HowItWorks';
import StatsStrip from '@/components/homepage/StatsStrip';
import Testimonials from '@/components/homepage/Testimonials';

export default function Home() {
  return (
  <>
    <Hero />
    <StatsStrip/>
    <FeaturedBooks />
    <HowItWorks/>
    <Testimonials/>
  </>
  );
}