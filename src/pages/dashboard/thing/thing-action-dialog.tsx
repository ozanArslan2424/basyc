import { Dialog } from "@/components/ui/dialog";
import type { ThingData } from "@/schemas/thing.schemas";
import {
	Command,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandSeparator,
	CommandDialog,
} from "@/components/ui/command";
import { type ComponentProps } from "react";

type ThingActionDialogProps = ComponentProps<typeof Dialog> & {
	activeThing: ThingData | null;
	onSelectThingAction: (key: string) => void;
};

export function ThingActionDialog({ activeThing, onSelectThingAction, ...rest }: ThingActionDialogProps) {
	const actions = [
		{ key: "update", label: "Update content" },
		{ key: "assign", label: "Assign to someone" },
		{ key: "delete", label: "Delete" },
	];

	function handleSelectThingAction(key: string) {
		rest.onOpenChange?.(false);
		onSelectThingAction(key);
	}

	if (!activeThing) return;
	return (
		<CommandDialog {...rest}>
			<Command className="rounded-lg border shadow-md md:min-w-[450px]">
				<CommandInput placeholder="Search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Actions">
						{actions.map((action) => (
							<CommandItem key={action.key} value={action.key} onSelect={handleSelectThingAction}>
								<span>{action.label}</span>
							</CommandItem>
						))}

						<CommandSeparator />
						<CommandItem value="close" onSelect={handleSelectThingAction}>
							<span>Close</span>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</CommandDialog>
	);
}
