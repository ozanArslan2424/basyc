import * as z from 'zod';
import type { Prisma } from '../../..';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  title: z.string(),
  password: z.string()
}).strict();
export const GroupCreateManyInputObjectSchema: z.ZodType<Prisma.GroupCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.GroupCreateManyInput>;
export const GroupCreateManyInputObjectZodSchema = makeSchema();
