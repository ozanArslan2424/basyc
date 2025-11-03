import { AppHeader } from "@/components/layout/app-header";
import { Outlet, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { paths } from "@/nav/paths";
import { useAppContext } from "@/client";
import { PendingCard } from "@/components/pending-card";
import { AppFooter } from "@/components/layout/app-footer";

export function ProtectedLayout() {
	const navigate = useNavigate();
	const ctx = useAppContext();
	const [isPending, setIsPending] = useState(true);

	useEffect(() => {
		async function init() {
			try {
				await ctx.queryService.queryClient.fetchQuery(ctx.authService.queryMe());
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
		<div className="relative">
			<AppHeader />
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<Outlet />
				</div>
			</div>
			<AppFooter />
		</div>
	);
}
