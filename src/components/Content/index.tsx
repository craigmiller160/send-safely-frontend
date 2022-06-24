import { useIsAuthenticated } from '../Authentication';
import { Messages } from './Messages';
import { Login } from './Login';

export const Content = () => {
	const isAuthenticated = useIsAuthenticated();
	if (isAuthenticated) {
		return <Messages />;
	}

	return <Login />;
};
