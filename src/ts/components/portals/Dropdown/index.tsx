import React, {
	CSSProperties,
	HTMLAttributes,
	MutableRefObject,
	PropsWithChildren,
	RefObject,
	useMemo
} from 'react';
import useOutsideClickListener from 'hooks/useOutsideClickListener';
import bem from 'components/bem';
import Portal from '../Portal';
import useDimensions from 'hooks/useDimensions';
import findAsParent from 'utils/dom/findAsParent';

export type DropdownPosition = 'top' | 'bottom' | 'left' | 'right';

interface DropdownProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>>{
	root: HTMLDivElement;
	triggerDimensions: DOMRect | null;
	trigger: RefObject<HTMLButtonElement>;
	position: DropdownPosition;
	close: () => void;
}

const Dropdown = (props: DropdownProps) => {
	const {
		root,
		close,
		position = 'bottom',
		trigger,
		triggerDimensions,
		children,
		style,
		...restProps
	} = props;

	const [ref, selfDimensions] = useDimensions();

	useOutsideClickListener((ref as MutableRefObject<HTMLElement>), (e: MouseEvent) => {
		if (e.target === trigger.current) {
			return;
		}
		const parent = findAsParent<HTMLButtonElement>((e.target as HTMLElement), trigger.current);
		if (parent === trigger.current) {
			return;
		}
		close();
	});
	
	const coords = useMemo(() => {
		const zero: CSSProperties = { 
			visibility: 'hidden'
		};
		
		return triggerDimensions && selfDimensions ? {
			top: {
				top: triggerDimensions.top-selfDimensions.height,
				left: triggerDimensions.left,
			},
			left: {
				top: triggerDimensions.top,
				left: triggerDimensions.left-selfDimensions.width
			},
			right: {
				top: triggerDimensions.top,
				left: triggerDimensions.left+triggerDimensions.width
			},
			bottom: {
				top: triggerDimensions.top+triggerDimensions.height,
				left: triggerDimensions.left
			}
		} : {
			top: zero,
			left: zero,
			right: zero,
			bottom: zero,
		};
	}, [triggerDimensions, selfDimensions]);

	const positionStyle = useMemo(() => {
		switch (position) {
			case 'top':
				return coords.top;
			case 'left':
				return coords.left;
			case 'right':
				return coords.right;
			default:
				return coords.bottom;
		}
	}, [position, coords]);

	return (
		<Portal root={root}>
			<bem.div ref={ref} {...restProps} style={{...style, position: 'absolute', ...positionStyle}}>
				{children}
			</bem.div>
		</Portal>
	);
};

export default Dropdown;
