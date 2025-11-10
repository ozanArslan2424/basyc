import * as z from 'zod';
import type { Prisma } from '../../..';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { PersonRoleSchema } from '../enums/PersonRole.schema';
import { EnumPersonRoleFieldUpdateOperationsInputObjectSchema as EnumPersonRoleFieldUpdateOperationsInputObjectSchema } from './EnumPersonRoleFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  personId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  groupId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([PersonRoleSchema, z.lazy(() => EnumPersonRoleFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const MembershipUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.MembershipUncheckedUpdateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.MembershipUncheckedUpdateManyInput>;
export const MembershipUncheckedUpdateManyInputObjectZodSchema = makeSchema();
