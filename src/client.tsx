import "./index.css";
import "./lib/i18n.config.ts";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, use } from "react";
import { RouterProvider } from "react-router";
import { router } from "./nav/router";
import { QueryService } from "./services/query/query.service";
import { ThemeProvider } from "next-themes";
import { Toaster } from "./components/ui/sonner";
import { createStore, Provider as JotaiProvider } from "jotai";
import { NuqsAdapter } from "nuqs/adapters/react";
import { queryConfig } from "./services/query/query.config";
import { AuthService } from "@/services/auth/auth.service.ts";
import { ThingService } from "@/services/thing/thing.service.ts";

export const atomStore = createStore();
const queryClient = new QueryClient(queryConfig);
const queryService = new QueryService(queryClient);
const authService = new AuthService(queryService);
const thingService = new ThingService(queryService);

const context = {
	queryService,
	authService,
	thingService,
};

const AppContext = createContext<typeof context>(context);

export function useAppContext() {
	const value = use(AppContext);
	if (!value) throw new Error("AppContext requires a provider.");
	return value;
}

function App() {
	return (
		<NuqsAdapter>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
				<QueryClientProvider client={queryClient}>
					<JotaiProvider store={atomStore}>
						<AppContext value={context}>
							<Toaster richColors position="top-right" />
							<RouterProvider router={router} />
						</AppContext>
					</JotaiProvider>
				</QueryClientProvider>
			</ThemeProvider>
		</NuqsAdapter>
	);
}

const el = document.getElementById("root");
if (!el) throw new Error("DOM element not found.");

if (import.meta.hot) {
	const root = (import.meta.hot.data.root ??= ReactDOM.createRoot(el));
	root.render(<App />);
} else {
	ReactDOM.createRoot(el).render(<App />);
}
