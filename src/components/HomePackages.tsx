'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ChevronRight, Clock, Star, Building } from 'lucide-react';

type Service = {
  id: string; title: string; slug: string; description: string;
  features: string[]; price: number; discountPrice: number | null; gst: number;
  duration: number; image: string | null; isFeatured: boolean; footerNote: string | null;
  category: string; categorySlug: string; categoryOrder: number;
};

const BHK_KEYS = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', 'Villa'] as const;
type BHK = (typeof BHK_KEYS)[number];

const sectionOrder = [
  'Home Cleaning Packages',
  'Moving & Renovation',
  'Festival & Events',
  'Focused Cleaning',
  'Maintenance Plans',
];

const homeFeatured = ['Home Fresh', 'Home Signature', 'Home Luxe'];

function parseBHKPrices(note: string | null): Partial<Record<BHK, number>> | null {
  if (!note) return null;
  const out: Partial<Record<BHK, number>> = {};
  for (const key of BHK_KEYS) {
    const re = new RegExp(key.replace(' ', '\\s?') + '\\s*₹\\s?([0-9,]+)', 'i');
    const m = note.match(re);
    if (m) out[key] = parseInt(m[1].replace(/,/g, ''), 10);
  }
  return Object.keys(out).length >= 3 ? out : null;
}

const inr = (n: number) => '₹' + n.toLocaleString('en-IN');

export function HomePackages() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [bhk, setBhk] = useState<BHK>('2 BHK');

  useEffect(() => {
    fetch('/api/packages')
      .then((r) => r.json())
      .then((d) => setServices(d.services || []))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, Service[]>();
    for (const s of services) {
      if (!sectionOrder.includes(s.category)) continue;
      if (!map.has(s.category)) map.set(s.category, []);
      map.get(s.category)!.push(s);
    }
    return sectionOrder
      .filter((c) => map.has(c))
      .map((c) => {
        let list = map.get(c)!;
        if (c === 'Home Cleaning Packages') {
          list = [...list].sort((a, b) => {
            const ai = homeFeatured.indexOf(a.title);
            const bi = homeFeatured.indexOf(b.title);
            if (ai !== -1 || bi !== -1) return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
            return a.price - b.price;
          });
        }
        return { category: c, items: list };
      });
  }, [services]);

  return (
    <section id="packages" className="py-12 md:py-16 bg-secondary/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <Badge variant="outline" className="mb-3 border-brand-500/30 text-brand-600 font-medium">Packages & Pricing</Badge>
          <h2 className="text-xl md:text-3xl font-bold">Home Cleaning Packages</h2>
          <p className="text-sm md:text-base text-muted-foreground mt-1 max-w-lg mx-auto">
            Transparent pricing for 1–5 BHK homes & villas. 18% GST extra.
          </p>

          {/* BHK selector */}
          <div className="mt-5">
            <p id="bhk-label" className="text-sm font-medium text-muted-foreground mb-2.5">Select your home size</p>
            <div role="group" aria-labelledby="bhk-label" className="flex flex-wrap justify-center gap-2">
              {BHK_KEYS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setBhk(k)}
                  aria-pressed={bhk === k}
                  className={`px-4 py-2.5 min-h-[44px] rounded-xl text-sm font-semibold transition-all border ${
                    bhk === k
                      ? 'bg-gradient-to-r from-brand-400 to-brand-600 text-white border-transparent shadow-lg shadow-brand-500/25'
                      : 'bg-background/60 border-border/60 hover:bg-muted'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground text-sm">Loading packagesâ€¦</div>
        ) : (
          <div className="space-y-12">
            {grouped.map((section) => (
              <div key={section.category}>
                <div className="flex items-center gap-3 mb-5">
                  <h3 className="text-lg md:text-xl font-bold tracking-tight">{section.category}</h3>
                  <div className="h-px flex-1 bg-border/60" />
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {section.items.map((s) => {
                    const bhkPrices = parseBHKPrices(s.footerNote);
                    const displayPrice = bhkPrices?.[bhk] ?? s.price;
                    return (
                      <Card key={s.id} className="group relative overflow-hidden border-border/60 hover:shadow-lg transition-all hover:-translate-y-1">
                        {s.isFeatured && (
                          <div className="absolute top-3 right-3 z-10">
                            <Badge className="bg-coral-500 text-white border-0 shadow-sm shadow-coral-500/30">
                              <Star className="h-3 w-3 mr-1 fill-current" /> Featured
                            </Badge>
                          </div>
                        )}
                        <CardContent className="p-5 flex flex-col h-full">
                          <h4 className="font-bold text-base mb-1 group-hover:text-brand-600 transition-colors">{s.title}</h4>
                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">{s.description}</p>

                          <div className="mb-4">
                            <div className="flex items-baseline gap-2">
                              <span className="text-2xl font-extrabold text-brand-700 font-display">{inr(displayPrice)}</span>
                              {bhkPrices && <span className="text-xs text-muted-foreground">for {bhk}</span>}
                            </div>
                            {!bhkPrices && s.footerNote && (
                              <p className="text-xs text-muted-foreground mt-1">{s.footerNote}</p>
                            )}
                          </div>

                          <ul className="space-y-1.5 mb-5 flex-1">
                            {s.features.slice(0, 4).map((f) => (
                              <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="h-4 w-4 text-mint shrink-0 mt-0.5" />
                                <span>{f}</span>
                              </li>
                            ))}
                            {s.features.length > 4 && (
                              <li className="text-xs text-muted-foreground/70 pl-6">+{s.features.length - 4} more</li>
                            )}
                          </ul>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                            <Clock className="h-3.5 w-3.5" /> ~{s.duration} min
                            <span className="ml-auto">+18% GST</span>
                          </div>

                          <Button asChild className="w-full btn-brand font-semibold rounded-xl">
                            <a href="https://forms.gle/AcBVbVMDqnwGq2mR7" target="_blank" rel="noopener noreferrer">
                              Book Now
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Final quote note */}
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <Card className="border-border/60 bg-background/60">
            <CardContent className="p-5">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Building className="h-4 w-4 text-brand-600" />
                <span className="font-semibold text-sm">Final quote confirmed before booking</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Prices are starting rates. Final quote depends on area, condition & selected extras.
                Repairs, spare parts, AC gas, heavy debris removal, specialist polishing & work at height need separate quotes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
