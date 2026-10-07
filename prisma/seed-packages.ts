import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const slug = (t: string) =>
  t.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const feats = (arr: string[]) => JSON.stringify(arr);

// BHK price matrix type
type BHK = { bhk1: number; bhk2: number; bhk3: number; bhk4: number; bhk5: number; villa: number };
const bhkNote = (p: BHK) =>
  `1 BHK ₹${p.bhk1.toLocaleString('en-IN')} · 2 BHK ₹${p.bhk2.toLocaleString('en-IN')} · 3 BHK ₹${p.bhk3.toLocaleString('en-IN')} · 4 BHK ₹${p.bhk4.toLocaleString('en-IN')} · 5 BHK ₹${p.bhk5.toLocaleString('en-IN')} · Villa ₹${p.villa.toLocaleString('en-IN')}`;

async function main() {
  console.log('🌱 Seeding package catalogue...\n');

  // ─── Categories ─────────────────────────────────────────
  const categoryDefs = [
    { title: 'Home Cleaning Packages', slug: 'home-cleaning-packages', description: 'BHK-based full-home cleaning packages', icon: '🏠', order: 10 },
    { title: 'Moving & Renovation', slug: 'moving-renovation', description: 'Move-in, move-out and post-renovation cleaning', icon: '📦', order: 11 },
    { title: 'Festival & Events', slug: 'festival-events', description: 'Pre-party, after-party and festive cleaning', icon: '🎉', order: 12 },
    { title: 'Focused Cleaning', slug: 'focused-cleaning', description: 'Item-count bundles for kitchens, bathrooms, upholstery & more', icon: '🎯', order: 13 },
    { title: 'Maintenance Plans', slug: 'maintenance-plans', description: 'Recurring monthly and annual home-care plans', icon: '🔄', order: 14 },
  ];

  const cat: Record<string, string> = {};
  for (const c of categoryDefs) {
    const r = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { title: c.title, description: c.description, icon: c.icon, order: c.order },
      create: c,
    });
    cat[c.slug] = r.id;
    console.log(`✅ Category: ${c.title}`);
  }

  // ─── 1) Home Cleaning Packages (BHK-tiered) ──────────────
  const homePackages: Array<{ title: string; desc: string; inclusions: string[]; prices: BHK; duration: number; featured?: boolean }> = [
    { title: 'Daily Fresh', desc: 'Routine cleaning — per visit, not a daily subscription.', duration: 60,
      inclusions: ['Accessible surface dusting', 'Sweeping', 'Mopping', 'Kitchen-counter wiping', 'Light bathroom cleaning'],
      prices: { bhk1: 999, bhk2: 1499, bhk3: 1999, bhk4: 2499, bhk5: 2999, villa: 4499 } },
    { title: 'Home Fresh', desc: 'Essential deep cleaning for the whole home.', duration: 180, featured: true,
      inclusions: ['Bedrooms', 'Living/dining areas', 'One kitchen', 'Bathrooms within limits', 'Floors, fans, doors', 'Accessible interior windows', 'Cobweb removal'],
      prices: { bhk1: 2499, bhk2: 3499, bhk3: 4499, bhk4: 5999, bhk5: 7499, villa: 8999 } },
    { title: 'Home Signature', desc: 'Deep cleaning + upholstery care.', duration: 240, featured: true,
      inclusions: ['Home Fresh + sofa cleaning', 'One carpet up to 50 sq ft', 'Chimney cleaning', 'Balcony scrubbing', 'Empty wardrobe interiors'],
      prices: { bhk1: 3499, bhk2: 4999, bhk3: 6499, bhk4: 8499, bhk5: 10499, villa: 12999 } },
    { title: 'Home Luxe', desc: 'Complete home care, top to bottom.', duration: 360, featured: true,
      inclusions: ['Home Signature + mattress cleaning', 'One refrigerator', 'One microwave', 'Cleaning of two AC units'],
      prices: { bhk1: 5499, bhk2: 6999, bhk3: 8999, bhk4: 11999, bhk5: 14499, villa: 17999 } },
    { title: 'Festive Shine', desc: 'Festival cleaning to make your home sparkle.', duration: 240,
      inclusions: ['Home Signature + accessible decorative fixtures', 'Pooja-area cleaning', 'Entrance detailing'],
      prices: { bhk1: 3999, bhk2: 5499, bhk3: 6999, bhk4: 8999, bhk5: 10999, villa: 13999 } },
  ];

  for (const p of homePackages) {
    await prisma.service.upsert({
      where: { slug: slug(p.title) },
      update: { categoryId: cat['home-cleaning-packages'], title: p.title, description: p.desc, features: feats(p.inclusions), price: p.prices.bhk1, duration: p.duration, isFeatured: p.featured ?? false, footerNote: bhkNote(p.prices), isActive: true },
      create: { categoryId: cat['home-cleaning-packages'], title: p.title, slug: slug(p.title), description: p.desc, features: feats(p.inclusions), price: p.prices.bhk1, gst: 18, duration: p.duration, isFeatured: p.featured ?? false, footerNote: bhkNote(p.prices), isActive: true },
    });
    console.log(`  ✔ ${p.title}`);
  }

  // ─── 2) Moving & Renovation ──────────────────────────────
  const movingPackages = [
    { title: 'Move-In Ready', desc: 'Empty-home move-in cleaning.', duration: 180,
      inclusions: ['Empty rooms', 'Empty cabinet interiors', 'Kitchen', 'Bathrooms', 'Floors, doors', 'Accessible windows'],
      prices: { bhk1: 2999, bhk2: 3999, bhk3: 4999, bhk4: 6499, bhk5: 7999, villa: 9999 } },
    { title: 'Move-Out Refresh', desc: 'Empty-home move-out cleaning.', duration: 180,
      inclusions: ['Empty-property cleaning', 'Cupboards', 'Kitchen degreasing', 'Bathrooms', 'Removable surface marks'],
      prices: { bhk1: 2999, bhk2: 3999, bhk3: 4999, bhk4: 6499, bhk5: 7999, villa: 9999 } },
    { title: 'Renovation Reset', desc: 'Post-renovation cleaning.', duration: 300,
      inclusions: ['Fine-dust removal', 'Repeated vacuuming/mopping', 'Accessible glass', 'Treatment of removable paint/cement residue'],
      prices: { bhk1: 4999, bhk2: 6499, bhk3: 8499, bhk4: 10999, bhk5: 13499, villa: 16999 } },
  ];
  for (const p of movingPackages) {
    await prisma.service.upsert({
      where: { slug: slug(p.title) },
      update: { categoryId: cat['moving-renovation'], title: p.title, description: p.desc, features: feats(p.inclusions), price: p.prices.bhk1, duration: p.duration, footerNote: bhkNote(p.prices), isActive: true },
      create: { categoryId: cat['moving-renovation'], title: p.title, slug: slug(p.title), description: p.desc, features: feats(p.inclusions), price: p.prices.bhk1, gst: 18, duration: p.duration, footerNote: bhkNote(p.prices), isActive: true },
    });
    console.log(`  ✔ ${p.title}`);
  }

  // ─── 3) Festival & Events ────────────────────────────────
  const eventPackages = [
    { title: 'Celebration Ready', desc: 'Pre-party preparation cleaning.', duration: 120,
      inclusions: ['Living/dining areas', 'Guest bathrooms', 'Kitchen counters', 'Entrance', 'Floor cleaning'],
      prices: { bhk1: 1499, bhk2: 1999, bhk3: 2499, bhk4: 3499, bhk5: 4499, villa: 5999 } },
    { title: 'After-Party Refresh', desc: 'After-party cleaning.', duration: 120,
      inclusions: ['Bagging ordinary waste', 'Floor cleaning', 'Kitchen surfaces', 'Bathrooms', 'Accessible spill treatment'],
      prices: { bhk1: 1999, bhk2: 2499, bhk3: 3499, bhk4: 4499, bhk5: 5499, villa: 7499 } },
  ];
  for (const p of eventPackages) {
    await prisma.service.upsert({
      where: { slug: slug(p.title) },
      update: { categoryId: cat['festival-events'], title: p.title, description: p.desc, features: feats(p.inclusions), price: p.prices.bhk1, duration: p.duration, footerNote: bhkNote(p.prices), isActive: true },
      create: { categoryId: cat['festival-events'], title: p.title, slug: slug(p.title), description: p.desc, features: feats(p.inclusions), price: p.prices.bhk1, gst: 18, duration: p.duration, footerNote: bhkNote(p.prices), isActive: true },
    });
    console.log(`  ✔ ${p.title}`);
  }

  // ─── 4) Focused Cleaning Bundles ─────────────────────────
  const focused: Array<{ title: string; desc: string; price: number; duration: number }> = [
    { title: 'Kitchen Essential', price: 1099, duration: 90, desc: 'One empty kitchen; accessible cabinets, sink, counters and floors' },
    { title: 'Kitchen Signature', price: 1399, duration: 120, desc: 'One occupied kitchen; cabinet exteriors, counters, sink and floors' },
    { title: 'Kitchen Luxe', price: 2499, duration: 180, desc: 'Kitchen Signature + chimney, microwave and single-door refrigerator' },
    { title: 'Bathroom Duo', price: 899, duration: 90, desc: 'Two bathrooms, deep cleaning' },
    { title: 'Bathroom Trio', price: 1299, duration: 120, desc: 'Three bathrooms, deep cleaning' },
    { title: 'Bathroom Family', price: 1699, duration: 150, desc: 'Four bathrooms, deep cleaning' },
    { title: 'Bathroom Grand', price: 2099, duration: 180, desc: 'Five bathrooms, deep cleaning' },
    { title: 'Sofa Fresh', price: 699, duration: 60, desc: 'Up to five sofa seats' },
    { title: 'Lounge Refresh', price: 1099, duration: 90, desc: 'Five sofa seats + one carpet up to 50 sq ft' },
    { title: 'Sleep Fresh Duo', price: 1599, duration: 90, desc: 'Two double mattresses' },
    { title: 'Bedroom Refresh', price: 1499, duration: 90, desc: 'One bedroom deep clean + one double mattress' },
    { title: 'Dining Shine', price: 299, duration: 45, desc: 'One dining table + six chairs' },
    { title: 'Appliance Refresh', price: 899, duration: 90, desc: 'Chimney + single-door refrigerator + microwave' },
    { title: 'Laundry Fresh', price: 999, duration: 60, desc: 'One washing machine; accessible drum, drawer, seal and filter' },
    { title: 'Cool Care Duo', price: 899, duration: 90, desc: 'Cleaning of two AC units' },
    { title: 'Cool Care Family', price: 1699, duration: 150, desc: 'Cleaning of four AC units' },
    { title: 'Tank Fresh', price: 649, duration: 60, desc: 'One accessible tank, up to 1,000 litres' },
    { title: 'Tank Fresh Plus', price: 1199, duration: 90, desc: 'One accessible tank, up to 2,000 litres' },
    { title: 'Balcony Refresh', price: 499, duration: 45, desc: 'One balcony, up to 100 sq ft' },
    { title: 'Terrace Shine', price: 1499, duration: 90, desc: 'Terrace floor cleaning, up to 500 sq ft' },
    { title: 'Driveway Refresh', price: 1499, duration: 90, desc: 'Driveway pressure washing, up to 500 sq ft' },
  ];
  for (const f of focused) {
    await prisma.service.upsert({
      where: { slug: slug(f.title) },
      update: { categoryId: cat['focused-cleaning'], title: f.title, description: f.desc, features: feats([f.desc]), price: f.price, duration: f.duration, footerNote: `₹${f.price.toLocaleString('en-IN')}`, isActive: true },
      create: { categoryId: cat['focused-cleaning'], title: f.title, slug: slug(f.title), description: f.desc, features: feats([f.desc]), price: f.price, gst: 18, duration: f.duration, footerNote: `₹${f.price.toLocaleString('en-IN')}`, isActive: true },
    });
    console.log(`  ✔ ${f.title} — ₹${f.price}`);
  }

  // ─── 5) Maintenance Plans ────────────────────────────────
  const plans: Array<{ title: string; desc: string; visits: string; prices: BHK; featured?: boolean }> = [
    { title: 'Fresh Four', desc: 'Monthly maintenance — 4 visits/month. Each visit covers the Daily Fresh checklist.', visits: '4 visits/month', featured: true,
      prices: { bhk1: 3499, bhk2: 4999, bhk3: 6999, bhk4: 8499, bhk5: 9999, villa: 14999 } },
    { title: 'Care 12', desc: 'Annual maintenance — 12 visits/year. Each visit covers the Daily Fresh checklist.', visits: '12 visits/year',
      prices: { bhk1: 9999, bhk2: 14999, bhk3: 19999, bhk4: 24999, bhk5: 29999, villa: 44999 } },
    { title: 'Care 24', desc: 'Annual maintenance — 24 visits/year. Each visit covers the Daily Fresh checklist.', visits: '24 visits/year',
      prices: { bhk1: 18999, bhk2: 27999, bhk3: 37999, bhk4: 46999, bhk5: 56999, villa: 84999 } },
  ];
  for (const p of plans) {
    await prisma.service.upsert({
      where: { slug: slug(p.title) },
      update: { categoryId: cat['maintenance-plans'], title: p.title, description: p.desc, features: feats(['Each visit covers the Daily Fresh checklist', 'Deep cleaning and specialist services charged separately']), price: p.prices.bhk1, duration: 60, isFeatured: p.featured ?? false, footerNote: `${p.visits} · ${bhkNote(p.prices)}`, isActive: true },
      create: { categoryId: cat['maintenance-plans'], title: p.title, slug: slug(p.title), description: p.desc, features: feats(['Each visit covers the Daily Fresh checklist', 'Deep cleaning and specialist services charged separately']), price: p.prices.bhk1, gst: 18, duration: 60, isFeatured: p.featured ?? false, footerNote: `${p.visits} · ${bhkNote(p.prices)}`, isActive: true },
    });
    console.log(`  ✔ ${p.title}`);
  }

  console.log('\n🎉 Package catalogue seeded.');
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
