import * as z from "zod";
import type { Prisma } from "../../..";
import { IntFilterObjectSchema as IntFilterObjectSchema } from "./IntFilter.schema";
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { StringFilterObjectSchema as StringFilterObjectSchema } from "./StringFilter.schema";
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from "./StringNullableFilter.schema";
import { EnumPersonRoleFilterObjectSchema as EnumPersonRoleFilterObjectSchema } from "./EnumPersonRoleFilter.schema";
import { PersonRoleSchema } from "../enums/PersonRole.schema";

const personwhereinputSchema = z
	.object({
		AND: z
			.union([z.lazy(() => PersonWhereInputObjectSchema), z.lazy(() => PersonWhereInputObjectSchema).array()])
			.optional(),
		OR: z
			.lazy(() => PersonWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([z.lazy(() => PersonWhereInputObjectSchema), z.lazy(() => PersonWhereInputObjectSchema).array()])
			.optional(),
		id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
		createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
		updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
		name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
		email: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
		image: z
			.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
			.optional()
			.nullable(),
		role: z.union([z.lazy(() => EnumPersonRoleFilterObjectSchema), PersonRoleSchema]).optional(),
		userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
	})
	.strict();
export const PersonWhereInputObjectSchema: z.ZodType<Prisma.PersonWhereInput> =
	personwhereinputSchema as unknown as z.ZodType<Prisma.PersonWhereInput>;
export const PersonWhereInputObjectZodSchema = personwhereinputSchema;
