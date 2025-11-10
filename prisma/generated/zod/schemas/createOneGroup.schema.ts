import type { Prisma } from '../..';
import * as z from 'zod';
import { GroupUncheckedCreateInputObjectSchema as GroupUncheckedCreateInputObjectSchema } from './objects/GroupUncheckedCreateInput.schema';

export const GroupCreateOneSchema: z.ZodType<Prisma.GroupCreateArgs> = z.object({   data: GroupUncheckedCreateInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GroupCreateArgs>;

export const GroupCreateOneZodSchema = z.object({   data: GroupUncheckedCreateInputObjectSchema }).strict();