import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError } from '@/lib/prisma-helper';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sms = await prisma.sMSPanel.findUnique({ where: { id } });
    if (!sms) return NextResponse.json({ error: 'SMS not found' }, { status: 404 });
    return NextResponse.json(sms);
  } catch (error) {
    return handleApiError(error, 'Failed to fetch SMS');
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const sms = await prisma.sMSPanel.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(sms);
  } catch (error) {
    return handleApiError(error, 'Failed to update SMS');
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.sMSPanel.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, 'Failed to delete SMS');
  }
}