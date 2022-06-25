import { useContext } from 'react';
import { AuthenticationContext } from '../../Authentication';
import { useQuery } from 'react-query';
import * as SendSafelyService from '../../../services/SendSafelyService';
import { SendSafelyPackageResponse } from '../../../types/sendSafely';

export const Packages = () => {
	const authentication = useContext(AuthenticationContext);
	const { data, error, isLoading } = useQuery<
		SendSafelyPackageResponse,
		Error
	>('sentPackages', () => SendSafelyService.getSentPackages(authentication), {
		// TODO consider if I really want to disable these
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false
	});
	return (
		<>
			{isLoading ? 'Loading...' : ''}
			{error ? <p>Error: {error.message}</p> : null}
			{data ? <p>Data: {JSON.stringify(data, null, 2)}</p> : null}
		</>
	);
};
