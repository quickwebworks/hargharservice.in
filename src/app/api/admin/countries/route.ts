import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError, getPaginationParams } from '@/lib/prisma-helper';

export async function GET(request: NextRequest) {
  try {
    const { skip, pageSize } = getPaginationParams(request.nextUrl.searchParams);
    const search = request.nextUrl.searchParams.get('search');

    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { code: { contains: search, mode: 'insensitive' as const } },
      ],
    } : {};

    const [data, total] = await Promise.all([
      prisma.country.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: [{ order: 'asc' }, { name: 'asc' }],
      }),
      prisma.country.count({ where }),
    ]);

    return NextResponse.json({ data, total, page: Math.floor(skip / pageSize) + 1, pageSize });
  } catch (error) {
    return handleApiError(error, 'Failed to fetch countries');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, code, callingCode, isActive, order } = body;

    if (!name || !code) {
      return NextResponse.json({ error: 'Name and code are required' }, { status: 400 });
    }

    const existing = await prisma.country.findFirst({ where: { OR: [{ name }, { code }] } });
    if (existing) {
      return NextResponse.json({ error: 'Country name or code already exists' }, { status: 400 });
    }

    const country = await prisma.country.create({
      data: { name, code, callingCode, isActive: isActive ?? true, order: order ?? 0 },
    });

    return NextResponse.json(country, { status: 201 });
  } catch (error) {
    return handleApiError(error, 'Failed to create country');
  }
}