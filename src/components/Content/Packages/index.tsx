import { CircularProgress, Typography } from '@mui/material';
import { useGetPackages } from './useGetPackages';
import { Table } from '../../ui/Table';
import './Packages.scss';

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
			{!isLoading && data && <Table data={data} />}
		</div>
	);
};
