import type { Prisma } from '../..';
import * as z from 'zod';
import { GroupUpdateInputObjectSchema as GroupUpdateInputObjectSchema } from './objects/GroupUpdateInput.schema';
import { GroupUncheckedUpdateInputObjectSchema as GroupUncheckedUpdateInputObjectSchema } from './objects/GroupUncheckedUpdateInput.schema';
import { GroupWhereUniqueInputObjectSchema as GroupWhereUniqueInputObjectSchema } from './objects/GroupWhereUniqueInput.schema';

export const GroupUpdateOneSchema: z.ZodType<Prisma.GroupUpdateArgs> = z.object({   data: z.union([GroupUpdateInputObjectSchema, GroupUncheckedUpdateInputObjectSchema]), where: GroupWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GroupUpdateArgs>;

export const GroupUpdateOneZodSchema = z.object({   data: z.union([GroupUpdateInputObjectSchema, GroupUncheckedUpdateInputObjectSchema]), where: GroupWhereUniqueInputObjectSchema }).strict();