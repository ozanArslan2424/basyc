import * as z from 'zod';

export const GroupScalarFieldEnumSchema = z.enum(['id', 'createdAt', 'updatedAt', 'title', 'password'])

export type GroupScalarFieldEnum = z.infer<typeof GroupScalarFieldEnumSchema>;