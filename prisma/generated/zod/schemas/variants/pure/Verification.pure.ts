import * as z from 'zod';
// prettier-ignore
export const VerificationModelSchema = z.object({
    id: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
    variant: z.string(),
    value: z.string(),
    expiresAt: z.date()
}).strict();

export type VerificationPureType = z.infer<typeof VerificationModelSchema>;
