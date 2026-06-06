import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testDatabaseCRUD() {
  console.log('🔍 Testing Database CRUD Operations...\n');

  try {
    // 1. READ - Test connection and existing data
    console.log('1️⃣ Testing READ operations...');
    
    const categories = await prisma.category.findMany();
    console.log(`   ✅ Found ${categories.length} categories`);
    
    const services = await prisma.service.findMany();
    console.log(`   ✅ Found ${services.length} services`);
    
    const coupons = await prisma.coupon.findMany();
    console.log(`   ✅ Found ${coupons.length} coupons`);
    
    const users = await prisma.user.findMany();
    console.log(`   ✅ Found ${users.length} users`);
    
    // 2. CREATE - Test creating a new booking
    console.log('\n2️⃣ Testing CREATE operation...');
    
    // First, get a service to use
    const service = await prisma.service.findFirst();
    if (!service) {
      console.log('   ⚠️  No services found, skipping CREATE test');
    } else {
      const testBooking = await prisma.booking.create({
        data: {
          bookingNo: 'TEST' + Date.now(),
          customerId: 'test-customer-id',
          serviceId: service.id,
          bookingDate: new Date('2025-12-25'),
          timeSlot: '10:00',
          address: JSON.stringify({
            fullName: 'Test User',
            phone: '9999999999',
            addressLine1: '123 Test Street',
            city: 'Test City',
            state: 'Test State',
            pincode: '123456'
          }),
          subtotal: 1000,
          gst: 18,
          gstAmount: 180,
          discount: 0,
          totalAmount: 1180,
          paymentStatus: 'PENDING',
          bookingStatus: 'PENDING',
        }
      });
      console.log(`   ✅ Created booking: ${testBooking.bookingNo}`);
      
      // 3. UPDATE - Test updating the booking
      console.log('\n3️⃣ Testing UPDATE operation...');
      
      const updatedBooking = await prisma.booking.update({
        where: { id: testBooking.id },
        data: {
          bookingStatus: 'CONFIRMED',
          notes: 'Test notes added'
        }
      });
      console.log(`   ✅ Updated booking status to: ${updatedBooking.bookingStatus}`);
      
      // 4. DELETE - Test deleting the booking
      console.log('\n4️⃣ Testing DELETE operation...');
      
      await prisma.booking.delete({
        where: { id: testBooking.id }
      });
      console.log('   ✅ Deleted test booking');
    }
    
    // 5. Test relations
    console.log('\n5️⃣ Testing RELATIONS...');
    
    const serviceWithCategory = await prisma.service.findFirst({
      include: {
        category: true,
        _count: {
          select: {
            bookings: true
          }
        }
      }
    });
    
    if (serviceWithCategory) {
      console.log(`   ✅ Service: ${serviceWithCategory.title}`);
      console.log(`   ✅ Category: ${serviceWithCategory.category.title}`);
      console.log(`   ✅ Bookings count: ${serviceWithCategory._count.bookings}`);
    }
    
    // 6. Test filtering and search
    console.log('\n6️⃣ Testing FILTERING & SEARCH...');
    
    const activeServices = await prisma.service.findMany({
      where: {
        isActive: true,
        isFeatured: true
      }
    });
    console.log(`   ✅ Found ${activeServices.length} active featured services`);
    
    const categoryServices = await prisma.category.findFirst({
      where: { slug: 'cleaning' },
      include: {
        services: {
          where: { isActive: true }
        }
      }
    });
    
    if (categoryServices) {
      console.log(`   ✅ Cleaning category has ${categoryServices.services.length} active services`);
    }
    
    console.log('\n✅ All CRUD operations are working correctly!\n');
    
    // Database summary
    console.log('📊 Database Summary:');
    console.log(`   - Categories: ${categories.length}`);
    console.log(`   - Services: ${services.length}`);
    console.log(`   - Coupons: ${coupons.length}`);
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Bookings: ${await prisma.booking.count()}`);
    
  } catch (error) {
    console.error('\n❌ Error testing CRUD operations:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseCRUD();