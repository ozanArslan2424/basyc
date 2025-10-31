import * as z from "zod";
import type { Prisma } from "../../..";

const makeSchema = () =>
	z
		.object({
			id: z.number().int().optional(),
			createdAt: z.coerce.date().optional(),
			variant: z.string(),
			value: z.string(),
			expiresAt: z.coerce.date(),
		})
		.strict();
export const VerificationUncheckedCreateInputObjectSchema: z.ZodType<Prisma.VerificationUncheckedCreateInput> =
	makeSchema() as unknown as z.ZodType<Prisma.VerificationUncheckedCreateInput>;
export const VerificationUncheckedCreateInputObjectZodSchema = makeSchema();
