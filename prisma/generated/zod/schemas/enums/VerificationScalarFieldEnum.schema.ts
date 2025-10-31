import * as z from "zod";

export const VerificationScalarFieldEnumSchema = z.enum([
	"id",
	"createdAt",
	"updatedAt",
	"variant",
	"value",
	"expiresAt",
]);

export type VerificationScalarFieldEnum = z.infer<typeof VerificationScalarFieldEnumSchema>;
