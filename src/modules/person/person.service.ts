import { HTTPError } from "@/modules/error/http-error.class";
import type { THeaders } from "@/lib/helper.type";
import { Service } from "@/lib/service.class";
import type { GroupData } from "@/modules/group/group.schema";
import type { PersonCreateData, PersonData, PersonRemoveData } from "@/modules/person/person.schema";
import { PersonRole, type PrismaClient } from "prisma/generated";

export class PersonService extends Service {
	constructor(private readonly prisma: PrismaClient) {
		super(PersonService.name);
	}

	async list(personId: number) {
		const groups = await this.prisma.group.findMany({
			where: { memberships: { some: { personId } } },
		});
		return await this.prisma.person.findMany({
			where: { memberships: { some: { groupId: { in: groups.map((g) => g.id) } } } },
			include: { memberships: { include: { group: true } } },
		});
	}

	async get(id: number) {
		return await this.prisma.person.findUnique({
			where: { id },
			include: { memberships: { include: { group: true } } },
		});
	}

	async getByUserId(userId: string) {
		return await this.prisma.person.findUnique({
			where: { userId },
			include: { memberships: { include: { group: true } } },
		});
	}

	async create(body: PersonCreateData) {
		return await this.prisma.person.create({
			data: { userId: body.userId, email: body.email, name: body.name },
			include: { memberships: { include: { group: true } } },
		});
	}

	async remove(body: PersonRemoveData, removedBy: PersonData, headers: THeaders) {
		const groupId = headers["x-group-id"];
		if (!groupId) {
			throw new HTTPError("Group ID could not be found", 400);
		}

		const role = removedBy.memberships.find((m) => m.groupId === parseInt(groupId))?.role;
		if (!role) {
			throw new HTTPError("You are not a member of this group", 400);
		}
		if (role === PersonRole.user) {
			throw new HTTPError("Only admins/owners can remove a member", 400);
		}

		const where = {
			personId_groupId_role: {
				personId: body.personId,
				groupId: parseInt(groupId),
				role: PersonRole.user,
			},
		};

		const member = await this.prisma.membership.findUnique({ where });
		if (!member) {
			throw new HTTPError("Member was not found in group", 404);
		}

		await this.prisma.membership.delete({ where });
	}
}
