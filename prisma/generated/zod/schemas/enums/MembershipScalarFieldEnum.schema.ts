import * as z from 'zod';

export const MembershipScalarFieldEnumSchema = z.enum(['personId', 'groupId', 'role'])

export type MembershipScalarFieldEnum = z.infer<typeof MembershipScalarFieldEnumSchema>;