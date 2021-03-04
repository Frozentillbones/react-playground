import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type WindowPortalProps = PropsWithChildren<{
	params: [string, string, string];
}>

const WindowPortal = (props: WindowPortalProps) => {
	const { children, params } = props;
	const [windowPortal, setWindowPortal] = useState<Window | null>(null);
	const container = useRef(document.createElement('div'));
	
	useEffect(() => {
		setWindowPortal(window.open(...params));
	}, [params]);
	
	useEffect(() => {
		if (windowPortal) {
			windowPortal.document.body.appendChild(container.current);
			return () => {
				windowPortal.close();
			};
		}
	}, [windowPortal]);
	
	return windowPortal ? createPortal(children, container.current) : null;
};

export default WindowPortal;
