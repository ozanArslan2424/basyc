type Listener<T> = (newState: T | null) => void;
type UnknownObj = Record<string, unknown>;

export class ObjectStore<T extends UnknownObj> {
	private listeners: Set<Listener<T>> = new Set();
	private defaultState: T | null;

	currentState: T | null;

	constructor(defaultState: T | null) {
		this.defaultState = defaultState;
		this.currentState = defaultState;
	}

	get(): T | null;
	get<K extends keyof T>(key: K): T[K] | null;
	get<K extends keyof T>(key?: K): T | T[K] | null {
		if (!this.currentState) return null;
		return key ? (this.currentState[key] ?? null) : this.currentState;
	}

	set(state: Partial<T> | ((prevState: T | null) => T) | null): void;
	set<K extends keyof T>(key: K, value: T[K]): void;
	set(...args: [Partial<T> | ((prevState: T | null) => T) | null] | [keyof T, T[keyof T]]): void {
		if (args.length === 2) {
			const [key, value] = args;
			this.currentState = this.currentState ? { ...this.currentState, [key]: value } : ({ [key]: value } as T);
		} else {
			const state = args[0];
			if (typeof state === "function") {
				this.currentState = state(this.currentState);
			} else if (state) {
				this.currentState = this.currentState ? { ...this.currentState, ...state } : (state as T);
			} else {
				this.currentState = null;
			}
		}
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
