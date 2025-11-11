import { Elysia } from "elysia";
import { getErrorResult } from "@/lib/error.utils";
import { AuthController } from "@/modules/auth/auth.controller";
import { PersonController } from "@/modules/person/person.controller";
import { GroupController } from "@/modules/group/group.controller";
import { ThingController } from "@/modules/thing/thing.controller";
import { middlewares } from "@/middleware";
import { logger } from "@/lib/log.utils";

const app = new Elysia({ prefix: "/api" })
	.use(middlewares)
	.use(AuthController)
	.use(PersonController)
	.use(GroupController)
	.use(ThingController)
	.onError((c) => {
		logger("error", c.request.url, c.request.method, c.error);
		const result = getErrorResult(c.error);
		return c.status(result.status, result.response);
	});

export { app };
