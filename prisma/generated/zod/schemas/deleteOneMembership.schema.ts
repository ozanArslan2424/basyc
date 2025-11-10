import type { Prisma } from '../..';
import * as z from 'zod';
import { MembershipWhereUniqueInputObjectSchema as MembershipWhereUniqueInputObjectSchema } from './objects/MembershipWhereUniqueInput.schema';

export const MembershipDeleteOneSchema: z.ZodType<Prisma.MembershipDeleteArgs> = z.object({   where: MembershipWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.MembershipDeleteArgs>;

export const MembershipDeleteOneZodSchema = z.object({   where: MembershipWhereUniqueInputObjectSchema }).strict();