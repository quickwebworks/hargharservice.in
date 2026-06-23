import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError } from '@/lib/prisma-helper';

// GET - Single user
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id },
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { email, phone, name, role, status, userTypeId } = body;

    const existing = await prisma.user.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (email && email !== existing.email) {
      const duplicate = await prisma.user.findUnique({ where: { email } });
      if (duplicate) {
        return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
      }
    }

    if (phone && phone !== existing.phone) {
      const duplicate = await prisma.user.findUnique({ where: { phone } });
      if (duplicate) {
        return NextResponse.json({ error: 'Phone already exists' }, { status: 400 });
      }
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone }),
        ...(name !== undefined && { name }),
        ...(role !== undefined && { role: role as any }),
        ...(status !== undefined && { status: status as any }),
        ...(userTypeId !== undefined && { userTypeId: userTypeId || null }),
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check for related bookings before deleting
    const bookingCount = await prisma.booking.count({
      where: { customerId: id },
    });

    if (bookingCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete user with existing bookings' },
        { status: 400 }
      );
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, 'Failed to delete user');
  }
}