import * as z from 'zod';
import type { Prisma } from '../../..';
import { PersonRoleSchema } from '../enums/PersonRole.schema'

const nestedenumpersonrolefilterSchema = z.object({
  equals: PersonRoleSchema.optional(),
  in: PersonRoleSchema.array().optional(),
  notIn: PersonRoleSchema.array().optional(),
  not: z.union([PersonRoleSchema, z.lazy(() => NestedEnumPersonRoleFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumPersonRoleFilterObjectSchema: z.ZodType<Prisma.NestedEnumPersonRoleFilter> = nestedenumpersonrolefilterSchema as unknown as z.ZodType<Prisma.NestedEnumPersonRoleFilter>;
export const NestedEnumPersonRoleFilterObjectZodSchema = nestedenumpersonrolefilterSchema;
