import * as z from "zod";
import type { Prisma } from "../../..";
import { IntFilterObjectSchema as IntFilterObjectSchema } from "./IntFilter.schema";
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { EnumAttachmentTypeFilterObjectSchema as EnumAttachmentTypeFilterObjectSchema } from "./EnumAttachmentTypeFilter.schema";
import { AttachmentTypeSchema } from "../enums/AttachmentType.schema";
import { StringFilterObjectSchema as StringFilterObjectSchema } from "./StringFilter.schema";
import { FloatFilterObjectSchema as FloatFilterObjectSchema } from "./FloatFilter.schema";

const attachmentwhereinputSchema = z
	.object({
		AND: z
			.union([z.lazy(() => AttachmentWhereInputObjectSchema), z.lazy(() => AttachmentWhereInputObjectSchema).array()])
			.optional(),
		OR: z
			.lazy(() => AttachmentWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([z.lazy(() => AttachmentWhereInputObjectSchema), z.lazy(() => AttachmentWhereInputObjectSchema).array()])
			.optional(),
		id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
		createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
		updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
		type: z.union([z.lazy(() => EnumAttachmentTypeFilterObjectSchema), AttachmentTypeSchema]).optional(),
		url: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
		size: z.union([z.lazy(() => FloatFilterObjectSchema), z.number()]).optional(),
		createdById: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
		thingId: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
	})
	.strict();
export const AttachmentWhereInputObjectSchema: z.ZodType<Prisma.AttachmentWhereInput> =
	attachmentwhereinputSchema as unknown as z.ZodType<Prisma.AttachmentWhereInput>;
export const AttachmentWhereInputObjectZodSchema = attachmentwhereinputSchema;
