import {
	AppBar,
	Box,
	FormControlLabel,
	Switch,
	Toolbar,
	Typography
} from '@mui/material';
import { useIsAuthenticated } from '../Authentication';

export const Navbar = () => {
	const isAuthenticated = useIsAuthenticated();
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
							control={<Switch color="secondary" />}
							label="Dummy Data"
						/>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};
