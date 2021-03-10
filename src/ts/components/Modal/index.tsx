import React, { HTMLAttributes, PropsWithChildren, PropsWithRef, useRef } from 'react';
import useBlockInteractions from '../../hooks/useBlockInteractions';
import useKeyboardListener from '../../hooks/useKeydownListener';
import useOutsideClickListener from '../../hooks/useOutsideClickListener';
import bem from '../bem';
import Portal from '../Portal';

interface ModalProps extends PropsWithRef<PropsWithChildren<HTMLAttributes<HTMLDivElement>>>{
	root: HTMLDivElement;
	onOutsideClick?: () => void;
	onEsc?: (e: KeyboardEvent) => void;
	blockOuterActions?: boolean 
}

const Modal = (props: ModalProps) => {
	const {
		root,
		children,
		onOutsideClick,
		onEsc,
		blockOuterActions,
		...restProps
	} = props;
	const ref = useRef<HTMLDivElement>(null);

	useOutsideClickListener(ref, () => onOutsideClick && onOutsideClick());
	useKeyboardListener((e: KeyboardEvent) => onEsc && onEsc(e));
	useBlockInteractions(root, Boolean(blockOuterActions));

	return (
		<Portal root={root}>
			<bem.div ref={ref} {...restProps}>
				{children}
			</bem.div>
		</Portal>
	);
};

export default Modal;
