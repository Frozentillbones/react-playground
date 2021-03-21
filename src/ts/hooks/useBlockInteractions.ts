import { useLayoutEffect } from 'react';

const useBlockInteractions = (shouldBlock?: boolean, besides?: HTMLElement,) => {
	useLayoutEffect(() => {
		if (shouldBlock) {
			const prevBodyStyle = document.body.getAttribute('style');
			document.body
				.setAttribute(
					'style',
					prevBodyStyle 
						? `${prevBodyStyle} overflow: hidden;`
						: 'overflow: hidden;'
				);
			const bodyChildren = [...document.body.children];
			const restChildren = bodyChildren
				.filter(child => child.tagName !== 'SCRIPT' && child !== besides);
			let prevStyles: Array<string | null> = [];
			restChildren.forEach(el => {
				const prevElStyle = el.getAttribute('style');
				prevStyles.push(prevElStyle);
				el.setAttribute('style', prevElStyle 
					? `${prevElStyle}; pointer-events: none;`
					: 'pointer-events: none;');
			});
			return () => {
				document.body.setAttribute('style', prevBodyStyle || '');
				restChildren.forEach((el, i) => {
					const prevStyle = prevStyles[i];
					el.setAttribute('style', !prevStyle ? '' : prevStyle);
				});
			};
		}
	}, [besides, shouldBlock]);
};

export default useBlockInteractions;
