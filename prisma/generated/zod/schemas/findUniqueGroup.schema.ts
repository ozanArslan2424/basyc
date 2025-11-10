import type { Prisma } from '../..';
import * as z from 'zod';
import { GroupWhereUniqueInputObjectSchema as GroupWhereUniqueInputObjectSchema } from './objects/GroupWhereUniqueInput.schema';

export const GroupFindUniqueSchema: z.ZodType<Prisma.GroupFindUniqueArgs> = z.object({   where: GroupWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GroupFindUniqueArgs>;

export const GroupFindUniqueZodSchema = z.object({   where: GroupWhereUniqueInputObjectSchema }).strict();