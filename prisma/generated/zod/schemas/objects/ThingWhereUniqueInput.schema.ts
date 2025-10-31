import * as z from "zod";
import type { Prisma } from "../../..";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
		})
		.strict();
export const ThingWhereUniqueInputObjectSchema: z.ZodType<Prisma.ThingWhereUniqueInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThingWhereUniqueInput>;
export const ThingWhereUniqueInputObjectZodSchema = makeSchema();
