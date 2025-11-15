import { middlewares } from "@/middleware";
import { PersonDataSchema, PersonRemoveSchema } from "@/modules/person/person.schema";
import Elysia from "elysia";

export const PersonController = new Elysia({ prefix: "/person" })
	.use(middlewares)
	.get("/", (c) => c.personService.list(c.profile.id), {
		response: PersonDataSchema.array(),
		auth: true,
	})
	.post("/remove", (c) => c.personService.remove(c.body, c.profile, c.headers), {
		body: PersonRemoveSchema,
		auth: true,
	});
