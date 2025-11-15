import { Elysia } from "elysia";
import { AuthController } from "@/modules/auth/auth.controller";
import { PersonController } from "@/modules/person/person.controller";
import { GroupController } from "@/modules/group/group.controller";
import { ThingController } from "@/modules/thing/thing.controller";
import { middlewares } from "@/middleware";
import { getServices } from "@/services";
import openapi from "@elysiajs/openapi";

const services = getServices();

const app = new Elysia({ prefix: "/api" })
	.use(middlewares)
	.use(AuthController)
	.use(PersonController)
	.use(GroupController)
	.use(ThingController)
	.onRequest((c) => {
		services.logger.onRequest(c.request);
	})
	.use(openapi(services.config.getOpenAPIArgs()));

export { app };
