import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError, getPaginationParams, getFilterParams } from '@/lib/prisma-helper';

// GET - List all users
export async function GET(request: NextRequest) {
  try {
    const { skip, pageSize } = getPaginationParams(request.nextUrl.searchParams);
    const search = request.nextUrl.searchParams.get('search');
    const role = request.nextUrl.searchParams.get('role');
    const status = request.nextUrl.searchParams.get('status');
    const countryId = request.nextUrl.searchParams.get('countryId');

    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' as const } },
        { email: { contains: search, mode: 'insensitive' as const } },
        { phone: { contains: search, mode: 'insensitive' as const } },
      ];
    }

    if (role) {
      where.role = role;
    }

    if (status) {
      where.status = status;
    }

    if (countryId) {
      where.countryId = countryId;
    }

    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          userType: { select: { name: true } },
          country: { select: { name: true } },
          state: { select: { name: true } },
          city: { select: { name: true } },
          area: { select: { name: true } },
          subArea: { select: { name: true } },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({ data, total, page: Math.floor(skip / pageSize) + 1, pageSize });
  } catch (error) {
    return handleApiError(error, 'Failed to fetch users');
  }
}

// POST - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, name, password, role, status, userTypeId, countryId, stateId, cityId, areaId, subAreaId } = body;

    // Validate required fields
    if (!email || !phone || !name) {
      return NextResponse.json({ error: 'Email, phone, and name are required' }, { status: 400 });
    }

    // Check for duplicate email
    const existingEmail = await prisma.user.findUnique({ where: { email } });
    if (existingEmail) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    // Check for duplicate phone
    const existingPhone = await prisma.user.findUnique({ where: { phone } });
    if (existingPhone) {
      return NextResponse.json({ error: 'Phone already exists' }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        email,
        phone,
        name,
        password: password || null,
        role: role || 'CUSTOMER',
        status: status || 'PENDING',
        userTypeId,
        countryId,
        stateId,
        cityId,
        areaId,
        subAreaId,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return handleApiError(error, 'Failed to create user');
  }
}