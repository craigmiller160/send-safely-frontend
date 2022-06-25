import { CircularProgress, Typography } from '@mui/material';
import { useGetPackages } from './useGetPackages';
import { Table } from '../../ui/Table';
import { PackageType } from './PackageType';
import { match } from 'ts-pattern';

const COLUMNS = [
	'Package ID',
	'Sender',
	'Timestamp',
	'Recipients',
	'Filenames'
];

interface Props {
	readonly packageType: PackageType;
}

const getTableTitle = (packageType: PackageType): string =>
	match(packageType)
		.with(PackageType.SENT, () => 'Sent Packages')
		.otherwise(() => 'Received Packages');

export const PackagesTable = (props: Props) => {
	const { data, error, isLoading } = useGetPackages(props.packageType);
	const title = getTableTitle(props.packageType);
	return (
		<div className="PackagesTable">
			<Typography variant="h6">{title}</Typography>
			{isLoading && <CircularProgress />}
			{!isLoading && error && (
				<Typography style={{ color: 'red' }} variant="h4">
					{error.message}
				</Typography>
			)}
			{!isLoading && data && (
				<Table columns={COLUMNS} data={data} rowKeyDataIndex={0} />
			)}
		</div>
	);
};
