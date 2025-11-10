import * as z from 'zod';
import type { Prisma } from '../../..';
import { PersonRoleSchema } from '../enums/PersonRole.schema'

const makeSchema = () => z.object({
  personId: z.number().int(),
  groupId: z.number().int(),
  role: PersonRoleSchema
}).strict();
export const MembershipCreateManyInputObjectSchema: z.ZodType<Prisma.MembershipCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.MembershipCreateManyInput>;
export const MembershipCreateManyInputObjectZodSchema = makeSchema();
