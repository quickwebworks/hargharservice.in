import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError, getPaginationParams } from '@/lib/prisma-helper';

export async function GET(request: NextRequest) {
  try {
    const { skip, pageSize } = getPaginationParams(request.nextUrl.searchParams);
    const search = request.nextUrl.searchParams.get('search');
    const stateId = request.nextUrl.searchParams.get('stateId');

    const where: any = {};
    if (search) where.name = { contains: search, mode: 'insensitive' as const };
    if (stateId) where.stateId = stateId;

    const [data, total] = await Promise.all([
      prisma.city.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: [{ order: 'asc' }, { name: 'asc' }],
        include: { state: { select: { name: true, country: { select: { name: true } } } } },
      }),
      prisma.city.count({ where }),
    ]);

    return NextResponse.json({ data, total, page: Math.floor(skip / pageSize) + 1, pageSize });
  } catch (error) {
    return handleApiError(error, 'Failed to fetch cities');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stateId, name, isActive, order } = body;

    if (!stateId || !name) {
      return NextResponse.json({ error: 'State and name are required' }, { status: 400 });
    }

    const existing = await prisma.city.findFirst({ where: { stateId, name } });
    if (existing) {
      return NextResponse.json({ error: 'City name already exists in this state' }, { status: 400 });
    }

    const city = await prisma.city.create({
      data: { stateId, name, isActive: isActive ?? true, order: order ?? 0 },
    });

    return NextResponse.json(city, { status: 201 });
  } catch (error) {
    return handleApiError(error, 'Failed to create city');
  }
}