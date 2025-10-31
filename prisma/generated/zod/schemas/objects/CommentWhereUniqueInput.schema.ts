import * as z from "zod";
import type { Prisma } from "../../..";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
		})
		.strict();
export const CommentWhereUniqueInputObjectSchema: z.ZodType<Prisma.CommentWhereUniqueInput> =
	makeSchema() as unknown as z.ZodType<Prisma.CommentWhereUniqueInput>;
export const CommentWhereUniqueInputObjectZodSchema = makeSchema();
