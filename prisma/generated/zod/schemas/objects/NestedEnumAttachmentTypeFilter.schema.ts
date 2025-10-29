import * as z from 'zod';
import type { Prisma } from '../../..';
import { AttachmentTypeSchema } from '../enums/AttachmentType.schema'

const nestedenumattachmenttypefilterSchema = z.object({
  equals: AttachmentTypeSchema.optional(),
  in: AttachmentTypeSchema.array().optional(),
  notIn: AttachmentTypeSchema.array().optional(),
  not: z.union([AttachmentTypeSchema, z.lazy(() => NestedEnumAttachmentTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumAttachmentTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumAttachmentTypeFilter> = nestedenumattachmenttypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumAttachmentTypeFilter>;
export const NestedEnumAttachmentTypeFilterObjectZodSchema = nestedenumattachmenttypefilterSchema;
