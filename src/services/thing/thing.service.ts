import { logger } from "@/lib/log.utils";
import { request } from "@/lib/request";
import type {
	ThingAssignData,
	ThingCreateData,
	ThingData,
	ThingDeleteData,
	ThingUpdateData,
} from "@/schemas/thing.schemas";
import type { QueryService } from "@/services/query/query.service";
import type { OnMutationSuccess } from "@/services/query/query.type";
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

	create = (onSuccess?: OnMutationSuccess<ThingCreateData, ThingData>) =>
		this.queryService.createMutationOptions<ThingCreateData, ThingData>({
			mutationFn: async (body) => {
				const res = await request.thing.post(body);
				if (res.error) throw res.error;
				return res.data;
			},
			onSuccess,
		});

	update = (onSuccess?: OnMutationSuccess<ThingUpdateData, ThingData>) =>
		this.queryService.createMutationOptions<ThingUpdateData, ThingData>({
			mutationFn: async (body) => {
				const res = await request.thing.put(body);
				if (res.error) throw res.error;
				return res.data;
			},
			onSuccess,
		});

	delete = () =>
		this.queryService.createMutationOptions<ThingDeleteData, void>({
			mutationFn: async (body) => {
				const res = await request.thing.delete(body);
				if (res.error) throw res.error;
			},
			onSuccess: (_, vars) => {
				this.queryService.queryClient.setQueryData<ThingData[]>([QK_THING.LIST], (prev) =>
					prev ? prev.filter((t) => t.id !== vars.thingId) : [],
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
