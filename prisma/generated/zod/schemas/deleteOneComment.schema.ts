import type { Prisma } from "../..";
import * as z from "zod";
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from "./objects/CommentWhereUniqueInput.schema";

export const CommentDeleteOneSchema: z.ZodType<Prisma.CommentDeleteArgs> = z
	.object({ where: CommentWhereUniqueInputObjectSchema })
	.strict() as unknown as z.ZodType<Prisma.CommentDeleteArgs>;

export const CommentDeleteOneZodSchema = z.object({ where: CommentWhereUniqueInputObjectSchema }).strict();
