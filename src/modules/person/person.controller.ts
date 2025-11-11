import { middlewares } from "@/middleware";
import { PersonDataSchema } from "@/modules/person/person.schema";
import Elysia from "elysia";

export const PersonController = new Elysia({ prefix: "/person" })
	.use(middlewares)
	.get("/", (c) => c.personService.list(c.profile.id), {
		response: PersonDataSchema.array(),
		auth: true,
	});
