import * as z from "zod";
import type { Prisma } from "../../..";
import { PersonRoleSchema } from "../enums/PersonRole.schema";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
			createdAt: z.coerce.date().optional(),
			name: z.string(),
			email: z.string(),
			image: z.string().optional().nullable(),
			role: PersonRoleSchema.optional(),
			userId: z.string(),
		})
		.strict();
export const PersonUncheckedCreateInputObjectSchema: z.ZodType<Prisma.PersonUncheckedCreateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.PersonUncheckedCreateInput>;
export const PersonUncheckedCreateInputObjectZodSchema = makeSchema();
