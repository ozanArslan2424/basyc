import type { Prisma } from "../..";
import * as z from "zod";
import { PersonWhereUniqueInputObjectSchema as PersonWhereUniqueInputObjectSchema } from "./objects/PersonWhereUniqueInput.schema";

export const PersonDeleteOneSchema: z.ZodType<Prisma.PersonDeleteArgs> = z
	.object({ where: PersonWhereUniqueInputObjectSchema })
	.strict() as unknown as z.ZodType<Prisma.PersonDeleteArgs>;

export const PersonDeleteOneZodSchema = z.object({ where: PersonWhereUniqueInputObjectSchema }).strict();
