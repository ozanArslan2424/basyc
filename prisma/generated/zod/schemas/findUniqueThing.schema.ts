import type { Prisma } from '../..';
import * as z from 'zod';
import { ThingWhereUniqueInputObjectSchema as ThingWhereUniqueInputObjectSchema } from './objects/ThingWhereUniqueInput.schema';

export const ThingFindUniqueSchema: z.ZodType<Prisma.ThingFindUniqueArgs> = z.object({   where: ThingWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ThingFindUniqueArgs>;

export const ThingFindUniqueZodSchema = z.object({   where: ThingWhereUniqueInputObjectSchema }).strict();