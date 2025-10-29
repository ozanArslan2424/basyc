import * as z from 'zod';

export const CommentScalarFieldEnumSchema = z.enum(['id', 'createdAt', 'updatedAt', 'content', 'createdById'])

export type CommentScalarFieldEnum = z.infer<typeof CommentScalarFieldEnumSchema>;