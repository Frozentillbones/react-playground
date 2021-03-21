import React, { 
	HTMLAttributes,
	PropsWithChildren,
	useCallback,
	useMemo,
	useState
} from 'react';
import Modal from 'components/portals/Modal';

type UseModalHookOptions = {
	root: HTMLDivElement;
	defaultOpen?: boolean;
	closeOnOutsideClick?: boolean;
	closeOnEsc?: boolean;
	blockOuterActions?: boolean;
	outsideException?: string;
}


const useModal = ({
	root,
	defaultOpen = false,
	closeOnEsc = false,
	closeOnOutsideClick = false,
	blockOuterActions = false,
	outsideException
}: UseModalHookOptions) => {

	const [open, setOpen] = useState<boolean>(defaultOpen);

	const closeModal = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const openModal = useCallback(() => {
		setOpen(true);
	}, [setOpen]);

	const onOutsideClick = useCallback((e: MouseEvent) => {
		const clickedFromException = outsideException 
			? !!(e.target as HTMLElement).closest(outsideException)
			: false;
		closeOnOutsideClick && !clickedFromException && closeModal();
	}, [closeOnOutsideClick, closeModal, outsideException]);

	const onEsc = useCallback((e: KeyboardEvent) => {
		e.key === 'Escape' && closeOnEsc && closeModal();
	}, [closeModal, closeOnEsc]);

	const modalProps = useMemo(() => ({
		root,
		onEsc,
		onOutsideClick,
		blockOuterActions,
	}), [root, onEsc, onOutsideClick, blockOuterActions]);

	const TModal = useCallback(
		({children, ...props}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
			const allProps = { ...modalProps, ...props };
			return <Modal {...allProps}>{children}</Modal>;
		}, [modalProps]
	);
	
	return {
		isOpen: open,
		openModal,
		closeModal,
		Modal: TModal
	};

};

export default useModal;
