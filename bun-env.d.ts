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
		BUN_PUBLIC_API_URL: string;
		BUN_PUBLIC_BASE_URL: string;
		DATABASE_URL: string;
		CLIENT_URL: string;
		BASE_URL: string;
	}
}
