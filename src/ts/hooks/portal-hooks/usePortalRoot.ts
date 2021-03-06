import { useEffect, useRef } from 'react';

const createPortalRoot = (id: string) => {
	const portalRoot = document.createElement('div');
	portalRoot.setAttribute('id', id);
	return portalRoot;
};

const defaultPortalRootId = 'portal-root';

const usePortalRoot = (portalRootId?: string) => {
	const portalRootRef = useRef<HTMLDivElement>(
		createPortalRoot(portalRootId || defaultPortalRootId)
	);

	useEffect(() => {
		const node = portalRootRef.current;
		document.body.appendChild(node);
		return () => {
			node.remove();
		};
	}, []);
	
	return portalRootRef.current;
};

export default usePortalRoot;
