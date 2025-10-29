import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { paths } from "@/nav/paths";
import { Link, useNavigate } from "react-router";
import { useForm } from "@/hooks/use-form";
import { useAppContext } from "@/client";
import { useMutation } from "@tanstack/react-query";
import { SocialLoginButtons } from "./social-login-buttons";
import { useTranslation } from "react-i18next";
import { FormField } from "@/components/form/form-field";
import { RegisterDataSchema } from "@/schemas/auth.schemas";

export function RegisterPage() {
	const { t } = useTranslation("auth");
	const ctx = useAppContext();
	const navigate = useNavigate();
	const registerMutation = useMutation(ctx.authService.register());

	const form = useForm({
		schema: RegisterDataSchema,
		defaultValues: {
			name: "Test Account",
			email: "testaccount@test.com",
			password: "123456789",
		},
		onSubmit: (body) =>
			registerMutation.mutate(body, {
				onSuccess: () => {
					navigate(paths.dashboard);
				},
			}),
	});

	const welcomeBackMessage = t("register.welcome");
	const registerMessage = t("register.message");
	const emailLabel = t("register.email.label");
	const nameLabel = t("register.name.label");
	const passwordLabel = t("register.password.label");
	const submitLabel = t("register.submit");
	const backToLoginLabel = t("register.haveAccount");

	return (
		<form className="p-6 md:p-10" {...form.methods}>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col items-center text-center">
					<h1 className="text-2xl font-bold">{welcomeBackMessage}</h1>
					<p className="text-muted-foreground text-center">{registerMessage}</p>
				</div>

				<FormField form={form} name="name" id="name" label={nameLabel}>
					<Input autoComplete="name" type="text" required />
				</FormField>
				<FormField form={form} name="email" id="email" label={emailLabel}>
					<Input autoComplete="email" type="email" required />
				</FormField>
				<FormField form={form} name="password" id="password" label={passwordLabel}>
					<Input autoComplete="new-password" type="password" required />
				</FormField>

				<Button type="submit" className="w-full">
					{submitLabel}
				</Button>

				<SocialLoginButtons />

				<Link
					to={paths.login}
					className="text-muted-foreground hover:text-foreground text-center text-sm transition-all"
				>
					{backToLoginLabel}
				</Link>
			</div>
		</form>
	);
}
