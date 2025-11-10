import * as z from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  password: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;
