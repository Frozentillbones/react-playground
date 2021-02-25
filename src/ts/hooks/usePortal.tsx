import React, { useEffect, useRef } from 'react';

type UsePortalHookOptions = {
	portalRootId: string
}

const createPortalRoot = (id: string) => {
	const portalRoot = document.createElement('div');
	portalRoot.setAttribute('id', id);
	return portalRoot;
};

const usePortal = ({portalRootId = 'portal-root'}: UsePortalHookOptions) => {
	const portalTriggerRef = useRef(null);
	const portalRootRef = useRef(null);

	useEffect(() => {
		const existingPortalRoot = document.querySelector(`#${portalRootId}`);
		const portalRoot = existingPortalRoot || createPortalRoot(portalRootId);
		if (!existingPortalRoot) {
			document.body.appendChild(portalRoot);
		}
	}, [portalRootId]);
};

export default usePortal;
