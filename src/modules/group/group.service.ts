import { HTTPError } from "@/modules/error/http-error.class";
import type { THeaders } from "@/lib/helper.type";
import { Service } from "@/lib/service.class";
import type { GroupCreateData, GroupJoinData } from "@/modules/group/group.schema";
import { PersonRole, type PrismaClient } from "prisma/generated";

export class GroupService extends Service {
	constructor(private readonly prisma: PrismaClient) {
		super(GroupService.name);
	}

	private hash(input: string) {
		return Bun.hash(input).toString();
	}

	async get(headers: THeaders) {
		const groupId = headers["x-group-id"];
		if (!groupId) {
			throw new HTTPError("Group ID could not be found", 400);
		}
		return await this.prisma.group.findUnique({ where: { id: parseInt(groupId) } });
	}

	async create(personId: number, body: GroupCreateData) {
		const password = this.hash(body.password);

		return await this.prisma.group.create({
			data: {
				title: body.title,
				password,
				memberships: { create: { personId, role: PersonRole.admin } },
			},
		});
	}

	async join(personId: number, body: GroupJoinData) {
		const password = this.hash(body.join);

		const group = await this.prisma.group.findFirst({ where: { password } });

		if (!group) {
			throw new HTTPError("Invalid group password", 400);
		}

		await this.prisma.membership.create({ data: { personId, groupId: group.id, role: PersonRole.user } });

		return group;
	}
}
