import type { Prisma } from '../..';
import * as z from 'zod';
import { MembershipOrderByWithRelationInputObjectSchema as MembershipOrderByWithRelationInputObjectSchema } from './objects/MembershipOrderByWithRelationInput.schema';
import { MembershipWhereInputObjectSchema as MembershipWhereInputObjectSchema } from './objects/MembershipWhereInput.schema';
import { MembershipWhereUniqueInputObjectSchema as MembershipWhereUniqueInputObjectSchema } from './objects/MembershipWhereUniqueInput.schema';
import { MembershipScalarFieldEnumSchema } from './enums/MembershipScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MembershipFindManySelectSchema: z.ZodType<Prisma.MembershipSelect> = z.object({
    personId: z.boolean().optional(),
    person: z.boolean().optional(),
    groupId: z.boolean().optional(),
    group: z.boolean().optional(),
    role: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.MembershipSelect>;

export const MembershipFindManySelectZodSchema = z.object({
    personId: z.boolean().optional(),
    person: z.boolean().optional(),
    groupId: z.boolean().optional(),
    group: z.boolean().optional(),
    role: z.boolean().optional()
  }).strict();

export const MembershipFindManySchema: z.ZodType<Prisma.MembershipFindManyArgs> = z.object({ select: MembershipFindManySelectSchema.optional(),  orderBy: z.union([MembershipOrderByWithRelationInputObjectSchema, MembershipOrderByWithRelationInputObjectSchema.array()]).optional(), where: MembershipWhereInputObjectSchema.optional(), cursor: MembershipWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([MembershipScalarFieldEnumSchema, MembershipScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.MembershipFindManyArgs>;

export const MembershipFindManyZodSchema = z.object({ select: MembershipFindManySelectSchema.optional(),  orderBy: z.union([MembershipOrderByWithRelationInputObjectSchema, MembershipOrderByWithRelationInputObjectSchema.array()]).optional(), where: MembershipWhereInputObjectSchema.optional(), cursor: MembershipWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([MembershipScalarFieldEnumSchema, MembershipScalarFieldEnumSchema.array()]).optional() }).strict();