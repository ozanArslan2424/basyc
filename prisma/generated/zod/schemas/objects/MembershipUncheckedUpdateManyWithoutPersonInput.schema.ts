import * as z from 'zod';
import type { Prisma } from '../../..';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { PersonRoleSchema } from '../enums/PersonRole.schema';
import { EnumPersonRoleFieldUpdateOperationsInputObjectSchema as EnumPersonRoleFieldUpdateOperationsInputObjectSchema } from './EnumPersonRoleFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  groupId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  role: z.union([PersonRoleSchema, z.lazy(() => EnumPersonRoleFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const MembershipUncheckedUpdateManyWithoutPersonInputObjectSchema: z.ZodType<Prisma.MembershipUncheckedUpdateManyWithoutPersonInput> = makeSchema() as unknown as z.ZodType<Prisma.MembershipUncheckedUpdateManyWithoutPersonInput>;
export const MembershipUncheckedUpdateManyWithoutPersonInputObjectZodSchema = makeSchema();
