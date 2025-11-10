import { HTTPError } from "@/lib/error.utils";
import type { LoginData, RegisterData } from "@/services/auth/auth.schema";
import type { PersonService } from "@/services/person/person.service";
import type { PrismaClient } from "prisma/generated";

export class AuthService {
	constructor(
		private readonly prisma: PrismaClient,
		private readonly personService: PersonService,
	) {}

	async guard(storedUserId: string) {
		if (storedUserId.length === 0) {
			throw new HTTPError("UNAUTHORIZED", 401);
		}
		const person = await this.personService.getByUserId(storedUserId);
		if (!person) {
			throw new HTTPError("UNAUTHORIZED", 401);
		}
		return { person };
	}

	async login(body: LoginData) {
		const user = await this.prisma.user.findUnique({ where: { email: body.email } });
		if (!user) throw new HTTPError("Invalid credentials", 400);
		const pwdMatch = await Bun.password.verify(body.password, user.password);
		if (!pwdMatch) throw new HTTPError("Invalid credentials", 400);
		const profile = await this.personService.getByUserId(user.id);
		if (!profile) {
			throw new HTTPError("UNAUTHORIZED", 401);
		}
		return profile;
	}

	async register(body: RegisterData) {
		const password = await Bun.password.hash(body.password);
		const exists = await this.prisma.user.findUnique({
			where: { email: body.email },
		});
		if (exists) {
			throw new HTTPError("This email is registered", 400);
		}
		const user = await this.prisma.user.create({
			data: { name: body.name, password: password, email: body.email },
		});
		const profile = await this.personService.create({
			userId: user.id,
			email: body.email,
			name: body.name,
		});
		return profile;
	}
}
