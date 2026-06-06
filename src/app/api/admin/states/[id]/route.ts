import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError } from '@/lib/prisma-helper';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const state = await prisma.state.findUnique({ where: { id: params.id }, include: { country: true } });
    if (!state) return NextResponse.json({ error: 'State not found' }, { status: 404 });
    return NextResponse.json(state);
  } catch (error) {
    return handleApiError(error, 'Failed to fetch state');
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const existing = await prisma.state.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'State not found' }, { status: 404 });

    if (body.name && body.name !== existing.name) {
      const duplicate = await prisma.state.findFirst({ where: { countryId: existing.countryId, name: body.name } });
      if (duplicate) return NextResponse.json({ error: 'State name already exists in this country' }, { status: 400 });
    }

    const state = await prisma.state.update({ where: { id: params.id }, data: body });
    return NextResponse.json(state);
  } catch (error) {
    return handleApiError(error, 'Failed to update state');
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.state.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, 'Failed to delete state');
  }
}