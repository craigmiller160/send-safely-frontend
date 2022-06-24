import axios from 'axios';
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

const sendSafelyApi = axios.create({
	// baseURL: 'https://demo.sendsafely.com/api/v2.0'
	baseURL: 'https://app.sendsafely.com'
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
