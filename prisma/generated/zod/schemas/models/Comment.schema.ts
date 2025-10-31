import * as z from "zod";

export const CommentSchema = z.object({
	id: z.number().int(),
	createdAt: z.date(),
	updatedAt: z.date(),
	content: z.string(),
	createdById: z.number().int(),
});

export type CommentType = z.infer<typeof CommentSchema>;
