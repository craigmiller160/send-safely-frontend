import { createContext, PropsWithChildren, useState } from 'react';

export interface DummyDataValue {
	readonly isDummyDataEnabled: boolean;
	readonly setDummyDataEnabled: (value: boolean) => void;
}

const DummyDataContext = createContext<DummyDataValue>({
	isDummyDataEnabled: false,
	setDummyDataEnabled: () => {}
});

export const UseDummyDataProvider = (props: PropsWithChildren) => {
	const [state, setState] = useState(false);

	const value: DummyDataValue = {
		isDummyDataEnabled: state,
		setDummyDataEnabled: setState
	};

	return (
		<DummyDataContext.Provider value={value}>
			{props.children}
		</DummyDataContext.Provider>
	);
};
