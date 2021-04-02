import React, { 
	FC,
	TextareaHTMLAttributes,
	useEffect
} from 'react';
import { CommonInputProps, usePhormContext } from '..';
import bem from 'components/bem';
import { BemProps } from 'components/bem/types';
import useRenderLabel from 'hooks/phorm/useRenderLabel';
import useCurrentStateValue from 'hooks/phorm/useCurrentStateValue';

type BaseProps = CommonInputProps & TextareaHTMLAttributes<HTMLTextAreaElement> & BemProps;

export interface TextareaProps extends BaseProps {
	isLoading?: boolean;
}

const Textarea: FC<TextareaProps> = (props) => {
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
			<bem.textarea {...restProps} className='input' elementOf={className}/>
		</bem.div>
	);
};

Textarea.defaultProps = {
	className: 'textarea'
};

const withPhormContext = (Component: FC<TextareaProps>) => (props: TextareaProps) => {
	const { name } = props;
	const { onTextareaChange, isLoading, state, setState } = usePhormContext();

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

	const allProps: TextareaProps = {
		...props,
		onChange: onTextareaChange,
		isLoading,
		defaultValue
	};
	return <Component {...allProps}/>;
};

export const PTextarea = withPhormContext(Textarea);

export default Textarea;
