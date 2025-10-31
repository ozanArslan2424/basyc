import * as z from "zod";
import type { Prisma } from "../../..";
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from "./IntFieldUpdateOperationsInput.schema";
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from "./DateTimeFieldUpdateOperationsInput.schema";
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from "./StringFieldUpdateOperationsInput.schema";
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from "./NullableStringFieldUpdateOperationsInput.schema";
import { PersonRoleSchema } from "../enums/PersonRole.schema";
import { EnumPersonRoleFieldUpdateOperationsInputObjectSchema as EnumPersonRoleFieldUpdateOperationsInputObjectSchema } from "./EnumPersonRoleFieldUpdateOperationsInput.schema";

const makeSchema = () =>
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
			createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
			updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
			email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
			image: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)])
				.optional()
				.nullable(),
			role: z.union([PersonRoleSchema, z.lazy(() => EnumPersonRoleFieldUpdateOperationsInputObjectSchema)]).optional(),
			userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
		})
		.strict();
export const PersonUncheckedUpdateManyInputObjectSchema: z.ZodType<Prisma.PersonUncheckedUpdateManyInput> =
	makeSchema() as unknown as z.ZodType<Prisma.PersonUncheckedUpdateManyInput>;
export const PersonUncheckedUpdateManyInputObjectZodSchema = makeSchema();
