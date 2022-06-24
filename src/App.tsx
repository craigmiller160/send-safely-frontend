import React from 'react';
import { CssBaseline } from '@mui/material';
import { Navbar } from './components/Navbar';

function App() {
	return (
		<>
			<CssBaseline />
			<Navbar />
			<div className="App">
				<h1>Hello World</h1>
			</div>
		</>
	);
}

export default App;
