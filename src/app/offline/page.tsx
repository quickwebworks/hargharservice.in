import type { Metadata } from 'next';
import { WifiOff, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Offline | Har Ghar Cleaning Services',
  description: 'You are currently offline. Please check your connection.',
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ink-950 text-white px-4 text-center relative overflow-hidden">
      <div className="aurora-blob -top-24 -right-24 w-72 h-72 bg-brand-500/25" />
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-300 mb-6 relative">
        <WifiOff className="h-8 w-8" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-3">You&apos;re offline</h1>
      <p className="text-white/60 max-w-sm mb-8">
        It looks like you&apos;ve lost your internet connection. Some features need a connection to work.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 relative">
        <Button asChild className="btn-brand font-semibold rounded-xl">
          <a href="/">Try Again</a>
        </Button>
        <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl">
          <a href="tel:+919780554129"><Phone className="h-4 w-4 mr-2" /> Call 097805 54129</a>
        </Button>
      </div>
    </div>
  );
}
