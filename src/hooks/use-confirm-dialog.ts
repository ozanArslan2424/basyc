import { useState } from "react";

export function useConfirmDialog(onConfirm: () => void) {
	const [open, onOpenChange] = useState(false);
	const onCancel = () => onOpenChange(false);
	return { open, onOpenChange, onConfirm, onCancel };
}

export type ConfirmDialogState = ReturnType<typeof useConfirmDialog>;
