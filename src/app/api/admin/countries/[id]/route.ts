import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError } from '@/lib/prisma-helper';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const country = await prisma.country.findUnique({ where: { id } });
    if (!country) return NextResponse.json({ error: 'Country not found' }, { status: 404 });
    return NextResponse.json(country);
  } catch (error) {
    return handleApiError(error, 'Failed to fetch country');
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const existing = await prisma.country.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Country not found' }, { status: 404 });

    if (body.name && body.name !== existing.name) {
      const duplicate = await prisma.country.findUnique({ where: { name: body.name } });
      if (duplicate) return NextResponse.json({ error: 'Country name already exists' }, { status: 400 });
    }

    const country = await prisma.country.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(country);
  } catch (error) {
    return handleApiError(error, 'Failed to update country');
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.country.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, 'Failed to delete country');
  }
}