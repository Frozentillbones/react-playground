import React, { FC, SelectHTMLAttributes, useEffect } from 'react';
import { CommonInputProps, usePhormContext } from '..';
import bem from 'components/bem';
import { BemProps } from 'components/bem/types';
import useRenderLabel from 'hooks/phorm/useRenderLabel';
import CustomSelect, { SpecialSelectProps } from './CustomSelect';
import useCurrentStateValue from 'hooks/phorm/useCurrentStateValue';

type BaseProps = CommonInputProps & SelectHTMLAttributes<HTMLSelectElement> & BemProps;

export type SelectProps = BaseProps & SpecialSelectProps

const Select: FC<SelectProps> = (props) => {
	const {
		className,
		elementOf,
		modifiers,
		children,
		label,
		native,
		errors,
		...restProps
	} = props;
	const wrapperProps = { className, elementOf, modifiers };

	const { id, name } = restProps;

	const renderLabel = useRenderLabel(id, label, className);

	return (
		<bem.div {...wrapperProps}>
			{renderLabel()}
			{
				native
					?	<bem.select {...restProps} className='input' elementOf={className}>
							{children}
						</bem.select>
					: <CustomSelect id={id} name={name}>{children}</CustomSelect>
			}
		</bem.div>
	);
};

Select.defaultProps = {
	native: true,
	className: 'select'
};

const withPhormContext = (Component: FC<SelectProps>) => (props: SelectProps) => {
	const { name, multiple, defaultValue } = props;
	const { onSelectChange, state, setState } = usePhormContext();
	const { native, searchable, ...restProps } = props;

	const currValue = useCurrentStateValue(state, name);
	
	useEffect(() => {
		if (!currValue) {
			setState(state => ({
				...state,
				[name]: 
					defaultValue
						? defaultValue
						: multiple ? [] : ''
			}));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const allProps: SelectProps = {
		...restProps,
		onChange: onSelectChange,
		defaultValue: currValue
	};
	return <Component {...allProps}/>;
};

export const PSelect = withPhormContext(Select);

export default Select;
