import {
	Paper,
	Table as MuiTable,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material';

interface Props {
	readonly columns: ReadonlyArray<string>;
	readonly data: ReadonlyArray<ReadonlyArray<string>>;
	readonly rowKeyDataIndex: number;
}

export const Table = (props: Props) => {
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
				<TableBody>
					{props.data.map((record) => (
						<TableRow key={`${record[props.rowKeyDataIndex]}`}>
							{record.map((value, index) => (
								<TableCell key={`${value}${index}`}>
									{value}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</MuiTable>
		</TableContainer>
	);
};
