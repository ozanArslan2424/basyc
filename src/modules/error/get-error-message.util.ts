import { isObjectWith } from "@/lib/utils";

export function getErrorMessage(err: unknown) {
	if (typeof err === "string") {
		return err;
	} else if (isObjectWith<{ message: string }>(err, "message")) {
		return err.message;
	} else {
		return "Unknown error";
	}
}
