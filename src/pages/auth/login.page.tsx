import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ErrorLabel, Label } from "@/components/ui/label";
import { paths } from "@/nav/paths";
import { Link, useNavigate } from "react-router";
import { useForm } from "@/hooks/use-form";
import { useAppContext } from "@/client";
import { useMutation } from "@tanstack/react-query";
import { SocialLoginButtons } from "./social-login-buttons";
import { useTranslation } from "react-i18next";
import { LoginDataSchema } from "@/schemas/auth.schemas";
import { QK_AUTH } from "@/services/auth/auth.keys";

export function LoginPage() {
	const { t } = useTranslation("auth");
	const ctx = useAppContext();
	const navigate = useNavigate();
	const loginMutation = useMutation(ctx.authService.login());

	const form = useForm({
		schema: LoginDataSchema,
		defaultValues: {
			email: "testaccount@test.com",
			password: "123456789",
		},
		onSubmit: (body) =>
			loginMutation.mutate(body, {
				onSuccess: async () => {
					await ctx.queryService.invalidateAll([[QK_AUTH.ME]]);
					navigate(paths.dashboard);
				},
			}),
	});

	const welcomeBackMessage = t("login.welcome");
	const loginMessage = t("login.message");
	const emailLabel = t("login.email.label");
	const passwordLabel = t("login.password.label");
	const forgotPasswordLabel = t("login.forgotPassword");
	const submitLabel = t("login.submit");
	const registerLabel = t("login.noAccount");

	return (
		<form className="p-6 md:p-10" {...form.methods}>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col items-center text-center">
					<h1 className="text-2xl font-bold">{welcomeBackMessage}</h1>
					<p className="text-muted-foreground text-balance">{loginMessage}</p>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="email">{emailLabel}</Label>
					<Input
						id="email"
						name="email"
						autoComplete="email"
						type="email"
						placeholder="ik@ornek.com"
						required
						defaultValue={form.defaultValues?.email}
					/>
					<ErrorLabel htmlFor="email">{form.errors?.email}</ErrorLabel>
				</div>
				<div className="grid gap-2">
					<div className="flex items-center">
						<Label htmlFor="password">{passwordLabel}</Label>
						<Link
							to={paths.forgotPassword}
							className="text-muted-foreground hover:text-foreground ml-auto text-xs underline-offset-2 transition-colors hover:underline"
						>
							{forgotPasswordLabel}
						</Link>
					</div>
					<Input
						id="password"
						name="password"
						autoComplete="current-password"
						type="password"
						required
						defaultValue={form.defaultValues?.password}
					/>
					<ErrorLabel htmlFor="password">{form.errors?.password}</ErrorLabel>
				</div>
				<Button type="submit" className="w-full">
					{submitLabel}
				</Button>

				<SocialLoginButtons />

				<Link
					to={paths.register}
					className="text-muted-foreground hover:text-foreground text-center text-sm transition-all"
				>
					{registerLabel}
				</Link>
			</div>
		</form>
	);
}
