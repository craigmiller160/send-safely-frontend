import { createContext, PropsWithChildren, useContext } from 'react';
import { Updater, useImmer } from 'use-immer';

export interface Authentication {
	readonly apiKey?: string;
	readonly apiSecret?: string;
}

export interface AuthenticationAndUpdater extends Authentication {
	readonly updateAuthentication: (apiKey: string, apiSecret: string) => void;
}

export const AuthenticationContext = createContext<AuthenticationAndUpdater>({
	updateAuthentication: () => {}
});

export const useIsAuthenticated = () => {
	const auth = useContext(AuthenticationContext);
	return !!auth.apiKey && !!auth.apiSecret;
};

const createUpdateAuthentication =
	(setState: Updater<Authentication>) =>
	(apiKey: string, apiSecret: string) =>
		setState((draft) => {
			draft.apiKey = apiKey;
			draft.apiSecret = apiSecret;
		});

export const AuthenticationProvider = (props: PropsWithChildren) => {
	const [state, setState] = useImmer<Authentication>({});

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
