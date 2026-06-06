import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError } from '@/lib/prisma-helper';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const service = await prisma.service.findUnique({
      where: { id: params.id },
      include: { category: true },
    });
    if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    return NextResponse.json(service);
  } catch (error) {
    return handleApiError(error, 'Failed to fetch service');
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const existing = await prisma.service.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'Service not found' }, { status: 404 });

    if (body.slug && body.slug !== existing.slug) {
      const duplicate = await prisma.service.findUnique({ where: { slug: body.slug } });
      if (duplicate) return NextResponse.json({ error: 'Service slug already exists' }, { status: 400 });
    }

    const service = await prisma.service.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(service);
  } catch (error) {
    return handleApiError(error, 'Failed to update service');
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.service.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, 'Failed to delete service');
  }
}