import { useMutation } from 'react-query';
import { SuccessAuthResponse } from '../../types/sendSafely/BaseAuthResponse';
import { AuthenticateParams } from '../../services/SendSafelyService';
import * as SendSafelyService from '../../services/SendSafelyService';
import { useContext } from 'react';
import { AuthenticationContext } from '../Authentication';

export interface UseAuthenticateResult {
	readonly mutationProps: {
		readonly isLoading: boolean;
		readonly error: Error | null;
	};
	readonly doAuthenticate: (params: AuthenticateParams) => void;
}

export const useDoAuthenticate = (): UseAuthenticateResult => {
	const authentication = useContext(AuthenticationContext);
	const { isLoading, error, mutate } = useMutation<
		SuccessAuthResponse,
		Error,
		AuthenticateParams
	>(SendSafelyService.authenticate);

	const doAuthenticate = (params: AuthenticateParams) =>
		mutate(params, {
			onSuccess: (data) =>
				authentication.updateAuthentication(
					data.email,
					data.apiKey,
					data.apiSecret
				),
			onError: (error) => console.error(error)
		});

	return {
		mutationProps: {
			isLoading,
			error
		},
		doAuthenticate
	};
};
