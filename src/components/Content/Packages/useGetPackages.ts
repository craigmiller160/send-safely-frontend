import { useQuery } from 'react-query';
import { SendSafelyPackageResponse } from '../../../types/sendSafely';
import * as SendSafelyService from '../../../services/SendSafelyService';
import { useContext, useMemo } from 'react';
import { AuthenticationContext } from '../../Authentication';

interface GetPackagesResult {
	readonly data: ReadonlyArray<ReadonlyArray<string>> | undefined;
	readonly error: Error | null;
	readonly isLoading: boolean;
}

export const useGetPackages = (): GetPackagesResult => {
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

	const formattedData = useMemo(
		() =>
			data?.packages?.map(
				(pkg): ReadonlyArray<string> => [
					pkg.packageId,
					pkg.packageUserName,
					pkg.packageUpdateTimestamp,
					pkg.recipients.join(','),
					pkg.filenames.join(',')
				]
			),
		[data]
	);
	return {
		data: formattedData,
		error,
		isLoading
	};
};
