import React, { ButtonHTMLAttributes, forwardRef, PropsWithChildren } from 'react';
import useRipples from '../../hooks/useRipples';
import bem from '../bem';

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
	ripple?: boolean
};

const Button = forwardRef((props: ButtonProps, ref) => {
	const { children, onClick, ripple, ...restProps } = props;

	const [ripples, addRipple] = useRipples();

	return (
		<bem.button
			onClick={(e: React.MouseEvent<HTMLButtonElement>) => { 
				ripple && addRipple(e);
				onClick && onClick(e);
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
