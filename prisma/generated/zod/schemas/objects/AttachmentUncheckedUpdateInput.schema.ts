import * as z from "zod";
import type { Prisma } from "../../..";
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from "./IntFieldUpdateOperationsInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { AttachmentTypeSchema } from "../enums/AttachmentType.schema";
import { EnumAttachmentTypeFieldUpdateOperationsInputObjectSchema as EnumAttachmentTypeFieldUpdateOperationsInputObjectSchema } from "./EnumAttachmentTypeFieldUpdateOperationsInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";
import { FloatFieldUpdateOperationsInputObjectSchema as FloatFieldUpdateOperationsInputObjectSchema } from "./FloatFieldUpdateOperationsInput.schema";

const makeSchema = () =>
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
			createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
			updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
			type: z
				.union([AttachmentTypeSchema, z.lazy(() => EnumAttachmentTypeFieldUpdateOperationsInputObjectSchema)])
				.optional(),
			url: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
			size: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputObjectSchema)]).optional(),
			createdById: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
			thingId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
		})
		.strict();
export const AttachmentUncheckedUpdateInputObjectSchema: z.ZodType<Prisma.AttachmentUncheckedUpdateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.AttachmentUncheckedUpdateInput>;
export const AttachmentUncheckedUpdateInputObjectZodSchema = makeSchema();
