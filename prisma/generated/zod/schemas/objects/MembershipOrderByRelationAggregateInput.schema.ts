import * as z from 'zod';
import type { Prisma } from '../../..';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const MembershipOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.MembershipOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.MembershipOrderByRelationAggregateInput>;
export const MembershipOrderByRelationAggregateInputObjectZodSchema = makeSchema();
