import { PhormState } from 'components/Phorm';
import { useMemo } from 'react';

export default (state: PhormState, name: string) => useMemo(
	() => state[name],
	[state, name]
);
