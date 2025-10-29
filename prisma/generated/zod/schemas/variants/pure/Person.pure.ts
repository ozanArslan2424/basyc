import * as z from 'zod';
import { PersonRoleSchema } from '../../enums/PersonRole.schema';
// prettier-ignore
export const PersonModelSchema = z.object({
    id: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
    name: z.string(),
    email: z.string(),
    image: z.string().nullable(),
    role: PersonRoleSchema,
    assignedThings: z.array(z.unknown()),
    createdThings: z.array(z.unknown()),
    createdComments: z.array(z.unknown()),
    createdAttachments: z.array(z.unknown()),
    userId: z.string(),
    user: z.unknown()
}).strict();

export type PersonPureType = z.infer<typeof PersonModelSchema>;
