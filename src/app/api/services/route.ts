import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const active = searchParams.get('active');

    // Build where clause
    const where: any = {};

    if (category && category !== 'all') {
      where.category = {
        slug: category
      };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    if (active !== 'false') {
      where.isActive = true;
    }

    // Fetch services
    const services = await db.service.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            title: true,
            slug: true,
          }
        },
        _count: {
          select: {
            reviews: true,
            bookings: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Calculate average rating for each service
    const servicesWithRating = await Promise.all(
      services.map(async (service) => {
        const reviews = await db.review.findMany({
          where: {
            serviceId: service.id,
            isActive: true
          },
          select: {
            rating: true
          }
        });

        const avgRating = reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0;

        return {
          ...service,
          avgRating: Math.round(avgRating * 10) / 10,
          reviewCount: reviews.length,
        };
      })
    );

    return NextResponse.json({
      services: servicesWithRating,
      count: servicesWithRating.length,
    });

  } catch (error) {
    console.error('Fetch services error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
