import { useIsAuthenticated } from '../Authentication';
import { Packages } from './Packages';
import { Login } from './Login';

export const Content = () => {
	const isAuthenticated = useIsAuthenticated();
	if (isAuthenticated) {
		return <Packages />;
	}

	return <Login />;
};
