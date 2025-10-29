import * as z from 'zod';

export const PersonScalarFieldEnumSchema = z.enum(['id', 'createdAt', 'updatedAt', 'name', 'email', 'image', 'role', 'userId'])

export type PersonScalarFieldEnum = z.infer<typeof PersonScalarFieldEnumSchema>;