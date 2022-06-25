import { useQuery } from 'react-query';
import * as SendSafelyService from '../../../services/SendSafelyService';
import { useContext, useMemo } from 'react';
import { Authentication, AuthenticationContext } from '../../Authentication';
import { PackageType } from './PackageType';
import { match } from 'ts-pattern';
import {
	SendSafelyBasePackage,
	SendSafelyBasePackageResponse,
	SendSafelySentPackage
} from '../../../types/sendSafely';

interface GetPackagesResult {
	readonly data: ReadonlyArray<ReadonlyArray<string>> | undefined;
	readonly error: Error | null;
	readonly isLoading: boolean;
}

type GetPackagesFn = (
	auth: Authentication
) => Promise<SendSafelyBasePackageResponse<any>>;

const getGetPackagesFn = (packageType: PackageType): GetPackagesFn =>
	match(packageType)
		.with(PackageType.SENT, () => SendSafelyService.getSentPackages)
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
	const { data, error, isLoading } = useQuery<
		SendSafelyBasePackageResponse<any>,
		Error
	>(getQueryKey(packageType), () =>
		getGetPackagesFn(packageType)(authentication)
	);
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
