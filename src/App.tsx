import React from 'react';
import { CssBaseline } from '@mui/material';
import { Navbar } from './components/Navbar';
import { AuthenticationProvider } from './components/Authentication';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Content } from './components/Content';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthenticationProvider>
				<CssBaseline />
				<Navbar />
				<Content />
			</AuthenticationProvider>
		</QueryClientProvider>
	);
}

export default App;
