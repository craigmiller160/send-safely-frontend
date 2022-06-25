import { useQuery, useQueryClient } from 'react-query';
import * as SendSafelyService from '../../../services/SendSafelyService';
import * as DummyDataService from '../../../services/DummyDataService';
import { useContext, useEffect, useMemo } from 'react';
import { Authentication, AuthenticationContext } from '../../Authentication';
import { PackageType } from './PackageType';
import { match } from 'ts-pattern';
import {
	SendSafelyBasePackage,
	SendSafelyBasePackageResponse,
	SendSafelySentPackage
} from '../../../types/sendSafely';
import { DummyDataContext } from '../../DummyData';

interface GetPackagesResult {
	readonly data: ReadonlyArray<ReadonlyArray<string>> | undefined;
	readonly error: Error | null;
	readonly isLoading: boolean;
}

type GetPackagesFn = (
	auth: Authentication
) => Promise<SendSafelyBasePackageResponse<any>>;

const getGetPackagesFn = (
	packageType: PackageType,
	isDummyDataEnabled: boolean
): GetPackagesFn =>
	match({ packageType, isDummyDataEnabled })
		.with(
			{ packageType: PackageType.SENT, isDummyDataEnabled: true },
			() => DummyDataService.getSentPackages
		)
		.with(
			{ packageType: PackageType.RECEIVED, isDummyDataEnabled: true },
			() => DummyDataService.getReceivedPackages
		)
		.with(
			{ packageType: PackageType.SENT },
			() => SendSafelyService.getSentPackages
		)
		.otherwise(() => SendSafelyService.getReceivedPackages);

const getQueryKey = (packageType: PackageType): string =>
	match(packageType)
		.with(PackageType.SENT, () => 'sentPackages')
		.otherwise(() => 'receivedPackages');

const createMapPackage =
	(packageType: PackageType) =>
	(pkg: SendSafelyBasePackage): ReadonlyArray<string> => {
		const baseArray = [
			pkg.packageId,
			pkg.packageUserName,
			pkg.packageUpdateTimestamp,
			pkg.filenames.join(',')
		];
		if (packageType === PackageType.SENT) {
			return [
				...baseArray,
				(pkg as SendSafelySentPackage).recipients.join(',')
			];
		}
		return baseArray;
	};

export const useGetPackages = (packageType: PackageType): GetPackagesResult => {
	const authentication = useContext(AuthenticationContext);
	const queryClient = useQueryClient();
	const isDummyDataEnabled = useContext(DummyDataContext).isDummyDataEnabled;
	const queryKey = getQueryKey(packageType);
	const { data, error, isLoading, refetch } = useQuery<
		SendSafelyBasePackageResponse<any>,
		Error
	>(queryKey, () =>
		getGetPackagesFn(packageType, isDummyDataEnabled)(authentication)
	);

	useEffect(() => {
		queryClient.invalidateQueries(queryKey).then(() => refetch());
	}, [isDummyDataEnabled, queryKey, queryClient, refetch]);

	const mapPackage = useMemo(
		() => createMapPackage(packageType),
		[packageType]
	);

	const formattedData = useMemo(
		() => data?.packages?.map(mapPackage),
		[data, mapPackage]
	);
	return {
		data: formattedData,
		error,
		isLoading
	};
};
