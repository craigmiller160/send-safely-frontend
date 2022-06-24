import React from 'react';
import { CssBaseline } from '@mui/material';
import { Navbar } from './components/Navbar';
import { AuthenticationProvider } from './components/Authentication';
import { Login } from './components/Login';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthenticationProvider>
				<CssBaseline />
				<Navbar />
				<div className="App">
					<Login />
				</div>
			</AuthenticationProvider>
		</QueryClientProvider>
	);
}

export default App;
