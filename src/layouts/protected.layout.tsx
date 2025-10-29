import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { SidebarProvider, SidebarInset } from "@/components/sidebar/sidebar";
import { Outlet, useNavigate } from "react-router";
import { useLayoutEffect } from "react";
import { paths } from "@/nav/paths";
import { useAppContext } from "@/client";

export function ProtectedLayout() {
	const navigate = useNavigate();
	const ctx = useAppContext();

	useLayoutEffect(() => {
		ctx.queryService.queryClient.ensureQueryData(ctx.authService.queryMe()).catch(() => {
			navigate(paths.login);
		});
	}, [ctx.queryService.queryClient, ctx.authService, navigate]);

	return (
		<SidebarProvider>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<AppHeader />
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<Outlet />
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
