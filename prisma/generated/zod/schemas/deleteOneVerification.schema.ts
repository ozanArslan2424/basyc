import type { Prisma } from "../..";
import * as z from "zod";
import { VerificationWhereUniqueInputObjectSchema as VerificationWhereUniqueInputObjectSchema } from "./objects/VerificationWhereUniqueInput.schema";

export const VerificationDeleteOneSchema: z.ZodType<Prisma.VerificationDeleteArgs> = z
	.object({ where: VerificationWhereUniqueInputObjectSchema })
	.strict() as unknown as z.ZodType<Prisma.VerificationDeleteArgs>;

export const VerificationDeleteOneZodSchema = z.object({ where: VerificationWhereUniqueInputObjectSchema }).strict();
