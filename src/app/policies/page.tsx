import type { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sparkles, ShieldCheck, FileText, AlertTriangle, RefreshCcw,
  XCircle, CalendarClock, Phone, Mail,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & Policies | Har Ghar Cleaning Services - Ludhiana',
  description:
    'Read the policies of Har Ghar Cleaning Services: Privacy Policy, Terms & Conditions, Disclaimer, Refund Policy, Cancellation Policy, and Reschedule Policy.',
};

const policies = [
  {
    id: 'privacy-policy',
    icon: <ShieldCheck className="h-5 w-5" />,
    color: 'bg-mint-light text-mint ring-1 ring-mint/15',
    title: 'Privacy Policy',
    content:
      'We value your privacy and ensure that any personal information you share with us is protected. We collect data solely to improve our services, and your information is never shared with third parties without consent. Your personal details are securely stored and used only for booking, billing, and communication purposes.',
  },
  {
    id: 'terms-and-conditions',
    icon: <FileText className="h-5 w-5" />,
    color: 'bg-brand-100 text-brand-600 ring-1 ring-brand-500/15',
    title: 'Terms and Conditions',
    content:
      'By using our services, you agree to our terms. All bookings are subject to availability, and prices are as stated on the website. Payments must be made at the time of booking or upon service completion. We reserve the right to change our pricing and policies at any time.',
  },
  {
    id: 'disclaimer',
    icon: <AlertTriangle className="h-5 w-5" />,
    color: 'bg-peach-light text-peach ring-1 ring-peach/15',
    title: 'Disclaimer',
    content:
      'Har Ghar Cleaning Services strives to provide high-quality services, but we do not guarantee results that are beyond normal wear and tear or damage caused by previous conditions. We are not responsible for any damages that occur due to pre-existing issues with your property or furniture.',
  },
  {
    id: 'refund-policy',
    icon: <RefreshCcw className="h-5 w-5" />,
    color: 'bg-sky-light text-sky ring-1 ring-sky/15',
    title: 'Refund Policy',
    content:
      'Refunds are only available for cancellations made 24 hours before the scheduled service. Once the service is completed, no refunds will be provided unless there is a valid service-related complaint.',
  },
  {
    id: 'cancellation-policy',
    icon: <XCircle className="h-5 w-5" />,
    color: 'bg-rose-light text-rose ring-1 ring-rose/15',
    title: 'Cancellation Policy',
    content:
      'Cancellations must be made at least 24 hours before the scheduled service to avoid charges. Failure to cancel within this timeframe will result in a 50% charge of the total booking cost.',
  },
  {
    id: 'reschedule-policy',
    icon: <CalendarClock className="h-5 w-5" />,
    color: 'bg-lilac-light text-lilac ring-1 ring-lilac/15',
    title: 'Reschedule Policy',
    content:
      'Rescheduling is allowed up to 12 hours before the scheduled service. Contact us via phone or email to reschedule your appointment, subject to availability.',
  },
];

export default function PoliciesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-background to-sky-light" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-400/20 blur-[90px] animate-glow" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-mint/15 blur-[90px] animate-glow" style={{ animationDelay: '2s' }} />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6 animate-fade-up">
              <Sparkles className="h-4 w-4 text-brand-500" />
              <span className="text-foreground/80">Our Policies</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight tracking-tight animate-fade-up">
              Privacy Policy <span className="gradient-text">&amp; Policies</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed animate-fade-up animate-fade-up-delay-1">
              Transparency matters to us. Review our privacy practices, terms of service,
              and booking policies below.
            </p>
          </div>
        </div>
      </section>

      {/* Quick nav */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {policies.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="px-3.5 py-1.5 text-sm font-medium rounded-full border border-border/60 bg-background/60 hover:bg-muted transition-colors"
            >
              {p.title}
            </a>
          ))}
        </div>
      </section>

      {/* Policy sections */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-3xl mx-auto space-y-6">
          {policies.map((p) => (
            <Card key={p.id} id={p.id} className="border-border/60 scroll-mt-24">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${p.color}`}>
                    {p.icon}
                  </div>
                  <h2 className="text-xl font-bold">{p.title}</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{p.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact strip */}
        <div className="max-w-3xl mx-auto mt-10 text-center">
          <Card className="border-border/60 bg-muted/40">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-3">
                Have questions about our policies? Get in touch with us.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                <a href="tel:+919780554129" className="inline-flex items-center gap-1.5 hover:text-brand-600 transition-colors">
                  <Phone className="h-4 w-4" /> +91 97805 54129
                </a>
                <a href="mailto:admin@hargharservice.in" className="inline-flex items-center gap-1.5 hover:text-brand-600 transition-colors">
                  <Mail className="h-4 w-4" /> admin@hargharservice.in
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground space-y-1.5">
          <p className="font-medium text-foreground">Har Ghar Cleaning Services</p>
          <p>Shop No. 3, Plot No. 1341/94, Karnail Singh Nagar, Phase 3, Ludhiana, Punjab, India - 141006</p>
          <p>
            <a href="mailto:admin@hargharservice.in" className="hover:text-foreground transition-colors">admin@hargharservice.in</a>
            {' · '}
            <a href="tel:+919780554129" className="hover:text-foreground transition-colors">+91 97805 54129</a>
          </p>
          <p className="pt-2">© {new Date().getFullYear()} Har Ghar Cleaning Services. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
