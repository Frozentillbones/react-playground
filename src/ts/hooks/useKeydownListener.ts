import { useEffect } from 'react';

const useKeyboardListener = (
	listener: (e: KeyboardEvent) => void, 
	eventType: 'keydown' | 'keyup' = 'keydown'
) => {
	useEffect(() => {
		document.addEventListener(eventType, listener);
		return () => {
			document.removeEventListener(eventType, listener);
		};
	}, [listener, eventType]);
};

export default useKeyboardListener;
