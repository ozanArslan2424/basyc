import * as z from "zod";
import type { Prisma } from "../../..";
import { IntFilterObjectSchema as IntFilterObjectSchema } from "./IntFilter.schema";
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { StringFilterObjectSchema as StringFilterObjectSchema } from "./StringFilter.schema";

const commentwhereinputSchema = z
	.object({
		AND: z
			.union([z.lazy(() => CommentWhereInputObjectSchema), z.lazy(() => CommentWhereInputObjectSchema).array()])
			.optional(),
		OR: z
			.lazy(() => CommentWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([z.lazy(() => CommentWhereInputObjectSchema), z.lazy(() => CommentWhereInputObjectSchema).array()])
			.optional(),
		id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
		createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
		updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
		content: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
		createdById: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
	})
	.strict();
export const CommentWhereInputObjectSchema: z.ZodType<Prisma.CommentWhereInput> =
	commentwhereinputSchema as unknown as z.ZodType<Prisma.CommentWhereInput>;
export const CommentWhereInputObjectZodSchema = commentwhereinputSchema;
