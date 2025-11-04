import * as z from "zod";
import type { Prisma } from "../../..";
import { IntFilterObjectSchema as IntFilterObjectSchema } from "./IntFilter.schema";
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from "./DateTimeFilter.schema";
import { StringFilterObjectSchema as StringFilterObjectSchema } from "./StringFilter.schema";
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from "./BoolFilter.schema";
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from "./DateTimeNullableFilter.schema";
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from "./IntNullableFilter.schema";

const thingscalarwhereinputSchema = z
	.object({
		AND: z
			.union([z.lazy(() => ThingScalarWhereInputObjectSchema), z.lazy(() => ThingScalarWhereInputObjectSchema).array()])
			.optional(),
		OR: z
			.lazy(() => ThingScalarWhereInputObjectSchema)
			.array()
			.optional(),
		NOT: z
			.union([z.lazy(() => ThingScalarWhereInputObjectSchema), z.lazy(() => ThingScalarWhereInputObjectSchema).array()])
			.optional(),
		id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
		createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
		updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
		content: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
		isDone: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
		doneDate: z
			.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()])
			.optional()
			.nullable(),
		dueDate: z
			.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()])
			.optional()
			.nullable(),
		assignedToId: z
			.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()])
			.optional()
			.nullable(),
		createdById: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
	})
	.strict();
export const ThingScalarWhereInputObjectSchema: z.ZodType<Prisma.ThingScalarWhereInput> =
	thingscalarwhereinputSchema as unknown as z.ZodType<Prisma.ThingScalarWhereInput>;
export const ThingScalarWhereInputObjectZodSchema = thingscalarwhereinputSchema;
