import * as z from 'zod';
// prettier-ignore
export const CommentInputSchema = z.object({
    content: z.string(),
    createdBy: z.unknown(),
    createdById: z.number().int()
}).strict();

export type CommentInputType = z.infer<typeof CommentInputSchema>;
