import * as z from 'zod';
import type { Prisma } from '../../..';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  variant: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date()
}).strict();
export const VerificationCreateManyInputObjectSchema: z.ZodType<Prisma.VerificationCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.VerificationCreateManyInput>;
export const VerificationCreateManyInputObjectZodSchema = makeSchema();
