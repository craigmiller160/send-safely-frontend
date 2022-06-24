import React from 'react';
import { CssBaseline } from '@mui/material';
import { Navbar } from './components/Navbar';
import { AuthenticationProvider } from './components/Authentication';

function App() {
	return (
		<AuthenticationProvider>
			<CssBaseline />
			<Navbar />
			<div className="App">
				<h1>Hello World</h1>
			</div>
		</AuthenticationProvider>
	);
}

export default App;
