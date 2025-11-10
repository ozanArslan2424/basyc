import type { Prisma } from '../..';
import * as z from 'zod';
import { MembershipWhereUniqueInputObjectSchema as MembershipWhereUniqueInputObjectSchema } from './objects/MembershipWhereUniqueInput.schema';

export const MembershipFindUniqueSchema: z.ZodType<Prisma.MembershipFindUniqueArgs> = z.object({   where: MembershipWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.MembershipFindUniqueArgs>;

export const MembershipFindUniqueZodSchema = z.object({   where: MembershipWhereUniqueInputObjectSchema }).strict();