import * as z from "zod";
// prettier-ignore
export const SessionModelSchema = z.object({
    id: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
    expiresAt: z.date(),
    token: z.string(),
    ipAddress: z.string().nullable(),
    userAgent: z.string().nullable(),
    user: z.unknown(),
    userId: z.string()
}).strict();

export type SessionPureType = z.infer<typeof SessionModelSchema>;
