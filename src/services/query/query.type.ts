import type { TWithId } from "@/lib/helper.type";

export type OnMutationSuccess<V = void, R = void> = (res: R, vars: V) => void;

export type QueryUpdaterArgs<T extends TWithId> =
	| { action: "create"; data: T }
	| { action: "update"; data: T }
	| { action: "delete"; data: T["id"] };
