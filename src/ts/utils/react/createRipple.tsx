import React from 'react';
import { nanoid } from 'nanoid';
import { RipplesOptions } from 'hooks/useRipples';
import 'style/helpers/animations/ripple';

interface RippleProps extends RipplesOptions {
	delRipple: (key: string) => void;
	width: number;
	left: number;
	top: number;
}

const createRipple = ({
	delRipple,
	className,
	color,
	width,
	left,
	top,
}: RippleProps) => {
	const key = nanoid();
	return <i
		className={className}
		key={key}
		onAnimationEnd={() => {
			delRipple(key);
		}}
		style={{
			backgroundColor: color,
			borderRadius: '50%',
			position: 'absolute',
			height: width,
			zIndex: 0,
			width,
			left,
			top,
			animation: 'ripple 320ms ease-in-out'
		}}
	/>;
};

export default createRipple;
