import * as z from "zod";
import type { Prisma } from "../../..";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
			createdAt: z.coerce.date().optional(),
			content: z.string(),
			createdById: z.number().int(),
		})
		.strict();
export const CommentUncheckedCreateInputObjectSchema: z.ZodType<Prisma.CommentUncheckedCreateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.CommentUncheckedCreateInput>;
export const CommentUncheckedCreateInputObjectZodSchema = makeSchema();
