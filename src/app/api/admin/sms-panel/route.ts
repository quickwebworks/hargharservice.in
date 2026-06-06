import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError, getPaginationParams } from '@/lib/prisma-helper';

export async function GET(request: NextRequest) {
  try {
    const { skip, pageSize } = getPaginationParams(request.nextUrl.searchParams);
    const search = request.nextUrl.searchParams.get('search');
    const status = request.nextUrl.searchParams.get('status');

    const where: any = {};
    if (search) {
      where.OR = [
        { phoneNumber: { contains: search } },
        { message: { contains: search, mode: 'insensitive' as const } },
      ];
    }
    if (status) where.status = status;

    const [data, total] = await Promise.all([
      prisma.sMSPanel.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.sMSPanel.count({ where }),
    ]);

    return NextResponse.json({ data, total, page: Math.floor(skip / pageSize) + 1, pageSize });
  } catch (error) {
    return handleApiError(error, 'Failed to fetch SMS records');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, message, provider } = body;

    if (!phoneNumber || !message) {
      return NextResponse.json({ error: 'Phone number and message are required' }, { status: 400 });
    }

    const sms = await prisma.sMSPanel.create({
      data: {
        phoneNumber,
        message,
        status: 'PENDING',
        provider,
      },
    });

    // TODO: Integrate with SMS provider (MSG91, Twilio, etc.)
    // For now, just mark as sent

    return NextResponse.json(sms, { status: 201 });
  } catch (error) {
    return handleApiError(error, 'Failed to send SMS');
  }
}