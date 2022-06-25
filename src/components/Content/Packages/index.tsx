import { CircularProgress, Typography } from '@mui/material';
import { useGetPackages } from './useGetPackages';
import { Table } from '../../ui/Table';
import './Packages.scss';

const COLUMNS = [
	'Package ID',
	'Sender',
	'Timestamp',
	'Recipients',
	'Filenames'
];

export const Packages = () => {
	const { data, error, isLoading } = useGetPackages();
	return (
		<div className="PackagesPage">
			{isLoading && <CircularProgress />}
			{!isLoading && error && (
				<Typography style={{ color: 'red' }} variant="h4">
					{error.message}
				</Typography>
			)}
			{!isLoading && data && (
				<div className="TableWrapper">
					<Table columns={COLUMNS} data={data} />
				</div>
			)}
		</div>
	);
};
