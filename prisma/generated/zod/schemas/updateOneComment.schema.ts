import type { Prisma } from "../..";
import * as z from "zod";
import { CommentUpdateInputObjectSchema as CommentUpdateInputObjectSchema } from "./objects/CommentUpdateInput.schema";
import { CommentUncheckedUpdateInputObjectSchema as CommentUncheckedUpdateInputObjectSchema } from "./objects/CommentUncheckedUpdateInput.schema";
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from "./objects/CommentWhereUniqueInput.schema";

export const CommentUpdateOneSchema: z.ZodType<Prisma.CommentUpdateArgs> = z
	.object({
		data: z.union([CommentUpdateInputObjectSchema, CommentUncheckedUpdateInputObjectSchema]),
		where: CommentWhereUniqueInputObjectSchema,
	})
	.strict() as unknown as z.ZodType<Prisma.CommentUpdateArgs>;

export const CommentUpdateOneZodSchema = z
	.object({
		data: z.union([CommentUpdateInputObjectSchema, CommentUncheckedUpdateInputObjectSchema]),
		where: CommentWhereUniqueInputObjectSchema,
	})
	.strict();
