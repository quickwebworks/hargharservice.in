import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError, getPaginationParams } from '@/lib/prisma-helper';

// GET - List all bookings
export async function GET(request: NextRequest) {
  try {
    const { skip, pageSize } = getPaginationParams(request.nextUrl.searchParams);
    const search = request.nextUrl.searchParams.get('search');
    const status = request.nextUrl.searchParams.get('status');
    const paymentStatus = request.nextUrl.searchParams.get('paymentStatus');

    const where: any = {};
    if (search) {
      where.OR = [
        { bookingNo: { contains: search, mode: 'insensitive' as const } },
        { customer: { name: { contains: search, mode: 'insensitive' as const } } },
        { customer: { email: { contains: search, mode: 'insensitive' as const } } },
      ];
    }
    if (status) where.bookingStatus = status;
    if (paymentStatus) where.paymentStatus = paymentStatus;

    const [data, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          customer: { select: { name: true, email: true, phone: true } },
          service: { select: { title: true } },
          executive: { select: { name: true, phone: true } },
        },
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({ data, total, page: Math.floor(skip / pageSize) + 1, pageSize });
  } catch (error) {
    return handleApiError(error, 'Failed to fetch bookings');
  }
}

// POST - Create a new booking (for admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerId, serviceId, executiveId, subServiceId, bookingDate, timeSlot, address, notes, quantity, subtotal, gst, gstAmount, discount, couponCode, totalAmount, paymentStatus, bookingStatus } = body;

    if (!customerId || !serviceId || !bookingDate || !timeSlot || !totalAmount) {
      return NextResponse.json({ error: 'Customer, service, date, time, and amount are required' }, { status: 400 });
    }

    const bookingNo = `BK${Date.now()}`;

    const booking = await prisma.booking.create({
      data: {
        bookingNo,
        customerId,
        serviceId,
        executiveId,
        subServiceId,
        bookingDate: new Date(bookingDate),
        timeSlot,
        address: address ? JSON.stringify(address) : null,
        notes,
        quantity: quantity || 1,
        subtotal: parseFloat(subtotal) || 0,
        gst: gst ? parseFloat(gst) : 18,
        gstAmount: gstAmount ? parseFloat(gstAmount) : 0,
        discount: discount ? parseFloat(discount) : 0,
        couponCode,
        totalAmount: parseFloat(totalAmount),
        paymentStatus: paymentStatus || 'PENDING',
        bookingStatus: bookingStatus || 'PENDING',
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    return handleApiError(error, 'Failed to create booking');
  }
}