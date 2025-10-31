import * as z from "zod";
import type { Prisma } from "../../..";
import { AttachmentTypeSchema } from "../enums/AttachmentType.schema";

const makeSchema = () =>
	z
		.object({
			set: AttachmentTypeSchema.optional(),
		})
		.strict();
export const EnumAttachmentTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumAttachmentTypeFieldUpdateOperationsInput> =
	makeSchema() as unknown as z.ZodType<Prisma.EnumAttachmentTypeFieldUpdateOperationsInput>;
export const EnumAttachmentTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
