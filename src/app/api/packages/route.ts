import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

function safeParse(json: string): string[] {
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const services = await db.service.findMany({
      where: { isActive: true },
      orderBy: [{ category: { order: 'asc' } }, { price: 'asc' }],
      include: { category: true },
    });
    const data = services.map((s) => ({
      id: s.id,
      title: s.title,
      slug: s.slug,
      description: s.description,
      features: safeParse(s.features),
      price: s.price,
      discountPrice: s.discountPrice,
      gst: s.gst,
      duration: s.duration,
      image: s.image,
      isFeatured: s.isFeatured,
      footerNote: s.footerNote,
      category: s.category.title,
      categorySlug: s.category.slug,
      categoryOrder: s.category.order,
    }));
    return NextResponse.json({ services: data });
  } catch (e) {
    return NextResponse.json({ services: [], error: 'Failed to load' }, { status: 500 });
  }
}
