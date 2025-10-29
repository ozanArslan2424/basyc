import * as React from "react";
import { IconCirclePlusFilled, IconInnerShadowTop, IconMail } from "@tabler/icons-react";
import { NavUser } from "@/components/sidebar/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/sidebar/sidebar";
import { Button } from "../ui/button";
import { paths } from "@/nav/paths";
import { IconDashboard } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import { GLOBAL } from "@/lib/global.config";
import { Link } from "react-router";
import type { TAppIcon } from "@/lib/helper.type";

export type SidebarNavItem = {
	label: string;
	value: string;
	icon?: TAppIcon;
	onClick?: (value: string) => void;
	children?: SidebarNavItem[];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { t } = useTranslation("paths");

	const items: SidebarNavItem[] = [
		{
			label: t(paths.dashboard),
			value: paths.dashboard,
			icon: IconDashboard,
		},
	];

	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
							<Link to="/">
								<IconInnerShadowTop className="size-5!" />
								<span className="text-base font-semibold">{GLOBAL.APP_NAME}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent className="flex flex-col gap-2">
						<SidebarMenu>
							<SidebarMenuItem className="flex items-center gap-2">
								<SidebarMenuButton
									tooltip={t("quickActions")}
									className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
								>
									<IconCirclePlusFilled />
									<span>{t("quickActions")}</span>
								</SidebarMenuButton>
								<Button
									size="icon"
									className="size-8 group-data-[collapsible=icon]:opacity-0"
									variant="outline"
								>
									<IconMail />
									<span className="sr-only">{t("inbox")}</span>
								</Button>
							</SidebarMenuItem>
						</SidebarMenu>

						<SidebarMenu>
							<RecursiveSidebarMenu items={items} />
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}

function RecursiveSidebarMenu({ items, level = 0 }: { items: SidebarNavItem[]; level?: number }) {
	return (
		<>
			{items.map((item) => (
				<React.Fragment key={`${item.value}-${level}`}>
					<SidebarMenuItem>
						<SidebarMenuButton
							tooltip={item.label}
							asChild
							isActive={location.pathname.includes(item.value)}
						>
							{item.onClick ? (
								<div>
									{item.icon && <item.icon />}
									<span>{item.label}</span>
								</div>
							) : (
								<Link to={item.value}>
									{item.icon && <item.icon />}
									<span>{item.label}</span>
								</Link>
							)}
						</SidebarMenuButton>
					</SidebarMenuItem>

					{/* Render children if they exist */}
					{item.children && item.children.length > 0 && (
						<div className={`ml-${level * 4} pl-${level * 2} border-border/50 border-l`}>
							<SidebarMenu>
								<RecursiveSidebarMenu items={item.children} level={level + 1} />
							</SidebarMenu>
						</div>
					)}
				</React.Fragment>
			))}
		</>
	);
}
