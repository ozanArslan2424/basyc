declare module "*.svg" {
	const path: `${string}.svg`;
	export = path;
}

declare module "*.module.css" {
	const classes: { readonly [key: string]: string };
	export = classes;
}

declare module "bun" {
	interface Env {
		PORT: string;
		DATABASE_URL: string;
		CLIENT_URL: string;
		BASE_URL: string;
		JWT_REFRESH_SECRET: string;
		JWT_ACCESS_SECRET: string;
		LOG_LEVEL: string;
	}
}
