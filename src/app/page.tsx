'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Search, Sparkles, Shield, Clock, Star,
  ChevronRight, Phone, Mail, MapPin,
  CheckCircle2, ArrowRight, Zap, Users,
  Award, HeadphonesIcon, CalendarCheck, BadgeCheck, Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ServicesPage } from '@/components/ServicesPage';
import { CustomerDashboard } from '@/components/CustomerDashboard';
import { MainNavigation } from '@/components/MainNavigation';
import { HomePackages } from '@/components/HomePackages';
import { Reveal } from '@/components/Reveal';

type View = 'home' | 'services' | 'dashboard';

const MARQUEE_ITEMS = [
  'Deep Cleaning', 'Sofa & Carpet', 'Kitchen Care', 'Bathroom Shine',
  'AC Service', 'Car Wash', 'Office Cleaning', 'Move-In / Move-Out',
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', loc: 'Ludhiana', text: 'Excellent service! The cleaning team was professional and thorough. Will definitely book again.', svc: 'Kitchen Cleaning', initials: 'PS', color: 'bg-mint-light text-mint' },
  { name: 'Rahul Verma', loc: 'Chandigarh', text: 'Very reliable and affordable. AC works perfectly now! Great communication throughout.', svc: 'AC Service', initials: 'RV', color: 'bg-sky-light text-sky' },
  { name: 'Anjali Gupta', loc: 'Jalandhar', text: 'Sofa cleaning was amazing. Removed all stubborn stains — looks brand new!', svc: 'Sofa Cleaning', initials: 'AG', color: 'bg-rose-light text-rose' },
  { name: 'Simran Kaur', loc: 'Amritsar', text: 'Booked a full deep clean before Diwali. The team arrived on time and the house sparkled.', svc: 'Deep Cleaning', initials: 'SK', color: 'bg-lilac-light text-lilac' },
  { name: 'Amit Joshi', loc: 'Mohali', text: 'Transparent pricing, no surprises. The bathroom looks like a hotel now. Highly recommended.', svc: 'Bathroom Shine', initials: 'AJ', color: 'bg-peach-light text-peach' },
];

export default function HomePage() {
  const [currentView, setCurrentView] = useState<View>('home');

  if (currentView === 'services') return <ServicesPage onBack={() => setCurrentView('home')} />;
  if (currentView === 'dashboard') return <CustomerDashboard onBack={() => setCurrentView('home')} />;

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20 md:pb-0">
      <MainNavigation onServicesClick={() => setCurrentView('services')} onDashboardClick={() => setCurrentView('dashboard')} />

      {/* ─────────── Hero — aurora on deep ink ─────────── */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        {/* Aurora blobs */}
        <div className="aurora-blob -top-44 -right-40 w-[580px] h-[580px] bg-brand-500/25" />
        <div className="aurora-blob -bottom-52 -left-48 w-[500px] h-[500px] bg-sky/15" style={{ animationDelay: '4s' }} />
        <div className="aurora-blob top-1/3 left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-coral-500/10" style={{ animationDelay: '8s' }} />
        {/* Dot texture */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #5be1d1 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        {/* Top hairline glow */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-brand-300 text-sm font-medium mb-7 animate-fade-up">
              <Sparkles className="h-4 w-4" />
              <span>Har Ghar Cleaning Services · Ludhiana</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-[1.06] animate-fade-up animate-fade-up-delay-1">
              A Spotless Home,
              <span className="block mt-1 bg-gradient-to-r from-brand-300 via-brand-400 to-sky bg-clip-text text-transparent">One Tap Away</span>
            </h1>

            <p className="text-base sm:text-lg text-white/60 mb-9 max-w-xl mx-auto leading-relaxed animate-fade-up animate-fade-up-delay-2">
              Deep cleaning, sofa &amp; kitchen care and more — verified pros at your doorstep, transparent pricing, 24/7 support.
            </p>

            {/* Search-led conversion pill */}
            <div className="max-w-xl mx-auto mb-8 animate-fade-up animate-fade-up-delay-3">
              <button
                onClick={() => setCurrentView('services')}
                className="w-full flex items-center gap-3 rounded-2xl bg-white/95 text-ink-900 px-5 py-4 text-left shadow-2xl shadow-brand-500/20 hover:shadow-brand-400/30 hover:scale-[1.01] transition-all group"
              >
                <Search className="h-5 w-5 text-brand-600 shrink-0" />
                <span className="flex-1 text-sm sm:text-base text-ink-400 group-hover:text-ink-600 transition-colors">What do you need cleaned today?</span>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 text-white text-sm font-semibold px-4 py-2">
                  Search <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12 animate-fade-up animate-fade-up-delay-3">
              <Button size="lg" asChild className="h-13 px-8 btn-cta btn-shine font-bold rounded-2xl text-base hover:scale-[1.03] transition-transform">
                <a href="https://forms.gle/AcBVbVMDqnwGq2mR7" target="_blank" rel="noopener noreferrer">
                  Book Now <ArrowRight className="h-5 w-5 ml-2" />
                </a>
              </Button>
              <Button size="lg" asChild className="h-13 px-8 glass-dark hover:bg-white/15 text-white font-semibold rounded-2xl hover:scale-[1.03] transition-all">
                <a href="tel:+919780554129">
                  <Phone className="h-5 w-5 mr-2" /> 097805 54129
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 text-sm">
              {[
                { icon: <Users className="h-4 w-4" />, text: '50,000+ Customers' },
                { icon: <BadgeCheck className="h-4 w-4" />, text: '1,000+ Verified Pros' },
                { icon: <Star className="h-4 w-4 fill-current" />, text: '4.8 Rating' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-white/60">
                  <span className="text-brand-300">{item.icon}</span>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade into light */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ─────────── Marquee strip ─────────── */}
      <div className="relative border-y border-border/60 bg-card/60 py-3.5 overflow-hidden" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-8">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground whitespace-nowrap">
              <Sparkles className="h-3.5 w-3.5 text-brand-500" /> {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─────────── Categories — pastel tiles ─────────── */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold">Browse Categories</h2>
            <button onClick={() => setCurrentView('services')} className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1 transition-colors">
              See all <ChevronRight className="h-4 w-4" />
            </button>
          </Reveal>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:overflow-visible">
            {[
              { name: 'Cleaning', icon: '🧹', count: 15, color: 'bg-mint-light text-mint' },
              { name: 'Appliances', icon: '🔧', count: 12, color: 'bg-sky-light text-sky' },
              { name: 'Plumbing', icon: '🚿', count: 8, color: 'bg-brand-100 text-brand-600' },
              { name: 'Electrical', icon: '⚡', count: 10, color: 'bg-lemon-light text-lemon' },
              { name: 'Painting', icon: '🎨', count: 6, color: 'bg-lilac-light text-lilac' },
              { name: 'Carpentry', icon: '🔨', count: 7, color: 'bg-peach-light text-peach' },
            ].map((cat, i) => (
              <Reveal key={cat.name} delay={i * 60} className="shrink-0 sm:shrink w-[132px] sm:w-auto snap-start">
                <button onClick={() => setCurrentView('services')} className="w-full group">
                  <Card className="card-lift border-border/50 hover:border-brand-500/40 hover:shadow-brand-500/10">
                    <CardContent className={`${cat.color} p-4 text-center rounded-lg transition-transform`}>
                      <div className="text-3xl md:text-4xl mb-2 group-hover:scale-110 group-hover:-rotate-6 transition-transform">{cat.icon}</div>
                      <h3 className="font-semibold text-sm">{cat.name}</h3>
                      <p className="text-xs opacity-70 mt-0.5">{cat.count} services</p>
                    </CardContent>
                  </Card>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Packages & Pricing — DB-driven ─────────── */}
      <HomePackages />

      {/* ─────────── How It Works ─────────── */}
      <section id="how-it-works" className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10 md:mb-14">
            <Badge variant="outline" className="mb-3 border-brand-500/30 text-brand-600 font-medium">Simple Process</Badge>
            <h2 className="text-xl md:text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto">Book a home service in just 4 simple steps</p>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { step: '1', title: 'Choose', desc: 'Browse services & select what you need', icon: <Search className="w-6 h-6" />, color: 'bg-mint-light text-mint' },
              { step: '2', title: 'Book', desc: 'Pick a date & time that works for you', icon: <CalendarCheck className="w-6 h-6" />, color: 'bg-sky-light text-sky' },
              { step: '3', title: 'Service', desc: 'Trained pros arrive at your doorstep', icon: <Sparkles className="w-6 h-6" />, color: 'bg-brand-100 text-brand-600' },
              { step: '4', title: 'Pay', desc: 'Pay securely online or cash after', icon: <Wallet className="w-6 h-6" />, color: 'bg-lilac-light text-lilac' },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 90} className="relative text-center group">
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[2px] bg-gradient-to-r from-brand-200 to-brand-100" />
                )}
                <div className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl ${item.color} mb-3 md:mb-4 group-hover:scale-110 group-hover:-rotate-3 transition-transform`}>
                  {item.icon}
                </div>
                <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-ink-900 text-white flex items-center justify-center text-xs font-bold -mr-1 -mt-1 lg:relative lg:top-auto lg:right-auto lg:mb-2 lg:mx-auto">{item.step}</div>
                <h3 className="font-bold text-sm md:text-lg mb-1">{item.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Why Choose Us — bento grid ─────────── */}
      <section id="about" className="py-12 md:py-20 bg-secondary/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10 md:mb-14">
            <Badge variant="outline" className="mb-3 border-coral-500/30 text-coral-600 font-medium">Why Har Ghar</Badge>
            <h2 className="text-2xl md:text-4xl font-bold mb-3">
              Experience the <span className="gradient-text">Best Home Services</span>
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
              Trained professionals, transparent pricing and a 100% satisfaction guarantee — every single time.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 md:gap-5 max-w-5xl mx-auto">
            {/* Hero bento tile */}
            <Reveal className="sm:col-span-2 lg:row-span-2">
              <div className="relative h-full min-h-[240px] overflow-hidden rounded-3xl bg-ink-950 p-7 md:p-9 text-white flex flex-col justify-end group">
                <div className="aurora-blob -top-20 -right-20 w-64 h-64 bg-brand-500/30" />
                <div className="aurora-blob -bottom-16 -left-16 w-52 h-52 bg-coral-500/20" style={{ animationDelay: '5s' }} />
                <BadgeCheck className="h-10 w-10 text-brand-300 mb-auto" />
                <h3 className="text-xl md:text-2xl font-bold mt-8 mb-2">100% Satisfaction, Guaranteed</h3>
                <p className="text-sm text-white/60 leading-relaxed">Not happy with the result? We redo the service for free — no questions asked.</p>
              </div>
            </Reveal>
            {[
              { icon: <Shield className="w-5 h-5" />, title: 'Verified Pros', desc: 'Background checked & trained', color: 'text-mint bg-mint-light' },
              { icon: <Zap className="w-5 h-5" />, title: 'Fair Pricing', desc: 'No hidden charges, ever', color: 'text-lemon bg-lemon-light' },
              { icon: <HeadphonesIcon className="w-5 h-5" />, title: '24/7 Support', desc: 'Always here to help you', color: 'text-lilac bg-lilac-light' },
              { icon: <Award className="w-5 h-5" />, title: 'Top Rated', desc: '4.8 average from 10K+ reviews', color: 'text-sky bg-sky-light' },
            ].map((f, i) => (
              <Reveal key={f.title} delay={(i + 1) * 80}>
                <Card className="h-full card-lift border-border/50 hover:border-brand-500/30">
                  <CardContent className="p-5 md:p-6">
                    <div className={`inline-flex w-11 h-11 rounded-xl ${f.color} items-center justify-center mb-4`}>{f.icon}</div>
                    <h3 className="font-semibold text-sm md:text-base mb-1">{f.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          {/* Stats band */}
          <Reveal delay={120} className="mt-10 md:mt-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { num: '50K+', label: 'Happy Customers' },
                { num: '1,000+', label: 'Service Providers' },
                { num: '100K+', label: 'Jobs Completed' },
                { num: '4.8', label: 'Average Rating' },
              ].map((s) => (
                <div key={s.label} className="text-center rounded-2xl border border-border/60 bg-card px-4 py-5 card-lift">
                  <div className="text-2xl md:text-3xl font-extrabold gradient-text font-display">{s.num}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────── Testimonials — marquee ─────────── */}
      <section className="py-12 md:py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <h2 className="text-xl md:text-3xl font-bold mb-2">Customer Love</h2>
            <p className="text-sm text-muted-foreground">Real stories from real customers</p>
          </Reveal>
        </div>
        <div className="relative">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <Card key={`${t.name}-${i}`} className="w-[300px] shrink-0 border-border/50 card-lift">
                <CardContent className="p-5">
                  <div className="flex items-center gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-lemon text-lemon" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-sm font-bold`}>{t.initials}</div>
                      <div>
                        <div className="font-semibold text-sm">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.loc}</div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px]">{t.svc}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── CTA — aurora on ink ─────────── */}
      <section className="py-14 md:py-24 relative overflow-hidden bg-ink-950">
        <div className="aurora-blob -top-32 -right-32 w-[460px] h-[460px] bg-brand-500/20" />
        <div className="aurora-blob -bottom-32 -left-32 w-[420px] h-[420px] bg-coral-500/15" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #5be1d1 1px, transparent 0)', backgroundSize: '28px 28px' }} />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <Badge className="mb-4 glass-dark text-brand-300 border-brand-400/30">Get Your Home Sparkling Clean Today!</Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-white">
              Ready for a <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-sky bg-clip-text text-transparent">Spotless Space?</span>
            </h2>
            <p className="text-sm md:text-lg mb-10 max-w-xl mx-auto text-white/60">
              Don&apos;t settle for less — experience top-quality cleaning with affordability &amp; convenience. Book now and enjoy a pristine home.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild className="h-13 px-8 btn-cta btn-shine font-bold rounded-2xl text-base hover:scale-[1.03] transition-transform">
                <a href="https://forms.gle/AcBVbVMDqnwGq2mR7" target="_blank" rel="noopener noreferrer">
                  Schedule Your Cleaning <ArrowRight className="h-5 w-5 ml-2" />
                </a>
              </Button>
              <Button size="lg" asChild className="h-13 px-8 glass-dark hover:bg-white/15 text-white font-semibold rounded-2xl hover:scale-[1.03] transition-all">
                <a href="tel:+919780554129">
                  <Phone className="h-5 w-5 mr-2" /> Call 097805 54129
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────── Footer ─────────── */}
      <footer id="contact" className="bg-ink-950 text-white mt-auto border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-md shadow-brand-500/25">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold font-display">Har<span className="text-brand-400">Ghar</span></span>
              </div>
              <p className="text-sm text-white/50 mb-4 leading-relaxed">Your trusted partner for professional home services in Punjab.</p>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" asChild className="h-9 w-9 rounded-full text-white/50 hover:text-white hover:bg-white/10">
                  <a href="tel:+919780554129" aria-label="Call us"><Phone className="h-4 w-4" /></a>
                </Button>
                <Button variant="ghost" size="icon" asChild className="h-9 w-9 rounded-full text-white/50 hover:text-white hover:bg-white/10">
                  <a href="mailto:admin@hargharservice.in" aria-label="Email us"><Mail className="h-4 w-4" /></a>
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm">Quick Links</h3>
              <ul className="space-y-2.5 text-sm text-white/50">
                <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => setCurrentView('services')} className="hover:text-white transition-colors">Services</button></li>
                <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
                <li><Link href="/policies" className="hover:text-white transition-colors">Policies</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm">Services</h3>
              <ul className="space-y-2.5 text-sm text-white/50">
                <li><button onClick={() => setCurrentView('services')} className="hover:text-white transition-colors">Cleaning</button></li>
                <li><button onClick={() => setCurrentView('services')} className="hover:text-white transition-colors">Appliance Repair</button></li>
                <li><button onClick={() => setCurrentView('services')} className="hover:text-white transition-colors">Plumbing</button></li>
                <li><button onClick={() => setCurrentView('services')} className="hover:text-white transition-colors">Electrical Work</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm">Contact</h3>
              <ul className="space-y-3 text-sm text-white/50">
                <li className="flex items-start gap-2"><MapPin className="h-4 w-4 shrink-0 mt-0.5" />Ludhiana, Punjab</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" />+91 97805 54129</li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" />admin@hargharservice.in</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
            <p>&copy; 2026 Har Ghar Services. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/policies" className="hover:text-white/60 transition-colors">Privacy</Link>
              <Link href="/policies" className="hover:text-white/60 transition-colors">Terms</Link>
              <Link href="/policies" className="hover:text-white/60 transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
