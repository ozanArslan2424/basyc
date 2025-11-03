import { Loader2Icon, SearchIcon } from "lucide-react";
import { useSetAtom } from "jotai";
import { searchModalAtom } from "@/services/store/atoms";
import { MoonIcon, SunIcon } from "lucide-react";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useTheme } from "next-themes";

export function AppHeader() {
	const isMounted = useIsMounted();
	const { setTheme, resolvedTheme } = useTheme();
	const setSearchModal = useSetAtom(searchModalAtom);

	function handleSearchClick() {
		setSearchModal(true);
	}

	function toggleTheme() {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	}

	return (
		<header className="flex h-10 shrink-0 items-center justify-between border-b">
			<div className="flex items-center px-4 lg:px-12"></div>
			<div className="flex items-center px-4 lg:px-12">
				{isMounted ? (
					<button
						type="button"
						className="bg-background hover:bg-accent inline-flex h-10 w-10 items-center justify-center"
						onClick={toggleTheme}
					>
						{resolvedTheme === "dark" ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
					</button>
				) : (
					<button
						type="button"
						className="bg-background hover:bg-accent inline-flex h-10 w-10 items-center justify-center"
					>
						<Loader2Icon className="size-4" />
					</button>
				)}
				<button
					type="button"
					className="bg-background hover:bg-accent inline-flex h-10 w-10 items-center justify-center"
					onClick={handleSearchClick}
				>
					<SearchIcon className="size-4" />
				</button>
			</div>
		</header>
	);
}
