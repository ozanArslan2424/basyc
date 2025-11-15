import { middlewares } from "@/middleware";
import {
	ThingDataSchema,
	ThingCreateDataSchema,
	ThingUpdateDataSchema,
	ThingAssignDataSchema,
	ThingDoneDataSchema,
	ThingRemoveDataSchema,
} from "@/modules/thing/thing.schema";
import Elysia from "elysia";

export const ThingController = new Elysia({ prefix: "/thing" })
	.use(middlewares)
	.get("/", (c) => c.thingService.list(), {
		response: ThingDataSchema.array(),
		auth: true,
	})
	.post("/", (c) => c.thingService.create(c.profile, c.body), {
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
	.post("/remove", (c) => c.thingService.remove(c.body), {
		body: ThingRemoveDataSchema,
	});
