import type { Prisma } from '../..';
import * as z from 'zod';
import { MembershipUpdateInputObjectSchema as MembershipUpdateInputObjectSchema } from './objects/MembershipUpdateInput.schema';
import { MembershipUncheckedUpdateInputObjectSchema as MembershipUncheckedUpdateInputObjectSchema } from './objects/MembershipUncheckedUpdateInput.schema';
import { MembershipWhereUniqueInputObjectSchema as MembershipWhereUniqueInputObjectSchema } from './objects/MembershipWhereUniqueInput.schema';

export const MembershipUpdateOneSchema: z.ZodType<Prisma.MembershipUpdateArgs> = z.object({   data: z.union([MembershipUpdateInputObjectSchema, MembershipUncheckedUpdateInputObjectSchema]), where: MembershipWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.MembershipUpdateArgs>;

export const MembershipUpdateOneZodSchema = z.object({   data: z.union([MembershipUpdateInputObjectSchema, MembershipUncheckedUpdateInputObjectSchema]), where: MembershipWhereUniqueInputObjectSchema }).strict();