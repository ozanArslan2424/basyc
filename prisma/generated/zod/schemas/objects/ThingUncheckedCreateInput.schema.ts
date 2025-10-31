import * as z from "zod";
import type { Prisma } from "../../..";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
			createdAt: z.coerce.date().optional(),
			content: z.string(),
			assignedToId: z.number().int().optional().nullable(),
			createdById: z.number().int(),
		})
		.strict();
export const ThingUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ThingUncheckedCreateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThingUncheckedCreateInput>;
export const ThingUncheckedCreateInputObjectZodSchema = makeSchema();
