export function repeat(length: number = 4) {
	return Array.from({ length }, (_, index) => index);
}

export function isObjectWith<T extends Record<string, unknown>>(item: unknown, key: keyof T | string): item is T {
	return !!item && typeof item === "object" && key in item;
}

export function isObjectWithPath<T extends Record<string, unknown>>(item: unknown, ...path: string[]): item is T {
	if (!item || typeof item !== "object") return false;

	let current = item as Record<string, unknown>;

	for (const key of path) {
		if (!(key in current)) return false;
		if (typeof current[key] !== "object" || current[key] === null) {
			return false;
		}
		current = current[key] as Record<string, unknown>;
	}

	return true;
}

export function isValidIndex(index: number, collection: ArrayLike<unknown>): boolean {
	if (isNaN(index)) return false;
	return Number.isInteger(index) && index >= 0 && index < collection.length;
}
