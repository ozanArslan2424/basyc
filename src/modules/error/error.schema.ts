import { HTTPError } from "@/modules/error/http-error.class";
import { Prisma } from "prisma/generated";

export const errorConfig = {
	HTTPError,
	PrismaClientKnownRequestError: Prisma.PrismaClientKnownRequestError,
	PrismaClientUnknownRequestError: Prisma.PrismaClientUnknownRequestError,
	PrismaClientInitializationError: Prisma.PrismaClientInitializationError,
	PrismaClientValidationError: Prisma.PrismaClientValidationError,
	PrismaClientRustPanicError: Prisma.PrismaClientRustPanicError,
	Error,
};

export type ErrorType = typeof errorConfig;
export type ErrorCode = keyof ErrorType;
