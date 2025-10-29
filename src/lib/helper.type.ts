import type { Icon, IconProps } from "@tabler/icons-react";
import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, ReactElement, RefAttributes } from "react";
import type z from "zod/v4";

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

export type TClickableElement = ReactElement<{
	onClick: (e: React.MouseEvent<HTMLElement>) => void;
}>;

export type TFormErrors<TFields> =
	| undefined
	| (z.core.$ZodFlattenedError<TFields, string>["fieldErrors"] & {
			_root: string[];
	  });

export type TDefaultFieldValue = string | number | readonly string[] | undefined;

export type TAppIcon =
	| ForwardRefExoticComponent<Omit<IconProps, "ref"> & RefAttributes<Icon>>
	| ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

export type ExtractRouteParams<Path extends string> =
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	Path extends `${infer _Start}:${infer Param}/${infer Rest}`
		? { [k in Param | keyof ExtractRouteParams<`/${Rest}`>]: string }
		: // eslint-disable-next-line @typescript-eslint/no-unused-vars
			Path extends `${infer _Start}:${infer Param}`
			? { [k in Param]: string }
			: unknown;
