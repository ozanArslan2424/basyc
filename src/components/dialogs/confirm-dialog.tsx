import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
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
					<Button variant="ghost" onClick={onCancel} className="relative col-span-1">
						{cancelText}
						<Kbd className="absolute top-1/2 right-2 -translate-y-1/2">n</Kbd>
					</Button>
					<Button onClick={onConfirm} className="relative col-span-2">
						<span>{confirmText}</span>
						<Kbd className="absolute top-1/2 right-2 -translate-y-1/2">y</Kbd>
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
