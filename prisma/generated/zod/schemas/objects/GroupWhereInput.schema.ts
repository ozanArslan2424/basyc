import * as z from 'zod';
import type { Prisma } from '../../..';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema'

const groupwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => GroupWhereInputObjectSchema), z.lazy(() => GroupWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => GroupWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => GroupWhereInputObjectSchema), z.lazy(() => GroupWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  password: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional()
}).strict();
export const GroupWhereInputObjectSchema: z.ZodType<Prisma.GroupWhereInput> = groupwhereinputSchema as unknown as z.ZodType<Prisma.GroupWhereInput>;
export const GroupWhereInputObjectZodSchema = groupwhereinputSchema;
