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

export interface SendSafelyReceivedPackage {
	readonly packageId: string;
	readonly packageUserName: string;
	readonly packageUpdateTimestamp: string;
	readonly filenames: ReadonlyArray<string>;
}

export interface SendSafelySentPackage extends SendSafelyReceivedPackage {
	readonly recipients: ReadonlyArray<string>;
}

export interface SendSafelyReceivedPackageResponse
	extends SendSafelySuccessResponse {
	readonly packages: ReadonlyArray<SendSafelyReceivedPackage>;
}

export interface SendSafelySentPackageResponse
	extends SendSafelySuccessResponse {
	readonly packages: ReadonlyArray<SendSafelySentPackage>;
}
