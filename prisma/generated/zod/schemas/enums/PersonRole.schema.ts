import * as z from "zod";

export const PersonRoleSchema = z.enum(["super_admin", "admin", "user"]);

export type PersonRole = z.infer<typeof PersonRoleSchema>;
