import { IconDotsVertical, IconLogout, IconUserCircle } from "@tabler/icons-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/sidebar/sidebar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserAvatar } from "../user-avatar";
import { Skeleton } from "../ui/skeleton";
import { useAppContext } from "@/client";
import { ErrorCard } from "@/pages/error/error-card";
import { QK_AUTH } from "@/services/auth/auth.keys";
import { paths } from "@/nav/paths";
import { useNavigate } from "react-router";

export function NavUser() {
	const navigate = useNavigate();
	const ctx = useAppContext();
	const { isMobile } = useSidebar();
	const meQuery = useQuery(ctx.authService.queryMe());
	const logoutMutation = useMutation(
		ctx.authService.logout(async () => {
			await ctx.queryService.invalidateAll([[QK_AUTH.ME]]);
			navigate(paths.landing);
		}),
	);

	function handleLogout() {
		logoutMutation.mutate();
	}

	if (meQuery.isPending) {
		return (
			<SidebarMenu>
				<SidebarMenuItem>
					<Skeleton className="h-8 w-full rounded-md" />
					<div>
						<Skeleton className="mb-1 h-4 w-24 rounded-md" />
						<Skeleton className="h-3 w-32 rounded-md" />
					</div>
				</SidebarMenuItem>
			</SidebarMenu>
		);
	}

	if (meQuery.error) {
		return <ErrorCard error={meQuery.error} />;
	}

	const user = meQuery.data;

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu
					trigger={
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<UserAvatar user={user} />

							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{user.name}</span>
								<span className="text-muted-foreground truncate text-xs">{user.email}</span>
							</div>
							<IconDotsVertical className="ml-auto size-4" />
						</SidebarMenuButton>
					}
				>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<UserAvatar user={user} />
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{user.name}</span>
									<span className="text-muted-foreground truncate text-xs">{user.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<IconUserCircle />
								Profile
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={handleLogout}>
							<IconLogout />
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
