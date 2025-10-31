export type UpdaterFn<T> = T | ((prev: T) => T);
export type OnMutationSuccess<V = void, R = void> = (res: R, vars: V) => void;
