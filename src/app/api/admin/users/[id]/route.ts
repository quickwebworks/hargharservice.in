import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError } from '@/lib/prisma-helper';

// GET - Single user
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        userType: true,
        country: true,
        state: true,
        city: true,
        area: true,
        subArea: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return handleApiError(error, 'Failed to fetch user');
  }
}

// PATCH - Update user
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { email, phone, name, password, role, status, userTypeId, countryId, stateId, cityId, areaId, subAreaId } = body;

    const existing = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check for duplicate email if changed
    if (email && email !== existing.email) {
      const duplicate = await prisma.user.findUnique({ where: { email } });
      if (duplicate) {
        return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
      }
    }

    // Check for duplicate phone if changed
    if (phone && phone !== existing.phone) {
      const duplicate = await prisma.user.findUnique({ where: { phone } });
      if (duplicate) {
        return NextResponse.json({ error: 'Phone already exists' }, { status: 400 });
      }
    }

    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone }),
        ...(name !== undefined && { name }),
        ...(password !== undefined && { password }),
        ...(role !== undefined && { role }),
        ...(status !== undefined && { status }),
        ...(userTypeId !== undefined && { userTypeId: userTypeId || null }),
        ...(countryId !== undefined && { countryId: countryId || null }),
        ...(stateId !== undefined && { stateId: stateId || null }),
        ...(cityId !== undefined && { cityId: cityId || null }),
        ...(areaId !== undefined && { areaId: areaId || null }),
        ...(subAreaId !== undefined && { subAreaId: subAreaId || null }),
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return handleApiError(error, 'Failed to update user');
  }
}

// DELETE - Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, 'Failed to delete user');
  }
}