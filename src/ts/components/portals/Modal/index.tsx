import React, { FC, HTMLAttributes, PropsWithChildren, useRef } from 'react';
import useBlockInteractions from 'hooks/useBlockInteractions';
import useKeyboardListener from 'hooks/useKeydownListener';
import useOutsideClickListener from 'hooks/useOutsideClickListener';
import bem from 'components/bem';
import Portal from '../Portal';

interface ModalProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>>{
	root: HTMLDivElement;
	onOutsideClick?: (e: MouseEvent) => void;
	onEsc?: (e: KeyboardEvent) => void;
	blockOuterActions?: boolean 
}

const Modal: FC<ModalProps> = ({
	root,
	children,
	onOutsideClick,
	onEsc,
	blockOuterActions,
	...restProps
}) => {
	const ref = useRef<HTMLDivElement>(null);

	useOutsideClickListener(ref, (e: MouseEvent) => onOutsideClick && onOutsideClick(e));
	useKeyboardListener((e: KeyboardEvent) => onEsc && onEsc(e));
	useBlockInteractions(Boolean(blockOuterActions), root);

	return (
		<Portal root={root}>
			<bem.div ref={ref} {...restProps}>
				{children}
			</bem.div>
		</Portal>
	);
};

export default Modal;
