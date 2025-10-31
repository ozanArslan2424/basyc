import * as z from "zod";
import type { Prisma } from "../../..";
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from "./IntFieldUpdateOperationsInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from "./NullableStringFieldUpdateOperationsInput.schema";

const makeSchema = () =>
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
			createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
			updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
			expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
			token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
			ipAddress: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
				.optional()
				.nullable(),
			userAgent: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
				.optional()
				.nullable(),
			userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
		})
		.strict();
export const SessionUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> =
	makeSchema() as unknown as z.ZodType<Prisma.SessionUncheckedUpdateManyInput>;
export const SessionUncheckedUpdateManyInputObjectZodSchema = makeSchema();
