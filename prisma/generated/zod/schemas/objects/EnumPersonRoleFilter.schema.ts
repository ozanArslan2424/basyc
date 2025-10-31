import * as z from "zod";
import type { Prisma } from "../../..";
import { PersonRoleSchema } from "../enums/PersonRole.schema";
import { NestedEnumPersonRoleFilterObjectSchema as NestedEnumPersonRoleFilterObjectSchema } from "./NestedEnumPersonRoleFilter.schema";

const makeSchema = () =>
	z
		.object({
			equals: PersonRoleSchema.optional(),
			in: PersonRoleSchema.array().optional(),
			notIn: PersonRoleSchema.array().optional(),
			not: z.union([PersonRoleSchema, z.lazy(() => NestedEnumPersonRoleFilterObjectSchema)]).optional(),
		})
		.strict();
export const EnumPersonRoleFilterObjectSchema: z.ZodType<Prisma.EnumPersonRoleFilter> =
	makeSchema() as unknown as z.ZodType<Prisma.EnumPersonRoleFilter>;
export const EnumPersonRoleFilterObjectZodSchema = makeSchema();
