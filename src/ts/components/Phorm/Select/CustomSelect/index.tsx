import bem from 'components/bem';
import { BemProps } from 'components/bem/types';
import { CommonInputProps } from 'components/Phorm';
import React, { FC, PropsWithChildren } from 'react';

export interface SpecialSelectProps {
	native?: boolean;
	searchable?: boolean;
}

interface CustomSelectProps extends PropsWithChildren<CommonInputProps & BemProps> {
	
}

const CustomSelect: FC<CustomSelectProps & SpecialSelectProps> = (props) => {
	const {
		className,
		elementOf,
		children,
		...restProps
	} = props;
	const wrapperProps = { className, elementOf };

	return <bem.div {...wrapperProps}>{children}</bem.div>;
};

export default CustomSelect;
