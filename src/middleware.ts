import { AuthService } from "@/modules/auth/auth.service";
import { ConfigService } from "@/modules/config/config.service";
import { GroupService } from "@/modules/group/group.service";
import { PersonService } from "@/modules/person/person.service";
import { ThingService } from "@/modules/thing/thing.service";
import cors from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";
import type Elysia from "elysia";
import { PrismaClient } from "prisma/generated";
import { openapi } from "@elysiajs/openapi";

const config = new ConfigService();
const prisma = new PrismaClient();
const personService = new PersonService(prisma);
const authService = new AuthService(prisma, personService, config);
const groupService = new GroupService(prisma);
const thingService = new ThingService(prisma);

export const middlewares = (app: Elysia) =>
	app
		.use(cors(config.getCorsArgs()))
		.use(jwt(config.getJwtRefreshArgs()))
		.use(jwt(config.getJwtAccessArgs()))
		.derive(() => ({
			config,
			prisma,
			personService,
			authService,
			groupService,
			thingService,
		}))
		.macro({
			auth: {
				resolve: async (c) => {
					const accessToken = authService.getAccessToken(c.headers);
					const payload = await c.access.verify(accessToken);
					return await authService.guard(payload);
				},
			},
		})
		.use(openapi(config.getOpenAPIArgs()));
