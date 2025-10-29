import { serve } from "bun";
import index from "./index.html";
import { server } from "@/server";

const start = performance.now();

const PORT = Number(process.env.PORT ?? "3000");

function path(url: string, searchValue = `${process.env.BUN_PUBLIC_BASE_URL}/`) {
	const replaceValue = "";
	return url.replace(searchValue, replaceValue);
}

serve({
	port: PORT,
	routes: {
		"/*": index,
		"/public/*": (req) => new Response(Bun.file(path(req.url))),
		"/api/*": (req) => {
			const url = path(req.url, "/api");
			const request = new Request(url, req);
			return server.handle(request);
		},
	},
	development: process.env.NODE_ENV !== "production" && {
		hmr: true,
		console: true,
	},
});

const end = performance.now();
const startup = end - start;
console.log(`🚀 Server started in ${startup.toFixed(2)}ms`);
console.log(`📡 Listening on port ${PORT}`);
