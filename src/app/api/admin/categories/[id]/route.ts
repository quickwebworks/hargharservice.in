import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError } from '@/lib/prisma-helper';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    return NextResponse.json(category);
  } catch (error) {
    return handleApiError(error, 'Failed to fetch category');
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: 'Category not found' }, { status: 404 });

    if (body.slug && body.slug !== existing.slug) {
      const duplicate = await prisma.category.findUnique({ where: { slug: body.slug } });
      if (duplicate) return NextResponse.json({ error: 'Category slug already exists' }, { status: 400 });
    }

    const category = await prisma.category.update({ where: { id }, data: body });
    return NextResponse.json(category);
  } catch (error) {
    return handleApiError(error, 'Failed to update category');
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, 'Failed to delete category');
  }
}