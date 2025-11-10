import * as z from 'zod';
// prettier-ignore
export const GroupModelSchema = z.object({
    id: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
    title: z.string(),
    password: z.string(),
    memberships: z.array(z.unknown())
}).strict();

export type GroupPureType = z.infer<typeof GroupModelSchema>;
