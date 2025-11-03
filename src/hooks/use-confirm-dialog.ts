import { useCallback, useEffect, useState } from "react";

export function useConfirmDialog(onConfirm: () => void, onCancel?: () => void) {
	const [open, onOpenChange] = useState(false);

	const handleCancel = useCallback(() => {
		onCancel?.();
		onOpenChange(false);
	}, [onCancel]);

	const handleConfirm = useCallback(() => {
		onConfirm();
		onOpenChange(false);
	}, [onConfirm]);

	const handleNo = useCallback(
		(e: KeyboardEvent) => {
			const noKeys = ["Escape", "q", "n"];
			const isNoKey = noKeys.includes(e.key);
			if (isNoKey) {
				handleCancel();
			}
		},
		[handleCancel],
	);

	const handleYes = useCallback(
		(e: KeyboardEvent) => {
			const yesKeys = ["y"];
			const isYesKey = yesKeys.includes(e.key);
			if (isYesKey) {
				handleConfirm();
			}
		},
		[handleConfirm],
	);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			handleNo(e);
			handleYes(e);
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [handleNo, handleYes]);

	return { open, onOpenChange, onConfirm: handleConfirm, onCancel: handleCancel };
}

export type ConfirmDialogState = ReturnType<typeof useConfirmDialog>;
