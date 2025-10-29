import type { Prisma } from '../..';
import * as z from 'zod';
import { SessionUncheckedCreateInputObjectSchema as SessionUncheckedCreateInputObjectSchema } from './objects/SessionUncheckedCreateInput.schema';

export const SessionCreateOneSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({   data: SessionUncheckedCreateInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.SessionCreateArgs>;

export const SessionCreateOneZodSchema = z.object({   data: SessionUncheckedCreateInputObjectSchema }).strict();