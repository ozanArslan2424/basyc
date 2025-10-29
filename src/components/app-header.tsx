import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/sidebar/sidebar";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { useLocation } from "react-router";
import { useSetAtom } from "jotai";
import { searchModalAtom } from "@/services/store/atoms";
import { useTranslation } from "react-i18next";
import { ThemeSwitch } from "@/components/theme-switch";

export function AppHeader() {
	const { t } = useTranslation("paths");
	const setSearchModal = useSetAtom(searchModalAtom);
	const location = useLocation();

	function handleSearchClick() {
		setSearchModal(true);
	}

	return (
		<header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
				<h1 className="text-base font-medium">{t(location.pathname)}</h1>
			</div>
			<div className="flex items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<ThemeSwitch />
				<Button type="button" size="icon" variant="ghost" onClick={handleSearchClick}>
					<SearchIcon />
				</Button>
			</div>
		</header>
	);
}
