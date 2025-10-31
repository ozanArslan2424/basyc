import * as z from "zod";
// prettier-ignore
export const CommentModelSchema = z.object({
    id: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
    content: z.string(),
    createdBy: z.unknown(),
    createdById: z.number().int()
}).strict();

export type CommentPureType = z.infer<typeof CommentModelSchema>;
