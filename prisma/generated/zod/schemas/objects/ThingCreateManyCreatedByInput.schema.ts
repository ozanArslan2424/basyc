import * as z from 'zod';
import type { Prisma } from '../../..';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  content: z.string(),
  assignedToId: z.number().int().optional().nullable()
}).strict();
export const ThingCreateManyCreatedByInputObjectSchema: z.ZodType<Prisma.ThingCreateManyCreatedByInput> = makeSchema() as unknown as z.ZodType<Prisma.ThingCreateManyCreatedByInput>;
export const ThingCreateManyCreatedByInputObjectZodSchema = makeSchema();
