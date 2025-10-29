import type { Prisma } from '../..';
import * as z from 'zod';
import { PersonUpdateInputObjectSchema as PersonUpdateInputObjectSchema } from './objects/PersonUpdateInput.schema';
import { PersonUncheckedUpdateInputObjectSchema as PersonUncheckedUpdateInputObjectSchema } from './objects/PersonUncheckedUpdateInput.schema';
import { PersonWhereUniqueInputObjectSchema as PersonWhereUniqueInputObjectSchema } from './objects/PersonWhereUniqueInput.schema';

export const PersonUpdateOneSchema: z.ZodType<Prisma.PersonUpdateArgs> = z.object({   data: z.union([PersonUpdateInputObjectSchema, PersonUncheckedUpdateInputObjectSchema]), where: PersonWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PersonUpdateArgs>;

export const PersonUpdateOneZodSchema = z.object({   data: z.union([PersonUpdateInputObjectSchema, PersonUncheckedUpdateInputObjectSchema]), where: PersonWhereUniqueInputObjectSchema }).strict();