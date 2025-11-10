import * as z from 'zod';
import type { Prisma } from '../../..';
import { MembershipPersonIdGroupIdRoleCompoundUniqueInputObjectSchema as MembershipPersonIdGroupIdRoleCompoundUniqueInputObjectSchema } from './MembershipPersonIdGroupIdRoleCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  personId_groupId_role: z.lazy(() => MembershipPersonIdGroupIdRoleCompoundUniqueInputObjectSchema).optional()
}).strict();
export const MembershipWhereUniqueInputObjectSchema: z.ZodType<Prisma.MembershipWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.MembershipWhereUniqueInput>;
export const MembershipWhereUniqueInputObjectZodSchema = makeSchema();
