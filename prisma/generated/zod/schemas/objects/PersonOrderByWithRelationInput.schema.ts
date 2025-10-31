import * as z from "zod";
import type { Prisma } from "../../..";
import { SortOrderSchema } from "../enums/SortOrder.schema";
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from "./SortOrderInput.schema";
import { ThingOrderByRelationAggregateInputObjectSchema as ThingOrderByRelationAggregateInputObjectSchema } from "./ThingOrderByRelationAggregateInput.schema";
import { CommentOrderByRelationAggregateInputObjectSchema as CommentOrderByRelationAggregateInputObjectSchema } from "./CommentOrderByRelationAggregateInput.schema";
import { AttachmentOrderByRelationAggregateInputObjectSchema as AttachmentOrderByRelationAggregateInputObjectSchema } from "./AttachmentOrderByRelationAggregateInput.schema";
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from "./UserOrderByWithRelationInput.schema";

const makeSchema = () =>
	z
		.object({
			id: SortOrderSchema.optional(),
			createdAt: SortOrderSchema.optional(),
			updatedAt: SortOrderSchema.optional(),
			name: SortOrderSchema.optional(),
			email: SortOrderSchema.optional(),
			image: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
			role: SortOrderSchema.optional(),
			userId: SortOrderSchema.optional(),
			assignedThings: z.lazy(() => ThingOrderByRelationAggregateInputObjectSchema).optional(),
			createdThings: z.lazy(() => ThingOrderByRelationAggregateInputObjectSchema).optional(),
			createdComments: z.lazy(() => CommentOrderByRelationAggregateInputObjectSchema).optional(),
			createdAttachments: z.lazy(() => AttachmentOrderByRelationAggregateInputObjectSchema).optional(),
			user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
		})
		.strict();
export const PersonOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.PersonOrderByWithRelationInput> =
	makeSchema() as unknown as z.ZodType<Prisma.PersonOrderByWithRelationInput>;
export const PersonOrderByWithRelationInputObjectZodSchema = makeSchema();
