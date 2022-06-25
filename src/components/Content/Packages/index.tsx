import { useContext } from 'react';
import { AuthenticationContext } from '../../Authentication';
import { useQuery } from 'react-query';
import * as SendSafelyService from '../../../services/SendSafelyService';
import { SendSafelyPackageResponse } from '../../../types/sendSafely';
import { CircularProgress, Typography } from '@mui/material';

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
			{isLoading && <CircularProgress />}
			{!isLoading && error && (
				<Typography style={{ color: 'red' }} variant="h4">
					{error.message}
				</Typography>
			)}
			{data ? <p>Data: {JSON.stringify(data, null, 2)}</p> : null}
		</>
	);
};
