import React, { forwardRef, PropsWithChildren } from 'react';
import { BemTag, BemTagProps } from './types';

const getBemTag = (tagName: string): BemTag => 
	forwardRef(
		({
			children,
			className,
			modifiers,
			elementOf,
			...restProps
		}: PropsWithChildren<BemTagProps>,
			ref: React.Ref<any>
		) => {
			const Tag = tagName;
			const classNames = className ? className.split(' ') : [];
			const [blockClassName, ...otherClassNames] = classNames;
			const elementClassName = blockClassName && elementOf
				? `${blockClassName}__${elementOf}` : '';
			const classNameToModify = elementClassName || blockClassName;
			const modified = classNameToModify && modifiers 
				? modifiers.map(modifier => `${classNameToModify}--${modifier}`).join(' ')
				: '';
			const finalClassName =
				`${blockClassName} ${elementClassName} ${modified} ${otherClassNames.join(' ')}`;
			const props = { ...restProps, className: finalClassName.trim(), ref };
			return (
				<Tag {...props}>
					{children}
				</Tag>);
		}
	);

export default getBemTag;
