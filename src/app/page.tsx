import LandingNavbar from '@/components/landing/LandingNavbar';
import LandingHero from '@/components/landing/LandingHero';
import LandingLogosStrip from '@/components/landing/LandingLogosStrip';
import LandingFeaturedPacks from '@/components/landing/LandingFeaturedPacks';
import LandingBenefits from '@/components/landing/LandingBenefits';
import LandingHowItWorks from '@/components/landing/LandingHowItWorks';
import LandingUseCases from '@/components/landing/LandingUseCases';
import LandingStats from '@/components/landing/LandingStats';
import LandingTestimonial from '@/components/landing/LandingTestimonial';
import LandingFaq from '@/components/landing/LandingFaq';
import LandingFooter from '@/components/landing/LandingFooter';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900">
      <LandingNavbar />
      
      <main className="flex-1">
        <LandingHero />
        <LandingLogosStrip />
        <LandingFeaturedPacks />
        <LandingBenefits />
        <LandingHowItWorks />
        <LandingUseCases />
        <LandingStats />
        <LandingTestimonial />
        <LandingFaq />
      </main>

      <LandingFooter />
    </div>
  );
}
