import { Elysia } from "elysia";
import { openapi } from "@elysiajs/openapi";
import z from "zod";
import { getErrorResult } from "@/lib/error.utils";
import { LoginDataSchema, RegisterDataSchema } from "@/services/auth/auth.schema";
import {
	ThingCreateDataSchema,
	ThingUpdateDataSchema,
	ThingAssignDataSchema,
	ThingDoneDataSchema,
	ThingDeleteDataSchema,
	ThingDataSchema,
} from "@/services/thing/thing.schema";
import { PrismaClient } from "prisma/generated";
import { ConfigService } from "@/services/config/config.service";
import cors from "@elysiajs/cors";
import { ThingService } from "@/services/thing/thing.service";
import { AuthService } from "@/services/auth/auth.service";
import { PersonService } from "@/services/person/person.service";
import { PersonDataSchema } from "@/services/person/person.schema";
import { GroupService } from "@/services/group/group.service";
import { GroupCreateSchema, GroupJoinSchema } from "@/services/group/group.schema";

function makeContext() {
	const config = new ConfigService();
	const prisma = new PrismaClient();
	const personService = new PersonService(prisma);
	const authService = new AuthService(prisma, personService);
	const groupService = new GroupService(prisma);
	const thingService = new ThingService(prisma);

	return {
		config,
		prisma,
		personService,
		authService,
		groupService,
		thingService,
	};
}

let context: ReturnType<typeof makeContext>;

export function getContext() {
	if (!context) {
		context = makeContext();
	}
	return context;
}

const app = new Elysia({ prefix: "/api" })
	.use(cors({ origin: getContext().config.getCorsOrigin(), methods: ["GET", "POST"] }))
	.derive(() => getContext())
	.state("userId", "")
	.macro({ auth: { resolve: (c) => getContext().authService.guard(c.store.userId.trim()) } })
	.group("/auth", (auth) =>
		auth
			.post(
				"/login",
				async (c) => {
					const profile = await c.authService.login(c.body);
					c.store.userId = profile.userId;
					return profile;
				},
				{ response: PersonDataSchema, body: LoginDataSchema },
			)
			.post(
				"/register",
				async (c) => {
					const profile = await c.authService.register(c.body);
					c.store.userId = profile.userId;
					return profile;
				},
				{ response: PersonDataSchema, body: RegisterDataSchema },
			)
			.post("/logout", async (c) => {
				c.store.userId = "";
			})
			.get("/me", (c) => c.person, { response: PersonDataSchema, auth: true }),
	)
	.group("/person", (person) =>
		person.get("/", (c) => c.personService.list(c.person.id), {
			response: PersonDataSchema.array(),
			auth: true,
		}),
	)
	.group("/group", (group) =>
		group
			.post("/", (c) => c.groupService.create(c.person.id, c.body), {
				body: GroupCreateSchema,
				auth: true,
			})
			.post("/join", (c) => c.groupService.join(c.person.id, c.body), {
				body: GroupJoinSchema,
				auth: true,
			}),
	)
	.group("/thing", (thing) =>
		thing
			.get("/", (c) => c.thingService.list(), {
				response: ThingDataSchema.array(),
				auth: true,
			})
			.post("/", (c) => c.thingService.create(c.person, c.body), {
				body: ThingCreateDataSchema,
				response: ThingDataSchema,
				auth: true,
			})
			.post("/update", (c) => c.thingService.update(c.body), {
				body: ThingUpdateDataSchema,
				response: ThingDataSchema,
				auth: true,
			})
			.post("/assign", (c) => c.thingService.assign(c.body), {
				body: ThingAssignDataSchema,
				response: ThingDataSchema,
			})
			.post("/done", (c) => c.thingService.done(c.body), {
				body: ThingDoneDataSchema,
				response: ThingDataSchema,
			})
			.post("/delete", (c) => c.thingService.delete(c.body), {
				body: ThingDeleteDataSchema,
			}),
	)

	.onError((c) => {
		console.log(c.request.url, c.request.method, c.error);
		const result = getErrorResult(c.error);
		return c.status(result.status, result.response);
	})
	.use(
		openapi({
			path: "/reference",
			provider: "scalar",
			scalar: {
				theme: "kepler",
				layout: "classic",
				defaultHttpClient: { targetKey: "js", clientKey: "axios" },
			},
			mapJsonSchema: {
				zod: z.toJSONSchema,
			},
		}),
	);

export { app };
