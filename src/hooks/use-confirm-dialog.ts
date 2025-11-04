import { useModeContext } from "@/hooks/use-mode";
import { useCallback, useEffect, useState } from "react";

export function useConfirmDialog(onConfirm: () => void, onCancel?: () => void) {
	const modeCtx = useModeContext();
	const [open, setOpen] = useState(false);

	const handleCancel = useCallback(() => {
		onCancel?.();
		setOpen(false);
	}, [onCancel]);

	const handleConfirm = useCallback(() => {
		onConfirm();
		setOpen(false);
	}, [onConfirm]);

	const handleOpenChange = useCallback(
		(value: boolean) => {
			setOpen(value);
			if (value) {
				modeCtx.setMode("action");
			} else {
				modeCtx.setMode("normal");
			}
		},
		[modeCtx],
	);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (["KeyY"].includes(e.code)) {
				e.preventDefault();
				handleConfirm();
				return;
			}

			if (["Escape", "KeyQ", "KeyN"].includes(e.code)) {
				e.preventDefault();
				handleCancel();
				return;
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [handleCancel, handleConfirm]);

	return { open, onOpenChange: handleOpenChange, onConfirm: handleConfirm, onCancel: handleCancel };
}

export type ConfirmDialogState = ReturnType<typeof useConfirmDialog>;
