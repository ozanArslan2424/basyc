import { HTTPError } from "@/lib/error.utils";
import { Prisma } from "prisma/generated";

function result(status: number, response: Response) {
	return { status, response };
}

export function getErrorResult(error: unknown) {
	if (error instanceof HTTPError) {
		return result(error.status, new Response(error.message));
	}

	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		switch (error.code) {
			case "P2002":
				return result(409, new Response("Unique constraint violation"));
			case "P2025":
				return result(404, new Response("Record not found"));
			case "P2003":
				return result(400, new Response("Foreign key constraint failed"));
			case "P2014":
				return result(400, new Response("Invalid ID provided"));
			case "P2000":
				return result(400, new Response("Input value too long"));
			case "P2001":
				return result(404, new Response("Record not found"));
			case "P2004":
				return result(400, new Response("Constraint violation"));
			case "P2005":
				return result(400, new Response("Invalid value stored in database"));
			case "P2006":
				return result(400, new Response("Invalid value provided"));
			case "P2007":
				return result(400, new Response("Data validation error"));
			default:
				return result(400, new Response(`Database error: ${error.code}`));
		}
	}

	if (error instanceof Prisma.PrismaClientUnknownRequestError) {
		return result(500, new Response("Unknown database error occurred"));
	}

	if (error instanceof Prisma.PrismaClientInitializationError) {
		return result(500, new Response("Database connection failed"));
	}

	if (error instanceof Prisma.PrismaClientValidationError) {
		return result(400, new Response("Invalid query parameters"));
	}

	if (error instanceof Prisma.PrismaClientRustPanicError) {
		return result(500, new Response("Database system error"));
	}

	if (error instanceof Error) {
		return result(500, new Response(error.message));
	}

	return result(500, new Response("Unknown error"));
}
