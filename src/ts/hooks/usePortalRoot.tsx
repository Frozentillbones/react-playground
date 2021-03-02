import { MutableRefObject, useEffect, useRef } from 'react';

const createPortalRoot = (id: string) => {
	const portalRoot = document.createElement('div');
	portalRoot.setAttribute('id', id);
	return portalRoot;
};

const defaultPortalRootId = 'portal-root';

const usePortalRoot = (portalRootId?: string) => {
	const portalTriggerRef = useRef<any>();
	const portalRootRef = useRef(createPortalRoot(portalRootId || defaultPortalRootId)) as MutableRefObject<HTMLElement>;

	useEffect(() => {
		const node = portalRootRef.current;
		document.body.appendChild(node);
		return () => {
			node.remove();
		};
	}, []);
	
	return {
		portalRoot: portalRootRef.current,
		portalTrigger: portalTriggerRef.current,
	};
};

export default usePortalRoot;
