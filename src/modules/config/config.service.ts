import { AuthJWTSchema, type AuthJWTData } from "@/modules/auth/auth.schema";
import type { JWTOption } from "@elysiajs/jwt";
import type { ElysiaOpenAPIConfig } from "@elysiajs/openapi";
import * as z from "zod/v4";

export class ConfigService {
	port = process.env.PORT;
	isDev = process.env.NODE_ENV !== "production";
	databaseUrl = process.env.DATABASE_URL;
	clientUrl = process.env.CLIENT_URL;
	baseUrl = process.env.BASE_URL;
	jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
	jwtAccessSecret = process.env.JWT_ACCESS_SECRET;

	getCorsOrigin() {
		const origins = [this.clientUrl];
		if (this.isDev) {
			origins.push("http://localhost:4173");
			origins.push("http://localhost:5173");
		}
		return origins;
	}

	getCorsArgs() {
		return {
			origin: this.getCorsOrigin(),
			methods: ["GET", "POST"],
			allowedHeaders: ["Content-Type", "Authorization", "content-type", "authorization"],
			credentials: true,
		};
	}

	getDatabaseUrl() {
		if (this.isDev) {
			return "dev.db";
		}
		return this.databaseUrl;
	}

	getJwtAccessArgs(): JWTOption<"access", AuthJWTData> {
		return {
			name: "access",
			secret: this.jwtAccessSecret,
			schema: AuthJWTSchema,
			exp: "15m",
		};
	}

	getJwtRefreshArgs(): JWTOption<"refresh", AuthJWTData> {
		return {
			name: "refresh",
			secret: this.jwtRefreshSecret,
			schema: AuthJWTSchema,
			exp: "7d",
		};
	}

	getOpenAPIArgs(): ElysiaOpenAPIConfig<true, "/reference"> {
		return {
			path: "/reference",
			provider: "scalar",
			scalar: {
				title: "basyc api",
				theme: "elysiajs",
				layout: "classic",
				defaultHttpClient: {
					targetKey: "js",
					clientKey: "axios",
				},
			},
			mapJsonSchema: {
				zod: (schema: z.core.$ZodType) => z.toJSONSchema(schema, { unrepresentable: "any" }),
			},
		};
	}
}
