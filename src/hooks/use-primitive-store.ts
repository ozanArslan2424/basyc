import type { TAnyPrimitive } from "@/lib/helper.type";
import type { PrimitiveStore } from "@/services/store/primitive-store";
import { useEffect, useState } from "react";

export function usePrimitiveStore<T extends TAnyPrimitive>(store: PrimitiveStore<T>) {
	const [value, setValue] = useState(store.get());

	useEffect(() => {
		const unsub = store.subscribe((state) => setValue(state));
		return () => unsub();
	}, [store]);

	return { value, set: (partial: T) => store.set(partial) };
}
