import { useModeContext } from "@/hooks/use-mode";
import { useCallback, useState } from "react";

export function useDialog(defaultOpen?: boolean) {
	const modeCtx = useModeContext();
	const [open, setOpen] = useState(defaultOpen ?? false);

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

	return { open, onOpenChange: handleOpenChange, defaultOpen };
}

export type DialogState = ReturnType<typeof useDialog>;
