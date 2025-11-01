import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { ConfirmDialogState } from "@/hooks/use-confirm-dialog";

type ConfirmDialogProps = ConfirmDialogState & {
	title: string;
	description: string;
	cancelText?: string;
	confirmText?: string;
};

export function ConfirmDialog({
	open,
	onOpenChange,
	onConfirm,
	onCancel,
	title,
	description,
	cancelText = "Cancel",
	confirmText = "Confirm",
}: ConfirmDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				<DialogFooter className="grid grid-cols-3 gap-4">
					<Button variant="ghost" onClick={onCancel} className="col-span-1">
						{cancelText}
					</Button>
					<Button onClick={onConfirm} className="col-span-2">
						{confirmText}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
