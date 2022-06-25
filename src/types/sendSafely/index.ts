export enum SendSafelyResponseType {
	SUCCESS = 'SUCCESS',
	AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED'
}

export interface SendSafelyBaseResponse {
	readonly response: SendSafelyResponseType;
}

export interface SendSafelySuccessResponse extends SendSafelyBaseResponse {
	readonly response: SendSafelyResponseType.SUCCESS;
}

export interface SendSafelyAuthResponse extends SendSafelySuccessResponse {
	readonly apiKey: string;
	readonly apiSecret: string;
	readonly email: string;
}

export interface SendSafelyErrorResponse extends SendSafelyBaseResponse {
	readonly response: Exclude<
		SendSafelyResponseType,
		SendSafelyResponseType.SUCCESS
	>;
	readonly message: string;
}

export interface SendSafelyPackage {
	readonly packageId: string;
	readonly packageUpdateTimestamp: string;
	readonly recipients: ReadonlyArray<string>;
	readonly filenames: ReadonlyArray<string>;
}

export interface SendSafelyPackageResponse extends SendSafelySuccessResponse {
	readonly packages: ReadonlyArray<SendSafelyPackage>;
}
