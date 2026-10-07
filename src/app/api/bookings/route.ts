import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { sendBookingConfirmation, sendBookingAdminNotification } from '@/lib/email';

// Validation schema
const createBookingSchema = z.object({
  serviceId: z.string().min(1, 'Service ID is required'),
  bookingDate: z.string().min(1, 'Booking date is required'),
  timeSlot: z.string().min(1, 'Time slot is required'),
  address: z.object({
    fullName: z.string().min(2, 'Full name is required'),
    phone: z.string().min(10, 'Phone number is required'),
    addressLine1: z.string().min(5, 'Address is required'),
    addressLine2: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    pincode: z.string().min(6, 'Pincode is required'),
  }),
  notes: z.string().optional(),
  quantity: z.number().min(1).default(1),
  couponCode: z.string().optional(),
  email: z.string().email().optional(),
  customerEmail: z.string().email().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Get user from token (in a real app, verify JWT)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    // In production, verify token here
    // For now, we'll use a dummy user ID
    const userId = 'dummy-user-id';

    const body = await request.json();

    // Validate input
    const validation = createBookingSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.errors },
        { status: 400 }
      );
    }

    const { serviceId, bookingDate, timeSlot, address, notes, quantity, couponCode } = validation.data;

    // Get service details
    const service = await db.service.findUnique({
      where: { id: serviceId }
    });

    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    if (!service.isActive) {
      return NextResponse.json(
        { error: 'Service is not available' },
        { status: 400 }
      );
    }

    // Calculate pricing
    const basePrice = service.discountPrice || service.price;
    const subtotal = basePrice * quantity;
    const gstAmount = (subtotal * service.gst) / 100;
    let discount = 0;

    // Apply coupon if provided
    if (couponCode) {
      const coupon = await db.coupon.findUnique({
        where: { code: couponCode }
      });

      if (coupon && coupon.isActive && new Date() <= coupon.expiryDate) {
        if (coupon.type === 'PERCENTAGE') {
          discount = (subtotal * coupon.discount) / 100;
          if (coupon.maxDiscount && discount > coupon.maxDiscount) {
            discount = coupon.maxDiscount;
          }
        } else {
          discount = coupon.discount;
        }
      }
    }

    const totalAmount = subtotal + gstAmount - discount;

    // Generate booking number
    const bookingNo = 'HGS' + Date.now().toString().slice(-8);

    // Create booking
    const booking = await db.booking.create({
      data: {
        bookingNo,
        customerId: userId,
        serviceId,
        bookingDate: new Date(bookingDate),
        timeSlot,
        address: JSON.stringify(address),
        notes,
        quantity,
        subtotal,
        gst: service.gst,
        gstAmount,
        discount,
        couponCode,
        totalAmount,
        paymentStatus: 'PENDING',
        bookingStatus: 'PENDING',
      },
      include: {
        service: {
          include: {
            category: true
          }
        }
      }
    });

    // Fire-and-forget emails (don't block the response)
    const addr = [
      address.addressLine1,
      address.addressLine2,
      address.city,
      address.state,
      address.pincode,
    ].filter(Boolean).join(', ');

    const emailData = {
      bookingNo,
      customerName: address.fullName,
      customerEmail: body.email || body.customerEmail || undefined,
      serviceTitle: service.title,
      category: service.category?.title,
      bookingDate: new Date(bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      timeSlot,
      quantity,
      subtotal,
      gstAmount,
      discount,
      totalAmount,
      address: addr,
      phone: address.phone,
      notes,
    };

    void Promise.allSettled([
      sendBookingConfirmation(emailData),
      sendBookingAdminNotification(emailData),
    ]);

    return NextResponse.json({
      message: 'Booking created successfully',
      booking,
    }, { status: 201 });

  } catch (error) {
    console.error('Create booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const customerId = searchParams.get('customerId');
    const status = searchParams.get('status');

    // Build where clause
    const where: any = {};

    if (customerId) {
      where.customerId = customerId;
    }

    if (status) {
      where.bookingStatus = status;
    }

    // Fetch bookings
    const bookings = await db.booking.findMany({
      where,
      include: {
        service: {
          include: {
            category: true
          }
        },
        executive: {
          select: {
            id: true,
            name: true,
            phone: true,
          }
        },
        payment: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      bookings,
      count: bookings.length,
    });

  } catch (error) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
