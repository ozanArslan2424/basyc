import { logger } from "@/lib/log.utils";

export class Service {
	constructor(name: string) {
		logger("count", name);
	}
}
