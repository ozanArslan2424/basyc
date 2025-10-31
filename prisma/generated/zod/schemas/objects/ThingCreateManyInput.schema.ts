import * as z from "zod";
import type { Prisma } from "../../..";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
			createdAt: z.coerce.date().optional(),
			updatedAt: z.coerce.date().optional(),
			content: z.string(),
			assignedToId: z.number().int().optional().nullable(),
			createdById: z.number().int(),
		})
		.strict();
export const ThingCreateManyInputObjectSchema: z.ZodType<Prisma.ThingCreateManyInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThingCreateManyInput>;
export const ThingCreateManyInputObjectZodSchema = makeSchema();
