import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError, getPaginationParams } from '@/lib/prisma-helper';

export async function GET(request: NextRequest) {
  try {
    const { skip, pageSize } = getPaginationParams(request.nextUrl.searchParams);
    const search = request.nextUrl.searchParams.get('search');
    const status = request.nextUrl.searchParams.get('status');
    const priority = request.nextUrl.searchParams.get('priority');

    const where: any = {};
    if (search) {
      where.OR = [
        { booking: { bookingNo: { contains: search, mode: 'insensitive' as const } } },
        { customer: { name: { contains: search, mode: 'insensitive' as const } } },
        { service: { title: { contains: search, mode: 'insensitive' as const } } },
      ];
    }
    if (status) where.jobStatus = status;
    if (priority) where.priority = priority;

    const [data, total] = await Promise.all([
      prisma.job.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          booking: { select: { bookingNo: true } },
          customer: { select: { name: true, phone: true } },
          service: { select: { title: true } },
          executive: { select: { name: true, phone: true } },
        },
      }),
      prisma.job.count({ where }),
    ]);

    return NextResponse.json({ data, total, page: Math.floor(skip / pageSize) + 1, pageSize });
  } catch (error) {
    return handleApiError(error, 'Failed to fetch jobs');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, customerId, serviceId, executiveId, assignedBy, scheduledDate, scheduledTime, estimatedDuration, notes, priority } = body;

    if (!bookingId || !customerId || !serviceId || !scheduledDate || !scheduledTime) {
      return NextResponse.json({ error: 'Booking, customer, service, date, and time are required' }, { status: 400 });
    }

    const job = await prisma.job.create({
      data: {
        bookingId,
        customerId,
        serviceId,
        executiveId,
        assignedBy,
        scheduledDate: new Date(scheduledDate),
        scheduledTime,
        estimatedDuration: parseInt(estimatedDuration) || 60,
        notes,
        priority: priority || 'MEDIUM',
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    return handleApiError(error, 'Failed to create job');
  }
}