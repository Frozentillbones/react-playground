import React, { ButtonHTMLAttributes, FC, forwardRef, PropsWithChildren } from 'react';
import { BemProps } from 'components/bem/types';
import useRipples from 'hooks/useRipples';
import bem from 'components/bem';
import wrapPrimitive from 'utils/react/wrapPrimitive';
import './reset';

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
	ripple?: boolean;
};

const Button: FC<ButtonProps & BemProps> = forwardRef((props, ref) => {
	const { children, onMouseDown, ripple, ...restProps } = props;
	const [ripples, addRipple] = useRipples();

	return (
		<bem.button
			onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => { 
				ripple && addRipple(e);
				onMouseDown && onMouseDown(e);
			}}
			ref={ref}
			{...restProps}
		>
			{ripple && ripples}
			{ripple ? wrapPrimitive(children, 'text') : children}
		</bem.button>
	);
});

Button.displayName = 'Button';

export default Button;
