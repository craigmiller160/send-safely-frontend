import React from 'react';
import { CssBaseline } from '@mui/material';
import { Navbar } from './components/Navbar';
import { AuthenticationProvider } from './components/Authentication';
import { Login } from './components/Login';

function App() {
	return (
		<AuthenticationProvider>
			<CssBaseline />
			<Navbar />
			<div className="App">
				<Login />
			</div>
		</AuthenticationProvider>
	);
}

export default App;
