import type { DefaultError, QueryClient, UseMutationOptions } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";

export class QueryService {
	queryClient: QueryClient;

	constructor(queryClient: QueryClient) {
		this.queryClient = queryClient;
	}

	createQueryOptions = queryOptions;

	createMutationOptions<TInput = void, TOutput = unknown, TError = DefaultError>(
		options: UseMutationOptions<TOutput, TError, TInput, unknown>,
	) {
		return options;
	}

	invalidateAll(queryKeys: (string | number)[][]) {
		return Promise.all(
			queryKeys.map((queryKey) => this.queryClient.invalidateQueries({ queryKey })),
		);
	}
}
