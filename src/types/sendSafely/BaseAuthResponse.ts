export enum ResponseType {
	SUCCESS = 'SUCCESS',
	AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED'
}

export interface BaseAuthResponse {
	readonly response: string;
}

export interface SuccessAuthResponse extends BaseAuthResponse {
	readonly response: ResponseType.SUCCESS;
	readonly apiKey: string;
	readonly apiSecret: string;
	readonly email: string;
}

export interface ErrorAuthResponse extends BaseAuthResponse {
	readonly response: ResponseType.AUTHENTICATION_FAILED;
	readonly message: string;
}
