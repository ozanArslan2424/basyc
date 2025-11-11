import { middlewares } from "@/middleware";
import { AuthResponseSchema, LoginSchema, AuthCookieSchema, RegisterSchema } from "@/modules/auth/auth.schema";
import { PersonDataSchema } from "@/modules/person/person.schema";
import Elysia from "elysia";

export const AuthController = new Elysia({ prefix: "/auth" })
	.use(middlewares)
	.post(
		"/login",
		async (c) => {
			const profile = await c.authService.login(c.body);
			const refreshToken = await c.refresh.sign({ userId: profile.userId });
			const refreshCookieArgs = c.authService.getRefreshCookieArgs(refreshToken);
			c.cookie.auth?.set(refreshCookieArgs);
			const accessToken = await c.access.sign({ userId: profile.userId });
			return { profile, accessToken };
		},
		{ response: AuthResponseSchema, body: LoginSchema },
	)
	.post(
		"/register",
		async (c) => {
			const profile = await c.authService.register(c.body);
			const refreshToken = await c.refresh.sign({ userId: profile.userId });
			const refreshCookieArgs = c.authService.getRefreshCookieArgs(refreshToken);
			c.cookie.auth?.set(refreshCookieArgs);
			const accessToken = await c.access.sign({ userId: profile.userId });
			return { profile, accessToken };
		},
		{ response: AuthResponseSchema, body: RegisterSchema },
	)
	.post("/logout", (c) => {
		c.cookie.auth?.remove();
	})
	.post(
		"/refresh",
		async (c) => {
			const refreshToken = c.authService.getRefreshToken(c.cookie.auth);
			const payload = await c.refresh.verify(refreshToken);
			const { profile } = await c.authService.guard(payload);
			const newRefreshToken = await c.refresh.sign({ userId: profile.userId });
			const newAccessToken = await c.access.sign({ userId: profile.userId });
			const refreshCookieArgs = c.authService.getRefreshCookieArgs(newRefreshToken);
			c.cookie.auth.set(refreshCookieArgs);
			return { profile, accessToken: newAccessToken };
		},
		{ response: AuthResponseSchema, cookie: AuthCookieSchema },
	)
	.get("/me", (c) => c.profile, { response: PersonDataSchema, auth: true });
