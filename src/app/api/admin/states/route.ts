import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError, getPaginationParams } from '@/lib/prisma-helper';

export async function GET(request: NextRequest) {
  try {
    const { skip, pageSize } = getPaginationParams(request.nextUrl.searchParams);
    const search = request.nextUrl.searchParams.get('search');
    const countryId = request.nextUrl.searchParams.get('countryId');

    const where: any = {};
    if (search) where.name = { contains: search, mode: 'insensitive' as const };
    if (countryId) where.countryId = countryId;

    const [data, total] = await Promise.all([
      prisma.state.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: [{ order: 'asc' }, { name: 'asc' }],
        include: { country: { select: { name: true, code: true } } },
      }),
      prisma.state.count({ where }),
    ]);

    return NextResponse.json({ data, total, page: Math.floor(skip / pageSize) + 1, pageSize });
  } catch (error) {
    return handleApiError(error, 'Failed to fetch states');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { countryId, name, code, isActive, order } = body;

    if (!countryId || !name) {
      return NextResponse.json({ error: 'Country and name are required' }, { status: 400 });
    }

    const existing = await prisma.state.findFirst({ where: { countryId, name } });
    if (existing) {
      return NextResponse.json({ error: 'State name already exists in this country' }, { status: 400 });
    }

    const state = await prisma.state.create({
      data: { countryId, name, code, isActive: isActive ?? true, order: order ?? 0 },
    });

    return NextResponse.json(state, { status: 201 });
  } catch (error) {
    return handleApiError(error, 'Failed to create state');
  }
}