import * as z from 'zod';
import type { Prisma } from '../../..';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const AttachmentOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.AttachmentOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AttachmentOrderByRelationAggregateInput>;
export const AttachmentOrderByRelationAggregateInputObjectZodSchema = makeSchema();
