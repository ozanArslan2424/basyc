import type { Prisma } from "../..";
import * as z from "zod";
import { ThingOrderByWithRelationInputObjectSchema as ThingOrderByWithRelationInputObjectSchema } from "./objects/ThingOrderByWithRelationInput.schema";
import { ThingWhereInputObjectSchema as ThingWhereInputObjectSchema } from "./objects/ThingWhereInput.schema";
import { ThingWhereUniqueInputObjectSchema as ThingWhereUniqueInputObjectSchema } from "./objects/ThingWhereUniqueInput.schema";
import { ThingScalarFieldEnumSchema } from "./enums/ThingScalarFieldEnum.schema";

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ThingFindFirstSelectSchema: z.ZodType<Prisma.ThingSelect> = z
	.object({
		id: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		content: z.boolean().optional(),
		isDone: z.boolean().optional(),
		doneDate: z.boolean().optional(),
		dueDate: z.boolean().optional(),
		attachments: z.boolean().optional(),
		assignedToId: z.boolean().optional(),
		assignedTo: z.boolean().optional(),
		createdById: z.boolean().optional(),
		createdBy: z.boolean().optional(),
		_count: z.boolean().optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.ThingSelect>;

export const ThingFindFirstSelectZodSchema = z
	.object({
		id: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		content: z.boolean().optional(),
		isDone: z.boolean().optional(),
		doneDate: z.boolean().optional(),
		dueDate: z.boolean().optional(),
		attachments: z.boolean().optional(),
		assignedToId: z.boolean().optional(),
		assignedTo: z.boolean().optional(),
		createdById: z.boolean().optional(),
		createdBy: z.boolean().optional(),
		_count: z.boolean().optional(),
	})
	.strict();

export const ThingFindFirstSchema: z.ZodType<Prisma.ThingFindFirstArgs> = z
	.object({
		select: ThingFindFirstSelectSchema.optional(),
		orderBy: z
			.union([ThingOrderByWithRelationInputObjectSchema, ThingOrderByWithRelationInputObjectSchema.array()])
			.optional(),
		where: ThingWhereInputObjectSchema.optional(),
		cursor: ThingWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([ThingScalarFieldEnumSchema, ThingScalarFieldEnumSchema.array()]).optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.ThingFindFirstArgs>;

export const ThingFindFirstZodSchema = z
	.object({
		select: ThingFindFirstSelectSchema.optional(),
		orderBy: z
			.union([ThingOrderByWithRelationInputObjectSchema, ThingOrderByWithRelationInputObjectSchema.array()])
			.optional(),
		where: ThingWhereInputObjectSchema.optional(),
		cursor: ThingWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([ThingScalarFieldEnumSchema, ThingScalarFieldEnumSchema.array()]).optional(),
	})
	.strict();
