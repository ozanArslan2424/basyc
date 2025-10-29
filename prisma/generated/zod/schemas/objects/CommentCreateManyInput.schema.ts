import * as z from 'zod';
import type { Prisma } from '../../..';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  content: z.string(),
  createdById: z.number().int()
}).strict();
export const CommentCreateManyInputObjectSchema: z.ZodType<Prisma.CommentCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentCreateManyInput>;
export const CommentCreateManyInputObjectZodSchema = makeSchema();
