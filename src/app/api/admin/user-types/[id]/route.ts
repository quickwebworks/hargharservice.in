import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError } from '@/lib/prisma-helper';

// GET - Single user type
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userType = await prisma.userType.findUnique({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, code, description, permissions, isActive, order } = body;

    // Check if exists
    const existing = await prisma.userType.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'User type not found' }, { status: 404 });
    }

    // Check for duplicate code if changed
    if (code && code !== existing.code) {
      const duplicate = await prisma.userType.findUnique({ where: { code } });
      if (duplicate) {
        return NextResponse.json({ error: 'User type code already exists' }, { status: 400 });
      }
    }

    const userType = await prisma.userType.update({
      where: { id: params.id },
      data: {
        ...(name !== undefined && { name }),
        ...(code !== undefined && { code }),
        ...(description !== undefined && { description }),
        ...(permissions !== undefined && { permissions: permissions ? JSON.stringify(permissions) : null }),
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
  { params }: { params: { id: string } }
) {
  try {
    // Check if has users
    const userCount = await prisma.user.count({
      where: { userTypeId: params.id },
    });

    if (userCount > 0) {
      return NextResponse.json({ error: 'Cannot delete user type with associated users' }, { status: 400 });
    }

    await prisma.userType.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, 'Failed to delete user type');
  }
}