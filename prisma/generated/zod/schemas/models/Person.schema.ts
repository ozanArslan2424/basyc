import * as z from 'zod';
import { PersonRoleSchema } from '../enums/PersonRole.schema';

export const PersonSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  email: z.string(),
  image: z.string().nullable(),
  role: PersonRoleSchema.default("user"),
  userId: z.string(),
});

export type PersonType = z.infer<typeof PersonSchema>;
