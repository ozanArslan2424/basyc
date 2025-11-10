import type { Prisma } from '../..';
import * as z from 'zod';
import { GroupWhereUniqueInputObjectSchema as GroupWhereUniqueInputObjectSchema } from './objects/GroupWhereUniqueInput.schema';

export const GroupDeleteOneSchema: z.ZodType<Prisma.GroupDeleteArgs> = z.object({   where: GroupWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GroupDeleteArgs>;

export const GroupDeleteOneZodSchema = z.object({   where: GroupWhereUniqueInputObjectSchema }).strict();