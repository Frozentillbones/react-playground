import React, { FC, InputHTMLAttributes, useEffect, useMemo } from 'react';
import { CommonInputProps, usePhormContext } from '..';
import bem from 'components/bem';
import { BemProps } from 'components/bem/types';
import useRenderLabel from 'hooks/phorm/useRenderLabel';
import useCurrentStateValue from 'hooks/phorm/useCurrentStateValue';

type BaseProps = CommonInputProps & InputHTMLAttributes<HTMLInputElement> & BemProps;

export interface TextInputProps extends BaseProps {
	type?: 'text' | 'email' | 'password' | 'tel';
	isLoading?: boolean;
}

const TextInput: FC<TextInputProps> = (props) => {
	const {
		className,
		elementOf,
		modifiers,
		isLoading,
		label,
		errors,
		...restProps
	} = props;
	const wrapperProps = { className, elementOf, modifiers };

	const { id } = restProps;

	const renderLabel = useRenderLabel(id, label, className);

	return (
		<bem.div {...wrapperProps}>
			{renderLabel()}
			<bem.input {...restProps} className='input' elementOf={className}/>
		</bem.div>
	);
};

TextInput.defaultProps = {
	type: 'text',
	className: 'field'
};

const withPhormContext = (Component: FC<TextInputProps>) => (props: TextInputProps) => {
	const { name } = props;
	const { onInputChange, isLoading, state, setState } = usePhormContext();

	const defaultValue = useCurrentStateValue(state, name);

	useEffect(() => {
		if (!defaultValue) {
			setState(state => ({
				...state,
				[props.name]: ''
			}));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const allProps: TextInputProps = {
		...props,
		onChange: onInputChange,
		isLoading,
		defaultValue
	};
	return <Component {...allProps}/>;
};

export const PTextInput = withPhormContext(TextInput);

export default TextInput;
