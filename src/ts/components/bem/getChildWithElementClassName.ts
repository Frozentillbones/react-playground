import React, { ReactElement, ReactNode } from 'react';
import isPrimitive from 'utils/type/isPrimitive';

const getChildWithElementClassName = (blockClassName?: string) => (child: ReactNode) => {
	if (!child || isPrimitive(child)) {
		return child;
	}
	const childProps = (child as ReactElement).props;
	const childClassName = childProps.className;
	const childFirstClassName = childClassName && childClassName.split(' ')[0];
	const elementClassName = 
		childFirstClassName && blockClassName ? `${blockClassName}__${childFirstClassName}` : null;
	return React.cloneElement(
		(child as ReactElement),
		{
			...childProps,
			className:
				elementClassName
					? `${childClassName} ${elementClassName}`
					: childClassName}
	);
};

export default getChildWithElementClassName;
