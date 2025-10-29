import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { useIsMounted } from "@/hooks/use-is-mounted";

export function ThemeSwitch() {
	const mounted = useIsMounted();
	const { setTheme, resolvedTheme } = useTheme();

	function toggleTheme() {
		setTheme(resolvedTheme === "dark" ? "light" : "dark");
	}

	if (!mounted) return <Button variant="outline" size="icon" type="button" disabled />;

	return (
		<Button type="button" size="icon" variant="ghost" onClick={toggleTheme}>
			{resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
		</Button>
	);
}
