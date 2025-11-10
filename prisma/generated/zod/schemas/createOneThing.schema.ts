import type { Prisma } from '../..';
import * as z from 'zod';
import { ThingUncheckedCreateInputObjectSchema as ThingUncheckedCreateInputObjectSchema } from './objects/ThingUncheckedCreateInput.schema';

export const ThingCreateOneSchema: z.ZodType<Prisma.ThingCreateArgs> = z.object({   data: ThingUncheckedCreateInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ThingCreateArgs>;

export const ThingCreateOneZodSchema = z.object({   data: ThingUncheckedCreateInputObjectSchema }).strict();