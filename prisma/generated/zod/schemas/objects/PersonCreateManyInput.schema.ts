import * as z from 'zod';
import type { Prisma } from '../../..';
import { PersonRoleSchema } from '../enums/PersonRole.schema'

const makeSchema = () => z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  email: z.string(),
  image: z.string().optional().nullable(),
  role: PersonRoleSchema.optional(),
  userId: z.string()
}).strict();
export const PersonCreateManyInputObjectSchema: z.ZodType<Prisma.PersonCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonCreateManyInput>;
export const PersonCreateManyInputObjectZodSchema = makeSchema();
