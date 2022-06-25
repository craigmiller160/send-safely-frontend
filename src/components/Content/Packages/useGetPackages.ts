import { useQuery } from 'react-query';
import { SendSafelyPackageResponse } from '../../../types/sendSafely';
import * as SendSafelyService from '../../../services/SendSafelyService';
import { useContext, useMemo } from 'react';
import { Authentication, AuthenticationContext } from '../../Authentication';
import { PackageType } from './PackageType';
import { match } from 'ts-pattern';

interface GetPackagesResult {
	readonly data: ReadonlyArray<ReadonlyArray<string>> | undefined;
	readonly error: Error | null;
	readonly isLoading: boolean;
}

type GetPackagesFn = (
	auth: Authentication
) => Promise<SendSafelyPackageResponse>;

const getGetPackagesFn = (packageType: PackageType): GetPackagesFn =>
	match(packageType)
		.with(PackageType.SENT, () => SendSafelyService.getSentPackages)
		.otherwise(() => SendSafelyService.getReceivedPackages);

const getQueryKey = (packageType: PackageType): string =>
	match(packageType)
		.with(PackageType.SENT, () => 'sendPackages')
		.otherwise(() => 'receivedPackages');

export const useGetPackages = (packageType: PackageType): GetPackagesResult => {
	const authentication = useContext(AuthenticationContext);
	const { data, error, isLoading } = useQuery<
		SendSafelyPackageResponse,
		Error
	>(getQueryKey(packageType), () =>
		getGetPackagesFn(packageType)(authentication)
	);

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
