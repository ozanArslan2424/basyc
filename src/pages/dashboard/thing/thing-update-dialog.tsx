import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ThingForm } from "@/pages/dashboard/thing/thing-form";
import type { ThingData } from "@/schemas/thing.schemas";
import type { ComponentProps } from "react";

type ThingUpdateDialogProps = ComponentProps<typeof Dialog> & {
	thing: ThingData | null;
};

export function ThingUpdateDialog({ thing, ...rest }: ThingUpdateDialogProps) {
	function handleReset() {
		rest.onOpenChange?.(false);
	}

	return (
		<Dialog {...rest}>
			<DialogContent>
				<DialogTitle>Update this thing</DialogTitle>
				<DialogDescription className="sr-only">
					This is the form dialog for updating a thing's contents
				</DialogDescription>
				<ThingForm thing={thing} onReset={handleReset} />
			</DialogContent>
		</Dialog>
	);
}
