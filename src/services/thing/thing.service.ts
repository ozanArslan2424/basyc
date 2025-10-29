import { logger } from "@/lib/log.utils";
import { request } from "@/lib/request";
import type { ThingCreateData } from "@/schemas/thing.schemas";
import type { QueryService } from "@/services/query/query.service";
import { QK_THING } from "@/services/thing/thing.keys";
import type { Thing } from "prisma/generated";

export class ThingService {
	constructor(readonly queryService: QueryService) {
		logger("count", ThingService.name);
	}

	listQuery = () =>
		this.queryService.createQueryOptions<Thing[]>({
			queryKey: [QK_THING.LIST],
			queryFn: async () => {
				const res = await request.thing.get();
				if (res.error) throw res.error;
				return res.data;
			},
		});

	create = () =>
		this.queryService.createMutationOptions<ThingCreateData, Thing>({
			mutationFn: async (body) => {
				const res = await request.thing.post(body);
				if (res.error) throw res.error;
				return res.data;
			},
			onSuccess: (res) => {
				this.queryService.queryClient.setQueryData<Thing[]>([QK_THING.LIST], (prev) =>
					prev ? [...prev, res] : [],
				);
			},
		});
}
