import * as z from 'zod';

export const AttachmentScalarFieldEnumSchema = z.enum(['id', 'createdAt', 'updatedAt', 'type', 'url', 'size', 'createdById', 'thingId'])

export type AttachmentScalarFieldEnum = z.infer<typeof AttachmentScalarFieldEnumSchema>;