import * as z from "zod";
import type { Prisma } from "../../..";
import { PersonRoleSchema } from "../enums/PersonRole.schema";
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from "./NestedIntFilter.schema";
import { NestedEnumPersonRoleFilterObjectSchema as NestedEnumPersonRoleFilterObjectSchema } from "./NestedEnumPersonRoleFilter.schema";

const nestedenumpersonrolewithaggregatesfilterSchema = z
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
export const NestedEnumPersonRoleWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumPersonRoleWithAggregatesFilter> =
	nestedenumpersonrolewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumPersonRoleWithAggregatesFilter>;
export const NestedEnumPersonRoleWithAggregatesFilterObjectZodSchema = nestedenumpersonrolewithaggregatesfilterSchema;
