import { handleMutationSettle, handleQueryRetry } from "@/lib/error.utils";
import type { QueryClientConfig } from "@tanstack/react-query";

export const queryConfig: QueryClientConfig = {
	defaultOptions: {
		queries: {
			retry: handleQueryRetry,
			staleTime: Infinity,
			refetchOnWindowFocus: false,
		},
		mutations: {
			retry: handleQueryRetry,
			onSettled: handleMutationSettle,
		},
	},
};
