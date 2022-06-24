export interface Package {
	readonly packageId: string;
	readonly packageUpdateTimestamp: string;
	readonly recipients: ReadonlyArray<string>;
	readonly filenames: ReadonlyArray<string>;
}

export interface PackagesResponse {
	readonly packages: ReadonlyArray<Package>;
}
