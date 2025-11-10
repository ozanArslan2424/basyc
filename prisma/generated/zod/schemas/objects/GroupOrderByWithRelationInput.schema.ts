import * as z from 'zod';
import type { Prisma } from '../../..';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { MembershipOrderByRelationAggregateInputObjectSchema as MembershipOrderByRelationAggregateInputObjectSchema } from './MembershipOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  password: SortOrderSchema.optional(),
  memberships: z.lazy(() => MembershipOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const GroupOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.GroupOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.GroupOrderByWithRelationInput>;
export const GroupOrderByWithRelationInputObjectZodSchema = makeSchema();
