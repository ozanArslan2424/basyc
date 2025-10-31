import * as z from "zod";
import type { Prisma } from "../../..";
import { IntFilterObjectSchema as IntFilterObjectSchema } from "./IntFilter.schema";
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { StringFilterObjectSchema as StringFilterObjectSchema } from "./StringFilter.schema";
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from "./IntNullableFilter.schema";

const thingwhereinputSchema = z
	.object({
		AND: z
			.union([z.lazy(() => ThingWhereInputObjectSchema), z.lazy(() => ThingWhereInputObjectSchema).array()])
			.optional(),
		OR: z
			.lazy(() => ThingWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([z.lazy(() => ThingWhereInputObjectSchema), z.lazy(() => ThingWhereInputObjectSchema).array()])
			.optional(),
		id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
		createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
		updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
		content: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
		assignedToId: z
			.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()])
			.optional()
			.nullable(),
		createdById: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
	})
	.strict();
export const ThingWhereInputObjectSchema: z.ZodType<Prisma.ThingWhereInput> =
	thingwhereinputSchema as unknown as z.ZodType<Prisma.ThingWhereInput>;
export const ThingWhereInputObjectZodSchema = thingwhereinputSchema;
