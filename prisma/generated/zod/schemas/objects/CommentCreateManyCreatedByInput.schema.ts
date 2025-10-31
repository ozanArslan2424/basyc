import * as z from "zod";
import type { Prisma } from "../../..";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			content: z.string(),
		})
		.strict();
export const CommentCreateManyCreatedByInputObjectSchema: z.ZodType<Prisma.CommentCreateManyCreatedByInput> =
	makeSchema() as unknown as z.ZodType<Prisma.CommentCreateManyCreatedByInput>;
export const CommentCreateManyCreatedByInputObjectZodSchema = makeSchema();
