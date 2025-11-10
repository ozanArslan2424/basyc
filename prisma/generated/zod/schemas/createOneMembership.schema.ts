import type { Prisma } from '../..';
import * as z from 'zod';
import { MembershipUncheckedCreateInputObjectSchema as MembershipUncheckedCreateInputObjectSchema } from './objects/MembershipUncheckedCreateInput.schema';

export const MembershipCreateOneSchema: z.ZodType<Prisma.MembershipCreateArgs> = z.object({   data: MembershipUncheckedCreateInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.MembershipCreateArgs>;

export const MembershipCreateOneZodSchema = z.object({   data: MembershipUncheckedCreateInputObjectSchema }).strict();