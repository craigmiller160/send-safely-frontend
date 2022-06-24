import axios from 'axios';

const sendSafelyApi = axios.create({
	baseURL: 'https://demo.sendsafely.com/api/v2.0'
});

export const authenticate = (
	username: string,
	password: string
): Promise<any> =>
	sendSafelyApi.put('/auth-api/generate-key', {
		email: username,
		password,
		keyDescription: 'SendSafely CLI Key (auto generated)'
	});
