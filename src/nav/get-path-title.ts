import type { TUnknownObject } from "@/lib/helper.type";
import { pathTitles } from "./path-titles";
import { paths } from "./paths";

function findKeyByValue(obj: TUnknownObject, value: string): string[] | null {
	for (const [key, val] of Object.entries(obj)) {
		if (typeof val === "string") {
			if (val === value) return [key];
		} else if (typeof val === "object" && val !== null) {
			const found = findKeyByValue(val as TUnknownObject, value);
			if (found) return [key, ...found];
		}
	}
	return null;
}

function getNestedTitle(obj: TUnknownObject, keys: string[]): string | null {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let current: any = obj;
	for (const key of keys) {
		if (current[key] == null) return null;
		current = current[key];
	}
	return typeof current === "string" ? current : null;
}

export function getPathTitle(path: string): string {
	const keys = findKeyByValue(paths, path);
	if (!keys) return path;
	const title = getNestedTitle(pathTitles, keys);
	return title || path;
}
