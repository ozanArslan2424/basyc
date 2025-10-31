import * as z from "zod";

export const SessionSchema = z.object({
	id: z.number().int(),
	createdAt: z.date(),
	updatedAt: z.date(),
	expiresAt: z.date(),
	token: z.string(),
	ipAddress: z.string().nullable(),
	userAgent: z.string().nullable(),
	userId: z.string(),
});

export type SessionType = z.infer<typeof SessionSchema>;
