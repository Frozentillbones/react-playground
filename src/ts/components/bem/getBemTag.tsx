import React, { forwardRef, PropsWithChildren } from 'react';
import { BemTag, BemTagProps } from './types';
import getChildWithElementClassName from './getChildWithElementClassName';

const getBemTag = (tagName: string): BemTag => 
	forwardRef(
		({children, className, modifiers, ...restProps}: PropsWithChildren<BemTagProps>, ref: React.Ref<any>) => {
			const Tag = tagName;
			const blockClassName = className && className.split(' ')[0];
			const modifiedBlocks = 
				blockClassName && modifiers
					? modifiers.map(modifier => `${blockClassName}--${modifier}`)
					: [];
			const modifiedClassName = 
				modifiedBlocks.length
					? `${className} ${modifiedBlocks.join(' ')}`
					: className;
			const props = { ...restProps, className: modifiedClassName, ref };
			return (
				<Tag {...props}>
					{
						React.Children.map(
							children,
							getChildWithElementClassName(blockClassName)
						)
					}
				</Tag>);
		}
	);

export default getBemTag;
