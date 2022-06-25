import { CircularProgress, Typography } from '@mui/material';
import { useGetPackages } from './useGetPackages';

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
			{data ? <p>Data: {JSON.stringify(data, null, 2)}</p> : null}
		</div>
	);
};
