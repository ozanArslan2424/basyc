export type UpdaterFn<T> = T | ((prev: T) => T);
export type OnMutationSuccess<R, V = void> = (res: R, vars: V) => void;
