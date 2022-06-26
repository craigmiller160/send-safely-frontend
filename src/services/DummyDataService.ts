import {
	SendSafelyReceivedPackage,
	SendSafelyReceivedPackageResponse,
	SendSafelyResponseType,
	SendSafelySentPackage,
	SendSafelySentPackageResponse
} from '../types/sendSafely';
import { QueryFunctionContext } from 'react-query';
import { GetPackagesQueryKey, PaginatedResponse } from './types';

export {};

const PAGE_SIZE = 10;

export const getReceivedPackages = (
	ctx: QueryFunctionContext<GetPackagesQueryKey, number>
): Promise<PaginatedResponse<SendSafelyReceivedPackageResponse>> => {
	const { pageParam: pageNumber = 0 } = ctx;
	const packages = Array.from(new Array(PAGE_SIZE).keys()).map(
		(index): SendSafelyReceivedPackage => ({
			packageId: `Package-Id-${pageNumber}${index}`,
			packageUserName: `Sender-${pageNumber}${index}`,
			packageUpdateTimestamp: `Timestamp-${pageNumber}${index}`,
			filenames: [`Filename-${pageNumber}${index}`]
		})
	);
	return Promise.resolve({
		data: {
			response: SendSafelyResponseType.SUCCESS,
			packages
		},
		nextPage: pageNumber + 1
	});
};

export const getSentPackages = (
	ctx: QueryFunctionContext<GetPackagesQueryKey>
): Promise<PaginatedResponse<SendSafelySentPackageResponse>> => {
	const { pageParam: pageNumber = 0 } = ctx;
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
		data: {
			response: SendSafelyResponseType.SUCCESS,
			packages
		},
		nextPage: pageNumber + 1
	});
};
