import * as z from 'zod';
import type { Prisma } from '../../..';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { EnumPersonRoleFilterObjectSchema as EnumPersonRoleFilterObjectSchema } from './EnumPersonRoleFilter.schema';
import { PersonRoleSchema } from '../enums/PersonRole.schema'

const membershipwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => MembershipWhereInputObjectSchema), z.lazy(() => MembershipWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => MembershipWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => MembershipWhereInputObjectSchema), z.lazy(() => MembershipWhereInputObjectSchema).array()]).optional(),
  personId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  groupId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  role: z.union([z.lazy(() => EnumPersonRoleFilterObjectSchema), PersonRoleSchema]).optional()
}).strict();
export const MembershipWhereInputObjectSchema: z.ZodType<Prisma.MembershipWhereInput> = membershipwhereinputSchema as unknown as z.ZodType<Prisma.MembershipWhereInput>;
export const MembershipWhereInputObjectZodSchema = membershipwhereinputSchema;
