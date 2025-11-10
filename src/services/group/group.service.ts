import { HTTPError } from "@/lib/error.utils";
import type { GroupCreateData, GroupJoinData } from "@/services/group/group.schema";
import { PersonRole, type PrismaClient } from "prisma/generated";

export class GroupService {
	constructor(private readonly prisma: PrismaClient) {}

	private hash(input: string) {
		return Bun.hash(input).toString();
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

		return await this.prisma.membership.create({ data: { personId, groupId: group.id, role: PersonRole.user } });
	}
}
