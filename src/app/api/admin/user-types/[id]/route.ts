import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError } from '@/lib/prisma-helper';

// GET - Single user type
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const userType = await prisma.userType.findUnique({
      where: { id },
    });

    if (!userType) {
      return NextResponse.json({ error: 'User type not found' }, { status: 404 });
    }

    return NextResponse.json(userType);
  } catch (error) {
    return handleApiError(error, 'Failed to fetch user type');
  }
}

// PATCH - Update user type
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, code, description, isActive, order } = body;

    const existing = await prisma.userType.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'User type not found' }, { status: 404 });
    }

    if (code && code !== existing.code) {
      const duplicate = await prisma.userType.findUnique({ where: { code } });
      if (duplicate) {
        return NextResponse.json({ error: 'User type code already exists' }, { status: 400 });
      }
    }

    const userType = await prisma.userType.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(code !== undefined && { code }),
        ...(description !== undefined && { description: description || null }),
        ...(isActive !== undefined && { isActive }),
        ...(order !== undefined && { order }),
      },
    });

    return NextResponse.json(userType);
  } catch (error) {
    return handleApiError(error, 'Failed to update user type');
  }
}

// DELETE - Delete user type
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const userCount = await prisma.user.count({
      where: { userTypeId: id },
    });

    if (userCount > 0) {
      return NextResponse.json({ error: 'Cannot delete user type with associated users' }, { status: 400 });
    }

    await prisma.userType.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, 'Failed to delete user type');
  }
}