import {
	Paper,
	Table as MuiTable,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material';
import { startCase } from 'lodash-es';

interface Props<T extends object> {
	readonly data: T;
}

const getColumnsFromData = <T extends object>(data: T): ReadonlyArray<string> =>
	Object.keys(data).map(startCase);

export const Table = <T extends object>(props: Props<T>) => {
	const columns = getColumnsFromData(props.data);
	return (
		<TableContainer component={Paper}>
			<MuiTable sx={{ minWidth: 650 }}>
				<TableHead>
					<TableRow>
						{columns.map((col) => (
							<TableCell key={col}>{col}</TableCell>
						))}
					</TableRow>
				</TableHead>
			</MuiTable>
		</TableContainer>
	);
};
