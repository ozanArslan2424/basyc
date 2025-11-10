import type { Prisma } from '../..';
import * as z from 'zod';
import { ThingUpdateInputObjectSchema as ThingUpdateInputObjectSchema } from './objects/ThingUpdateInput.schema';
import { ThingUncheckedUpdateInputObjectSchema as ThingUncheckedUpdateInputObjectSchema } from './objects/ThingUncheckedUpdateInput.schema';
import { ThingWhereUniqueInputObjectSchema as ThingWhereUniqueInputObjectSchema } from './objects/ThingWhereUniqueInput.schema';

export const ThingUpdateOneSchema: z.ZodType<Prisma.ThingUpdateArgs> = z.object({   data: z.union([ThingUpdateInputObjectSchema, ThingUncheckedUpdateInputObjectSchema]), where: ThingWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ThingUpdateArgs>;

export const ThingUpdateOneZodSchema = z.object({   data: z.union([ThingUpdateInputObjectSchema, ThingUncheckedUpdateInputObjectSchema]), where: ThingWhereUniqueInputObjectSchema }).strict();