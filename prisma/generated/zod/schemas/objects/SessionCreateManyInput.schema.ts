import * as z from 'zod';
import type { Prisma } from '../../..';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  userId: z.string()
}).strict();
export const SessionCreateManyInputObjectSchema: z.ZodType<Prisma.SessionCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.SessionCreateManyInput>;
export const SessionCreateManyInputObjectZodSchema = makeSchema();
