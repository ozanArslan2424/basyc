import type { TAnyPrimitive } from "@/lib/helper.type";

type Listener<T> = (newState: T) => void;

export class PrimitiveStore<T extends TAnyPrimitive> {
	private listeners: Set<Listener<T>> = new Set();
	private defaultState: T;

	currentState: T;

	constructor(defaultState: T) {
		this.defaultState = defaultState;
		this.currentState = defaultState;
	}

	get(): T {
		return this.currentState;
	}

	set(state: T | ((prevState: T) => T)): void {
		this.currentState = typeof state === "function" ? state(this.currentState) : state;
		this.listeners.forEach((fn) => fn(this.currentState));
	}

	subscribe(listener: Listener<T>): () => void {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	}

	reset(): void {
		this.set(this.defaultState);
	}
}
