import {
	AppBar,
	Box,
	FormControlLabel,
	Switch,
	Toolbar,
	Typography
} from '@mui/material';
import { useIsAuthenticated } from '../Authentication';
import { DummyDataContext } from '../DummyData';
import { ChangeEvent, useContext } from 'react';

export const Navbar = () => {
	const isAuthenticated = useIsAuthenticated();
	const dummyData = useContext(DummyDataContext);
	const setDummyDataEnabled = (event: ChangeEvent<HTMLInputElement>) =>
		dummyData.setDummyDataEnabled(event.target.checked);
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h5"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						Send Safely Frontend Assessment
					</Typography>
					{isAuthenticated && (
						<FormControlLabel
							control={
								<Switch
									color="secondary"
									value={dummyData.isDummyDataEnabled}
									onChange={setDummyDataEnabled}
								/>
							}
							label="Dummy Data"
						/>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};
