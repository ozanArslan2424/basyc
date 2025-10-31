import type { Prisma } from "../..";
import * as z from "zod";
import { PersonOrderByWithRelationInputObjectSchema as PersonOrderByWithRelationInputObjectSchema } from "./objects/PersonOrderByWithRelationInput.schema";
import { PersonWhereInputObjectSchema as PersonWhereInputObjectSchema } from "./objects/PersonWhereInput.schema";
import { PersonWhereUniqueInputObjectSchema as PersonWhereUniqueInputObjectSchema } from "./objects/PersonWhereUniqueInput.schema";
import { PersonScalarFieldEnumSchema } from "./enums/PersonScalarFieldEnum.schema";

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const PersonFindManySelectSchema: z.ZodType<Prisma.PersonSelect> = z
	.object({
		id: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		name: z.boolean().optional(),
		email: z.boolean().optional(),
		image: z.boolean().optional(),
		role: z.boolean().optional(),
		assignedThings: z.boolean().optional(),
		createdThings: z.boolean().optional(),
		createdComments: z.boolean().optional(),
		createdAttachments: z.boolean().optional(),
		userId: z.boolean().optional(),
		user: z.boolean().optional(),
		_count: z.boolean().optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.PersonSelect>;

export const PersonFindManySelectZodSchema = z
	.object({
		id: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		name: z.boolean().optional(),
		email: z.boolean().optional(),
		image: z.boolean().optional(),
		role: z.boolean().optional(),
		assignedThings: z.boolean().optional(),
		createdThings: z.boolean().optional(),
		createdComments: z.boolean().optional(),
		createdAttachments: z.boolean().optional(),
		userId: z.boolean().optional(),
		user: z.boolean().optional(),
		_count: z.boolean().optional(),
	})
	.strict();

export const PersonFindManySchema: z.ZodType<Prisma.PersonFindManyArgs> = z
	.object({
		select: PersonFindManySelectSchema.optional(),
		orderBy: z
			.union([PersonOrderByWithRelationInputObjectSchema, PersonOrderByWithRelationInputObjectSchema.array()])
			.optional(),
		where: PersonWhereInputObjectSchema.optional(),
		cursor: PersonWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([PersonScalarFieldEnumSchema, PersonScalarFieldEnumSchema.array()]).optional(),
	})
	.strict() as unknown as z.ZodType<Prisma.PersonFindManyArgs>;

export const PersonFindManyZodSchema = z
	.object({
		select: PersonFindManySelectSchema.optional(),
		orderBy: z
			.union([PersonOrderByWithRelationInputObjectSchema, PersonOrderByWithRelationInputObjectSchema.array()])
			.optional(),
		where: PersonWhereInputObjectSchema.optional(),
		cursor: PersonWhereUniqueInputObjectSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([PersonScalarFieldEnumSchema, PersonScalarFieldEnumSchema.array()]).optional(),
	})
	.strict();
