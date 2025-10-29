import type { Server } from "@/server";
import { treaty } from "@elysiajs/eden";

// export const request = edenFetch<Server>("http://localhost:3000/api");

export const request = treaty<Server>("http://localhost:3000/api");
