import {
	Paper,
	Table as MuiTable,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material';
import { ReactNode, UIEvent } from 'react';

interface Props {
	readonly columns: ReadonlyArray<string>;
	readonly data: ReadonlyArray<ReadonlyArray<string | ReactNode>>;
	readonly rowKeyDataIndex: number;
	readonly nextPage: () => void;
}

const createScrollListener =
	(callback: () => void) => (event: UIEvent<HTMLDivElement>) => {
		// This means we're at the bottom of the viewport
		if (
			event.currentTarget.scrollTop + event.currentTarget.clientHeight ===
			event.currentTarget.scrollHeight
		) {
			callback();
		}
	};

export const Table = (props: Props) => {
	const scrollListener = createScrollListener(props.nextPage);

	return (
		<TableContainer
			component={Paper}
			sx={{ maxHeight: 300 }}
			onScroll={scrollListener}
		>
			<MuiTable sx={{ minWidth: 650 }} stickyHeader>
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
							{record.map((value, index) => {
								if (typeof value === 'string') {
									return (
										<TableCell key={`${value}${index}`}>
											{value}
										</TableCell>
									);
								}
								return value;
							})}
						</TableRow>
					))}
				</TableBody>
			</MuiTable>
		</TableContainer>
	);
};
