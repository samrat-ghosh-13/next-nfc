import { createContext, useState, useContext } from "react";

const defaultValues = {
	scan: null,
	write: null,
	setActions: () => {},
};

const Context = createContext(defaultValues);

export function AuthProvider({ children }) {
	const [actions, setActions] = useState(null);

	const value = {
		actions,
		setActions,
	};
	
	return (
		<>
			<Context.Provider value={value}>{children}</Context.Provider>
		</>
	);
}

export function useActionContext() {
	return useContext(Context);
}
