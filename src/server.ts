import { Elysia } from "elysia";
import { PrismaClient } from "prisma/generated";
import { LoginDataSchema, RegisterDataSchema } from "@/schemas/auth.schemas";
import { HTTPError } from "@/lib/error.utils";
import { PersonSchema, ThingSchema } from "prisma/generated/zod/schemas";
import { openapi } from "@elysiajs/openapi";
import z from "zod";
import {
	ThingAssignDataSchema,
	ThingCreateDataSchema,
	ThingDeleteDataSchema,
	ThingDoneDataSchema,
	ThingUpdateDataSchema,
} from "@/schemas/thing.schemas";
import { getErrorResult } from "@/services/error/get-error-result.server";

const prisma = new PrismaClient();

export const server = new Elysia()
	.derive(() => ({ prisma }))
	.state("userId", "")
	.macro({
		auth: {
			resolve: async (c) => {
				if (c.store.userId.trim().length === 0) {
					throw new HTTPError("UNAUTHORIZED", 401);
				}
				const person = await prisma.person.findUnique({
					where: { userId: c.store.userId },
				});
				if (!person) {
					throw new HTTPError("UNAUTHORIZED", 401);
				}
				return { person };
			},
		},
	})
	.group("/auth", (auth) =>
		auth
			.post(
				"/login",
				async (c) => {
					const body = c.body;
					const user = await c.prisma.user.findUnique({ where: { email: body.email } });
					if (!user) throw new HTTPError("Invalid credentials", 400);
					const pwdMatch = await Bun.password.verify(body.password, user.password);
					if (!pwdMatch) throw new HTTPError("Invalid credentials", 400);
					c.store.userId = user.id;
					const profile = await c.prisma.person.findUnique({
						where: { userId: c.store.userId },
					});
					if (!profile) {
						throw new HTTPError("UNAUTHORIZED", 401);
					}
					return profile;
				},
				{ response: PersonSchema, body: LoginDataSchema },
			)
			.post(
				"/register",
				async (c) => {
					const body = c.body;
					const password = await Bun.password.hash(body.password);
					const exists = await c.prisma.user.findUnique({
						where: { email: body.email },
					});
					if (exists) {
						throw new HTTPError("This email is registered", 400);
					}

					const user = await c.prisma.user.create({
						data: { name: body.name, password: password, email: body.email },
					});
					const profile = await c.prisma.person.create({
						data: { userId: user.id, email: body.email, name: body.name },
					});
					return profile;
				},
				{ response: PersonSchema, body: RegisterDataSchema },
			)
			.post("/logout", async (c) => {
				c.store.userId = "";
			})
			.get("/me", (c) => c.person, { response: PersonSchema, auth: true }),
	)
	.group("/thing", (thing) =>
		thing
			.post(
				"/",
				async (c) => {
					const person = c.person;
					const body = c.body;
					const thing = await c.prisma.thing.create({
						data: { createdById: person.id, content: body.content },
						include: { assignedTo: true },
					});
					return thing;
				},
				{
					body: ThingCreateDataSchema,
					response: ThingSchema.extend({
						assignedTo: PersonSchema.nullable(),
					}),
					auth: true,
				},
			)
			.put(
				"/",
				async (c) => {
					const body = c.body;
					const thing = await c.prisma.thing.update({
						where: { id: body.thingId },
						data: { content: body.content },
						include: { assignedTo: true },
					});
					return thing;
				},
				{
					body: ThingUpdateDataSchema,
					response: ThingSchema.extend({
						assignedTo: PersonSchema.nullable(),
					}),
					auth: true,
				},
			)
			.get(
				"/",
				async (c) => {
					const things = await c.prisma.thing.findMany({
						include: { assignedTo: true },
					});
					return things;
				},
				{
					response: ThingSchema.extend({
						assignedTo: PersonSchema.nullable(),
					}).array(),
					auth: true,
				},
			)
			.post(
				"/assign",
				async (c) => {
					const body = c.body;
					const thingId = body.thingId;
					const personId = body.personId;
					const thing = await c.prisma.thing.update({
						where: { id: thingId },
						data: { assignedToId: personId },
						include: { assignedTo: true },
					});
					return thing;
				},
				{
					body: ThingAssignDataSchema,
					response: ThingSchema.extend({
						assignedTo: PersonSchema.nullable(),
					}),
				},
			)
			.post(
				"/done",
				async (c) => {
					const body = c.body;
					const thingId = body.thingId;
					const thing = await c.prisma.thing.update({
						where: { id: thingId },
						data: { isDone: body.isDone, doneDate: body.isDone ? new Date() : null },
						include: { assignedTo: true },
					});
					return thing;
				},
				{
					body: ThingDoneDataSchema,
					response: ThingSchema.extend({
						assignedTo: PersonSchema.nullable(),
					}),
				},
			)
			.delete(
				"/",
				async (c) => {
					const thingId = c.body.thingId;
					await c.prisma.thing.delete({
						where: { id: thingId },
					});
				},
				{
					body: ThingDeleteDataSchema,
				},
			),
	)
	.group("/person", (person) =>
		person.get(
			"/",
			async (c) => {
				const persons = await c.prisma.person.findMany();
				return persons;
			},
			{
				response: PersonSchema.array(),
				auth: true,
			},
		),
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

export type Server = typeof server;
