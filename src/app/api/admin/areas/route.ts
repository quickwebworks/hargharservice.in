import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError, getPaginationParams } from '@/lib/prisma-helper';

export async function GET(request: NextRequest) {
  try {
    const { skip, pageSize } = getPaginationParams(request.nextUrl.searchParams);
    const search = request.nextUrl.searchParams.get('search');
    const cityId = request.nextUrl.searchParams.get('cityId');

    const where: any = {};
    if (search) where.name = { contains: search, mode: 'insensitive' as const };
    if (cityId) where.cityId = cityId;

    const [data, total] = await Promise.all([
      prisma.area.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: [{ order: 'asc' }, { name: 'asc' }],
        include: { city: { select: { name: true, state: { select: { name: true } } } } },
      }),
      prisma.area.count({ where }),
    ]);

    return NextResponse.json({ data, total, page: Math.floor(skip / pageSize) + 1, pageSize });
  } catch (error) {
    return handleApiError(error, 'Failed to fetch areas');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cityId, name, isActive, order } = body;

    if (!cityId || !name) {
      return NextResponse.json({ error: 'City and name are required' }, { status: 400 });
    }

    const existing = await prisma.area.findFirst({ where: { cityId, name } });
    if (existing) {
      return NextResponse.json({ error: 'Area name already exists in this city' }, { status: 400 });
    }

    const area = await prisma.area.create({
      data: { cityId, name, isActive: isActive ?? true, order: order ?? 0 },
    });

    return NextResponse.json(area, { status: 201 });
  } catch (error) {
    return handleApiError(error, 'Failed to create area');
  }
}