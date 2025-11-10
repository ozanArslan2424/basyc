import * as z from 'zod';
import type { Prisma } from '../../..';


const makeSchema = () => z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  title: z.string(),
  password: z.string()
}).strict();
export const GroupUncheckedCreateInputObjectSchema: z.ZodType<Prisma.GroupUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.GroupUncheckedCreateInput>;
export const GroupUncheckedCreateInputObjectZodSchema = makeSchema();
