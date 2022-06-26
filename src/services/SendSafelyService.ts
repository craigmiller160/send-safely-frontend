import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { format } from 'date-fns';
import hmacSha256 from 'crypto-js/hmac-sha256';
import Hex from 'crypto-js/enc-hex';
import { Authentication } from '../components/Authentication';
import {
	SendSafelyAuthResponse,
	SendSafelyBaseResponse,
	SendSafelyErrorResponse,
	SendSafelyReceivedPackageResponse,
	SendSafelyResponseType,
	SendSafelySentPackageResponse,
	SendSafelySuccessResponse
} from '../types/sendSafely';
import { QueryFunctionContext } from 'react-query';
import { GetPackagesQueryKey } from './keys';

const REQUEST_KEY_HEADER = 'ss-api-key';
const REQUEST_TIMESTAMP_HEADER = 'ss-request-timestamp';
const REQUEST_SIGNATURE_HEADER = 'ss-request-signature';
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const sendSafelyAuthApi = axios.create({
	baseURL: 'https://app.sendsafely.com'
});

const sendSafelyDemoApi = axios.create({
	baseURL: 'https://demo.sendsafely.com'
});

export interface AuthenticateParams {
	readonly username: string;
	readonly password: string;
}

const createSendSafelyErrorMessage = (error: SendSafelyErrorResponse): string =>
	`Error: ${error.response}: ${error.message}`;

const handleSendSafelyResponse = <T extends SendSafelyBaseResponse>(
	res: AxiosResponse<SendSafelyBaseResponse>
): Promise<T> => {
	if (res.data.response === SendSafelyResponseType.SUCCESS) {
		return Promise.resolve(res.data as T);
	}
	return Promise.reject(
		new Error(
			createSendSafelyErrorMessage(res.data as SendSafelyErrorResponse)
		)
	);
};

export const authenticate = ({
	username,
	password
}: AuthenticateParams): Promise<SendSafelyAuthResponse> =>
	sendSafelyAuthApi
		.put<SendSafelyBaseResponse>('/auth-api/generate-key', {
			email: username,
			password,
			keyDescription: 'SendSafely CLI Key (auto generated)'
		})
		.then((data) => handleSendSafelyResponse<SendSafelyAuthResponse>(data));

export const getSentPackages = (
	ctx: QueryFunctionContext<GetPackagesQueryKey>
): Promise<SendSafelySentPackageResponse> => {
	const [, { authentication, pageNumber }] = ctx.queryKey;
	return baseSendSafelyRequest(
		authentication,
		`/api/v2.0/package?pageNumber=${pageNumber}&pageSize=10`,
		'GET'
	);
};

export const getReceivedPackages = (
	ctx: QueryFunctionContext<GetPackagesQueryKey>
): Promise<SendSafelyReceivedPackageResponse> => {
	const [, { authentication, pageNumber }] = ctx.queryKey;
	return baseSendSafelyRequest(
		authentication,
		`/api/v2.0/package/received?pageNumber=${pageNumber}&pageSize=10`,
		'GET'
	);
};

export const deletePackage = (
	authentication: Authentication,
	packageId: string
): Promise<SendSafelySuccessResponse> =>
	baseSendSafelyRequest(
		authentication,
		`/api/v2.0/package/${packageId}`,
		'DELETE'
	);

const extractPathFromUri = (uri: string): string => {
	const questionIndex = uri.indexOf('?');
	if (questionIndex >= 0) {
		return uri.substring(0, questionIndex);
	}
	return uri;
};

const baseSendSafelyRequest = <T extends SendSafelyBaseResponse>(
	authentication: Authentication,
	uri: string,
	method: Method,
	body?: any
): Promise<T> => {
	const timestamp = generateRequestTimestamp();
	const bodyAsString = body ? JSON.stringify(body) : '';
	const signature = generateRequestSignature(
		authentication,
		extractPathFromUri(uri),
		timestamp,
		bodyAsString
	);
	const headers: AxiosRequestHeaders = {
		[REQUEST_KEY_HEADER]: authentication.apiKey!!,
		[REQUEST_TIMESTAMP_HEADER]: timestamp,
		[REQUEST_SIGNATURE_HEADER]: signature
	};
	switch (method) {
		case 'GET':
			return sendSafelyDemoApi
				.get<T>(uri, {
					headers
				})
				.then((data) => handleSendSafelyResponse<T>(data));
		case 'POST':
			return sendSafelyDemoApi
				.post<T>(uri, body, {
					headers
				})
				.then((data) => handleSendSafelyResponse<T>(data));
		case 'PUT':
			return sendSafelyDemoApi
				.put<T>(uri, body, {
					headers
				})
				.then((data) => handleSendSafelyResponse<T>(data));
		case 'DELETE':
			return sendSafelyDemoApi
				.delete<T>(uri, {
					headers
				})
				.then((data) => handleSendSafelyResponse<T>(data));
	}
};

export const generateRequestTimestamp = (): string =>
	format(new Date(), "yyyy-MM-dd'T'HH:mm:ssXXXX");

export const generateRequestSignature = (
	authentication: Authentication,
	urlPath: string,
	timestamp: string,
	requestBody: string
): string =>
	hmacSha256(
		`${authentication.apiKey}${urlPath}${timestamp}${requestBody}`,
		authentication.apiSecret!!
	).toString(Hex);
