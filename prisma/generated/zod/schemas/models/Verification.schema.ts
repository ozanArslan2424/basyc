import * as z from 'zod';

export const VerificationSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  variant: z.string(),
  value: z.string(),
  expiresAt: z.date(),
});

export type VerificationType = z.infer<typeof VerificationSchema>;
