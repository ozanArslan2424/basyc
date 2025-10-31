import type { Prisma } from "../..";
import * as z from "zod";
import { VerificationUpdateInputObjectSchema as VerificationUpdateInputObjectSchema } from "./objects/VerificationUpdateInput.schema";
import { VerificationUncheckedUpdateInputObjectSchema as VerificationUncheckedUpdateInputObjectSchema } from "./objects/VerificationUncheckedUpdateInput.schema";
import { VerificationWhereUniqueInputObjectSchema as VerificationWhereUniqueInputObjectSchema } from "./objects/VerificationWhereUniqueInput.schema";

export const VerificationUpdateOneSchema: z.ZodType<Prisma.VerificationUpdateArgs> = z
	.object({
		data: z.union([VerificationUpdateInputObjectSchema, VerificationUncheckedUpdateInputObjectSchema]),
		where: VerificationWhereUniqueInputObjectSchema,
	})
	.strict() as unknown as z.ZodType<Prisma.VerificationUpdateArgs>;

export const VerificationUpdateOneZodSchema = z
	.object({
		data: z.union([VerificationUpdateInputObjectSchema, VerificationUncheckedUpdateInputObjectSchema]),
		where: VerificationWhereUniqueInputObjectSchema,
	})
	.strict();
