import * as z from 'zod';
// prettier-ignore
export const UserInputSchema = z.object({
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().optional().nullable(),
    password: z.string(),
    sessions: z.array(z.unknown()),
    profile: z.unknown().optional().nullable()
}).strict();

export type UserInputType = z.infer<typeof UserInputSchema>;
