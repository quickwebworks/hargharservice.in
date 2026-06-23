import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError, getPaginationParams } from '@/lib/prisma-helper';

// GET - List all user types
export async function GET(request: NextRequest) {
  try {
    const { skip, pageSize, page } = getPaginationParams(request.nextUrl.searchParams);
    const search = request.nextUrl.searchParams.get('search');

    const where = search ? {
      OR: [
        { name: { contains: search } },
        { code: { contains: search } },
      ],
    } : {};

    const [data, total] = await Promise.all([
      prisma.userType.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      }),
      prisma.userType.count({ where }),
    ]);

    return NextResponse.json({ data, total, page, pageSize });
  } catch (error) {
    return handleApiError(error, 'Failed to fetch user types');
  }
}

// POST - Create a new user type
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, code, description, isActive, order } = body;

    if (!name || !code) {
      return NextResponse.json({ error: 'Name and code are required' }, { status: 400 });
    }

    const existing = await prisma.userType.findUnique({ where: { code } });
    if (existing) {
      return NextResponse.json({ error: 'User type code already exists' }, { status: 400 });
    }

    const userType = await prisma.userType.create({
      data: {
        name,
        code,
        description: description || null,
        isActive: isActive !== undefined ? isActive : true,
        order: order !== undefined ? order : 0,
      },
    });

    return NextResponse.json(userType, { status: 201 });
  } catch (error) {
    return handleApiError(error, 'Failed to create user type');
  }
}