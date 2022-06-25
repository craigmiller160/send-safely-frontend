import { AppBar, Box, Switch, Toolbar, Typography } from '@mui/material';

export const Navbar = () => (
	<Box sx={{ flexGrow: 1 }}>
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
					Send Safely Frontend Assessment
				</Typography>
				<Switch />
			</Toolbar>
		</AppBar>
	</Box>
);
