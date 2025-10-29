import * as z from 'zod';
import { AttachmentTypeSchema } from '../../enums/AttachmentType.schema';
// prettier-ignore
export const AttachmentModelSchema = z.object({
    id: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
    type: AttachmentTypeSchema,
    url: z.string(),
    size: z.number(),
    createdById: z.number().int(),
    createdBy: z.unknown(),
    thingId: z.number().int(),
    thing: z.unknown()
}).strict();

export type AttachmentPureType = z.infer<typeof AttachmentModelSchema>;
