import React from 'react';
import { CssBaseline } from '@mui/material';
import { Navbar } from './components/Navbar';
import { AuthenticationProvider } from './components/Authentication';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Content } from './components/Content';
import { UseDummyDataProvider } from './components/DummyData';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthenticationProvider>
				<UseDummyDataProvider>
					<CssBaseline />
					<Navbar />
					<Content />
				</UseDummyDataProvider>
			</AuthenticationProvider>
		</QueryClientProvider>
	);
}

export default App;
