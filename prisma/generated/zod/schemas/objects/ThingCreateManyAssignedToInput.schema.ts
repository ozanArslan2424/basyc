import * as z from 'zod';
import type { Prisma } from '../../..';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  content: z.string(),
  isDone: z.boolean().optional(),
  doneDate: z.coerce.date().optional().nullable(),
  dueDate: z.coerce.date().optional().nullable(),
  createdById: z.number().int()
}).strict();
export const ThingCreateManyAssignedToInputObjectSchema: z.ZodType<Prisma.ThingCreateManyAssignedToInput> = makeSchema() as unknown as z.ZodType<Prisma.ThingCreateManyAssignedToInput>;
export const ThingCreateManyAssignedToInputObjectZodSchema = makeSchema();
