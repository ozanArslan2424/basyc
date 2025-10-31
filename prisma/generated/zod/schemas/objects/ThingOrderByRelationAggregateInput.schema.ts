import * as z from "zod";
import type { Prisma } from "../../..";
import { SortOrderSchema } from "../enums/SortOrder.schema";

const makeSchema = () =>
	z
		.object({
			_count: SortOrderSchema.optional(),
		})
		.strict();
export const ThingOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ThingOrderByRelationAggregateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThingOrderByRelationAggregateInput>;
export const ThingOrderByRelationAggregateInputObjectZodSchema = makeSchema();
