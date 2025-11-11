import { PersonDataSchema } from "@/modules/person/person.schema";
import { t as translate } from "i18next";
import z from "zod";
import { t } from "elysia";

export const LoginSchema = z.object({
	email: z.email(translate("auth.login.email.error")),
	password: z.string().min(8, translate("auth.login.password.error")),
});

export type LoginData = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
	name: z.string().min(1, translate("register.name.error")),
	email: z.email(translate("register.email.error")),
	password: z.string().min(8, translate("register.password.error")),
});

export type RegisterData = z.infer<typeof RegisterSchema>;

export const AuthResponseSchema = z.object({
	profile: PersonDataSchema,
	accessToken: z.string(),
});

export const AuthCookieSchema = z.object({
	auth: z.string().nullish(),
});

export const AuthJWTSchema = t.Object({
	userId: t.String(),
});

export type AuthJWTData = typeof AuthJWTSchema;
