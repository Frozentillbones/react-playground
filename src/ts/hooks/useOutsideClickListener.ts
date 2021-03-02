import { MutableRefObject, useCallback, useEffect } from 'react';

const useOutsideClickListener = (
	ref: MutableRefObject<HTMLElement | null>,
	listener: (e: MouseEvent) => void,
	eventType: 'mousedown' | 'mouseup' = 'mousedown',
) => {
	
	const onOutsideClick = useCallback((e: MouseEvent) => {
		if (!ref.current?.contains(e.target as Element)) {
			listener(e);
		}
	}, [ref, listener]);

	useEffect(() => {
		document.addEventListener(eventType, onOutsideClick);

		return () => {
			document.removeEventListener(eventType, onOutsideClick);
		};
	}, [listener, eventType, onOutsideClick]);
};

export default useOutsideClickListener;
