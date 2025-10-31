import * as z from "zod";
import type { Prisma } from "../../..";
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from "./IntFieldUpdateOperationsInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";

const makeSchema = () =>
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
			createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
			updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
			content: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
		})
		.strict();
export const CommentUncheckedUpdateManyWithoutCreatedByInputObjectSchema: z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutCreatedByInput> =
	makeSchema() as unknown as z.ZodType<Prisma.CommentUncheckedUpdateManyWithoutCreatedByInput>;
export const CommentUncheckedUpdateManyWithoutCreatedByInputObjectZodSchema = makeSchema();
