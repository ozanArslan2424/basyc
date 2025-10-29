import type { Prisma } from '../..';
import * as z from 'zod';
import { PersonWhereUniqueInputObjectSchema as PersonWhereUniqueInputObjectSchema } from './objects/PersonWhereUniqueInput.schema';

export const PersonFindUniqueSchema: z.ZodType<Prisma.PersonFindUniqueArgs> = z.object({   where: PersonWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.PersonFindUniqueArgs>;

export const PersonFindUniqueZodSchema = z.object({   where: PersonWhereUniqueInputObjectSchema }).strict();