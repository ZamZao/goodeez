import LandingNavbar from '@/components/landing/LandingNavbar';
import LandingFooter from '@/components/landing/LandingFooter';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900">
      <LandingNavbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        {children}
      </main>
      <LandingFooter />
    </div>
  );
}
