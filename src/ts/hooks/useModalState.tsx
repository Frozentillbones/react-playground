import { useState } from 'react';

type UseModalHookOptions = {
	defaultOpen: boolean;
	closeOnOutsideClick?: boolean;
	closeOnEsc?: boolean;
}

const defaultOptions: UseModalHookOptions = {
	defaultOpen: false,
	closeOnOutsideClick: false,
	closeOnEsc: false,
};

const useModalState = (options?: UseModalHookOptions) => {
	const cfg = options || defaultOptions;
	const {
		defaultOpen,
		closeOnOutsideClick,
		closeOnEsc,
	} = cfg;

	const [open, setOpen] = useState(defaultOpen);

	const closeModal = () => {
		setOpen(false);
	};

	const openModal = () => {
		setOpen(true);
	};

	const onOutsideClick = () => {
		closeOnOutsideClick && closeModal();
	};

	const onEsc = (e: KeyboardEvent) => {
		e.key === 'Escape' && closeOnEsc && closeModal();
	};

	return {
		isOpen: open,
		openModal,
		closeModal,
		onOutsideClick,
		onEsc
	};

};

export default useModalState;
