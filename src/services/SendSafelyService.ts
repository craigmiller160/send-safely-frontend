import axios from 'axios';
import {
	BaseAuthResponse,
	ResponseType,
	SuccessAuthResponse
} from '../types/sendSafely/BaseAuthResponse';

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
