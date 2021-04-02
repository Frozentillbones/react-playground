import React, { FC, InputHTMLAttributes, useEffect, useMemo } from 'react';
import { CommonInputProps, usePhormContext } from '..';
import bem from 'components/bem';
import { BemProps } from 'components/bem/types';
import useRenderLabel from 'hooks/phorm/useRenderLabel';
import useCurrentStateValue from 'hooks/phorm/useCurrentStateValue';

type BaseProps = CommonInputProps & InputHTMLAttributes<HTMLInputElement> & BemProps;

export interface CheckableProps extends BaseProps {
	type?: 'checkbox' | 'radio';
	value: string;
}

const Checkable: FC<CheckableProps> = (props) => {
	const {
		className,
		elementOf,
		modifiers,
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

Checkable.defaultProps = {
	type: 'checkbox',
	className: 'checkbox'
};

const withPhormContext = (Component: FC<CheckableProps>) => (props: CheckableProps) => {
	const { name, value } = props;
	const { onInputChange, state, setState } = usePhormContext();

	const currValue = useCurrentStateValue(state, name);

	useEffect(() => {
		if (!currValue) {
			setState(state => ({
				...state,
				[name]: []
			}));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const checked = useMemo(
		() => (currValue ? (currValue as string[]).includes(value) : false),
		[currValue, value]		
	);

	const allProps: CheckableProps = {
		...props,
		onChange: onInputChange,
		checked 
	};
	return <Component {...allProps}/>;
};

export const PCheckable = withPhormContext(Checkable);

export default Checkable;
