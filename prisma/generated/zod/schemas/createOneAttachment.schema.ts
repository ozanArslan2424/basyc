import type { Prisma } from '../..';
import * as z from 'zod';
import { AttachmentUncheckedCreateInputObjectSchema as AttachmentUncheckedCreateInputObjectSchema } from './objects/AttachmentUncheckedCreateInput.schema';

export const AttachmentCreateOneSchema: z.ZodType<Prisma.AttachmentCreateArgs> = z.object({   data: AttachmentUncheckedCreateInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AttachmentCreateArgs>;

export const AttachmentCreateOneZodSchema = z.object({   data: AttachmentUncheckedCreateInputObjectSchema }).strict();