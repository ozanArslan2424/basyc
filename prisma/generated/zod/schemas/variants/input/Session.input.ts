import * as z from "zod";
// prettier-ignore
export const SessionInputSchema = z.object({
    expiresAt: z.date(),
    token: z.string(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
    user: z.unknown(),
    userId: z.string()
}).strict();

export type SessionInputType = z.infer<typeof SessionInputSchema>;
