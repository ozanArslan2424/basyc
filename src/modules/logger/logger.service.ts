import winston from "winston";
import { ConfigService } from "@/modules/config/config.service";
import { LogLevel, type RequestData } from "@/modules/logger/logger.schema";
import type { TUnknownObject } from "@/lib/helper.type";
import { Service } from "@/lib/service.class";

export class LoggerService extends Service {
	private logger: winston.Logger;

	constructor(private config: ConfigService) {
		super(LoggerService.name);
		this.logger = this.createLogger();
	}

	private createLogger(): winston.Logger {
		const isDevelopment = this.config.isDev;
		const logLevel = this.config.getLogLevel() as LogLevel;

		const formats = isDevelopment
			? winston.format.combine(
					winston.format.errors({ stack: true }),
					winston.format.timestamp(),
					winston.format.colorize(),
					winston.format.printf(
						({ timestamp, level, message, stack, ...meta }) =>
							`${timestamp} [${level}]: ${message}${Object.keys(meta).length > 0 ? `\n${JSON.stringify(meta, null, 2)}` : ""}${stack ? `\n${stack}` : ""}`,
					),
				)
			: winston.format.combine(
					winston.format.errors({ stack: true }),
					winston.format.timestamp(),
					winston.format.json(),
				);

		const transports: winston.transport[] = [
			new winston.transports.Console({
				level: logLevel,
				format: formats,
			}),
		];

		if (!isDevelopment) {
			transports.push(
				new winston.transports.File({
					filename: "logs/error.log",
					level: LogLevel.ERROR,
					format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
				}),
				new winston.transports.File({
					filename: "logs/combined.log",
					level: logLevel,
					format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
				}),
			);
		}

		return winston.createLogger({
			level: logLevel,
			transports,
		});
	}

	onRequest(req: Request) {
		const isOpenAPIRequest = req.url.includes("ely.sia");
		const path = req.url.replace(this.config.baseUrl, "");

		if (!isOpenAPIRequest) {
			this.info(`[${req.method}] ${path}`);
		}
	}

	onAfterResponse(requestData: RequestData) {
		this.info(`[${requestData.method}] ${requestData.url}:`, {
			id: requestData.id,
			userAgent: requestData.userAgent,
			time: `${Math.round(performance.now() - requestData.start)}ms`,
		});
	}

	onError(code: string | number, error: unknown, req: Request) {
		this.logger.error(code.toString(), {
			error: error,
			url: req.url,
			method: req.method,
			userAgent: req.headers.get("user-agent") ?? "unknown",
		});
	}

	error(message: string, meta: TUnknownObject = {}): void {
		this.logger.error(message, meta);
	}

	warn(message: string, meta: TUnknownObject = {}): void {
		this.logger.warn(message, meta);
	}

	info(message: string, meta: TUnknownObject = {}): void {
		this.logger.info(message, meta);
	}

	debug(message: string, meta: TUnknownObject = {}): void {
		this.logger.debug(message, meta);
	}

	private generateRequestId() {
		return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
	}
}
