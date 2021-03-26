import { useCallback, useState } from 'react';

const useSetState = <T extends object>(
	defaultState: T = {} as T,
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void] => {
	const [state, set] = useState<T>(defaultState);
	const setState = useCallback(
		patch => {
			set(prevState => ({
				...prevState,
				...(patch instanceof Function ? patch(prevState) : patch),
			}));
		},
		[set],
	);

	return [state, setState];
};

export default useSetState;
