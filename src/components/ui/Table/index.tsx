import {
	Paper,
	Table as MuiTable,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material';

interface Props<T extends object> {
	readonly columns: ReadonlyArray<string>;
	readonly data: ReadonlyArray<T>;
}

export const Table = <T extends object>(props: Props<T>) => {
	return (
		<TableContainer component={Paper}>
			<MuiTable sx={{ minWidth: 650 }}>
				<TableHead>
					<TableRow>
						{props.columns.map((col) => (
							<TableCell key={col}>{col}</TableCell>
						))}
					</TableRow>
				</TableHead>
			</MuiTable>
		</TableContainer>
	);
};
