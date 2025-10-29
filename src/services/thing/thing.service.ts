import { logger } from "@/lib/log.utils";
import { request } from "@/lib/request";
import type { ThingAssignData, ThingCreateData, ThingData } from "@/schemas/thing.schemas";
import type { QueryService } from "@/services/query/query.service";
import { QK_THING } from "@/services/thing/thing.keys";

export class ThingService {
	constructor(readonly queryService: QueryService) {
		logger("count", ThingService.name);
	}

	queryList = () =>
		this.queryService.createQueryOptions<ThingData[]>({
			queryKey: [QK_THING.LIST],
			queryFn: async () => {
				const res = await request.thing.get();
				if (res.error) throw res.error;
				return res.data;
			},
		});

	create = () =>
		this.queryService.createMutationOptions<ThingCreateData, ThingData>({
			mutationFn: async (body) => {
				const res = await request.thing.post(body);
				if (res.error) throw res.error;
				return res.data;
			},
			onSuccess: (res) => {
				this.queryService.queryClient.setQueryData<ThingData[]>([QK_THING.LIST], (prev) =>
					prev ? [...prev, res] : [],
				);
			},
		});

	assign = () =>
		this.queryService.createMutationOptions<ThingAssignData, ThingData>({
			mutationFn: async (body) => {
				const res = await request.thing.assign.post(body);
				if (res.error) throw res.error;
				return res.data;
			},
			onSuccess: (res) => {
				this.queryService.queryClient.setQueryData<ThingData[]>([QK_THING.LIST], (prev) =>
					prev ? prev.map((t) => (t.id === res.id ? res : t)) : [],
				);
			},
		});
}
