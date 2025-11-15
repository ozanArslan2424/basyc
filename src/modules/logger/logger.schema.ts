export enum LogLevel {
	ERROR = "error",
	WARN = "warn",
	INFO = "info",
	DEBUG = "debug",
}

export type RequestData = {
	id: string;
	start: number;
	url: string;
	method: string;
	userAgent: string;
};
