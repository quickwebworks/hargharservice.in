import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testDatabaseAndAPI() {
  console.log('🔍 Testing Database & API Integration...\n');

  try {
    // 1. Test READ operations
    console.log('1️⃣ Testing READ operations...');
    
    const categories = await prisma.category.findMany({
      orderBy: { order: 'asc' }
    });
    console.log(`   ✅ Categories: ${categories.length}`);
    categories.forEach(cat => {
      console.log(`      - ${cat.title} (${cat.slug})`);
    });
    
    const services = await prisma.service.findMany({
      include: { category: true },
      where: { isActive: true }
    });
    console.log(`   ✅ Active Services: ${services.length}`);
    services.slice(0, 3).forEach(svc => {
      console.log(`      - ${svc.title} - ₹${svc.price} (${svc.category.title})`);
    });
    
    const coupons = await prisma.coupon.findMany();
    console.log(`   ✅ Coupons: ${coupons.length}`);
    coupons.forEach(coupon => {
      console.log(`      - ${coupon.code}: ${coupon.discount}${coupon.type === 'PERCENTAGE' ? '%' : '₹'} off`);
    });
    
    const users = await prisma.user.findMany();
    console.log(`   ✅ Users: ${users.length}`);
    users.forEach(user => {
      console.log(`      - ${user.email} (${user.role})`);
    });
    
    // 2. Test CREATE operations
    console.log('\n2️⃣ Testing CREATE operation...');
    
    // Create a test user first
    const testUser = await prisma.user.create({
      data: {
        email: `test${Date.now()}@example.com`,
        phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
        name: 'Test Customer',
        password: 'hashed_password_here',
        role: 'CUSTOMER',
        status: 'ACTIVE',
      }
    });
    console.log(`   ✅ Created test user: ${testUser.email} (ID: ${testUser.id})`);
    
    // Create a test address
    const testAddress = await prisma.address.create({
      data: {
        customerId: testUser.id,
        label: 'Home',
        fullName: 'Test User',
        phone: testUser.phone,
        addressLine1: '123 Test Street',
        city: 'Ludhiana',
        state: 'Punjab',
        pincode: '141001',
        isDefault: true,
      }
    });
    console.log(`   ✅ Created test address: ${testAddress.label}`);
    
    // Create a test booking
    const service = await prisma.service.findFirst();
    if (service) {
      const testBooking = await prisma.booking.create({
        data: {
          bookingNo: 'HGS' + Date.now().toString().slice(-8),
          customerId: testUser.id,
          serviceId: service.id,
          bookingDate: new Date('2025-12-25'),
          timeSlot: '10:00',
          address: JSON.stringify({
            fullName: 'Test User',
            phone: testUser.phone,
            addressLine1: '123 Test Street',
            city: 'Ludhiana',
            state: 'Punjab',
            pincode: '141001'
          }),
          subtotal: service.price,
          gst: service.gst,
          gstAmount: (service.price * service.gst) / 100,
          discount: 0,
          totalAmount: service.price * (1 + service.gst / 100),
          paymentStatus: 'PENDING',
          bookingStatus: 'PENDING',
        }
      });
      console.log(`   ✅ Created test booking: ${testBooking.bookingNo}`);
      
      // Create a test payment
      const testPayment = await prisma.payment.create({
        data: {
          bookingId: testBooking.id,
          amount: testBooking.totalAmount,
          paymentMethod: 'COD',
          status: 'PENDING',
        }
      });
      console.log(`   ✅ Created test payment: ${testPayment.id}`);
      
      // Create a test review
      const testReview = await prisma.review.create({
        data: {
          customerId: testUser.id,
          serviceId: service.id,
          bookingId: testBooking.id,
          rating: 5,
          review: 'Excellent service!',
          isActive: true,
        }
      });
      console.log(`   ✅ Created test review: ${testReview.id}`);
      
      // 3. Test UPDATE operations
      console.log('\n3️⃣ Testing UPDATE operations...');
      
      const updatedBooking = await prisma.booking.update({
        where: { id: testBooking.id },
        data: {
          bookingStatus: 'CONFIRMED',
          notes: 'Customer confirmed booking',
        }
      });
      console.log(`   ✅ Updated booking status: ${updatedBooking.bookingStatus}`);
      
      const updatedAddress = await prisma.address.update({
        where: { id: testAddress.id },
        data: {
          addressLine2: 'Near Test Market',
        }
      });
      console.log(`   ✅ Updated address with line 2`);
      
      const updatedService = await prisma.service.update({
        where: { id: service.id },
        data: {
          isFeatured: true,
        }
      });
      console.log(`   ✅ Updated service featured status`);
      
      // 4. Test DELETE operations
      console.log('\n4️⃣ Testing DELETE operations...');
      
      await prisma.review.delete({
        where: { id: testReview.id }
      });
      console.log('   ✅ Deleted test review');
      
      await prisma.payment.delete({
        where: { id: testPayment.id }
      });
      console.log('   ✅ Deleted test payment');
      
      await prisma.booking.delete({
        where: { id: testBooking.id }
      });
      console.log('   ✅ Deleted test booking');
      
      await prisma.address.delete({
        where: { id: testAddress.id }
      });
      console.log('   ✅ Deleted test address');
      
      await prisma.user.delete({
        where: { id: testUser.id }
      });
      console.log('   ✅ Deleted test user');
    }
    
    // 5. Test complex queries
    console.log('\n5️⃣ Testing complex queries...');
    
    const categoryWithServices = await prisma.category.findFirst({
      where: { slug: 'cleaning' },
      include: {
        services: {
          where: { isActive: true },
          include: {
            _count: {
              select: { bookings: true }
            }
          },
          orderBy: { price: 'asc' }
        }
      }
    });
    
    if (categoryWithServices) {
      console.log(`   ✅ Category "${categoryWithServices.title}" has ${categoryWithServices.services.length} services`);
    }
    
    const featuredServices = await prisma.service.findMany({
      where: {
        isActive: true,
        isFeatured: true
      },
      include: {
        category: true,
        reviews: {
          where: { isActive: true }
        }
      },
      take: 5
    });
    
    console.log(`   ✅ Found ${featuredServices.length} featured services`);
    
    // 6. Test filtering and pagination
    console.log('\n6️⃣ Testing filtering & pagination...');
    
    const filteredServices = await prisma.service.findMany({
      where: {
        isActive: true,
        price: {
          gte: 500,
          lte: 1500
        }
      },
      skip: 0,
      take: 5,
      orderBy: { price: 'asc' }
    });
    
    console.log(`   ✅ Found ${filteredServices.length} services priced ₹500-₹1500`);
    
    console.log('\n✅ All CRUD operations and complex queries are working!\n');
    
    // Database summary
    console.log('📊 Final Database Summary:');
    console.log(`   - Categories: ${await prisma.category.count()}`);
    console.log(`   - Services: ${await prisma.service.count()}`);
    console.log(`   - Coupons: ${await prisma.coupon.count()}`);
    console.log(`   - Users: ${await prisma.user.count()}`);
    console.log(`   - Addresses: ${await prisma.address.count()}`);
    console.log(`   - Bookings: ${await prisma.booking.count()}`);
    console.log(`   - Payments: ${await prisma.payment.count()}`);
    console.log(`   - Reviews: ${await prisma.review.count()}`);
    
    console.log('\n🎉 Database is fully operational with CRUD capabilities!');
    
  } catch (error) {
    console.error('\n❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseAndAPI();