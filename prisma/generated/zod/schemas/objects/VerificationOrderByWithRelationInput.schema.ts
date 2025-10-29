import * as z from 'zod';
import type { Prisma } from '../../..';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  variant: SortOrderSchema.optional(),
  value: SortOrderSchema.optional(),
  expiresAt: SortOrderSchema.optional()
}).strict();
export const VerificationOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.VerificationOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationOrderByWithRelationInput>;
export const VerificationOrderByWithRelationInputObjectZodSchema = makeSchema();
