import { QueryFunction, useQuery, useQueryClient } from 'react-query';
import * as SendSafelyService from '../../../services/SendSafelyService';
import * as DummyDataService from '../../../services/DummyDataService';
import { ReactNode, useCallback, useContext, useEffect, useMemo } from 'react';
import { Authentication, AuthenticationContext } from '../../Authentication';
import { PackageType } from './PackageType';
import { match } from 'ts-pattern';
import {
	SendSafelyBasePackage,
	SendSafelyBasePackageResponse,
	SendSafelySentPackage
} from '../../../types/sendSafely';
import { DummyDataContext } from '../../DummyData';
import { Button } from '@mui/material';
import { GetPackagesQueryKey } from '../../../services/keys';

interface GetPackagesResult {
	readonly data: ReadonlyArray<ReadonlyArray<string | ReactNode>> | undefined;
	readonly error: Error | null;
	readonly isLoading: boolean;
}

type GetPackagesQueryFn = QueryFunction<
	SendSafelyBasePackageResponse<any>,
	GetPackagesQueryKey
>;

const getGetPackagesFn = (
	packageType: PackageType,
	isDummyDataEnabled: boolean
): GetPackagesQueryFn =>
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
	(
		packageType: PackageType,
		authentication: Authentication,
		isDummyDataEnabled: boolean,
		invalidateAndRefetch: () => void
	) =>
	(pkg: SendSafelyBasePackage): ReadonlyArray<string | ReactNode> => {
		const baseArray = [
			pkg.packageId,
			pkg.packageUserName,
			pkg.packageUpdateTimestamp,
			pkg.filenames.join(',')
		];

		if (packageType === PackageType.SENT) {
			const doDelete = () => {
				SendSafelyService.deletePackage(
					authentication,
					pkg.packageId
				).then(() => invalidateAndRefetch());
			};

			const DeleteButton = (
				<Button disabled={isDummyDataEnabled} onClick={doDelete}>
					Delete
				</Button>
			);
			return [
				...baseArray,
				(pkg as SendSafelySentPackage).recipients.join(','),
				DeleteButton
			];
		}
		return baseArray;
	};

export const useGetPackages = (
	packageType: PackageType,
	pageNumber: number // TODO ultimately gonna delete this
): GetPackagesResult => {
	const authentication = useContext(AuthenticationContext);
	const queryClient = useQueryClient();
	const isDummyDataEnabled = useContext(DummyDataContext).isDummyDataEnabled;
	const queryKey = getQueryKey(packageType);
	const { data, error, isLoading, refetch } = useQuery<
		SendSafelyBasePackageResponse<any>,
		Error,
		SendSafelyBasePackageResponse<any>,
		GetPackagesQueryKey
	>(
		[queryKey, { authentication, pageNumber }],
		getGetPackagesFn(packageType, isDummyDataEnabled),
		{
			keepPreviousData: true
		}
	);

	const invalidateAndRefetch = useCallback(
		() => queryClient.invalidateQueries(queryKey).then(() => refetch()),
		[queryClient, queryKey, refetch]
	);

	useEffect(() => {
		invalidateAndRefetch();
	}, [isDummyDataEnabled, invalidateAndRefetch]);

	const mapPackage = useMemo(
		() =>
			createMapPackage(
				packageType,
				authentication,
				isDummyDataEnabled,
				invalidateAndRefetch
			),
		[packageType, invalidateAndRefetch, authentication, isDummyDataEnabled]
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
