import { Authentication } from '../components/Authentication';
import {
	SendSafelyReceivedPackage,
	SendSafelyReceivedPackageResponse,
	SendSafelySentPackageResponse
} from '../types/sendSafely';

export {};

const PAGE_SIZE = 10;

export const getReceivedPackages = (
	authentication: Authentication,
	pageNumber: number = 0
): Promise<SendSafelyReceivedPackageResponse> => {
	// TODO finish this
};

export const getSentPackages = (
	authentication: Authentication,
	pageNumber: number = 0
): Promise<SendSafelySentPackageResponse> => {
	// TODO finish this
};
