import { HTTPError } from "@/lib/error.utils";
import type { TMaybe } from "@/lib/helper.type";
import type { LoginData, RegisterData } from "@/modules/auth/auth.schema";
import type { ConfigService } from "@/modules/config/config.service";
import type { PersonService } from "@/modules/person/person.service";
import type { JWTPayloadSpec } from "@elysiajs/jwt";
import type { Cookie, ElysiaCookie } from "elysia/cookies";
import type { PrismaClient } from "prisma/generated";

export class AuthService {
	constructor(
		private readonly prisma: PrismaClient,
		private readonly personService: PersonService,
		private readonly config: ConfigService,
	) {}

	getAccessToken(headers: Record<string, string | undefined>): string {
		const authHeader = headers["Authorization"] || headers["authorization"];
		if (!authHeader) {
			throw new HTTPError("UNAUTHORIZED1", 401);
		}
		const token = authHeader.replace("Bearer ", "");
		if (token.trim().length === 0) {
			throw new HTTPError("UNAUTHORIZED2", 401);
		}
		return token;
	}

	getRefreshToken(authCookie: Cookie<TMaybe<string>>) {
		const refreshToken = authCookie.value;
		if (!refreshToken) {
			throw new HTTPError("UNAUTHORIZED3", 401);
		}
		return refreshToken;
	}

	getRefreshCookieArgs(value: string | null): ElysiaCookie {
		return {
			value,
			domain: this.config.clientUrl,
			httpOnly: true,
			maxAge: 7 * 24 * 60 * 60,
		};
	}

	async guard(payload: false | ({ userId: string } & Omit<JWTPayloadSpec, "userId">)) {
		if (!payload) {
			throw new HTTPError("UNAUTHORIZED4", 401);
		}
		const profile = await this.personService.getByUserId(payload.userId);
		if (!profile) {
			throw new HTTPError("UNAUTHORIZED5", 401);
		}
		return { profile };
	}

	async login(body: LoginData) {
		const user = await this.prisma.user.findUnique({ where: { email: body.email } });
		if (!user) throw new HTTPError("Invalid credentials", 400);
		const pwdMatch = await Bun.password.verify(body.password, user.password);
		if (!pwdMatch) throw new HTTPError("Invalid credentials", 400);
		const profile = await this.personService.getByUserId(user.id);
		if (!profile) {
			throw new HTTPError("UNAUTHORIZED6", 401);
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
