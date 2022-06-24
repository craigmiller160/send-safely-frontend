import axios, { AxiosRequestHeaders } from 'axios';
import {
	BaseAuthResponse,
	ResponseType,
	SuccessAuthResponse
} from '../types/sendSafely/BaseAuthResponse';
import { format } from 'date-fns';
import hmacSha256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import { Authentication } from '../components/Authentication';

const REQUEST_KEY_HEADER = 'ss-api-key';
const REQUEST_TIMESTAMP_HEADER = 'ss-request-timestamp';
const REQUEST_SIGNATURE_HEADER = 'ss-request-signature';
const BASE_URL = 'https://app.sendsafely.com';
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

const sendSafelyApi = axios.create({
	// baseURL: 'https://demo.sendsafely.com/api/v2.0'
	baseURL: BASE_URL
});

export interface AuthenticateParams {
	readonly username: string;
	readonly password: string;
}

export const authenticate = ({
	username,
	password
}: AuthenticateParams): Promise<SuccessAuthResponse> =>
	sendSafelyApi
		.put<BaseAuthResponse>('/auth-api/generate-key', {
			email: username,
			password,
			keyDescription: 'SendSafely CLI Key (auto generated)'
		})
		.then((res) => res.data)
		.then((data) => {
			if (data.response === ResponseType.SUCCESS) {
				return data as SuccessAuthResponse;
			}
			throw new Error(JSON.stringify(data));
		});

const baseSendSafelyRequest = <T>(
	authentication: Authentication,
	uri: string,
	method: Method,
	body: any // TODO what about GET?
): Promise<T> => {
	const fullUrl = `${BASE_URL}${uri}`;
	const timestamp = generateRequestTimestamp();
	const bodyAsString = JSON.stringify(body);
	const signature = generateRequestSignature(
		authentication,
		fullUrl,
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
			return sendSafelyApi
				.get<T>(uri, {
					headers
				})
				.then((res) => res.data);
		case 'POST':
			return sendSafelyApi
				.post<T>(uri, body, {
					headers
				})
				.then((res) => res.data);
		case 'PUT':
			return sendSafelyApi
				.put<T>(uri, body, {
					headers
				})
				.then((res) => res.data);
		case 'DELETE':
			return sendSafelyApi
				.delete<T>(uri, {
					headers
				})
				.then((res) => res.data);
	}
};

export const generateRequestTimestamp = (): string =>
	format(new Date(), "yyyy-MM-dd'T'HH:mm:ssZZZZ");

export const generateRequestSignature = (
	authentication: Authentication,
	urlPath: string,
	timestamp: string,
	requestBody: string
): string =>
	hmacSha256(
		`${authentication.apiKey}${urlPath}${timestamp}${requestBody}`,
		authentication.apiSecret!!
	).toString(Base64);
