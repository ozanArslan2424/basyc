import type { Prisma } from '../..';
import * as z from 'zod';
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from './objects/CommentWhereUniqueInput.schema';

export const CommentFindUniqueSchema: z.ZodType<Prisma.CommentFindUniqueArgs> = z.object({   where: CommentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.CommentFindUniqueArgs>;

export const CommentFindUniqueZodSchema = z.object({   where: CommentWhereUniqueInputObjectSchema }).strict();