import * as z from "zod";
import type { Prisma } from "../../..";
import { IntFilterObjectSchema as IntFilterObjectSchema } from "./IntFilter.schema";
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { StringFilterObjectSchema as StringFilterObjectSchema } from "./StringFilter.schema";

const commentscalarwhereinputSchema = z
	.object({
		AND: z
			.union([
				z.lazy(() => CommentScalarWhereInputObjectSchema),
				z.lazy(() => CommentScalarWhereInputObjectSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => CommentScalarWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => CommentScalarWhereInputObjectSchema),
				z.lazy(() => CommentScalarWhereInputObjectSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
		createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
		updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
		content: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
		createdById: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
	})
	.strict();
export const CommentScalarWhereInputObjectSchema: z.ZodType<Prisma.CommentScalarWhereInput> =
	commentscalarwhereinputSchema as unknown as z.ZodType<Prisma.CommentScalarWhereInput>;
export const CommentScalarWhereInputObjectZodSchema = commentscalarwhereinputSchema;
