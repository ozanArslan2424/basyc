import * as z from 'zod';
// prettier-ignore
export const GroupInputSchema = z.object({
    title: z.string(),
    password: z.string(),
    memberships: z.array(z.unknown())
}).strict();

export type GroupInputType = z.infer<typeof GroupInputSchema>;
