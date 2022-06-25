export interface PackageTableRecord {
	readonly packageId: string;
	readonly sender: string;
	readonly timestamp: string;
	readonly recipients: string;
	readonly filenames: string;
}
