import type { TBaseEntity } from "@/lib/base.type";
import type { TMaybe } from "@/lib/helper.type";
import { parseAsInteger, useQueryState, type Options } from "nuqs";
import { useCallback, useMemo } from "react";

const keys = {
	search: "search",
	limit: "limit",
	page: "page",
	sortBy: "sortBy",
	sortOrder: "sortOrder",
};

type SetterArg<E> = {
	search: TMaybe<string>;
	limit: TMaybe<number>;
	page: TMaybe<number>;
	sortBy: TMaybe<E extends string ? keyof E : never | (string & {})>;
	sortOrder: TMaybe<string>;
};

export function useFilterState<E extends TBaseEntity<{ [key: string]: unknown }>>(
	defaultValues?: Partial<SetterArg<E>>,
) {
	const [search, setSearch] = useQueryState(keys.search);
	const [limit, setLimit] = useQueryState(keys.limit, parseAsInteger);
	const [page, setPage] = useQueryState(keys.page, parseAsInteger);
	const [sortBy, setSortBy] = useQueryState(keys.sortBy);
	const [sortOrder, setSortOrder] = useQueryState(keys.sortOrder);

	const set = useCallback(
		<T extends keyof SetterArg<E>>(type: T, value: SetterArg<E>[T], options?: Options) => {
			if (value === undefined || value === null || value === "") {
				value = null;
			}
			switch (type) {
				case "search":
					setSearch(value as string | null, options);
					setPage(null);
					break;
				case "limit":
					setLimit(value as number | null, options);
					setPage(null);
					break;
				case "page":
					setPage(value as number | null, options);
					break;
				case "sortBy":
					setSortBy(value as string | null, options);
					setPage(null);
					break;
				case "sortOrder":
					setSortOrder(value as string | null, options);
					setPage(null);
					break;
				default:
					throw new Error(`Filtre bulunamadı: ${type}`);
			}
		},
		[setLimit, setPage, setSearch, setSortBy, setSortOrder],
	);

	const reset = useCallback(() => {
		setSearch(null);
		setLimit(null);
		setPage(null);
		setSortBy(null);
		setSortOrder(null);
	}, [setLimit, setPage, setSearch, setSortBy, setSortOrder]);

	const value = {
		limit: limit ?? defaultValues?.limit ?? 10,
		page: page ?? defaultValues?.page ?? 1,
		sortBy: sortBy ?? defaultValues?.sortBy ?? "createdAt",
		sortOrder: sortOrder ?? defaultValues?.sortOrder ?? "desc",
		search: search ?? defaultValues?.search ?? "",
	};

	const stringified = JSON.stringify(value);

	const memoized = useMemo(
		() => ({
			...value,
			set,
			reset,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[stringified],
	);

	return memoized;
}
