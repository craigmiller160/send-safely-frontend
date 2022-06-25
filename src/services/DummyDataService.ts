import { Authentication } from '../components/Authentication';
import {
	SendSafelyReceivedPackage,
	SendSafelyReceivedPackageResponse,
	SendSafelyResponseType,
	SendSafelySentPackage,
	SendSafelySentPackageResponse
} from '../types/sendSafely';

export {};

const PAGE_SIZE = 10;

export const getReceivedPackages = (
	authentication: Authentication,
	pageNumber: number = 0
): Promise<SendSafelyReceivedPackageResponse> => {
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
	authentication: Authentication,
	pageNumber: number = 0
): Promise<SendSafelySentPackageResponse> => {
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
