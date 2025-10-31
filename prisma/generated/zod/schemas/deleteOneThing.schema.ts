import type { Prisma } from "../..";
import * as z from "zod";
import { ThingWhereUniqueInputObjectSchema as ThingWhereUniqueInputObjectSchema } from "./objects/ThingWhereUniqueInput.schema";

export const ThingDeleteOneSchema: z.ZodType<Prisma.ThingDeleteArgs> = z
	.object({ where: ThingWhereUniqueInputObjectSchema })
	.strict() as unknown as z.ZodType<Prisma.ThingDeleteArgs>;

export const ThingDeleteOneZodSchema = z.object({ where: ThingWhereUniqueInputObjectSchema }).strict();
