import * as z from 'zod';
import type { Prisma } from '../../..';
import { PersonRoleSchema } from '../enums/PersonRole.schema';
import { EnumPersonRoleFieldUpdateOperationsInputObjectSchema as EnumPersonRoleFieldUpdateOperationsInputObjectSchema } from './EnumPersonRoleFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  role: z.union([PersonRoleSchema, z.lazy(() => EnumPersonRoleFieldUpdateOperationsInputObjectSchema)]).optional(),
  personId: z.number().int(),
  groupId: z.number().int()
}).strict();
export const MembershipUpdateInputObjectSchema: z.ZodType<Prisma.MembershipUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.MembershipUpdateInput>;
export const MembershipUpdateInputObjectZodSchema = makeSchema();
