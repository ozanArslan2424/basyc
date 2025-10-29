import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { AppHeader } from "@/components/app-header";
import { SidebarProvider, SidebarInset } from "@/components/sidebar/sidebar";
import { Outlet, useNavigate } from "react-router";
import { useLayoutEffect, useState } from "react";
import { paths } from "@/nav/paths";
import { useAppContext } from "@/client";
import { PendingCard } from "@/components/pending-card";

export function ProtectedLayout() {
	const navigate = useNavigate();
	const ctx = useAppContext();
	const [isPending, setIsPending] = useState(true);

	useLayoutEffect(() => {
		async function init() {
			try {
				await ctx.queryService.queryClient.ensureQueryData(ctx.authService.queryMe());
			} catch {
				await navigate(paths.login);
			} finally {
				setIsPending(false);
			}
		}

		init();
	}, [ctx.queryService.queryClient, ctx.authService, navigate]);

	if (isPending) {
		return <PendingCard />;
	}

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
