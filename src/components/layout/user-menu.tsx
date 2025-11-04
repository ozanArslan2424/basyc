import { IconDotsVertical, IconLogout, IconUserCircle } from "@tabler/icons-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PersonAvatar } from "../user-avatar";
import { Skeleton } from "../ui/skeleton";
import { useAppContext } from "@/client";
import { ErrorCard } from "@/pages/error/error-card";
import { QK_AUTH } from "@/services/auth/auth.keys";
import { paths } from "@/nav/paths";
import { useNavigate } from "react-router";

export function UserMenu() {
	const navigate = useNavigate();
	const ctx = useAppContext();
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
			<div className="flex gap-2">
				<Skeleton className="h-8 w-full rounded-md" />
				<div>
					<Skeleton className="mb-1 h-4 w-24 rounded-md" />
					<Skeleton className="h-3 w-32 rounded-md" />
				</div>
			</div>
		);
	}

	if (meQuery.error) {
		return <ErrorCard error={meQuery.error} />;
	}

	const user = meQuery.data;

	return (
		<DropdownMenu
			trigger={
				<button className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
					<PersonAvatar person={user} />

					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-medium">{user.name}</span>
						<span className="text-muted-foreground truncate text-xs">{user.email}</span>
					</div>
					<IconDotsVertical className="ml-auto size-4" />
				</button>
			}
		>
			<DropdownMenuContent
				className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
				side="top"
				align="end"
				sideOffset={4}
			>
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<PersonAvatar person={user} />
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
	);
}
