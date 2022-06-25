import { CircularProgress, Typography } from '@mui/material';
import { useGetPackages } from './useGetPackages';
import { Table } from '../../ui/Table';
import { PackageType } from './PackageType';
import { match } from 'ts-pattern';
import { useContext, useEffect } from 'react';
import { DummyDataContext } from '../../DummyData';
import { useImmer } from 'use-immer';

const BASE_COLUMNS = ['Package ID', 'Sender', 'Timestamp', 'Filenames'];
const RECEIVED_COLUMNS = [...BASE_COLUMNS];
const SENT_COLUMNS = [...BASE_COLUMNS, 'Recipients', 'Actions'];

interface Props {
	readonly packageType: PackageType;
}

const getTableTitle = (packageType: PackageType): string =>
	match(packageType)
		.with(PackageType.SENT, () => 'Sent Packages')
		.otherwise(() => 'Received Packages');

const getColumns = (packageType: PackageType): ReadonlyArray<string> =>
	match(packageType)
		.with(PackageType.SENT, () => SENT_COLUMNS)
		.otherwise(() => RECEIVED_COLUMNS);

interface State {
	readonly page: number;
}

export const PackagesTable = (props: Props) => {
	const [state, setState] = useImmer<State>({
		page: 0
	});
	const isDummyDataEnabled = useContext(DummyDataContext).isDummyDataEnabled;
	const { data, error, isLoading } = useGetPackages(
		props.packageType,
		state.page
	);
	const title = getTableTitle(props.packageType);
	const columns = getColumns(props.packageType);

	useEffect(() => {
		// Reset to page 0 if the toggle is flipped
		setState({
			page: 0
		});
	}, [isDummyDataEnabled, setState]);

	const nextPage = () =>
		setState((draft) => {
			draft.page = draft.page + 1;
		});

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
				<Table
					columns={columns}
					data={data}
					rowKeyDataIndex={0}
					nextPage={nextPage}
				/>
			)}
		</div>
	);
};
