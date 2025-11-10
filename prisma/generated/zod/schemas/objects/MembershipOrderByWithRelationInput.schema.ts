import * as z from 'zod';
import type { Prisma } from '../../..';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { PersonOrderByWithRelationInputObjectSchema as PersonOrderByWithRelationInputObjectSchema } from './PersonOrderByWithRelationInput.schema';
import { GroupOrderByWithRelationInputObjectSchema as GroupOrderByWithRelationInputObjectSchema } from './GroupOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  personId: SortOrderSchema.optional(),
  groupId: SortOrderSchema.optional(),
  role: SortOrderSchema.optional(),
  person: z.lazy(() => PersonOrderByWithRelationInputObjectSchema).optional(),
  group: z.lazy(() => GroupOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const MembershipOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.MembershipOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.MembershipOrderByWithRelationInput>;
export const MembershipOrderByWithRelationInputObjectZodSchema = makeSchema();
