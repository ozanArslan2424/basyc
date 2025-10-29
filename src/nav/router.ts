import { AppLayout } from "@/layouts/app.layout";
import { ProtectedLayout } from "@/layouts/protected.layout";
import { DashboardPage } from "@/pages/dashboard/dashboard.page";
import { ErrorBoundary } from "@/pages/error/error-boundary";
import { LandingPage } from "@/pages/landing/landing.page";
import { createBrowserRouter } from "react-router";
import { paths } from "./paths";
import { AuthLayout } from "@/pages/auth/auth.layout";
import { LoginPage } from "@/pages/auth/login.page";
import { RegisterPage } from "@/pages/auth/register.page";

export const router = createBrowserRouter([
	{
		Component: AppLayout,
		ErrorBoundary,
		children: [
			{ path: paths.landing, Component: LandingPage },
			{
				Component: ProtectedLayout,
				children: [{ path: paths.dashboard, Component: DashboardPage }],
			},
			{
				Component: AuthLayout,
				children: [
					{ path: paths.login, Component: LoginPage },
					{ path: paths.register, Component: RegisterPage },
				],
			},
			// Fallback route for 404 pages
			{ path: "*", Component: ErrorBoundary },
		],
	},
]);
