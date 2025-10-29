import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { searchModalAtom } from "@/services/store/atoms";
import { useTranslation } from "react-i18next";
import { paths } from "@/nav/paths";
import { Link, useLocation } from "react-router";

export function AppSearch() {
	const { t } = useTranslation("paths");
	const location = useLocation();
	const [searchModal, setSearchModal] = useAtom(searchModalAtom);

	useEffect(() => {
		setSearchModal(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname]);

	const placeholder = t("search.placeholder");
	const emptyMessage = t("search.emptyMessage");

	const renderItem = (key: string, value: string | Record<string, string>) => {
		if (key === "landing") return null;

		if (typeof value === "string") {
			return (
				<Link to={value}>
					<CommandItem key={key}>
						<span>{t(value)}</span>
					</CommandItem>
				</Link>
			);
		}

		if (typeof value === "object" && value !== null) {
			return (
				<React.Fragment key={key}>
					{Object.entries(value).map(([childKey, childValue]) =>
						renderItem(`${key}.${childKey}`, childValue),
					)}
				</React.Fragment>
			);
		}

		return null;
	};

	return (
		<CommandDialog open={searchModal} onOpenChange={(open) => setSearchModal(open)}>
			<CommandInput placeholder={placeholder} />
			<CommandList>
				<CommandEmpty>{emptyMessage}</CommandEmpty>
				<CommandGroup>
					{Object.entries(paths).map(([key, value]) => renderItem(key, value))}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
}
