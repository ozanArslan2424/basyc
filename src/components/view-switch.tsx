import { GridIcon, Table2Icon } from "lucide-react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

type ViewSwitchProps = {
	value: string | null;
	onChange: (value: string | null) => void;
};

export function ViewSwitch(props: ViewSwitchProps) {
	function handleCheckedChange(checked: boolean) {
		props.onChange(checked ? "grid" : null);
	}

	return (
		<div className="relative w-max cursor-pointer">
			<Table2Icon
				className={cn(
					"pointer-events-none absolute top-[8.25px] left-[7.75px] z-10 size-6 transition-colors",
					props.value === null ? "text-primary-foreground" : "text-muted-foreground",
				)}
			/>

			<SwitchPrimitive.Root
				checked={props.value === "grid"}
				onCheckedChange={handleCheckedChange}
				id="view"
				data-slot="switch"
				className={cn("peer", buttonVariants({ variant: "outline", className: "block min-w-20 p-0" }))}
			>
				<SwitchPrimitive.Thumb
					data-slot="switch-thumb"
					className={cn(
						"block",
						"bg-primary h-8 w-8 rounded-sm p-1 shadow-lg ring-0 transition-transform",
						"data-[state=unchecked]:translate-x-[0.2rem]",
						"data-[state=checked]:translate-x-[2.7rem]",
					)}
				/>
			</SwitchPrimitive.Root>

			<GridIcon
				className={cn(
					"pointer-events-none absolute top-[8.25px] right-[7.75px] z-10 size-6 transition-colors",
					props.value === "grid" ? "text-primary-foreground" : "text-muted-foreground",
				)}
			/>
		</div>
	);
}
