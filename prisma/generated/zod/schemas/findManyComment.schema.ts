import type { Prisma } from "../..";
import * as z from "zod";
import { CommentOrderByWithRelationInputObjectSchema as CommentOrderByWithRelationInputObjectSchema } from "./objects/CommentOrderByWithRelationInput.schema";
import { CommentWhereInputObjectSchema as CommentWhereInputObjectSchema } from "./objects/CommentWhereInput.schema";
import { CommentWhereUniqueInputObjectSchema as CommentWhereUniqueInputObjectSchema } from "./objects/CommentWhereUniqueInput.schema";
import { CommentScalarFieldEnumSchema } from "./enums/CommentScalarFieldEnum.schema";

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const CommentFindManySelectSchema: z.ZodType<Prisma.CommentSelect> = z
	.object({
		id: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		content: z.boolean().optional(),
		createdBy: z.boolean().optional(),
		createdById: z.boolean().optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.CommentSelect>;

export const CommentFindManySelectZodSchema = z
	.object({
		id: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		content: z.boolean().optional(),
		createdBy: z.boolean().optional(),
		createdById: z.boolean().optional(),
	})
	.strict();

export const CommentFindManySchema: z.ZodType<Prisma.CommentFindManyArgs> = z
	.object({
		select: CommentFindManySelectSchema.optional(),
		orderBy: z
			.union([CommentOrderByWithRelationInputObjectSchema, CommentOrderByWithRelationInputObjectSchema.array()])
			.optional(),
		where: CommentWhereInputObjectSchema.optional(),
		cursor: CommentWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([CommentScalarFieldEnumSchema, CommentScalarFieldEnumSchema.array()]).optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.CommentFindManyArgs>;

export const CommentFindManyZodSchema = z
	.object({
		select: CommentFindManySelectSchema.optional(),
		orderBy: z
			.union([CommentOrderByWithRelationInputObjectSchema, CommentOrderByWithRelationInputObjectSchema.array()])
			.optional(),
		where: CommentWhereInputObjectSchema.optional(),
		cursor: CommentWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([CommentScalarFieldEnumSchema, CommentScalarFieldEnumSchema.array()]).optional(),
	})
	.strict();
