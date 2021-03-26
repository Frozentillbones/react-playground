import { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = PropsWithChildren<{
	root: HTMLElement;
}>

const Portal: FC<PortalProps> = ({ root, children }) => {
	return createPortal(children, root);
};

export default Portal;
