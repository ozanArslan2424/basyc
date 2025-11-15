import { middlewares } from "@/middleware";
import { GroupCreateSchema, GroupJoinSchema } from "@/modules/group/group.schema";
import Elysia from "elysia";

export const GroupController = new Elysia({ prefix: "/group" })
	.use(middlewares)
	.get("/", (c) => c.groupService.get(c.headers), {
		auth: true,
	})
	.post("/", (c) => c.groupService.create(c.profile.id, c.body), {
		body: GroupCreateSchema,
		auth: true,
	})
	.post("/join", (c) => c.groupService.join(c.profile.id, c.body), {
		body: GroupJoinSchema,
		auth: true,
	});
