import type { Prisma } from '../..';
import * as z from 'zod';
import { AttachmentUpdateInputObjectSchema as AttachmentUpdateInputObjectSchema } from './objects/AttachmentUpdateInput.schema';
import { AttachmentUncheckedUpdateInputObjectSchema as AttachmentUncheckedUpdateInputObjectSchema } from './objects/AttachmentUncheckedUpdateInput.schema';
import { AttachmentWhereUniqueInputObjectSchema as AttachmentWhereUniqueInputObjectSchema } from './objects/AttachmentWhereUniqueInput.schema';

export const AttachmentUpdateOneSchema: z.ZodType<Prisma.AttachmentUpdateArgs> = z.object({   data: z.union([AttachmentUpdateInputObjectSchema, AttachmentUncheckedUpdateInputObjectSchema]), where: AttachmentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AttachmentUpdateArgs>;

export const AttachmentUpdateOneZodSchema = z.object({   data: z.union([AttachmentUpdateInputObjectSchema, AttachmentUncheckedUpdateInputObjectSchema]), where: AttachmentWhereUniqueInputObjectSchema }).strict();