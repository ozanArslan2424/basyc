import * as z from 'zod';
// prettier-ignore
export const ThingModelSchema = z.object({
    id: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
    content: z.string(),
    attachments: z.array(z.unknown()),
    assignedToId: z.number().int().nullable(),
    assignedTo: z.unknown().nullable(),
    createdById: z.number().int(),
    createdBy: z.unknown()
}).strict();

export type ThingPureType = z.infer<typeof ThingModelSchema>;
