'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Sparkles,
  Shield,
  Clock,
  Star,
  ChevronRight,
  Menu,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { ServicesPage } from '@/components/ServicesPage';
import { CustomerDashboard } from '@/components/CustomerDashboard';

type View = 'home' | 'services' | 'dashboard';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');

  const featuredServices = [
    {
      id: 1,
      title: 'Kitchen Cleaning',
      price: '₹1,099',
      image: '🧹',
      rating: 4.8,
      reviews: 2340,
      badge: 'Bestseller',
    },
    {
      id: 2,
      title: 'Bathroom Cleaning',
      price: '₹899',
      image: '🚿',
      rating: 4.7,
      reviews: 1890,
      badge: 'Popular',
    },
    {
      id: 3,
      title: 'Sofa Cleaning',
      price: '₹1,499',
      image: '🛋️',
      rating: 4.9,
      reviews: 1560,
    },
    {
      id: 4,
      title: 'Full Home Cleaning',
      price: '₹3,499',
      image: '🏠',
      rating: 4.8,
      reviews: 2100,
      badge: 'Premium',
    },
    {
      id: 5,
      title: 'AC Service',
      price: '₹699',
      image: '❄️',
      rating: 4.6,
      reviews: 3240,
    },
    {
      id: 6,
      title: 'Carpet Cleaning',
      price: '₹999',
      image: '🧶',
      rating: 4.7,
      reviews: 980,
    },
  ];

  const categories = [
    { name: 'Cleaning', icon: '🧹', count: 15 },
    { name: 'Appliance Repair', icon: '🔧', count: 12 },
    { name: 'Plumbing', icon: '🚰', count: 8 },
    { name: 'Electrical', icon: '⚡', count: 10 },
    { name: 'Painting', icon: '🎨', count: 6 },
    { name: 'Carpentry', icon: '🔨', count: 7 },
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Choose a Service',
      description: 'Browse through our wide range of home services and select what you need',
      icon: <Search className="w-8 h-8" />,
    },
    {
      step: '2',
      title: 'Book a Slot',
      description: 'Pick a convenient date and time for your service appointment',
      icon: <Clock className="w-8 h-8" />,
    },
    {
      step: '3',
      title: 'Service at Home',
      description: 'Our trained professionals arrive at your doorstep to provide the service',
      icon: <Sparkles className="w-8 h-8" />,
    },
    {
      step: '4',
      title: 'Pay Securely',
      description: 'Make payments securely online or via cash after service completion',
      icon: <Shield className="w-8 h-8" />,
    },
  ];

  const whyChooseUs = [
    {
      title: 'Verified Professionals',
      description: 'All our service providers are background verified and trained',
      icon: <CheckCircle2 className="w-6 h-6" />,
    },
    {
      title: 'Quality Guarantee',
      description: 'We ensure top-notch service quality with 100% satisfaction guarantee',
      icon: <Star className="w-6 h-6" />,
    },
    {
      title: 'Transparent Pricing',
      description: 'No hidden charges. Pay what you see with upfront pricing',
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: 'On-Time Service',
      description: 'We value your time and ensure punctual service delivery',
      icon: <Clock className="w-6 h-6" />,
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Ludhiana',
      rating: 5,
      text: 'Excellent service! The cleaning team was professional and thorough. My kitchen has never looked better!',
      service: 'Kitchen Deep Cleaning',
    },
    {
      name: 'Rahul Verma',
      location: 'Chandigarh',
      rating: 5,
      text: 'Very reliable and affordable. Used their AC service and it works perfectly now. Highly recommended!',
      service: 'AC Service & Repair',
    },
    {
      name: 'Anjali Gupta',
      location: 'Jalandhar',
      rating: 5,
      text: 'The sofa cleaning service was amazing. Removed all stains and my sofa looks brand new!',
      service: 'Sofa Cleaning',
    },
  ];

  // Show Services Page if that's the current view
  if (currentView === 'services') {
    return <ServicesPage onBack={() => setCurrentView('home')} />;
  }

  // Show Customer Dashboard if that's the current view
  if (currentView === 'dashboard') {
    return <CustomerDashboard onBack={() => setCurrentView('home')} />;
  }

  // Show Landing Page
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">Har Ghar Services</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setCurrentView('services')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Contact
              </button>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" onClick={() => setCurrentView('dashboard')}>
                My Dashboard
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="bg-cta hover:bg-cta/foreground text-cta-foreground">
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background p-4 space-y-3">
            <button
              onClick={() => { setCurrentView('services'); setMobileMenuOpen(false); }}
              className="block py-2 text-sm font-medium w-full text-left"
            >
              Services
            </button>
            <button
              onClick={() => { document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
              className="block py-2 text-sm font-medium w-full text-left"
            >
              How It Works
            </button>
            <button
              onClick={() => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
              className="block py-2 text-sm font-medium w-full text-left"
            >
              About Us
            </button>
            <button
              onClick={() => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}
              className="block py-2 text-sm font-medium w-full text-left"
            >
              Contact
            </button>
            <button
              onClick={() => { setCurrentView('dashboard'); setMobileMenuOpen(false); }}
              className="block py-2 text-sm font-medium w-full text-left"
            >
              My Dashboard
            </button>
            <div className="pt-3 flex flex-col gap-2">
              <Button variant="outline" asChild className="w-full">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="w-full bg-cta hover:bg-cta/foreground text-cta-foreground">
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              #1 Home Services Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Professional Home Services at Your Doorstep
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Get expert help for cleaning, repairs, maintenance, and more. Book trusted professionals in minutes.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for services like 'Kitchen Cleaning', 'AC Repair'..."
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button size="lg" className="h-12 px-8 bg-cta hover:bg-cta/foreground text-cta-foreground" onClick={() => setCurrentView('services')}>
                Search
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span>50,000+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span>1,000+ Verified Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span>4.8★ Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card key={category.name} className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1" onClick={() => setCurrentView('services')}>
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} services</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Popular Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional home services delivered by trained experts at affordable prices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <Card key={service.id} className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all" onClick={() => setCurrentView('services')}>
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-8xl">{service.image}</span>
                  {service.badge && (
                    <Badge className="absolute top-4 right-4">{service.badge}</Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{service.rating}</span>
                    <span className="text-sm text-muted-foreground">({service.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold">{service.price}</span>
                      <span className="text-sm text-muted-foreground ml-1">starting</span>
                    </div>
                    <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Book Now <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" onClick={() => setCurrentView('services')}>
              View All Services <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Booking a home service has never been easier. Just 4 simple steps!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="relative text-center">
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                  <div className="text-primary">{step.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4" variant="secondary">
                Why Choose Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Experience the Best Home Services
              </h2>
              <p className="text-muted-foreground mb-8">
                We are committed to providing exceptional home services with trained professionals,
                transparent pricing, and a 100% satisfaction guarantee.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyChooseUs.map((feature, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button size="lg" className="bg-cta hover:bg-cta/foreground text-cta-foreground" onClick={() => setCurrentView('services')}>
                  Book a Service Now <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">50K+</div>
                    <div className="text-sm text-muted-foreground">Happy Customers</div>
                  </div>
                  <div className="bg-background rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                    <div className="text-sm text-muted-foreground">Service Providers</div>
                  </div>
                  <div className="bg-background rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">100K+</div>
                    <div className="text-sm text-muted-foreground">Services Completed</div>
                  </div>
                  <div className="bg-background rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-primary mb-2">4.8</div>
                    <div className="text-sm text-muted-foreground">Average Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real reviews from real customers who trusted us with their home services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="mt-4">
                    {testimonial.service}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-900 to-teal-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of happy customers and experience professional home services like never before
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="bg-cta hover:bg-cta/foreground text-cta-foreground border-0">
              <Link href="/register">Create Free Account</Link>
            </Button>
            <Button size="lg" className="bg-white text-teal-900 hover:bg-cream-100" onClick={() => setCurrentView('services')}>
              Browse Services
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-background border-t mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Sparkles className="h-6 w-6" />
                </div>
                <span className="text-xl font-bold">Har Ghar Services</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Your trusted partner for professional home services. Quality, reliability, and customer satisfaction guaranteed.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="text-muted-foreground hover:text-primary transition-colors text-left w-full">About Us</button></li>
                <li><button onClick={() => setCurrentView('services')} className="text-muted-foreground hover:text-primary transition-colors text-left w-full">Services</button></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => setCurrentView('services')} className="text-muted-foreground hover:text-primary transition-colors text-left w-full">Cleaning Services</button></li>
                <li><button onClick={() => setCurrentView('services')} className="text-muted-foreground hover:text-primary transition-colors text-left w-full">Appliance Repair</button></li>
                <li><button onClick={() => setCurrentView('services')} className="text-muted-foreground hover:text-primary transition-colors text-left w-full">Plumbing</button></li>
                <li><button onClick={() => setCurrentView('services')} className="text-muted-foreground hover:text-primary transition-colors text-left w-full">Electrical Work</button></li>
                <li><button onClick={() => setCurrentView('services')} className="text-muted-foreground hover:text-primary transition-colors text-left w-full">Painting</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">123, Service Street, Ludhiana, Punjab, India</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <span className="text-muted-foreground">support@harghar.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Har Ghar Services. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-4">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms & Conditions</Link>
              <Link href="#" className="hover:text-primary transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
