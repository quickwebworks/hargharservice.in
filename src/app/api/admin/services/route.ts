import { NextRequest, NextResponse } from 'next/server';
import { prisma, handleApiError, getPaginationParams } from '@/lib/prisma-helper';

export async function GET(request: NextRequest) {
  try {
    const { skip, pageSize } = getPaginationParams(request.nextUrl.searchParams);
    const search = request.nextUrl.searchParams.get('search');
    const categoryId = request.nextUrl.searchParams.get('categoryId');

    const where: any = {};
    if (search) where.OR = [{ title: { contains: search, mode: 'insensitive' as const } }, { slug: { contains: search, mode: 'insensitive' as const } }];
    if (categoryId) where.categoryId = categoryId;

    const [data, total] = await Promise.all([
      prisma.service.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: [{ order: 'asc' }, { title: 'asc' }],
        include: { category: { select: { title: true } } },
      }),
      prisma.service.count({ where }),
    ]);

    return NextResponse.json({ data, total, page: Math.floor(skip / pageSize) + 1, pageSize });
  } catch (error) {
    return handleApiError(error, 'Failed to fetch services');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { categoryId, title, slug, description, features, price, discountPrice, gst, duration, image, gallery, isActive, isFeatured, footerNote, order } = body;

    if (!categoryId || !title || !slug || !price) {
      return NextResponse.json({ error: 'Category, title, slug, and price are required' }, { status: 400 });
    }

    const existing = await prisma.service.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ error: 'Service slug already exists' }, { status: 400 });
    }

    const service = await prisma.service.create({
      data: {
        categoryId,
        title,
        slug,
        description,
        features: features ? JSON.stringify(features) : null,
        price: parseFloat(price),
        discountPrice: discountPrice ? parseFloat(discountPrice) : null,
        gst: gst ? parseFloat(gst) : 18,
        duration: parseInt(duration) || 60,
        image,
        gallery: gallery ? JSON.stringify(gallery) : null,
        isActive: isActive ?? true,
        isFeatured: isFeatured ?? false,
        footerNote,
        order: order ?? 0,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    return handleApiError(error, 'Failed to create service');
  }
}