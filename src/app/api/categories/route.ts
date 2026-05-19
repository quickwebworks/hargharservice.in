import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const active = searchParams.get('active');

    // Build where clause
    const where: any = {};

    if (active !== 'false') {
      where.isActive = true;
    }

    // Fetch categories with service count
    const categories = await db.category.findMany({
      where,
      include: {
        _count: {
          select: {
            services: {
              where: {
                isActive: true
              }
            }
          }
        }
      },
      orderBy: {
        order: 'asc'
      }
    });

    return NextResponse.json({
      categories,
      count: categories.length,
    });

  } catch (error) {
    console.error('Fetch categories error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
