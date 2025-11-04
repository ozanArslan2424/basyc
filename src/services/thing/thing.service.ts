import { logger } from "@/lib/log.utils";
import { request } from "@/lib/request";
import type {
	ThingAssignData,
	ThingCreateData,
	ThingData,
	ThingDeleteData,
	ThingDoneData,
	ThingUpdateData,
} from "@/schemas/thing.schemas";
import type { QueryService } from "@/services/query/query.service";
import type { OnMutationSuccess, QueryUpdaterArgs } from "@/services/query/query.type";
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

	updateQueryData = (args: QueryUpdaterArgs<ThingData>) => {
		this.queryService.queryClient.setQueryData<ThingData[]>([QK_THING.LIST], (prev) => {
			if (!prev) return [];
			switch (args.action) {
				case "create":
					return [...prev, args.data];
				case "update":
					return prev.map((t) => (t.id === args.data.id ? args.data : t));
				case "delete":
					return prev.filter((t) => t.id !== args.data);
				default:
					return [];
			}
		});
	};

	create = (onSuccess?: OnMutationSuccess<ThingCreateData, ThingData>) =>
		this.queryService.createMutationOptions<ThingCreateData, ThingData>({
			mutationFn: async (body) => {
				const res = await request.thing.post(body);
				if (res.error) throw res.error;
				return res.data;
			},
			onSuccess: (res, vars) => {
				this.updateQueryData({ action: "create", data: res });
				onSuccess?.(res, vars);
			},
		});

	update = (onSuccess?: OnMutationSuccess<ThingUpdateData, ThingData>) =>
		this.queryService.createMutationOptions<ThingUpdateData, ThingData>({
			mutationFn: async (body) => {
				const res = await request.thing.put(body);
				if (res.error) throw res.error;
				return res.data;
			},
			onSuccess: (res, vars) => {
				this.updateQueryData({ action: "update", data: res });
				onSuccess?.(res, vars);
			},
		});

	delete = () =>
		this.queryService.createMutationOptions<ThingDeleteData, void>({
			mutationFn: async (body) => {
				const res = await request.thing.delete(body);
				if (res.error) throw res.error;
			},
			onSuccess: (_, vars) => {
				this.updateQueryData({ action: "delete", data: vars.thingId });
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
				this.updateQueryData({ action: "update", data: res });
			},
		});

	done = () =>
		this.queryService.createMutationOptions<ThingDoneData, ThingData>({
			mutationFn: async (body) => {
				const res = await request.thing.done.post(body);
				if (res.error) throw res.error;
				return res.data;
			},
			onSuccess: (res) => {
				this.updateQueryData({ action: "update", data: res });
			},
		});
}
