import * as z from 'zod';
import type { Prisma } from '../../..';


const makeSchema = () => z.object({
  id: z.number().int().optional()
}).strict();
export const GroupWhereUniqueInputObjectSchema: z.ZodType<Prisma.GroupWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.GroupWhereUniqueInput>;
export const GroupWhereUniqueInputObjectZodSchema = makeSchema();
