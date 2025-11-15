import type { TMaybe } from "@/lib/helper.type";

export function assert<T>(condition: TMaybe<T>, message?: string): asserts condition {
	const conditionName = String(condition);
	if (!condition) {
		throw new Error(message ? `${conditionName}: ${message}` : `Assertion failed for ${conditionName}`);
	}
}
