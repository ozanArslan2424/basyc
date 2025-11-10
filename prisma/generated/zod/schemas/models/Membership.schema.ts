import * as z from 'zod';
import { PersonRoleSchema } from '../enums/PersonRole.schema';

export const MembershipSchema = z.object({
  personId: z.number().int(),
  groupId: z.number().int(),
  role: PersonRoleSchema,
});

export type MembershipType = z.infer<typeof MembershipSchema>;
