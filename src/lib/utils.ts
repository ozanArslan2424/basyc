export function isObjectWith<T extends Record<string, unknown>>(item: unknown, key: keyof T | string): item is T {
	return !!item && typeof item === "object" && key in item;
}

export function repeat(length: number = 4) {
	return Array.from({ length }, (_, index) => index);
}

export function prefixId(id: number | string, prefix: string): string;
export function prefixId(id: string, prefix?: string): string;
export function prefixId(id: number | string, prefix?: string): string {
	if (prefix) {
		return `${prefix}_${id}`;
	}

	if (typeof id === "string") {
		return id.split("_")[1] as string;
	}

	throw new Error("Invalid arguments for prefixId: number id requires prefix");
}
