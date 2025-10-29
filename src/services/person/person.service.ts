import { logger } from "@/lib/log.utils";
import { request } from "@/lib/request";
import { QK_PERSON } from "@/services/person/person.keys";
import type { QueryService } from "@/services/query/query.service";

export class PersonService {
	constructor(readonly queryService: QueryService) {
		logger("count", PersonService.name);
	}

	queryList = () =>
		this.queryService.createQueryOptions({
			queryKey: [QK_PERSON],
			queryFn: async () => {
				const res = await request.person.get();
				if (res.error) throw res.error;
				return res.data;
			},
		});
}
