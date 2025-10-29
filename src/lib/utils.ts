import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isObjectWith<T extends Record<string, unknown>>(
	item: unknown,
	key: keyof T | string,
): item is T {
	return !!item && typeof item === "object" && key in item;
}
