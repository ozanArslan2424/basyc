import { GroupSchema } from "prisma/generated/zod/schemas";
import z from "zod";

export const GroupDataSchema = GroupSchema;

export type GroupData = z.infer<typeof GroupDataSchema>;

export const GroupCreateSchema = z.object({
	title: z.string(),
	password: z.string().min(6),
});

export type GroupCreateData = z.infer<typeof GroupCreateSchema>;

export const GroupJoinSchema = z.object({
	join: z.string().min(6),
});

export type GroupJoinData = z.infer<typeof GroupJoinSchema>;
