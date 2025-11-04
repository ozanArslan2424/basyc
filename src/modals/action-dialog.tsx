import { Dialog } from "@/components/ui/dialog";
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

type ActionDialogProps = ComponentProps<typeof Dialog> & {
	actions: {
		key: string;
		label: string;
		onSelect: (key: string) => void;
	}[];
};

export function ActionDialog({ actions, ...rest }: ActionDialogProps) {
	return (
		<CommandDialog {...rest}>
			<Command className="rounded-lg border shadow-md md:min-w-[450px]">
				<CommandInput placeholder="Search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Actions">
						{actions.map((action) => (
							<CommandItem
								key={action.key}
								value={action.key}
								onSelect={(key) => {
									rest.onOpenChange?.(false);
									action.onSelect(key);
								}}
							>
								<span>{action.label}</span>
							</CommandItem>
						))}

						<CommandSeparator />
						<CommandItem
							value="close"
							onSelect={() => {
								rest.onOpenChange?.(false);
							}}
						>
							<span>Close</span>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</CommandDialog>
	);
}
