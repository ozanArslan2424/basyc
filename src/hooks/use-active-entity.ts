import { useState } from "react";

export function useActiveEntity<T>() {
	const [entity, set] = useState<T | null>(null);
	return { entity, set };
}
