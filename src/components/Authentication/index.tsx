import {
	createContext,
	Dispatch,
	PropsWithChildren,
	useContext,
	useEffect,
	useState
} from 'react';

const LS_AUTH_KEY = 'send_safely_auth';

export interface Authentication {
	readonly email?: string;
	readonly apiKey?: string;
	readonly apiSecret?: string;
}

export interface AuthenticationAndUpdater extends Authentication {
	readonly updateAuthentication: (
		email: string,
		apiKey: string,
		apiSecret: string
	) => void;
}

export const AuthenticationContext = createContext<AuthenticationAndUpdater>({
	updateAuthentication: () => {}
});

export const useIsAuthenticated = () => {
	const auth = useContext(AuthenticationContext);
	return !!auth.email && !!auth.apiKey && !!auth.apiSecret;
};

const createUpdateAuthentication =
	(setState: Dispatch<Authentication>) =>
	(email: string, apiKey: string, apiSecret: string) => {
		const auth: Authentication = {
			email,
			apiKey,
			apiSecret
		};
		if (process.env.REACT_APP_LOCAL_STORAGE === 'true') {
			localStorage.setItem(LS_AUTH_KEY, JSON.stringify(auth));
		}
		setState(auth);
	};

export const AuthenticationProvider = (props: PropsWithChildren) => {
	const [state, setState] = useState<Authentication>({});
	useEffect(() => {
		if (process.env.REACT_APP_LOCAL_STORAGE === 'true') {
			const auth = localStorage.getItem(LS_AUTH_KEY);
			if (auth) {
				setState(JSON.parse(auth) as Authentication);
			}
		}
	}, [setState]);

	const updateAuthentication = createUpdateAuthentication(setState);

	const value: AuthenticationAndUpdater = {
		...state,
		updateAuthentication
	};

	return (
		<AuthenticationContext.Provider value={value}>
			{props.children}
		</AuthenticationContext.Provider>
	);
};
