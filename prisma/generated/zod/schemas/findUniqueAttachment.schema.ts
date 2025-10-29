import type { Prisma } from '../..';
import * as z from 'zod';
import { AttachmentWhereUniqueInputObjectSchema as AttachmentWhereUniqueInputObjectSchema } from './objects/AttachmentWhereUniqueInput.schema';

export const AttachmentFindUniqueSchema: z.ZodType<Prisma.AttachmentFindUniqueArgs> = z.object({   where: AttachmentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AttachmentFindUniqueArgs>;

export const AttachmentFindUniqueZodSchema = z.object({   where: AttachmentWhereUniqueInputObjectSchema }).strict();