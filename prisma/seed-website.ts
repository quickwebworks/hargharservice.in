import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper: slugify
const slug = (t: string) =>
  t.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Helper: build features JSON array
const feats = (arr: string[]) => JSON.stringify(arr);

async function main() {
  console.log('🌱 Seeding Har Ghar Cleaning Services data...\n');

  // ─── Categories ───────────────────────────────────────────
  const categoryDefs = [
    { title: 'Home Cleaning', slug: 'home-cleaning', description: 'Professional residential cleaning for every room', icon: '🏠', order: 1 },
    { title: 'Kitchen & Appliances', slug: 'kitchen-appliances', description: 'Deep cleaning for kitchen and home appliances', icon: '🍳', order: 2 },
    { title: 'Furniture & Upholstery', slug: 'furniture-upholstery', description: 'Sofa, carpet, chair and furniture cleaning', icon: '🛋️', order: 3 },
    { title: 'Home Services', slug: 'home-services', description: 'Electrician, plumber, AC and carpentry experts', icon: '🔧', order: 4 },
    { title: 'Specialty Services', slug: 'specialty-services', description: 'Car wash, pest control, pet grooming & more', icon: '✨', order: 5 },
  ];

  const categories: Record<string, string> = {};
  for (const c of categoryDefs) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { title: c.title, description: c.description, icon: c.icon, order: c.order },
      create: c,
    });
    categories[c.slug] = cat.id;
    console.log(`✅ Category: ${c.title}`);
  }

  // ─── Services ─────────────────────────────────────────────
  // price = base "Book Now" price from live site; features from live site
  const services: Array<{
    cat: string; title: string; description: string; features: string[];
    price: number; discountPrice?: number; duration: number; image: string;
    isFeatured?: boolean; footerNote?: string;
  }> = [
    // ── Home Cleaning ──
    {
      cat: 'home-cleaning', title: 'Kitchen Cleaning', price: 1099, duration: 120,
      image: '/images/kitchen-cleanning.jpg', isFeatured: true,
      description: 'Comprehensive kitchen cleaning for a spotless, organized, and hygienic cooking space.',
      features: ['Dusting and Mopping', 'Floor Scrubbing and Mopping', 'Sinks and Faucet Cleaning', 'Cabinet and Drawer Inside Cleaning', 'Countertop and Surface Wiping', 'Wall Wiping and Stain Removal'],
      footerNote: 'Starting ₹1099',
    },
    {
      cat: 'home-cleaning', title: 'Bedroom & Hall Cleaning', price: 799, duration: 90,
      image: '/images/bedroom-cleaning.jpg', isFeatured: true,
      description: 'Comprehensive bedroom & hall cleaning for a fresh, tidy living space.',
      features: ['Bed Cleaning', 'Complete Room Organization', 'Floor Cleaning & Dusting', 'Furniture & Surface Wiping', 'Window & Wall Cleaning'],
      footerNote: 'Starting ₹799',
    },
    {
      cat: 'home-cleaning', title: 'Bath Room Cleaning', price: 449, duration: 60,
      image: '/images/bathroom-cleanning.jpg', isFeatured: true,
      description: 'Professional bathroom cleaning for a sanitized and fresh space.',
      features: ['Toilet Seats & Sink Cleaning', 'Floor and Tile Scrubbing', 'Shower & Faucet Cleaning', 'Mirror & Glass Cleaning', 'Removal of Soap Scum and Grime', 'Exhaust Fan and Ceiling Fan Cleaning'],
      footerNote: 'Starting ₹449',
    },
    {
      cat: 'home-cleaning', title: 'Water Tank Cleaning', price: 649, duration: 90,
      image: '/images/water-tank-cleaning.jpg',
      description: 'Get your water tank thoroughly cleaned and sanitized for just ₹0.649 per litre.',
      features: ['Thorough removal of dirt, sludge, and contaminants', 'Scrubbing and sanitizing of tank walls and floor', 'Algae and bacteria elimination', 'Use of safe, eco-friendly cleaning agents', 'Ensured clean and hygienic water storage'],
      footerNote: '₹0.649 per litre',
    },
    {
      cat: 'home-cleaning', title: 'Glass Cleaning', price: 299, duration: 45,
      image: '/images/glass-cleaning.jpg',
      description: 'Crystal-clear glass cleaning for spotless shine and better visibility.',
      features: ['1 Glass Door/Window Cleaning', 'Dust and grime removal', 'Stain and watermark treatment', 'Streak-free glass polish', 'Interior and exterior glass surface cleaning'],
    },

    // ── Kitchen & Appliances ──
    {
      cat: 'kitchen-appliances', title: 'Kitchen Cleaning - Empty', price: 1099, duration: 120,
      image: '/images/kitchen-cleanning-2.jpg',
      description: 'Comprehensive cleaning for a spotless, organized, and hygienic empty kitchen.',
      features: ['Cabinet and drawer dusting', 'Floor and tile scrubbing', 'Mirror and glass cleaning', 'Removal of stains and grime', 'Faucet and showerhead descaling'],
    },
    {
      cat: 'kitchen-appliances', title: 'Kitchen Cleaning - Full', price: 2499, duration: 180,
      image: '/images/kitchen-cleanning-1.jpg',
      description: 'Comprehensive deep cleaning for a spotless, hygienic full kitchen including appliances.',
      features: ['Countertop and surface wiping', 'Sink and faucet cleaning', 'Floor scrubbing and mopping', 'Cabinet and drawer dusting', 'Appliance cleaning (e.g., oven, microwave)'],
    },
    {
      cat: 'kitchen-appliances', title: 'Chimney Cleaning', price: 449, duration: 60,
      image: '/images/chimney-cleaning.jpg',
      description: 'Chimney cleaning to remove soot, debris, and ensure safe airflow.',
      features: ['Removal of soot and debris', 'Thorough chimney inspection', 'Clearing blockages for better airflow', 'Cleaning of chimney walls and flue', 'Safe and efficient cleaning techniques'],
    },
    {
      cat: 'kitchen-appliances', title: 'Refrigerator Cleaning - Single Door', price: 399, duration: 45,
      image: '/images/refrigerator-cleaning-single-door.jpg',
      description: 'Detailed cleaning for a spotless, fresh, and odor-free single-door refrigerator.',
      features: ['Interior shelf and drawer cleaning', 'Removal of expired food and spills', 'Door seal and gasket cleaning', 'Exterior wiping and polishing', 'Odor removal for freshness'],
    },
    {
      cat: 'kitchen-appliances', title: 'Refrigerator Cleaning - Double Door', price: 499, duration: 60,
      image: '/images/refrigerator-cleaning-double-door.jpg',
      description: 'Complete cleaning for a fresh, hygienic, and odor-free double-door refrigerator.',
      features: ['Interior cleaning of shelves, drawers, and compartments', 'Removal of spills and expired food', 'Door seal and gasket cleaning', 'Exterior surface cleaning and polishing', 'Deodorizing for long-lasting freshness'],
    },
    {
      cat: 'kitchen-appliances', title: 'Microwave Cleaning', price: 149, duration: 30,
      image: '/images/microwave-cleaning.jpg',
      description: 'Thorough cleaning for a spotless and odor-free microwave.',
      features: ['Interior scrubbing to remove food stains', 'Deodorizing to eliminate odors', 'Cleaning of microwave door and exterior', 'Safe and eco-friendly cleaning agents used'],
      footerNote: '₹149 per service',
    },
    {
      cat: 'kitchen-appliances', title: 'Ceiling Fan Cleaning', price: 59, duration: 20,
      image: '/images/celling-fan.jpg',
      description: 'Dust and grime removal for clean, efficient fan performance.',
      features: ['Blade dusting and wiping', 'Motor and housing cleaning', 'Removal of grease and buildup', 'Ensuring smooth operation'],
      footerNote: '₹59 per fan',
    },

    // ── Furniture & Upholstery ──
    {
      cat: 'furniture-upholstery', title: 'Sofa & Carpet Cleaning', price: 499, duration: 90,
      image: '/images/sofa-dry-cleaning.jpg', isFeatured: true,
      description: 'Sofa & carpet professional cleaning — sofa at ₹119 per seat, 1 standard size carpet at ₹499.',
      features: ['Sofa Cleaning ₹119 Per Seat & 1 Standard Size Carpet ₹499', 'Deep Cleaning to remove dirt and stains', 'Sanitizing to eliminate allergens and bacteria', 'Odor removal for a fresh, clean smell', 'Gentle cleaning techniques to protect fabric and fibers', 'Quick drying process for minimal downtime'],
      footerNote: '₹119/seat · ₹499/carpet',
    },
    {
      cat: 'furniture-upholstery', title: 'Sofa Dry Cleaning', price: 149, duration: 60,
      image: '/images/sofa-dry-cleaning-1.jpg',
      description: 'Gentle and effective dry cleaning for a refreshed and spotless sofa.',
      features: ['Sofa Dry Cleaning ₹119 Per Seat', 'Dry cleaning to remove stains and dirt', 'Upholstery spot treatment', 'Deep cleaning without moisture', 'Deodorizing for a fresh scent'],
      footerNote: '₹119 per seat',
    },
    {
      cat: 'furniture-upholstery', title: 'Carpet Cleaning', price: 499, duration: 60,
      image: '/images/carpet-cleaning.jpg',
      description: 'Deep cleaning for a fresh, stain-free, and hygienic carpet.',
      features: ['1 Standard Size Carpet Cleaning ₹499', 'Vacuuming to remove loose dirt', 'Stain and spot treatment', 'Deep steam or dry cleaning', 'Odor removal and deodorizing'],
    },
    {
      cat: 'furniture-upholstery', title: 'Chair Cleaning', price: 49, duration: 30,
      image: '/images/chair-cleaning.jpg',
      description: 'Thorough cleaning for spotless, fresh, and well-maintained chairs.',
      features: ['Surface dusting and wiping', 'Upholstery vacuuming or spot cleaning', 'Stain and dirt removal', 'Polishing of metal or wood surfaces'],
      footerNote: '₹49 per chair',
    },
    {
      cat: 'furniture-upholstery', title: 'Dining Table Cleaning', price: 249, duration: 45,
      image: '/images/dinning-table-cleaning.jpg',
      description: 'Comprehensive cleaning for a spotless and hygienic dining space — 6 dining chairs and 1 dining table.',
      features: ['6 Dining Chairs and 1 Dining Table', 'Surface dusting and wiping', 'Stain and spill removal', 'Polishing of wood, glass, or metal surfaces', 'Cleaning of legs and underneath areas'],
    },
    {
      cat: 'furniture-upholstery', title: 'Bed Box Dry Cleaning', price: 499, duration: 60,
      image: '/images/bed-box-cleaning.jpg',
      description: 'Thorough dry cleaning for a clean, dust-free bed box. Back only ₹499, Back & Wall both ₹899.',
      features: ['Bed Box Dry Cleaning Back ₹499 / Back & Wall ₹899', 'Removal of dust and dirt', 'Vacuuming of all compartments', 'Surface wiping and spot treatment', 'Deodorizing for freshness'],
      footerNote: 'Back ₹499 · Back & Wall ₹899',
    },
    {
      cat: 'furniture-upholstery', title: 'Bathroom Normal Cleaning', price: 449, duration: 60,
      image: '/images/bathroom-cleanning.jpg',
      description: 'Efficient cleaning for a tidy and sanitized bathroom.',
      features: ['Toilet and sink cleaning', 'Floor and tile scrubbing', 'Mirror and glass polishing', 'Shower area cleaning', 'General surface wiping'],
    },
    {
      cat: 'furniture-upholstery', title: 'Bathroom Deep Cleaning', price: 499, duration: 90,
      image: '/images/bathroom-cleanning-2.jpg',
      description: 'Thorough cleaning for a spotless, sanitized, and fresh bathroom.',
      features: ['Deep scrubbing of floors and tiles', 'Toilet, sink, and faucet descaling', 'Showerhead and tap cleaning', 'Removal of grime, mold, and stains', 'Mirror and glass cleaning', 'Full sanitization of all surfaces'],
    },

    // ── Home Services ──
    {
      cat: 'home-services', title: 'Electrician Services', price: 499, duration: 60,
      image: '/images/electrician.jpg',
      description: 'Safe and professional electrical work for your home and office.',
      features: ['Fan, Light, or Switch Repair', 'Installation of fans, lights, and switches', 'Power socket and wiring fixes', 'Short circuit and fuse issue resolution', 'Load checking and electrical safety inspection'],
    },
    {
      cat: 'home-services', title: 'Plumber Service', price: 499, duration: 60,
      image: '/images/plumber.jpg',
      description: 'Expert plumbing solutions for leak-free, smooth water flow and fittings.',
      features: ['Tap, Pipe, or Sink Repair', 'Fixing water leakage and blockages', 'Installation of taps, faucets, and showers', 'Drain cleaning and pipe unclogging', 'Bathroom and kitchen plumbing maintenance'],
    },
    {
      cat: 'home-services', title: 'AC Repair or Service', price: 499, duration: 90,
      image: '/images/ac.jpg',
      description: 'Fast and reliable AC services to keep you cool and comfortable.',
      features: ['Window/Split AC Repair', 'Thorough AC inspection and diagnosis', 'Gas level check and top-up (if needed)', 'Cooling issue and noise troubleshooting', 'Filter and coil cleaning for better performance'],
    },
    {
      cat: 'home-services', title: 'Carpenter Services', price: 499, duration: 60,
      image: '/images/carpanter.jpg',
      description: 'Skilled woodwork solutions for repairs, fittings, and custom furniture needs.',
      features: ['Minor Repairs or Fittings', 'Door, window, and handle fixes', 'Bed, chair, or table repair', 'Installation of shelves, hinges, and locks', 'Custom woodwork and polishing (on request)'],
    },

    // ── Specialty Services ──
    {
      cat: 'specialty-services', title: 'Car Wash', price: 249, duration: 60,
      image: '/images/car-wash.jpg', isFeatured: true,
      description: 'Professional car wash services in Ludhiana — we ensure your vehicle receives the care it deserves, clean inside and out.',
      features: ['Normal Foam Wash', 'Foam Wash with Vacuum Cleaning', 'Dry Cleaning for Hatchbacks, Sedans, or SUVs', 'Compounding and Exterior Detailing for a spotless, polished finish'],
      footerNote: 'Starting ₹249',
    },
    {
      cat: 'specialty-services', title: 'Pest Control', price: 1, duration: 90,
      image: '/images/pest-control.jpg',
      description: 'Protect your home or office with professional pest control at just ₹1 per square yard.',
      features: ['Full pest inspection', 'Eco-friendly pest removal', 'Effective treatment for common pests', 'Preventive measures', 'Expert pest control team'],
      footerNote: '₹1 per square yard',
    },
    {
      cat: 'specialty-services', title: 'Pet Grooming', price: 699, duration: 90,
      image: '/images/pet-grooming.jpg',
      description: 'Pamper your pet with gentle, hygienic, and professional grooming care.',
      features: ['Full Grooming for Dogs/Cats', 'Bathing with pet-safe shampoo', 'Nail trimming and ear cleaning', 'Hair brushing and haircut/styling', 'Tick and flea treatment (optional)'],
    },
  ];

  let count = 0;
  for (const s of services) {
    const serviceSlug = slug(s.title);
    await prisma.service.upsert({
      where: { slug: serviceSlug },
      update: {
        categoryId: categories[s.cat],
        title: s.title,
        description: s.description,
        features: feats(s.features),
        price: s.price,
        discountPrice: s.discountPrice ?? null,
        duration: s.duration,
        image: s.image,
        isFeatured: s.isFeatured ?? false,
        footerNote: s.footerNote ?? null,
        isActive: true,
      },
      create: {
        categoryId: categories[s.cat],
        title: s.title,
        slug: serviceSlug,
        description: s.description,
        features: feats(s.features),
        price: s.price,
        discountPrice: s.discountPrice ?? null,
        gst: 18,
        duration: s.duration,
        image: s.image,
        isFeatured: s.isFeatured ?? false,
        footerNote: s.footerNote ?? null,
        isActive: true,
      },
    });
    count++;
    console.log(`  ✔ ${s.title} — ₹${s.price}`);
  }

  console.log(`\n🎉 Seeded ${count} services across ${categoryDefs.length} categories.`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
