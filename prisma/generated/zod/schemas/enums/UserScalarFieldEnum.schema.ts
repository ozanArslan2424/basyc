import * as z from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id', 'createdAt', 'updatedAt', 'name', 'email', 'emailVerified', 'image', 'password'])

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;