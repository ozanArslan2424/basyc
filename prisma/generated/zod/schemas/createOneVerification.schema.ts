import type { Prisma } from '../..';
import * as z from 'zod';
import { VerificationUncheckedCreateInputObjectSchema as VerificationUncheckedCreateInputObjectSchema } from './objects/VerificationUncheckedCreateInput.schema';

export const VerificationCreateOneSchema: z.ZodType<Prisma.VerificationCreateArgs> = z.object({   data: VerificationUncheckedCreateInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.VerificationCreateArgs>;

export const VerificationCreateOneZodSchema = z.object({   data: VerificationUncheckedCreateInputObjectSchema }).strict();