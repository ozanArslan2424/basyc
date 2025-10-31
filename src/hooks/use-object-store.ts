import type { TUnknownObject } from "@/lib/helper.type";
import type { ObjectStore } from "@/services/store/object-store";
import { useEffect, useState } from "react";

type NoKeyOverload<T extends TUnknownObject> = {
	value: T | null;
	set: {
		(state: Partial<T> | ((prevState: T | null) => T) | null): void;
		<K extends keyof T>(key: K, value: T[K]): void;
	};
};

type KeyOverload<T extends TUnknownObject, K extends keyof T> = {
	value: NonNullable<T[K]> | null;
	set: {
		(state: Partial<T> | ((prevState: T | null) => T) | null): void;
		(key: keyof T, value: T[keyof T]): void;
	};
};

export function useObjectStore<T extends TUnknownObject>(store: ObjectStore<T>): NoKeyOverload<T>;
export function useObjectStore<T extends TUnknownObject, K extends keyof T>(
	store: ObjectStore<T>,
	key: K,
): KeyOverload<T, K>;
export function useObjectStore<T extends TUnknownObject, K extends keyof T>(store: ObjectStore<T>, key?: K) {
	const [value, setValue] = useState<NonNullable<T[K]> | T | null>(() => {
		const v = store.get(key as K);
		return v ?? null;
	});

	useEffect(() => {
		const unsub = store.subscribe((newState) => {
			if (key) {
				const newValue = newState?.[key];
				setValue(newValue !== undefined && newValue !== null ? (newValue as NonNullable<T[K]>) : null);
			} else {
				setValue(newState ?? null);
			}
		});
		return () => unsub();
	}, [store, key]);

	function set(state: Partial<T> | ((prev: T | null) => T) | null): void;
	function set<K2 extends keyof T>(key: K2, value: T[K2]): void;
	function set(...args: [Partial<T> | ((prev: T | null) => T) | null] | [keyof T, T[keyof T]]): void {
		if (args.length === 2) {
			store.set(args[0] as keyof T, args[1]);
		} else {
			store.set(args[0] as Partial<T> | ((prev: T | null) => T) | null);
		}
	}

	return { value, set };
}
