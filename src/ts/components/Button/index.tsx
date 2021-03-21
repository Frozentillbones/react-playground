import React, { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from 'react';
import useRipples from 'hooks/useRipples';
import bem from 'components/bem';

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
	ripple?: boolean
};

const Button = forwardRef((props: ButtonProps, ref) => {
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
			{children}
			{ripple && ripples}
		</bem.button>
	);
});

Button.displayName = 'Button';

export default Button;
