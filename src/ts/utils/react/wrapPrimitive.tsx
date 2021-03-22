import React, { ReactNode } from 'react';
import { TagNames } from 'components/bem/types';
import isPrimitive from 'utils/type/isPrimitive';

export default (children: ReactNode, className?: string, tag: TagNames = 'span') => {
	return React.Children.map(children, (child) => {
		if (isPrimitive(child)) {
			const Tag = tag;
			return <Tag className={className}>{child}</Tag>;
		}
		return child;
	});
};
