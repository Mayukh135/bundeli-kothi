import { z } from 'zod';
import { insertInquirySchema, cottages, activities, testimonials } from './schema';

export { insertInquirySchema };
export type { InsertInquiry } from './schema';


export const api = {
  cottages: {
    list: {
      method: 'GET' as const,
      path: '/api/cottages' as const,
      responses: {
        200: z.array(z.custom<typeof cottages.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/cottages/:id' as const,
      responses: {
        200: z.custom<typeof cottages.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
  activities: {
    list: {
      method: 'GET' as const,
      path: '/api/activities' as const,
      responses: {
        200: z.array(z.custom<typeof activities.$inferSelect>()),
      },
    },
  },
  testimonials: {
    list: {
      method: 'GET' as const,
      path: '/api/testimonials' as const,
      responses: {
        200: z.array(z.custom<typeof testimonials.$inferSelect>()),
      },
    },
  },
  inquiries: {
    create: {
      method: 'POST' as const,
      path: '/api/inquiries' as const,
      input: insertInquirySchema,
      responses: {
        201: z.object({ success: z.boolean(), message: z.string() }),
        400: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
