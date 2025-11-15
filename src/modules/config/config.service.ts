import { AuthJWTSchema, type AuthJWTData } from "@/modules/auth/auth.schema";
import type { JWTOption } from "@elysiajs/jwt";
import type { ElysiaOpenAPIConfig } from "@elysiajs/openapi";
import * as z from "zod/v4";
import pkg from "../../../package.json";
import { Service } from "@/lib/service.class";

export class ConfigService extends Service {
	constructor() {
		super(ConfigService.name);
	}

	port = process.env.PORT;
	nodeEnv = process.env.NODE_ENV;
	isDev = process.env.NODE_ENV !== "production";
	databaseUrl = process.env.DATABASE_URL;
	clientUrl = process.env.CLIENT_URL;
	baseUrl = process.env.BASE_URL;
	jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
	jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
	logLevel = process.env.LOG_LEVEL;

	getLogLevel(): string {
		return this.logLevel || "info";
	}

	getServiceName(): string {
		return pkg.name;
	}

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
			allowedHeaders: ["Content-Type", "Authorization", "content-type", "authorization", "x-group-id"],
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
			documentation: {
				openapi: "3.1.0",
				info: {
					title: pkg.name,
					version: pkg.version,
				},
				components: {
					securitySchemes: {
						bearerAuth: {
							type: "http",
							scheme: "bearer",
							bearerFormat: "JWT",
						},
					},
				},
			},
			scalar: {
				title: pkg.name,
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
