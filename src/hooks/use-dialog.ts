import { useState } from "react";

export function useDialog(defaultOpen?: boolean) {
	const [open, onOpenChange] = useState(defaultOpen ?? false);
	return { open, onOpenChange, defaultOpen };
}

export type DialogState = ReturnType<typeof useDialog>;
