export interface PackageTableRecord {
	readonly packageId: string;
	readonly sender: string;
	readonly timestamp: string;
	readonly recipients: ReadonlyArray<string>;
	readonly filenames: ReadonlyArray<string>;
}
