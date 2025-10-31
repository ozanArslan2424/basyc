import * as z from "zod";
import type { Prisma } from "../../..";
import { AttachmentTypeSchema } from "../enums/AttachmentType.schema";
import { NestedEnumAttachmentTypeFilterObjectSchema as NestedEnumAttachmentTypeFilterObjectSchema } from "./NestedEnumAttachmentTypeFilter.schema";

const makeSchema = () =>
	z
		.object({
			equals: AttachmentTypeSchema.optional(),
			in: AttachmentTypeSchema.array().optional(),
			notIn: AttachmentTypeSchema.array().optional(),
			not: z.union([AttachmentTypeSchema, z.lazy(() => NestedEnumAttachmentTypeFilterObjectSchema)]).optional(),
		})
		.strict();
export const EnumAttachmentTypeFilterObjectSchema: z.ZodType<Prisma.EnumAttachmentTypeFilter> =
	makeSchema() as unknown as z.ZodType<Prisma.EnumAttachmentTypeFilter>;
export const EnumAttachmentTypeFilterObjectZodSchema = makeSchema();
