import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function handleApiError(error: unknown, message: string = 'An error occurred') {
  console.error(message, error);
  return Response.json({ error: message, details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
}

export function getPaginationParams(searchParams: URLSearchParams) {
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');
  const skip = (page - 1) * pageSize;
  return { page, pageSize, skip };
}

export function getFilterParams(searchParams: URLSearchParams, filterFields: string[]) {
  const filters: Record<string, any> = {};
  filterFields.forEach(field => {
    const value = searchParams.get(field);
    if (value) {
      filters[field] = value;
    }
  });
  return filters;
}