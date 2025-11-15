import { GroupSchema, MembershipSchema, PersonSchema } from "prisma/generated/zod/schemas";
import z from "zod";

export const PersonDataSchema = PersonSchema.extend({
	memberships: MembershipSchema.extend({
		group: GroupSchema,
	}).array(),
});

export type PersonData = z.infer<typeof PersonDataSchema>;

export const PersonCreateSchema = z.object({
	userId: z.string(),
	email: z.email(),
	name: z.string(),
});

export type PersonCreateData = z.infer<typeof PersonCreateSchema>;

export const PersonRemoveSchema = z.object({
	personId: z.number(),
});

export type PersonRemoveData = z.infer<typeof PersonRemoveSchema>;
