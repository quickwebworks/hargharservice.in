import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'cleaning' },
      update: {},
      create: {
        title: 'Cleaning',
        slug: 'cleaning',
        description: 'Professional cleaning services for your home',
        icon: '🧹',
        isActive: true,
        order: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'appliances' },
      update: {},
      create: {
        title: 'Appliance Repair',
        slug: 'appliances',
        description: 'Expert repair and maintenance for all home appliances',
        icon: '🔧',
        isActive: true,
        order: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'plumbing' },
      update: {},
      create: {
        title: 'Plumbing',
        slug: 'plumbing',
        description: 'Reliable plumbing services for all your needs',
        icon: '🚰',
        isActive: true,
        order: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'electrical' },
      update: {},
      create: {
        title: 'Electrical',
        slug: 'electrical',
        description: 'Safe and professional electrical services',
        icon: '⚡',
        isActive: true,
        order: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'painting' },
      update: {},
      create: {
        title: 'Painting',
        slug: 'painting',
        description: 'Professional painting services for your home',
        icon: '🎨',
        isActive: true,
        order: 5,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'carpentry' },
      update: {},
      create: {
        title: 'Carpentry',
        slug: 'carpentry',
        description: 'Skilled carpentry work for repairs and installations',
        icon: '🔨',
        isActive: true,
        order: 6,
      },
    }),
  ]);

  console.log(`Created ${categories.length} categories`);

  // Create services
  const services = await Promise.all([
    // Cleaning services
    prisma.service.upsert({
      where: { slug: 'kitchen-deep-cleaning' },
      update: {},
      create: {
        categoryId: categories[0].id,
        title: 'Kitchen Deep Cleaning',
        slug: 'kitchen-deep-cleaning',
        description: 'Complete kitchen cleaning including cabinets, appliances, floors, and more. Our professionals use eco-friendly products to ensure a sparkling clean kitchen.',
        features: JSON.stringify([
          'Cabinet cleaning (inside & outside)',
          'Appliance deep cleaning',
          'Floor scrubbing & polishing',
          'Sink & faucet disinfection',
          'Tile & grout cleaning',
          'Exhaust fan cleaning'
        ]),
        price: 1099,
        discountPrice: 999,
        gst: 18,
        duration: 240,
        image: 'kitchen-cleaning.jpg',
        isActive: true,
        isFeatured: true,
        footerNote: 'Includes all cleaning materials. Additional charges for extra heavy cleaning.',
      },
    }),
    prisma.service.upsert({
      where: { slug: 'bathroom-deep-cleaning' },
      update: {},
      create: {
        categoryId: categories[0].id,
        title: 'Bathroom Deep Cleaning',
        slug: 'bathroom-deep-cleaning',
        description: 'Thorough bathroom cleaning to remove all stains, germs, and odors. Special attention to tiles, fixtures, and fittings.',
        features: JSON.stringify([
          'Complete tile & grout cleaning',
          'Toilet & basin disinfection',
          'Shower area deep cleaning',
          'Mirror & glass cleaning',
          'Drain cleaning',
          'Removal of water stains'
        ]),
        price: 899,
        discountPrice: 799,
        gst: 18,
        duration: 180,
        image: 'bathroom-cleaning.jpg',
        isActive: true,
        isFeatured: true,
      },
    }),
    prisma.service.upsert({
      where: { slug: 'sofa-cleaning' },
      update: {},
      create: {
        categoryId: categories[0].id,
        title: 'Sofa Cleaning',
        slug: 'sofa-cleaning',
        description: 'Professional sofa cleaning to remove dust, stains, and allergens. Safe for all fabric types.',
        features: JSON.stringify([
          'Dry vacuuming',
          'Shampooing & conditioning',
          'Stain treatment',
          'Fabric protection',
          'Deodorizing',
          'Quick drying'
        ]),
        price: 1499,
        gst: 18,
        duration: 180,
        image: 'sofa-cleaning.jpg',
        isActive: true,
        isFeatured: true,
      },
    }),
    prisma.service.upsert({
      where: { slug: 'full-home-cleaning' },
      update: {},
      create: {
        categoryId: categories[0].id,
        title: 'Full Home Cleaning',
        slug: 'full-home-cleaning',
        description: 'Complete home cleaning service covering all rooms, kitchen, bathrooms, and living areas.',
        features: JSON.stringify([
          'All rooms dusting & cleaning',
          'Kitchen deep cleaning',
          'Bathroom deep cleaning',
          'Floor scrubbing & polishing',
          'Window & glass cleaning',
          'Cobweb removal'
        ]),
        price: 3499,
        discountPrice: 2999,
        gst: 18,
        duration: 480,
        image: 'home-cleaning.jpg',
        isActive: true,
        isFeatured: true,
        footerNote: 'Suitable for 2BHK. Additional charges for larger homes.',
      },
    }),

    // Appliance services
    prisma.service.upsert({
      where: { slug: 'ac-service-repair' },
      update: {},
      create: {
        categoryId: categories[1].id,
        title: 'AC Service & Repair',
        slug: 'ac-service-repair',
        description: 'Comprehensive AC service including cleaning, gas refill, and repair for all types of air conditioners.',
        features: JSON.stringify([
          'Filter & coil cleaning',
          'Gas top-up & refill',
          'Leak detection & repair',
          'Compressor check',
          'Thermostat calibration',
          'Performance testing'
        ]),
        price: 699,
        gst: 18,
        duration: 120,
        image: 'ac-service.jpg',
        isActive: true,
        isFeatured: true,
      },
    }),
    prisma.service.upsert({
      where: { slug: 'refrigerator-service' },
      update: {},
      create: {
        categoryId: categories[1].id,
        title: 'Refrigerator Service',
        slug: 'refrigerator-service',
        description: 'Professional refrigerator service to ensure optimal cooling and energy efficiency.',
        features: JSON.stringify([
          'Coil cleaning',
          'Gas leak check',
          'Thermostat adjustment',
          'Door seal inspection',
          'Interior cleaning',
          'Performance test'
        ]),
        price: 599,
        gst: 18,
        duration: 90,
        image: 'refrigerator-service.jpg',
        isActive: true,
      },
    }),

    // Plumbing services
    prisma.service.upsert({
      where: { slug: 'plumbing-services' },
      update: {},
      create: {
        categoryId: categories[2].id,
        title: 'Plumbing Services',
        slug: 'plumbing-services',
        description: 'Expert plumbing services for all your household needs - repairs, installations, and maintenance.',
        features: JSON.stringify([
          'Leak detection & repair',
          'Pipe fitting & replacement',
          'Tap & faucet repair',
          'Toilet repair & installation',
          'Drain cleaning',
          'Water heater service'
        ]),
        price: 299,
        gst: 18,
        duration: 120,
        image: 'plumbing.jpg',
        isActive: true,
      },
    }),

    // Electrical services
    prisma.service.upsert({
      where: { slug: 'electrical-services' },
      update: {},
      create: {
        categoryId: categories[3].id,
        title: 'Electrical Services',
        slug: 'electrical-services',
        description: 'Safe and reliable electrical services by certified electricians.',
        features: JSON.stringify([
          'Wiring & rewiring',
          'Switch & socket repair',
          'Fan installation & repair',
          'Light fixture installation',
          'Circuit breaker service',
          'Safety inspection'
        ]),
        price: 349,
        gst: 18,
        duration: 120,
        image: 'electrical.jpg',
        isActive: true,
      },
    }),

    // Painting services
    prisma.service.upsert({
      where: { slug: 'wall-painting' },
      update: {},
      create: {
        categoryId: categories[4].id,
        title: 'Wall Painting',
        slug: 'wall-painting',
        description: 'Professional wall painting services with premium quality paints and finishes.',
        features: JSON.stringify([
          'Surface preparation',
          'Crack filling & smoothing',
          'Primer application',
          'Multiple paint coats',
          'Clean finish',
          'Post-paint cleanup'
        ]),
        price: 4999,
        gst: 18,
        duration: 1440,
        image: 'painting.jpg',
        isActive: true,
        isFeatured: true,
        footerNote: 'Price per room (approx 100 sq.ft). Actual cost may vary.',
      },
    }),

    // Carpentry services
    prisma.service.upsert({
      where: { slug: 'carpentry-work' },
      update: {},
      create: {
        categoryId: categories[5].id,
        title: 'Carpentry Work',
        slug: 'carpentry-work',
        description: 'Skilled carpentry services for repairs, installations, and custom work.',
        features: JSON.stringify([
          'Furniture assembly',
          'Door & window repair',
          'Shelf installation',
          'Cabinet repair',
          'Custom woodwork',
          'Hardware replacement'
        ]),
        price: 499,
        gst: 18,
        duration: 180,
        image: 'carpentry.jpg',
        isActive: true,
      },
    }),
  ]);

  console.log(`Created ${services.length} services`);

  // Create coupons
  const coupons = await Promise.all([
    prisma.coupon.upsert({
      where: { code: 'WELCOME50' },
      update: {},
      create: {
        code: 'WELCOME50',
        type: 'FLAT',
        discount: 50,
        minAmount: 500,
        maxDiscount: 50,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        usageLimit: 1000,
        isActive: true,
      },
    }),
    prisma.coupon.upsert({
      where: { code: 'FIRST10' },
      update: {},
      create: {
        code: 'FIRST10',
        type: 'PERCENTAGE',
        discount: 10,
        minAmount: 1000,
        maxDiscount: 200,
        expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
        usageLimit: 500,
        isActive: true,
      },
    }),
  ]);

  console.log(`Created ${coupons.length} coupons`);

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@harghar.com' },
    update: {},
    create: {
      email: 'admin@harghar.com',
      phone: '9876543210',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });

  console.log(`Created admin user: ${admin.email}`);

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
