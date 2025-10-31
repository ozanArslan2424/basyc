import * as z from "zod";

export const ThingScalarFieldEnumSchema = z.enum([
	"id",
	"createdAt",
	"updatedAt",
	"content",
	"assignedToId",
	"createdById",
]);

export type ThingScalarFieldEnum = z.infer<typeof ThingScalarFieldEnumSchema>;
