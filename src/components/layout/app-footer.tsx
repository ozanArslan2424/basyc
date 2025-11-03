import { useModeContext } from "@/hooks/use-mode";
import { cn } from "@/lib/utils";

export function AppFooter() {
	const { mode, keysBuffer } = useModeContext();

	const modeColors = {
		normal: "bg-muted text-muted-foreground",
		visual: "bg-success text-foreground",
	};

	return (
		<footer className="fixed bottom-0 left-0 flex h-10 w-full shrink-0 items-center justify-between border-t">
			<div className="flex items-center px-4 lg:px-12">
				<div
					className={cn(
						"inline-flex h-10 items-center justify-center px-4 text-sm font-semibold uppercase select-none",
						modeColors[mode],
					)}
				>
					{mode}
				</div>
				<div className="bg-muted/10 text-muted-foreground inline-flex max-w-[200px] items-center justify-end overflow-hidden px-4 text-right text-sm whitespace-nowrap">
					{keysBuffer
						.slice(-5)
						.map((k) => (k === " " ? "<space>" : k))
						.join(" ")}
				</div>
			</div>
			<div className="flex items-center px-4 lg:px-12"></div>
		</footer>
	);
}
