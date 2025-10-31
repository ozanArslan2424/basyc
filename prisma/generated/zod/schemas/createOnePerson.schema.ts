import type { Prisma } from "../..";
import * as z from "zod";
import { PersonUncheckedCreateInputObjectSchema as PersonUncheckedCreateInputObjectSchema } from "./objects/PersonUncheckedCreateInput.schema";

export const PersonCreateOneSchema: z.ZodType<Prisma.PersonCreateArgs> = z
	.object({ data: PersonUncheckedCreateInputObjectSchema })
	.strict() as unknown as z.ZodType<Prisma.PersonCreateArgs>;

export const PersonCreateOneZodSchema = z.object({ data: PersonUncheckedCreateInputObjectSchema }).strict();
