import type { Prisma } from '../..';
import * as z from 'zod';
import { AttachmentWhereUniqueInputObjectSchema as AttachmentWhereUniqueInputObjectSchema } from './objects/AttachmentWhereUniqueInput.schema';

export const AttachmentDeleteOneSchema: z.ZodType<Prisma.AttachmentDeleteArgs> = z.object({   where: AttachmentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AttachmentDeleteArgs>;

export const AttachmentDeleteOneZodSchema = z.object({   where: AttachmentWhereUniqueInputObjectSchema }).strict();