import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError } from '@/lib/prisma-helper';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const subArea = await prisma.subArea.findUnique({ where: { id }, include: { area: { include: { city: true } } } });
    if (!subArea) return NextResponse.json({ error: 'Sub-area not found' }, { status: 404 });
    return NextResponse.json(subArea);
  } catch (error) {
    return handleApiError(error, 'Failed to fetch sub-area');
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const existing = await prisma.subArea.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Sub-area not found' }, { status: 404 });

    if (body.name && body.name !== existing.name) {
      const duplicate = await prisma.subArea.findFirst({ where: { areaId: existing.areaId, name: body.name } });
      if (duplicate) return NextResponse.json({ error: 'Sub-area name already exists in this area' }, { status: 400 });
    }

    const subArea = await prisma.subArea.update({ where: { id }, data: body });
    return NextResponse.json(subArea);
  } catch (error) {
    return handleApiError(error, 'Failed to update sub-area');
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.subArea.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, 'Failed to delete sub-area');
  }
}