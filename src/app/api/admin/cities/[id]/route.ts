import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError } from '@/lib/prisma-helper';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const city = await prisma.city.findUnique({ where: { id: params.id }, include: { state: { include: { country: true } } } });
    if (!city) return NextResponse.json({ error: 'City not found' }, { status: 404 });
    return NextResponse.json(city);
  } catch (error) {
    return handleApiError(error, 'Failed to fetch city');
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const existing = await prisma.city.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'City not found' }, { status: 404 });

    if (body.name && body.name !== existing.name) {
      const duplicate = await prisma.city.findFirst({ where: { stateId: existing.stateId, name: body.name } });
      if (duplicate) return NextResponse.json({ error: 'City name already exists in this state' }, { status: 400 });
    }

    const city = await prisma.city.update({ where: { id: params.id }, data: body });
    return NextResponse.json(city);
  } catch (error) {
    return handleApiError(error, 'Failed to update city');
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.city.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, 'Failed to delete city');
  }
}