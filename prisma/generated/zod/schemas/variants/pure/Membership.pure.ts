import * as z from 'zod';
import { PersonRoleSchema } from '../../enums/PersonRole.schema';
// prettier-ignore
export const MembershipModelSchema = z.object({
    personId: z.number().int(),
    person: z.unknown(),
    groupId: z.number().int(),
    group: z.unknown(),
    role: PersonRoleSchema
}).strict();

export type MembershipPureType = z.infer<typeof MembershipModelSchema>;
