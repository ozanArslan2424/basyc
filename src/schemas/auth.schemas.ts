import { t } from "i18next";
import z from "zod";

export const LoginDataSchema = z.object({
	email: z.email(t("auth.login.email.error")),
	password: z.string().min(8, t("auth.login.password.error")),
});

export type LoginData = z.infer<typeof LoginDataSchema>;

export const RegisterDataSchema = z.object({
	name: z.string().min(1, t("register.name.error")),
	email: z.email(t("register.email.error")),
	password: z.string().min(8, t("register.password.error")),
});

export type RegisterData = z.infer<typeof RegisterDataSchema>;
