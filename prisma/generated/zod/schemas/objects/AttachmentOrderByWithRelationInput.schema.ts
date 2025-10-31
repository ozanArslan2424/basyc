import * as z from "zod";
import type { Prisma } from "../../..";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { PersonOrderByWithRelationInputObjectSchema as PersonOrderByWithRelationInputObjectSchema } from "./PersonOrderByWithRelationInput.schema";
import { ThingOrderByWithRelationInputObjectSchema as ThingOrderByWithRelationInputObjectSchema } from "./ThingOrderByWithRelationInput.schema";

const makeSchema = () =>
	z
		.object({
			id: SortOrderSchema.optional(),
			createdAt: SortOrderSchema.optional(),
			updatedAt: SortOrderSchema.optional(),
			type: SortOrderSchema.optional(),
			url: SortOrderSchema.optional(),
			size: SortOrderSchema.optional(),
			createdById: SortOrderSchema.optional(),
			thingId: SortOrderSchema.optional(),
			createdBy: z.lazy(() => PersonOrderByWithRelationInputObjectSchema).optional(),
			thing: z.lazy(() => ThingOrderByWithRelationInputObjectSchema).optional(),
		})
		.strict();
export const AttachmentOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.AttachmentOrderByWithRelationInput> =
	makeSchema() as unknown as z.ZodType<Prisma.AttachmentOrderByWithRelationInput>;
export const AttachmentOrderByWithRelationInputObjectZodSchema = makeSchema();
