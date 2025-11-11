import type {
	ThingCreateData,
	ThingUpdateData,
	ThingAssignData,
	ThingDoneData,
	ThingDeleteData,
} from "@/modules/thing/thing.schema";
import type { Person, PrismaClient } from "prisma/generated";

export class ThingService {
	constructor(private readonly prisma: PrismaClient) {}

	async create(person: Person, body: ThingCreateData) {
		return await this.prisma.thing.create({
			data: { createdById: person.id, content: body.content, dueDate: body.dueDate },
			include: { assignedTo: true },
		});
	}

	async update(body: ThingUpdateData) {
		return await this.prisma.thing.update({
			where: { id: body.thingId },
			data: { content: body.content, dueDate: body.dueDate },
			include: { assignedTo: true },
		});
	}

	async list() {
		return await this.prisma.thing.findMany({
			include: { assignedTo: true },
		});
	}

	async assign(body: ThingAssignData) {
		return await this.prisma.thing.update({
			where: { id: body.thingId },
			data: { assignedToId: body.personId },
			include: { assignedTo: true },
		});
	}

	async done(body: ThingDoneData) {
		return await this.prisma.thing.update({
			where: { id: body.thingId },
			data: { isDone: body.isDone, doneDate: body.isDone ? new Date() : null },
			include: { assignedTo: true },
		});
	}

	async delete(body: ThingDeleteData) {
		return await this.prisma.thing.delete({
			where: { id: body.thingId },
		});
	}
}
