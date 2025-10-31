import * as z from "zod";
import type { Prisma } from "../../..";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from "./SortOrderInput.schema";
import { AttachmentOrderByRelationAggregateInputObjectSchema as AttachmentOrderByRelationAggregateInputObjectSchema } from "./AttachmentOrderByRelationAggregateInput.schema";
import { PersonOrderByWithRelationInputObjectSchema as PersonOrderByWithRelationInputObjectSchema } from "./PersonOrderByWithRelationInput.schema";

const makeSchema = () =>
	z
		.object({
			id: SortOrderSchema.optional(),
			createdAt: SortOrderSchema.optional(),
			updatedAt: SortOrderSchema.optional(),
			content: SortOrderSchema.optional(),
			assignedToId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
			createdById: SortOrderSchema.optional(),
			attachments: z.lazy(() => AttachmentOrderByRelationAggregateInputObjectSchema).optional(),
			assignedTo: z.lazy(() => PersonOrderByWithRelationInputObjectSchema).optional(),
			createdBy: z.lazy(() => PersonOrderByWithRelationInputObjectSchema).optional(),
		})
		.strict();
export const ThingOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ThingOrderByWithRelationInput> =
	makeSchema() as unknown as z.ZodType<Prisma.ThingOrderByWithRelationInput>;
export const ThingOrderByWithRelationInputObjectZodSchema = makeSchema();
