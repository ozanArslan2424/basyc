import * as z from "zod";
import { AttachmentTypeSchema } from "../../enums/AttachmentType.schema";
// prettier-ignore
export const AttachmentInputSchema = z.object({
    type: AttachmentTypeSchema,
    url: z.string(),
    size: z.number(),
    createdById: z.number().int(),
    createdBy: z.unknown(),
    thingId: z.number().int(),
    thing: z.unknown()
}).strict();

export type AttachmentInputType = z.infer<typeof AttachmentInputSchema>;
