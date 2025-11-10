import * as z from 'zod';
import type { Prisma } from '../../..';
import { PersonRoleSchema } from '../enums/PersonRole.schema'

const makeSchema = () => z.object({
  personId: z.number().int(),
  groupId: z.number().int(),
  role: PersonRoleSchema
}).strict();
export const MembershipUncheckedCreateInputObjectSchema: z.ZodType<Prisma.MembershipUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.MembershipUncheckedCreateInput>;
export const MembershipUncheckedCreateInputObjectZodSchema = makeSchema();
