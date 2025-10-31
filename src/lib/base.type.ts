import type { Prettify, Resolve, TMaybe } from "./helper.type";

export type TBaseEntity<T = undefined> = Resolve<
	{
		id: string | number;
		createdAt: string;
		updatedAt: TMaybe<string>;
	},
	T
>;

type BaseResponse = {
	success: boolean;
	message: string;
	statusCode: number;
};

export type TBaseResponse<T = undefined> = T extends undefined ? BaseResponse : Prettify<BaseResponse & { data: T }>;

export type TBasePaginationData<T extends TBaseEntity> = {
	items: T[];
	pageCount: number;
	totalCount: number;
	responseCount: number;
};

export type TBaseListParams = {
	page?: number;
	limit?: number;
	sortBy?: TMaybe<string>;
	sortOrder?: TMaybe<string>;
	search?: TMaybe<string>;
};

export type TBasePerson<T = undefined> = Resolve<
	{
		name: string;
		image?: TMaybe<string>;
	},
	T
>;
