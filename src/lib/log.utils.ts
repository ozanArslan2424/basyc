/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
export function logger(
	variant:
		| "default"
		| "start"
		| "end"
		| "debug"
		| "info"
		| "warn"
		| "error"
		| "success"
		| "box"
		| "count",
	...data: any[]
) {
	// if (import.meta.env.NODE_ENV !== "development") return;
	const startTime = new Date().getTime();

	switch (variant) {
		case "default":
			console.log(...data);
			break;
		case "start":
			console.log(`▶️ ${startTime}`, ...data);
			break;
		case "end":
			console.log(`⏸️ ${new Date().getTime() - startTime}ms`, ...data);
			break;
		case "debug":
			console.debug("🐛", ...data);
			break;
		case "info":
			console.info("🔵", ...data);
			break;
		case "warn":
			console.warn("🟡", ...data);
			break;
		case "error":
			console.error("🔴", ...data);
			break;
		case "success":
			console.log("🟢", ...data);
			break;
		case "box":
			console.log("🎁 ------------------------------------------------------");
			console.log(...data);
			console.log("------------------------------------------------------ 🎁");
			break;
		case "count":
			console.count(...data);
			break;
		default:
			console.log(...data);
			break;
	}
}
