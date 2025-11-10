import * as z from 'zod';
import { PersonRoleSchema } from '../../enums/PersonRole.schema';
// prettier-ignore
export const MembershipInputSchema = z.object({
    personId: z.number().int(),
    person: z.unknown(),
    groupId: z.number().int(),
    group: z.unknown(),
    role: PersonRoleSchema
}).strict();

export type MembershipInputType = z.infer<typeof MembershipInputSchema>;
