import * as z from "zod";
import { PersonRoleSchema } from "../../enums/PersonRole.schema";
// prettier-ignore
export const PersonInputSchema = z.object({
    name: z.string(),
    email: z.string(),
    image: z.string().optional().nullable(),
    role: PersonRoleSchema,
    assignedThings: z.array(z.unknown()),
    createdThings: z.array(z.unknown()),
    createdComments: z.array(z.unknown()),
    createdAttachments: z.array(z.unknown()),
    userId: z.string(),
    user: z.unknown()
}).strict();

export type PersonInputType = z.infer<typeof PersonInputSchema>;
