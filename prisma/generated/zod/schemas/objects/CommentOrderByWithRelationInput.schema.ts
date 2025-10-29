import * as z from 'zod';
import type { Prisma } from '../../..';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { PersonOrderByWithRelationInputObjectSchema as PersonOrderByWithRelationInputObjectSchema } from './PersonOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  content: SortOrderSchema.optional(),
  createdById: SortOrderSchema.optional(),
  createdBy: z.lazy(() => PersonOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const CommentOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.CommentOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.CommentOrderByWithRelationInput>;
export const CommentOrderByWithRelationInputObjectZodSchema = makeSchema();
