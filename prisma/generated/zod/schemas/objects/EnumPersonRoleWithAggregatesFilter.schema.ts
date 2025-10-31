import * as z from "zod";
import type { Prisma } from "../../..";
import { PersonRoleSchema } from "../enums/PersonRole.schema";
import { NestedEnumPersonRoleWithAggregatesFilterObjectSchema as NestedEnumPersonRoleWithAggregatesFilterObjectSchema } from "./NestedEnumPersonRoleWithAggregatesFilter.schema";
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from "./NestedIntFilter.schema";
import { NestedEnumPersonRoleFilterObjectSchema as NestedEnumPersonRoleFilterObjectSchema } from "./NestedEnumPersonRoleFilter.schema";

const makeSchema = () =>
	z
		.object({
			equals: PersonRoleSchema.optional(),
			in: PersonRoleSchema.array().optional(),
			notIn: PersonRoleSchema.array().optional(),
			not: z.union([PersonRoleSchema, z.lazy(() => NestedEnumPersonRoleWithAggregatesFilterObjectSchema)]).optional(),
			_count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
			_min: z.lazy(() => NestedEnumPersonRoleFilterObjectSchema).optional(),
			_max: z.lazy(() => NestedEnumPersonRoleFilterObjectSchema).optional(),
		})
		.strict();
export const EnumPersonRoleWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumPersonRoleWithAggregatesFilter> =
	makeSchema() as unknown as z.ZodType<Prisma.EnumPersonRoleWithAggregatesFilter>;
export const EnumPersonRoleWithAggregatesFilterObjectZodSchema = makeSchema();
