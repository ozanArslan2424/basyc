import * as z from 'zod';

export const ThingSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  content: z.string(),
  isDone: z.boolean(),
  doneDate: z.date().nullable(),
  dueDate: z.date().nullable(),
  assignedToId: z.number().int().nullable(),
  createdById: z.number().int(),
});

export type ThingType = z.infer<typeof ThingSchema>;
