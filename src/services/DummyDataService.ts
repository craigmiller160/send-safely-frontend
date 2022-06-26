import {
	SendSafelyReceivedPackage,
	SendSafelyReceivedPackageResponse,
	SendSafelyResponseType,
	SendSafelySentPackage,
	SendSafelySentPackageResponse
} from '../types/sendSafely';
import { QueryFunctionContext } from 'react-query';
import { GetPackagesQueryKey } from './keys';

export {};

const PAGE_SIZE = 10;

export const getReceivedPackages = (
	ctx: QueryFunctionContext<GetPackagesQueryKey>
): Promise<SendSafelyReceivedPackageResponse> => {
	const [, { pageNumber }] = ctx.queryKey;
	const packages = Array.from(new Array(PAGE_SIZE).keys()).map(
		(index): SendSafelyReceivedPackage => ({
			packageId: `Package-Id-${pageNumber}${index}`,
			packageUserName: `Sender-${pageNumber}${index}`,
			packageUpdateTimestamp: `Timestamp-${pageNumber}${index}`,
			filenames: [`Filename-${pageNumber}${index}`]
		})
	);
	return Promise.resolve({
		response: SendSafelyResponseType.SUCCESS,
		packages
	});
};

export const getSentPackages = (
	ctx: QueryFunctionContext<GetPackagesQueryKey>
): Promise<SendSafelySentPackageResponse> => {
	const [, { pageNumber }] = ctx.queryKey;
	const packages = Array.from(new Array(PAGE_SIZE).keys()).map(
		(index): SendSafelySentPackage => ({
			packageId: `Package-Id-${pageNumber}${index}`,
			packageUserName: `Sender-${pageNumber}${index}`,
			packageUpdateTimestamp: `Timestamp-${pageNumber}${index}`,
			filenames: [`Filename-${pageNumber}${index}`],
			recipients: [`Recipient-${pageNumber}${index}`]
		})
	);
	return Promise.resolve({
		response: SendSafelyResponseType.SUCCESS,
		packages
	});
};
