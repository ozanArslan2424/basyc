import * as z from 'zod';
import type { Prisma } from '../../..';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema'

const makeSchema = () => z.object({
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  content: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdById: z.number().int()
}).strict();
export const ThingUpdateInputObjectSchema: z.ZodType<Prisma.ThingUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.ThingUpdateInput>;
export const ThingUpdateInputObjectZodSchema = makeSchema();
