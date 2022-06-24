import axios from 'axios';
import {
	BaseAuthResponse,
	ResponseType,
	SuccessAuthResponse
} from '../types/sendSafely/BaseAuthResponse';

const sendSafelyApi = axios.create({
	baseURL: 'https://demo.sendsafely.com/api/v2.0'
});

interface ReactQueryKey<T> {
	readonly queryKey: ReadonlyArray<string | T>;
}

interface AuthenticateQueryKey {
	readonly username: string;
	readonly password: string;
}

export const authenticate = ({
	queryKey
}: ReactQueryKey<AuthenticateQueryKey>): Promise<SuccessAuthResponse> => {
	// TODO clean this up
	const { username, password } = queryKey[1] as AuthenticateQueryKey;
	return sendSafelyApi
		.put<BaseAuthResponse>('/auth-api/generate-key', {
			email: username,
			password: password,
			keyDescription: 'SendSafely CLI Key (auto generated)'
		})
		.then((res) => res.data)
		.then((data) => {
			if (data.response === ResponseType.SUCCESS) {
				return data as SuccessAuthResponse;
			}
			throw new Error(JSON.stringify(data));
		});
};
