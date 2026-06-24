'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { ServiceCard } from './ServiceCard';
import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface Service {
  id: number;
  title: string;
  price: string;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  category: string;
  description: string;
  features: string[];
  duration: string;
  gst: number;
}

interface ServicesPageProps {
  onBack: () => void;
}

export function ServicesPage({ onBack }: ServicesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Services', count: 68 },
    { id: 'cleaning', name: 'Cleaning', count: 15 },
    { id: 'appliances', name: 'Appliances', count: 12 },
    { id: 'plumbing', name: 'Plumbing', count: 8 },
    { id: 'electrical', name: 'Electrical', count: 10 },
    { id: 'painting', name: 'Painting', count: 6 },
    { id: 'carpentry', name: 'Carpentry', count: 7 },
  ];

  const services: Service[] = [
    {
      id: 1,
      title: 'Kitchen Deep Cleaning',
      price: '₹1,099',
      image: '🧹',
      rating: 4.8,
      reviews: 2340,
      badge: 'Bestseller',
      category: 'cleaning',
      description: 'Complete kitchen cleaning including cabinets, appliances, floors, and more. Our professionals use eco-friendly products.',
      features: [
        'Cabinet cleaning (inside & outside)',
        'Appliance deep cleaning',
        'Floor scrubbing & polishing',
        'Sink & faucet disinfection',
        'Tile & grout cleaning',
        'Exhaust fan cleaning'
      ],
      duration: '3-4 hours',
      gst: 18,
    },
    {
      id: 2,
      title: 'Bathroom Deep Cleaning',
      price: '₹899',
      image: '🚿',
      rating: 4.7,
      reviews: 1890,
      badge: 'Popular',
      category: 'cleaning',
      description: 'Thorough bathroom cleaning to remove all stains, germs, and odors. Special attention to tiles, fixtures, and fittings.',
      features: [
        'Complete tile & grout cleaning',
        'Toilet & basin disinfection',
        'Shower area deep cleaning',
        'Mirror & glass cleaning',
        'Drain cleaning',
        'Removal of water stains'
      ],
      duration: '2-3 hours',
      gst: 18,
    },
    {
      id: 3,
      title: 'Sofa Cleaning',
      price: '₹1,499',
      image: '🛋️',
      rating: 4.9,
      reviews: 1560,
      category: 'cleaning',
      description: 'Professional sofa cleaning to remove dust, stains, and allergens. Safe for all fabric types.',
      features: [
        'Dry vacuuming',
        'Shampooing & conditioning',
        'Stain treatment',
        'Fabric protection',
        'Deodorizing',
        'Quick drying'
      ],
      duration: '2-3 hours',
      gst: 18,
    },
    {
      id: 4,
      title: 'Full Home Cleaning',
      price: '₹3,499',
      image: '🏠',
      rating: 4.8,
      reviews: 2100,
      badge: 'Premium',
      category: 'cleaning',
      description: 'Complete home cleaning service covering all rooms, kitchen, bathrooms, and living areas.',
      features: [
        'All rooms dusting & cleaning',
        'Kitchen deep cleaning',
        'Bathroom deep cleaning',
        'Floor scrubbing & polishing',
        'Window & glass cleaning',
        'Cobweb removal'
      ],
      duration: '6-8 hours',
      gst: 18,
    },
    {
      id: 5,
      title: 'AC Service & Repair',
      price: '₹699',
      image: '❄️',
      rating: 4.6,
      reviews: 3240,
      category: 'appliances',
      description: 'Comprehensive AC service including cleaning, gas refill, and repair for all types of air conditioners.',
      features: [
        'Filter & coil cleaning',
        'Gas top-up & refill',
        'Leak detection & repair',
        'Compressor check',
        'Thermostat calibration',
        'Performance testing'
      ],
      duration: '1-2 hours',
      gst: 18,
    },
    {
      id: 6,
      title: 'Refrigerator Service',
      price: '₹599',
      image: '🧊',
      rating: 4.5,
      reviews: 1890,
      category: 'appliances',
      description: 'Professional refrigerator service to ensure optimal cooling and energy efficiency.',
      features: [
        'Coil cleaning',
        'Gas leak check',
        'Thermostat adjustment',
        'Door seal inspection',
        'Interior cleaning',
        'Performance test'
      ],
      duration: '1-2 hours',
      gst: 18,
    },
    {
      id: 7,
      title: 'Washing Machine Service',
      price: '₹549',
      image: '🧺',
      rating: 4.6,
      reviews: 1450,
      category: 'appliances',
      description: 'Complete washing machine service for top load and front load models.',
      features: [
        'Drum cleaning',
        'Filter cleaning/replacement',
        'Pipe & hose check',
        'Motor inspection',
        'Leak testing',
        'Performance optimization'
      ],
      duration: '1-2 hours',
      gst: 18,
    },
    {
      id: 8,
      title: 'Plumbing Services',
      price: '₹299',
      image: '🔧',
      rating: 4.7,
      reviews: 2100,
      category: 'plumbing',
      description: 'Expert plumbing services for all your household needs - repairs, installations, and maintenance.',
      features: [
        'Leak detection & repair',
        'Pipe fitting & replacement',
        'Tap & faucet repair',
        'Toilet repair & installation',
        'Drain cleaning',
        'Water heater service'
      ],
      duration: '1-3 hours',
      gst: 18,
    },
    {
      id: 9,
      title: 'Electrical Services',
      price: '₹349',
      image: '⚡',
      rating: 4.8,
      reviews: 2340,
      category: 'electrical',
      description: 'Safe and reliable electrical services by certified electricians.',
      features: [
        'Wiring & rewiring',
        'Switch & socket repair',
        'Fan installation & repair',
        'Light fixture installation',
        'Circuit breaker service',
        'Safety inspection'
      ],
      duration: '1-3 hours',
      gst: 18,
    },
    {
      id: 10,
      title: 'Wall Painting',
      price: '₹4,999',
      image: '🎨',
      rating: 4.7,
      reviews: 890,
      badge: 'Premium',
      category: 'painting',
      description: 'Professional wall painting services with premium quality paints and finishes.',
      features: [
        'Surface preparation',
        'Crack filling & smoothing',
        'Primer application',
        'Multiple paint coats',
        'Clean finish',
        'Post-paint cleanup'
      ],
      duration: '1-2 days',
      gst: 18,
    },
    {
      id: 11,
      title: 'Carpentry Work',
      price: '₹499',
      image: '🔨',
      rating: 4.6,
      reviews: 760,
      category: 'carpentry',
      description: 'Skilled carpentry services for repairs, installations, and custom work.',
      features: [
        'Furniture assembly',
        'Door & window repair',
        'Shelf installation',
        'Cabinet repair',
        'Custom woodwork',
        'Hardware replacement'
      ],
      duration: '2-4 hours',
      gst: 18,
    },
    {
      id: 12,
      title: 'Carpet Cleaning',
      price: '₹999',
      image: '🧶',
      rating: 4.7,
      reviews: 980,
      category: 'cleaning',
      description: 'Deep carpet cleaning to remove dirt, stains, and allergens effectively.',
      features: [
        'Vacuum cleaning',
        'Shampooing',
        'Stain removal',
        'Deodorizing',
        'Quick drying',
        'Fabric protection'
      ],
      duration: '2-3 hours',
      gst: 18,
    },
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold">Our Services</h1>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <a href="/login">Login</a>
              </Button>
              <Button asChild className="bg-cta hover:bg-cta-hover text-cta-foreground">
                <a href="/register">Sign Up</a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search & Filter Section */}
      <section className="bg-muted/30 border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full md:max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Advanced Filters Mobile */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <Label>Price Range</Label>
                    <Slider defaultValue={[0, 5000]} max={10000} step={100} className="mt-4" />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>₹0</span>
                      <span>₹10,000</span>
                    </div>
                  </div>
                  <div>
                    <Label>Rating</Label>
                    <div className="mt-2 space-y-2">
                      {['4+ Stars', '3+ Stars', '2+ Stars'].map((rating) => (
                        <div key={rating} className="flex items-center gap-2">
                          <Checkbox id={rating} />
                          <Label htmlFor={rating} className="cursor-pointer">{rating}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredServices.length}</span> services
            </p>
          </div>

          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No services found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
              <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
