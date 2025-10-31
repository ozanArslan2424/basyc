import * as z from "zod";
import type { Prisma } from "../../..";
import { AttachmentTypeSchema } from "../enums/AttachmentType.schema";
import { NestedEnumAttachmentTypeWithAggregatesFilterObjectSchema as NestedEnumAttachmentTypeWithAggregatesFilterObjectSchema } from "./NestedEnumAttachmentTypeWithAggregatesFilter.schema";
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from "./NestedIntFilter.schema";
import { NestedEnumAttachmentTypeFilterObjectSchema as NestedEnumAttachmentTypeFilterObjectSchema } from "./NestedEnumAttachmentTypeFilter.schema";

const makeSchema = () =>
	z
		.object({
			equals: AttachmentTypeSchema.optional(),
			in: AttachmentTypeSchema.array().optional(),
			notIn: AttachmentTypeSchema.array().optional(),
			not: z
				.union([AttachmentTypeSchema, z.lazy(() => NestedEnumAttachmentTypeWithAggregatesFilterObjectSchema)])
				.optional(),
			_count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
			_min: z.lazy(() => NestedEnumAttachmentTypeFilterObjectSchema).optional(),
			_max: z.lazy(() => NestedEnumAttachmentTypeFilterObjectSchema).optional(),
		})
		.strict();
export const EnumAttachmentTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumAttachmentTypeWithAggregatesFilter> =
	makeSchema() as unknown as z.ZodType<Prisma.EnumAttachmentTypeWithAggregatesFilter>;
export const EnumAttachmentTypeWithAggregatesFilterObjectZodSchema = makeSchema();
