import * as z from "zod";
import type { Prisma } from "../../..";
import { AttachmentTypeSchema } from "../enums/AttachmentType.schema";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			type: AttachmentTypeSchema,
			url: z.string(),
			size: z.number(),
			createdById: z.number().int(),
		})
		.strict();
export const AttachmentCreateManyThingInputObjectSchema: z.ZodType<Prisma.AttachmentCreateManyThingInput> =
	makeSchema() as unknown as z.ZodType<Prisma.AttachmentCreateManyThingInput>;
export const AttachmentCreateManyThingInputObjectZodSchema = makeSchema();
