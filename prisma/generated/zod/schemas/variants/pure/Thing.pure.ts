import * as z from "zod";
// prettier-ignore
export const ThingModelSchema = z.object({
    id: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
    content: z.string(),
    isDone: z.boolean(),
    doneDate: z.date().nullable(),
    dueDate: z.date().nullable(),
    attachments: z.array(z.unknown()),
    assignedToId: z.number().int().nullable(),
    assignedTo: z.unknown().nullable(),
    createdById: z.number().int(),
    createdBy: z.unknown()
}).strict();

export type ThingPureType = z.infer<typeof ThingModelSchema>;
