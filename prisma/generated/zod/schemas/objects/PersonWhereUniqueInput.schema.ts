import * as z from 'zod';
import type { Prisma } from '../../..';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  userId: z.string().optional()
}).strict();
export const PersonWhereUniqueInputObjectSchema: z.ZodType<Prisma.PersonWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonWhereUniqueInput>;
export const PersonWhereUniqueInputObjectZodSchema = makeSchema();
