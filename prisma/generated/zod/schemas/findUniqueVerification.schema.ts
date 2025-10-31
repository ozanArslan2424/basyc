import type { Prisma } from "../..";
import * as z from "zod";
import { VerificationWhereUniqueInputObjectSchema as VerificationWhereUniqueInputObjectSchema } from "./objects/VerificationWhereUniqueInput.schema";

export const VerificationFindUniqueSchema: z.ZodType<Prisma.VerificationFindUniqueArgs> = z
	.object({ where: VerificationWhereUniqueInputObjectSchema })
	.strict() as unknown as z.ZodType<Prisma.VerificationFindUniqueArgs>;

export const VerificationFindUniqueZodSchema = z.object({ where: VerificationWhereUniqueInputObjectSchema }).strict();
