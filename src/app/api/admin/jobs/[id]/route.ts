import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError } from '@/lib/prisma-helper';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: {
        booking: { include: { customer: true } },
        customer: true,
        service: true,
        executive: true,
        createdBy: true,
      },
    });
    if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    return NextResponse.json(job);
  } catch (error) {
    return handleApiError(error, 'Failed to fetch job');
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const existing = await prisma.job.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: 'Job not found' }, { status: 404 });

    const job = await prisma.job.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(job);
  } catch (error) {
    return handleApiError(error, 'Failed to update job');
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.job.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, 'Failed to delete job');
  }
}