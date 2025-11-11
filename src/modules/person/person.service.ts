import type { PersonCreateData } from "@/modules/person/person.schema";
import type { PrismaClient } from "prisma/generated";

export class PersonService {
	constructor(private readonly prisma: PrismaClient) {}

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
}
