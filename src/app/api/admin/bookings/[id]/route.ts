import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError, getPaginationParams } from '@/lib/prisma-helper';

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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const existing = await prisma.booking.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });

    const booking = await prisma.booking.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(booking);
  } catch (error) {
    return handleApiError(error, 'Failed to update booking');
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.booking.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, 'Failed to delete booking');
  }
}