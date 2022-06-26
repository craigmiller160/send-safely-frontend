import { Authentication } from '../components/Authentication';

export interface GetPackagesParams {
	readonly authentication: Authentication;
}

export type BaseQueryKey<T> = [_key: string, params: T];
export type GetPackagesQueryKey = BaseQueryKey<GetPackagesParams>;
