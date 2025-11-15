// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TKeysOf<T> = T extends any ? keyof T : never;
export type TMaybe<T> = T | null | undefined;
export type TMaybeArray<T> = T | null | undefined | Array<T>;
export type TMaybeRecord<T> = T | null | undefined | Record<string, T>;
export type TMaybeRecordArray<T> = T | null | undefined | Array<Record<string, T>>;
export type TAnyPrimitive = string | number | boolean | bigint | null | undefined;
export type TUnknownObject = Record<string, unknown>;
export type TWithId = TUnknownObject & { id: string | number };
export type Prettify<T> = { [K in keyof T]: T[K] } & {};
export type Resolve<F, S> = S extends undefined ? F : Prettify<F & S>;
export type THeaders = Record<string, string | undefined>;
