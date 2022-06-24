import { useContext } from 'react';
import { AuthenticationContext } from '../../Authentication';
import { useQuery } from 'react-query';
import * as SendSafelyService from '../../../services/SendSafelyService';
import { PackagesResponse } from '../../../types/sendSafely/PackagesResponse';

export const Packages = () => {
	const authentication = useContext(AuthenticationContext);
	const { data, error, isLoading } = useQuery<PackagesResponse, Error>(
		'sentPackages',
		() => SendSafelyService.getSentPackages(authentication)
	);
	return (
		<>
			{isLoading ? 'Loading...' : ''}
			{error ? <p>Error: {error.message}</p> : null}
			{data ? <p>Data: {JSON.stringify(data, null, 2)}</p> : null}
		</>
	);
};
