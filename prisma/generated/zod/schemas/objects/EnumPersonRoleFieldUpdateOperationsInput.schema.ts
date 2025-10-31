import * as z from "zod";
import type { Prisma } from "../../..";
import { PersonRoleSchema } from "../enums/PersonRole.schema";

const makeSchema = () =>
	z
		.object({
			set: PersonRoleSchema.optional(),
		})
		.strict();
export const EnumPersonRoleFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumPersonRoleFieldUpdateOperationsInput> =
	makeSchema() as unknown as z.ZodType<Prisma.EnumPersonRoleFieldUpdateOperationsInput>;
export const EnumPersonRoleFieldUpdateOperationsInputObjectZodSchema = makeSchema();
