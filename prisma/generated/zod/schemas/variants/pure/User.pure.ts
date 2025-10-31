import * as z from "zod";
// prettier-ignore
export const UserModelSchema = z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().nullable(),
    password: z.string(),
    sessions: z.array(z.unknown()),
    profile: z.unknown().nullable()
}).strict();

export type UserPureType = z.infer<typeof UserModelSchema>;
