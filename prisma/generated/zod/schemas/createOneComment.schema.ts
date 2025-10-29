import type { Prisma } from '../..';
import * as z from 'zod';
import { CommentUncheckedCreateInputObjectSchema as CommentUncheckedCreateInputObjectSchema } from './objects/CommentUncheckedCreateInput.schema';

export const CommentCreateOneSchema: z.ZodType<Prisma.CommentCreateArgs> = z.object({   data: CommentUncheckedCreateInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CommentCreateArgs>;

export const CommentCreateOneZodSchema = z.object({   data: CommentUncheckedCreateInputObjectSchema }).strict();