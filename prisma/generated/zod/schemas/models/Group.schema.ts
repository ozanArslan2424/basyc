import * as z from 'zod';

export const GroupSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
  password: z.string(),
});

export type GroupType = z.infer<typeof GroupSchema>;
