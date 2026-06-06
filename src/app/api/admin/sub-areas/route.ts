import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError, getPaginationParams } from '@/lib/prisma-helper';

export async function GET(request: NextRequest) {
  try {
    const { skip, pageSize } = getPaginationParams(request.nextUrl.searchParams);
    const search = request.nextUrl.searchParams.get('search');
    const areaId = request.nextUrl.searchParams.get('areaId');

    const where: any = {};
    if (search) where.name = { contains: search, mode: 'insensitive' as const };
    if (areaId) where.areaId = areaId;

    const [data, total] = await Promise.all([
      prisma.subArea.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: [{ order: 'asc' }, { name: 'asc' }],
        include: { area: { select: { name: true, city: { select: { name: true } } } } },
      }),
      prisma.subArea.count({ where }),
    ]);

    return NextResponse.json({ data, total, page: Math.floor(skip / pageSize) + 1, pageSize });
  } catch (error) {
    return handleApiError(error, 'Failed to fetch sub-areas');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { areaId, name, isActive, order } = body;

    if (!areaId || !name) {
      return NextResponse.json({ error: 'Area and name are required' }, { status: 400 });
    }

    const existing = await prisma.subArea.findFirst({ where: { areaId, name } });
    if (existing) {
      return NextResponse.json({ error: 'Sub-area name already exists in this area' }, { status: 400 });
    }

    const subArea = await prisma.subArea.create({
      data: { areaId, name, isActive: isActive ?? true, order: order ?? 0 },
    });

    return NextResponse.json(subArea, { status: 201 });
  } catch (error) {
    return handleApiError(error, 'Failed to create sub-area');
  }
}