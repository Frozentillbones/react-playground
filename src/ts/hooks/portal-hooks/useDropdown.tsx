import React, {
	HTMLAttributes,
	PropsWithChildren,
	useCallback,
	useMemo,
	useState
} from 'react';
import useDimensions from 'hooks/useDimensions';
import Dropdown, { DropdownPosition } from 'components/portals/Dropdown';

interface TDropdownProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
	position: DropdownPosition;
}

function useDropdown(root: HTMLDivElement) {
	const [open, setOpen] = useState(false);

	const closeDropdown = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const toggleDropdown = useCallback(() => {
		setOpen(open => !open);
	}, [setOpen]);

	const [trigger, triggerDimensions] = useDimensions<HTMLButtonElement>();

	const dropdownProps = useMemo(() => ({
		root,
		trigger,
		triggerDimensions,
		close: closeDropdown,
	}), [triggerDimensions, trigger, closeDropdown, root]);

	const TDropdown = useCallback(
		({children, position, ...props}: TDropdownProps) => {
		const allProps = {...dropdownProps, ...props, position };
		return <Dropdown {...allProps}>{children}</Dropdown>;
	}, [dropdownProps]);

	return {
		isOpen: open,
		toggleDropdown,
		closeDropdown,
		trigger,
		Dropdown: TDropdown
	};

};

export default useDropdown;
