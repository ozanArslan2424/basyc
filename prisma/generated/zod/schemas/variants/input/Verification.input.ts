import * as z from "zod";
// prettier-ignore
export const VerificationInputSchema = z.object({
    variant: z.string(),
    value: z.string(),
    expiresAt: z.date()
}).strict();

export type VerificationInputType = z.infer<typeof VerificationInputSchema>;
