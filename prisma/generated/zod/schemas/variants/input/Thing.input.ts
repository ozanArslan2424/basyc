import * as z from "zod";
// prettier-ignore
export const ThingInputSchema = z.object({
    content: z.string(),
    attachments: z.array(z.unknown()),
    assignedToId: z.number().int().optional().nullable(),
    assignedTo: z.unknown().optional().nullable(),
    createdById: z.number().int(),
    createdBy: z.unknown()
}).strict();

export type ThingInputType = z.infer<typeof ThingInputSchema>;
