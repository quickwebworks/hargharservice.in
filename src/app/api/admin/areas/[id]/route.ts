import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError } from '@/lib/prisma-helper';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const area = await prisma.area.findUnique({ where: { id }, include: { city: { include: { state: true } } } });
    if (!area) return NextResponse.json({ error: 'Area not found' }, { status: 404 });
    return NextResponse.json(area);
  } catch (error) {
    return handleApiError(error, 'Failed to fetch area');
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const existing = await prisma.area.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Area not found' }, { status: 404 });

    if (body.name && body.name !== existing.name) {
      const duplicate = await prisma.area.findFirst({ where: { cityId: existing.cityId, name: body.name } });
      if (duplicate) return NextResponse.json({ error: 'Area name already exists in this city' }, { status: 400 });
    }

    const area = await prisma.area.update({ where: { id }, data: body });
    return NextResponse.json(area);
  } catch (error) {
    return handleApiError(error, 'Failed to update area');
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.area.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, 'Failed to delete area');
  }
}