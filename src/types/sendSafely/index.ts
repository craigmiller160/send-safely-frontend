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

export interface SendSafelyBasePackage {
	readonly packageId: string;
	readonly packageUserName: string;
	readonly packageUpdateTimestamp: string;
	readonly filenames: ReadonlyArray<string>;
}

export interface SendSafelyReceivedPackage extends SendSafelyBasePackage {}

export interface SendSafelySentPackage extends SendSafelyBasePackage {
	readonly recipients: ReadonlyArray<string>;
}

export interface SendSafelyBasePackageResponse<T extends SendSafelyBasePackage>
	extends SendSafelySuccessResponse {
	readonly packages: ReadonlyArray<T>;
}

export interface SendSafelyReceivedPackageResponse
	extends SendSafelyBasePackageResponse<SendSafelyReceivedPackage> {}

export interface SendSafelySentPackageResponse
	extends SendSafelyBasePackageResponse<SendSafelySentPackage> {}
