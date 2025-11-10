import * as z from 'zod';
import type { Prisma } from '../../..';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { EnumPersonRoleFilterObjectSchema as EnumPersonRoleFilterObjectSchema } from './EnumPersonRoleFilter.schema';
import { PersonRoleSchema } from '../enums/PersonRole.schema'

const membershipscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => MembershipScalarWhereInputObjectSchema), z.lazy(() => MembershipScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => MembershipScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => MembershipScalarWhereInputObjectSchema), z.lazy(() => MembershipScalarWhereInputObjectSchema).array()]).optional(),
  personId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  groupId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  role: z.union([z.lazy(() => EnumPersonRoleFilterObjectSchema), PersonRoleSchema]).optional()
}).strict();
export const MembershipScalarWhereInputObjectSchema: z.ZodType<Prisma.MembershipScalarWhereInput> = membershipscalarwhereinputSchema as unknown as z.ZodType<Prisma.MembershipScalarWhereInput>;
export const MembershipScalarWhereInputObjectZodSchema = membershipscalarwhereinputSchema;
