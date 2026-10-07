import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles, Shield, Phone, CheckCircle2, CalendarCheck,
  UserCheck, Lightbulb, Award, Users, HeadphonesIcon,
  Building2, Clock,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us | Har Ghar Cleaning Services - Professional Cleaning Experts in Ludhiana',
  description:
    'Har Ghar Cleaning Services is a trusted provider of professional cleaning solutions in Ludhiana. We offer residential & commercial cleaning with quality, reliability, and customer satisfaction.',
};

const highlights = [
  { icon: <Sparkles className="h-5 w-5" />, label: 'Neat & Cleaning Service' },
  { icon: <Building2 className="h-5 w-5" />, label: 'Office & Property Clean' },
  { icon: <UserCheck className="h-5 w-5" />, label: 'Expert Cleaner' },
  { icon: <HeadphonesIcon className="h-5 w-5" />, label: '24/7 Online Support' },
];

const steps = [
  {
    icon: <CalendarCheck className="h-7 w-7" />,
    image: '/images/step01.png',
    title: 'Schedule Your Experience',
    desc: 'Schedule your cleaning experience effortlessly and enjoy a spotless, refreshed space with our expert services.',
  },
  {
    icon: <UserCheck className="h-7 w-7" />,
    image: '/images/step02.png',
    title: 'Meet Your Cleaning Expert',
    desc: 'Meet your cleaning expert and experience top-notch service with attention to detail and professionalism.',
  },
  {
    icon: <Lightbulb className="h-7 w-7" />,
    image: '/images/step03.png',
    title: 'Get Professional Advice',
    desc: 'Get professional advice on maintaining a clean and healthy home with our expert tips and recommendations.',
  },
  {
    icon: <Award className="h-7 w-7" />,
    image: '/images/step04.png',
    title: 'Get the Best Cleaning Service',
    desc: 'Get the best cleaning service with our skilled team, ensuring your home is spotless and inviting.',
  },
];

const team = [
  { name: 'Salik Ram', role: 'Cleaner - Supervisor', image: '/images/salik-ram.jpg' },
  { name: 'Rahul Dev', role: 'Cleaner', image: '/images/team_2.jpg' },
  { name: 'Sham Kumar', role: 'Cleaner', image: '/images/team_3.jpg' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-background to-sky-light" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-400/20 blur-[90px] animate-glow" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-sky/15 blur-[90px] animate-glow" style={{ animationDelay: '2s' }} />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6 animate-fade-up">
              <Sparkles className="h-4 w-4 text-brand-500" />
              <span className="text-foreground/80">About Us</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-5 leading-tight tracking-tight animate-fade-up">
              About <span className="gradient-text">Har Ghar</span> Cleaning Services
            </h1>
            <p className="text-lg sm:text-xl font-medium text-foreground/80 mb-3 animate-fade-up animate-fade-up-delay-1">
              Your Trusted Partner for Professional Cleaning Solutions in Ludhiana
            </p>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up animate-fade-up-delay-2">
              Har Ghar Cleaning Services is a trusted provider of professional cleaning solutions in Ludhiana.
              We offer a wide range of residential and commercial cleaning services, ensuring quality,
              reliability, and customer satisfaction with every job we undertake.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-up animate-fade-up-delay-3">
              <Button size="lg" asChild className="btn-brand font-semibold rounded-2xl shadow-lg shadow-brand-500/25">
                <a href="tel:+919780554129">
                  <Phone className="h-4 w-4 mr-2" /> Call Now
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-2xl">
                <a href="https://forms.gle/AcBVbVMDqnwGq2mR7" target="_blank" rel="noopener noreferrer">
                  Book Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {highlights.map((h) => (
              <Card key={h.label} className="border-border/60 card-lift">
              <CardContent className="flex flex-col items-center gap-2.5 p-5 text-center">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-mint-light text-mint ring-1 ring-mint/15">
                  {h.icon}
                </div>
                <span className="text-sm font-medium leading-tight">{h.label}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/40 py-14 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <Badge variant="secondary" className="mb-3">How It Works</Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Simple Steps to a <span className="gradient-text">Spotless Space</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {steps.map((s, i) => (
              <Card key={s.title} className="relative overflow-hidden border-border/60 hover:shadow-lg transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 ring-1 ring-brand-500/15">
                      {s.icon}
                    </div>
                    <span className="text-4xl font-extrabold text-muted/40">{i + 1}</span>
                  </div>
                  <h3 className="font-semibold text-base mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="text-center mb-10 sm:mb-14">
          <Badge variant="secondary" className="mb-3">
            <Users className="h-3.5 w-3.5 mr-1" /> Meet Our Team
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            The Experts Behind Your <span className="gradient-text">Clean Space</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {team.map((m) => (
            <Card key={m.name} className="border-border/60 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="aspect-square bg-muted/60 relative flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white text-2xl font-bold shadow-lg shadow-brand-500/25">
                  {m.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <CardContent className="p-5 text-center">
                <h3 className="font-semibold">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/40 py-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <Shield className="h-10 w-10 mx-auto mb-4 text-brand-600" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Get Your Home Sparkling Clean Today!</h2>
          <p className="text-muted-foreground mb-6">
            Experience top-quality cleaning with a focus on affordability and convenience.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild className="btn-cta font-semibold rounded-2xl shadow-lg shadow-coral-500/25">
              <a href="https://forms.gle/AcBVbVMDqnwGq2mR7" target="_blank" rel="noopener noreferrer">
                Schedule Your Cleaning
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-2xl">
              <a href="tel:+919780554129">
                <Phone className="h-4 w-4 mr-2" /> 097805 54129
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6 flex items-center justify-center gap-1.5">
            <Clock className="h-4 w-4" /> Call us! We are available 24/7
          </p>
        </div>
      </section>

      {/* Footer contact strip */}
      <footer className="border-t border-border/50 py-8">
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
