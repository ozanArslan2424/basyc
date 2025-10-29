import { logger } from "@/lib/log.utils";
import type { QueryService } from "../query/query.service";
import { QK_AUTH } from "@/services/auth/auth.keys";
import { request } from "@/lib/request";
import type { Person } from "prisma/generated";
import type { LoginData, RegisterData } from "@/schemas/auth.schemas";

export class AuthService {
	constructor(readonly queryService: QueryService) {
		logger("count", AuthService.name);
	}

	queryMe = () =>
		this.queryService.createQueryOptions<Person>({
			queryKey: [QK_AUTH.ME],
			queryFn: async () => {
				const res = await request.auth.me.get();
				if (res.error) throw res.error;
				return res.data;
			},
		});

	login = () =>
		this.queryService.createMutationOptions<LoginData, Person>({
			mutationFn: async (body) => {
				const res = await request.auth.login.post(body);
				if (res.error) throw res.error;
				return res.data;
			},
			onSuccess: (me) => {
				this.queryService.queryClient.setQueryData([QK_AUTH.ME], me);
			},
		});

	register = () =>
		this.queryService.createMutationOptions<RegisterData>({
			mutationFn: async (body) => {
				const res = await request.auth.register.post(body);
				if (res.error) throw res.error;
				return res.data;
			},
			onSuccess: (me) => {
				this.queryService.queryClient.setQueryData([QK_AUTH.ME], me);
			},
		});

	logout = () =>
		this.queryService.createMutationOptions({
			mutationFn: async () => {
				const res = await request.auth.logout.post();
				if (res.error) throw res.error;
			},
			onSuccess: () => {
				this.queryService.invalidateAll([[QK_AUTH.ME]]);
			},
		});
}
