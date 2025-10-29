import { toast } from "sonner";
import type { TMaybe } from "./helper.type";
import { isObjectWith } from "./utils";

export class HTTPError extends Error {
	constructor(message: string, status: number) {
		super(message);
		this.status = status;
	}

	status: number;

	getResponse() {
		return {
			message: this.message,
			status: this.status,
		};
	}
}

export function handleQueryRetry(failureCount: number, error: unknown) {
	// Log the error to the server
	// api.log.logError(error);

	if (error instanceof HTTPError) {
		const isUnderRetryLimit = failureCount < 3;
		const isTimeout = [408, 504, 409].includes(error.status);
		if (isUnderRetryLimit && isTimeout) {
			return true;
		}
		const isBadRequest = [400, 401, 403, 404, 422].includes(error.status);
		if (isBadRequest) {
			return false;
		}
		return true;
	}

	return false;
}

export function handleMutationSettle(res: unknown, error: Error | null) {
	if (isObjectWith<{ message: string }>(res, "message") && typeof res.message === "string") {
		toast.success(res.message);
	} else if (error) {
		toast.error(error.message);
	}
}

export function getErrorMessage(err: unknown) {
	let message: string;

	switch (true) {
		case err instanceof Error:
			message = err.message;
			break;
		case err instanceof CustomServerError:
			message = err.message;
			break;
		case err instanceof HTTPError:
			message = err.message;
			break;
		case err && typeof err === "object" && "message" in err:
			message = String(err.message);
			break;
		case typeof err === "string":
			message = err;
			break;
		case true:
		default:
			message = "Something went wrong";
	}
	return message;
}

export function assert<T>(condition: TMaybe<T>, message?: string): asserts condition {
	const conditionName = String(condition);
	if (!condition) {
		throw new Error(
			message ? `${conditionName}: ${message}` : `Assertion failed for ${conditionName}`,
		);
	}
}
