import { AuthService } from "@/modules/auth/auth.service";
import { ConfigService } from "@/modules/config/config.service";
import { GroupService } from "@/modules/group/group.service";
import { LoggerService } from "@/modules/logger/logger.service";
import { PersonService } from "@/modules/person/person.service";
import { ThingService } from "@/modules/thing/thing.service";
import { PrismaClient } from "prisma/generated";

type Services = {
	config: ConfigService;
	prisma: PrismaClient;
	logger: LoggerService;
	personService: PersonService;
	authService: AuthService;
	groupService: GroupService;
	thingService: ThingService;
};

let services: Services;

function makeServices(): Services {
	const config = new ConfigService();
	const prisma = new PrismaClient();
	const logger = new LoggerService(config);
	const personService = new PersonService(prisma);
	const authService = new AuthService(prisma, personService, config);
	const groupService = new GroupService(prisma);
	const thingService = new ThingService(prisma);

	return {
		config,
		prisma,
		logger,
		personService,
		authService,
		groupService,
		thingService,
	};
}

export function getServices() {
	if (!services) services = makeServices();
	return services;
}
