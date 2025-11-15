import cors from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";
import type Elysia from "elysia";
import { getServices } from "@/services";
import { errorConfig } from "@/modules/error/error.schema";

const services = getServices();

export const middlewares = (app: Elysia) =>
	app
		.use(cors(services.config.getCorsArgs()))
		.use(jwt(services.config.getJwtRefreshArgs()))
		.use(jwt(services.config.getJwtAccessArgs()))
		.derive(() => services)
		.macro({
			auth: {
				resolve: async (c) => {
					const accessToken = services.authService.getAccessToken(c.headers);
					const payload = await c.access.verify(accessToken);
					return await services.authService.guard(payload);
				},
			},
		})
		.error(errorConfig)
		.onError((c) => {
			services.logger.onError(c.code, c.error, c.request);
			switch (c.code) {
				case "HTTPError":
					return c.status(c.error.status, c.error);
				case "Error":
					return c.status(500, c.error.message);
				case "PrismaClientUnknownRequestError":
					return c.status(500, "Unknown database error occurred");
				case "PrismaClientInitializationError":
					return c.status(500, "Database connection failed");
				case "PrismaClientValidationError":
					return c.status(400, "Invalid query parameters");
				case "PrismaClientRustPanicError":
					return c.status(500, "Database system error");
				case "PrismaClientKnownRequestError":
					switch (c.error.code) {
						case "P2002":
							return c.status(409, "Unique constraint violation");
						case "P2025":
							return c.status(404, "Record not found");
						case "P2003":
							return c.status(400, "Foreign key constraint failed");
						case "P2014":
							return c.status(400, "Invalid ID provided");
						case "P2000":
							return c.status(400, "Input value too long");
						case "P2001":
							return c.status(404, "Record not found");
						case "P2004":
							return c.status(400, "Constraint violation");
						case "P2005":
							return c.status(400, "Invalid value stored in database");
						case "P2006":
							return c.status(400, "Invalid value provided");
						case "P2007":
							return c.status(400, "Data validation error");
						default:
							return c.status(400, `Database error: ${c.error.code}`);
					}
				default:
					return c.status(500, "Unknown error");
			}
		});
