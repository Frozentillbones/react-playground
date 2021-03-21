import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = PropsWithChildren<{
	root: HTMLElement;
}>

const Portal = (props: PortalProps) => {
	const { root, children } = props;
	return createPortal(children, root);
};

export default Portal;
