'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search, Sparkles, Shield, Clock, Star,
  ChevronRight, Phone, Mail, MapPin,
  CheckCircle2, ArrowRight, Zap, Users,
  Award, HeadphonesIcon, TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ServicesPage } from '@/components/ServicesPage';
import { CustomerDashboard } from '@/components/CustomerDashboard';
import { MainNavigation } from '@/components/MainNavigation';

type View = 'home' | 'services' | 'dashboard';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<View>('home');

  if (currentView === 'services') return <ServicesPage onBack={() => setCurrentView('home')} />;
  if (currentView === 'dashboard') return <CustomerDashboard onBack={() => setCurrentView('home')} />;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MainNavigation onServicesClick={() => setCurrentView('services')} onDashboardClick={() => setCurrentView('dashboard')} />

      {/* ─── Hero Section — Modern glassmorphism + multi-color gradient ─── */}
      <section className="relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-background to-warm-gray" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gold/15 blur-[80px] animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-coral/10 blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-lavender/10 blur-[80px] animate-pulse" style={{ animationDelay: '4s' }} />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl mx-auto text-center">
            {/* Floating badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6 sm:mb-8 animate-fade-up">
              <TrendingUp className="h-4 w-4 text-coral" />
              <span className="text-foreground/80">#1 Home Services Platform in Punjab</span>
              <Sparkles className="h-3.5 w-3.5 text-gold" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 sm:mb-6 leading-tight tracking-tight animate-fade-up animate-fade-up-delay-1">
              Professional Home
              <span className="gradient-text"> Services</span>
              {' '}at Your Doorstep
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto leading-relaxed animate-fade-up animate-fade-up-delay-2">
              Get expert help for cleaning, repairs, maintenance &amp; more. Book trusted professionals in minutes.
            </p>

            {/* Search bar — glassmorphism */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-10 animate-fade-up animate-fade-up-delay-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  className="pl-11 h-12 sm:h-13 text-base rounded-2xl border-border/80 bg-white/70 backdrop-blur-sm shadow-sm"
                />
              </div>
              <Button
                size="lg"
                className="h-12 sm:h-13 px-6 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-2xl shadow-lg shadow-gold-500/25 transition-all hover:shadow-gold-500/40 hover:scale-[1.02]"
                onClick={() => setCurrentView('services')}
              >
                <Search className="h-4 w-4 mr-2 sm:mr-0" />
                <span className="sm:hidden">Search</span>
              </Button>
            </div>

            {/* Trust badges — horizontal scroll on mobile */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
              {[
                { icon: <Users className="h-4 w-4" />, text: '50,000+ Customers', color: 'text-sage' },
                { icon: <CheckCircle2 className="h-4 w-4" />, text: '1,000+ Professionals', color: 'text-gold-500' },
                { icon: <Star className="h-4 w-4" />, text: '4.8★ Rating', color: 'text-coral' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-1.5 text-muted-foreground">
                  <span className={item.color}>{item.icon}</span>
                  <span className="font-medium text-foreground/80">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Categories — Modern color-coded cards ─── */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold">Browse Categories</h2>
            <button onClick={() => setCurrentView('services')} className="text-sm text-gold-500 hover:text-gold-700 font-medium flex items-center gap-1 transition-colors">
              See all <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:overflow-visible">
            {[
              { name: 'Cleaning', icon: '🧹', count: 15, color: 'bg-sage-light text-sage', ring: 'ring-sage/20' },
              { name: 'Appliances', icon: '🔧', count: 12, color: 'bg-gold-light text-gold-600', ring: 'ring-gold-500/20' },
              { name: 'Plumbing', icon: '🚰', count: 8, color: 'bg-teal-light text-teal-500', ring: 'ring-teal-500/20' },
              { name: 'Electrical', icon: '⚡', count: 10, color: 'bg-coral-light text-coral', ring: 'ring-coral/20' },
              { name: 'Painting', icon: '🎨', count: 6, color: 'bg-lavender-light text-lavender', ring: 'ring-lavender/20' },
              { name: 'Carpentry', icon: '🔨', count: 7, color: 'bg-plum-light text-plum', ring: 'ring-plum/20' },
            ].map((cat) => (
              <button key={cat.name} onClick={() => setCurrentView('services')} className="shrink-0 sm:shrink w-[130px] sm:w-auto group">
                <Card className="card-lift hover:border-border border-border/40">
                  <CardContent className={`${cat.color} p-4 text-center rounded-lg ring-1 ${cat.ring}`}>
                    <div className="text-3xl md:text-4xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</div>
                    <h3 className="font-semibold text-sm">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground/80 mt-0.5">{cat.count} services</p>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Popular Services — Modern gradient cards ─── */}
      <section className="py-10 md:py-16 bg-warm-gray/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold">Popular Services</h2>
              <p className="text-sm text-muted-foreground mt-1 hidden sm:block">Trusted by thousands of happy customers</p>
            </div>
            <button onClick={() => setCurrentView('services')} className="text-sm text-gold-500 hover:text-gold-700 font-medium flex items-center gap-1 transition-colors">
              View all <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:gap-6">
            {[
              { id: 1, title: 'Kitchen Cleaning', price: '₹1,099', image: '🧹', rating: 4.8, reviews: 2340, badge: 'Bestseller', bg: 'from-sage-100 to-sage-50', badgeColor: 'bg-sage text-white' },
              { id: 2, title: 'Bathroom Cleaning', price: '₹899', image: '🚿', rating: 4.7, reviews: 1890, badge: 'Popular', bg: 'from-teal-100 to-teal-50', badgeColor: 'bg-teal-500 text-white' },
              { id: 3, title: 'Sofa Cleaning', price: '₹1,499', image: '🛋️', rating: 4.9, reviews: 1560, bg: 'from-gold-100 to-gold-50', badgeColor: '' },
              { id: 4, title: 'Full Home Cleaning', price: '₹3,499', image: '🏠', rating: 4.8, reviews: 2100, badge: 'Premium', bg: 'from-lavender-100 to-lavender-50', badgeColor: 'bg-lavender text-white' },
              { id: 5, title: 'AC Service', price: '₹699', image: '❄️', rating: 4.6, reviews: 3240, bg: 'from-coral-100 to-coral-50', badgeColor: '' },
              { id: 6, title: 'Carpet Cleaning', price: '₹999', image: '🧶', rating: 4.7, reviews: 980, bg: 'from-plum-100 to-plum-50', badgeColor: '' },
            ].map((service) => (
              <div key={service.id} className="shrink-0 w-[280px] md:w-auto cursor-pointer" onClick={() => setCurrentView('services')}>
                <Card className="group card-lift overflow-hidden hover:border-border h-full">
                  <div className={`relative h-36 md:h-44 bg-gradient-to-br ${service.bg} flex items-center justify-center`}>
                    <span className="text-6xl md:text-7xl group-hover:scale-110 transition-transform duration-500">{service.image}</span>
                    {service.badge && (
                      <Badge className={`absolute top-3 right-3 ${service.badgeColor || 'bg-gold text-white'} text-[10px] px-2.5 py-0.5 border-0 font-semibold shadow-sm`}>
                        {service.badge}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4 md:p-5">
                    <h3 className="font-semibold text-base mb-1.5 group-hover:text-gold-600 transition-colors">{service.title}</h3>
                    <div className="flex items-center gap-1.5 mb-3">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">{service.rating}</span>
                      <span className="text-xs text-muted-foreground">({service.reviews.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold">{service.price}</span>
                        <span className="text-xs text-muted-foreground ml-1">onwards</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-medium text-gold-500 group-hover:text-gold-700 transition-colors">
                        Book <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works — Modern step indicators ─── */}
      <section id="how-it-works" className="py-10 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <Badge variant="outline" className="mb-3 border-gold-500/30 text-gold-500 font-medium">Simple Process</Badge>
            <h2 className="text-xl md:text-3xl font-bold mb-3">How It Works</h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto">Book a home service in just 4 simple steps</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { step: '1', title: 'Choose', desc: 'Browse services & select what you need', icon: <Search className="w-6 h-6" />, color: 'bg-gold-light text-gold-600 ring-1 ring-gold-500/15' },
              { step: '2', title: 'Book', desc: 'Pick a date & time that works for you', icon: <Clock className="w-6 h-6" />, color: 'bg-sage-light text-sage ring-1 ring-sage/15' },
              { step: '3', title: 'Service', desc: 'Trained pros arrive at your doorstep', icon: <Sparkles className="w-6 h-6" />, color: 'bg-teal-light text-teal-500 ring-1 ring-teal-500/15' },
              { step: '4', title: 'Pay', desc: 'Pay securely online or cash after', icon: <Shield className="w-6 h-6" />, color: 'bg-lavender-light text-lavender ring-1 ring-lavender/15' },
            ].map((item, i) => (
              <div key={item.step} className="relative text-center group">
                {/* Connector line (hidden on mobile, shown on lg+) */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[2px] bg-gradient-to-r from-border to-border/50" />
                )}
                <div className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl ${item.color} mb-3 md:mb-4 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold -mr-1 -mt-1 lg:relative lg:top-auto lg:right-auto lg:mb-2 lg:mx-auto">{item.step}</div>
                <h3 className="font-bold text-sm md:text-lg mb-1">{item.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us — Modern feature cards ─── */}
      <section id="about" className="py-10 md:py-20 bg-warm-gray/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center">
            <div>
              <Badge variant="outline" className="mb-3 border-coral/30 text-coral font-medium">Why Har Ghar</Badge>
              <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                Experience the{' '}
                <span className="gradient-text">Best Home Services</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Committed to exceptional service with trained professionals, transparent pricing, and 100% satisfaction guarantee.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { icon: <CheckCircle2 className="w-5 h-5" />, title: 'Verified Pros', desc: 'Background checked & trained', color: 'text-sage bg-sage-light ring-1 ring-sage/15' },
                  { icon: <Award className="w-5 h-5" />, title: 'Quality Guarantee', desc: '100% satisfaction or redo', color: 'text-gold-600 bg-gold-light ring-1 ring-gold-500/15' },
                  { icon: <Zap className="w-5 h-5" />, title: 'Fair Pricing', desc: 'No hidden charges ever', color: 'text-coral bg-coral-light ring-1 ring-coral/15' },
                  { icon: <HeadphonesIcon className="w-5 h-5" />, title: '24/7 Support', desc: 'Always here to help you', color: 'text-lavender bg-lavender-light ring-1 ring-lavender/15' },
                ].map((f) => (
                  <div key={f.title} className="flex gap-3">
                    <div className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl ${f.color} flex items-center justify-center`}>{f.icon}</div>
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">{f.title}</h3>
                      <p className="text-xs md:text-sm text-muted-foreground mt-0.5">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button size="lg" className="mt-8 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-2xl shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-[1.02] transition-all" onClick={() => setCurrentView('services')}>
                Book a Service <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            {/* Stats card — glassmorphism */}
            <div className="relative">
              <div className="bg-gradient-to-br from-primary via-charcoal-700 to-charcoal-800 rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gold/20 blur-3xl" />
                <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-coral/10 blur-3xl" />

                <h3 className="text-lg font-bold mb-6 relative z-10">Our Impact</h3>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {[
                    { num: '50K+', label: 'Happy Customers', accent: 'from-gold-400 to-gold-600' },
                    { num: '1,000+', label: 'Service Providers', accent: 'from-sage-300 to-sage-500' },
                    { num: '100K+', label: 'Jobs Completed', accent: 'from-coral-300 to-coral-500' },
                    { num: '4.8★', label: 'Average Rating', accent: 'from-lavender-300 to-lavender-500' },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/10 rounded-2xl p-5 text-center backdrop-blur-sm border border-white/5 hover:bg-white/15 transition-colors">
                      <div className={`text-3xl md:text-4xl font-extrabold bg-gradient-to-br ${s.accent} bg-clip-text text-transparent mb-1`}>{s.num}</div>
                      <div className="text-xs md:text-sm text-white/60">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials — Modern cards with color accents ─── */}
      <section className="py-10 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-xl md:text-3xl font-bold mb-2">Customer Love</h2>
            <p className="text-sm text-muted-foreground">Real stories from real customers</p>
          </div>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible md:gap-6">
            {[
              { name: 'Priya Sharma', loc: 'Ludhiana', text: 'Excellent service! The cleaning team was professional and thorough. Will definitely book again.', svc: 'Kitchen Cleaning', initials: 'PS', color: 'bg-sage-light text-sage' },
              { name: 'Rahul Verma', loc: 'Chandigarh', text: 'Very reliable and affordable. AC works perfectly now! Great communication throughout.', svc: 'AC Service', initials: 'RV', color: 'bg-gold-light text-gold-600' },
              { name: 'Anjali Gupta', loc: 'Jalandhar', text: 'Sofa cleaning was amazing. Removed all stubborn stains — looks brand new!', svc: 'Sofa Cleaning', initials: 'AG', color: 'bg-coral-light text-coral' },
            ].map((t) => (
              <div key={t.name} className="shrink-0 w-[300px] md:w-auto">
                <Card className="h-full border-border/50 card-lift hover:border-border">
                  <CardContent className="p-5 md:p-6">
                    <div className="flex items-center gap-0.5 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
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
                      <Badge variant="outline" className="text-[10px] hidden sm:inline-flex">{t.svc}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section — Modern gradient with glassmorphism ─── */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        {/* Multi-color gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-800 via-primary to-charcoal-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(212,168,105,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(224,122,95,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_80%,rgba(139,126,200,0.1),transparent_50%)]" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 text-white">Ready to Get Started?</h2>
          <p className="text-sm md:text-base mb-8 max-w-xl mx-auto text-white/60">Join thousands of happy customers. Professional home services like never before.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" asChild className="h-12 sm:h-13 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold rounded-2xl shadow-lg shadow-gold-500/30 hover:shadow-gold-500/50 hover:scale-[1.02] transition-all px-8">
              <Link href="/register">Create Free Account</Link>
            </Button>
            <Button size="lg" className="h-12 sm:h-13 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium rounded-2xl backdrop-blur-sm hover:scale-[1.02] transition-all px-8" onClick={() => setCurrentView('services')}>
              Browse Services
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer id="contact" className="bg-primary text-white mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span className="text-lg font-bold">Har Ghar Services</span>
              </div>
              <p className="text-sm text-white/50 mb-4 leading-relaxed">Your trusted partner for professional home services in Punjab.</p>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-white/50 hover:text-white hover:bg-white/10">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-white/50 hover:text-white hover:bg-white/10">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm">Quick Links</h3>
              <ul className="space-y-2.5 text-sm text-white/50">
                <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => setCurrentView('services')} className="hover:text-white transition-colors">Services</button></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
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
                <li className="flex items-start gap-2"><MapPin className="h-4 w-4 shrink-0 mt-0.5" />123, Service Street, Ludhiana, Punjab</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" />+91 98765 43210</li>
                <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" />support@harghar.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
            <p>&copy; 2025 Har Ghar Services. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-white/60 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white/60 transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white/60 transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}