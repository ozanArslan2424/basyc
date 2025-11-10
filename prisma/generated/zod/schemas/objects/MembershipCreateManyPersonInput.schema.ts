import * as z from 'zod';
import type { Prisma } from '../../..';
import { PersonRoleSchema } from '../enums/PersonRole.schema'

const makeSchema = () => z.object({
  groupId: z.number().int(),
  role: PersonRoleSchema
}).strict();
export const MembershipCreateManyPersonInputObjectSchema: z.ZodType<Prisma.MembershipCreateManyPersonInput> = makeSchema() as unknown as z.ZodType<Prisma.MembershipCreateManyPersonInput>;
export const MembershipCreateManyPersonInputObjectZodSchema = makeSchema();
